import { EmbedBuilder, GuildEmoji, TextChannel } from "discord.js";
import { Accounts } from "../../database/models/accounts";
import { matchCallingThreads, matchReportingThreads } from "../commands/match";
import { Messenger } from "../messaging";
import { StartggAPI } from "../startgg/api";
import { Set, SetSlot, Tournament } from "../startgg/genql";
import { Characters } from "./characters.types";

const getEntrants = async (setSlots: SetSlot[]) => {
    const entrants: SortedEntrant[] = [];

    for (const slot of setSlots) {
        const slotEntrant = slot.entrant;
        const entrant: SortedEntrant = {
            id: parseInt(slotEntrant.id),
            name: slotEntrant.name,
            seed: slotEntrant.initialSeedNum,
            users: [],
            characters: []
        }
        for (const participant of slotEntrant.participants) {
            const slotUser = participant.user;
            if (!slotUser) continue;
            const slug = slotUser.slug.replace('user/', '');
            const user: SortedUser = {
                slug: slug,
                mention: ''
            }
            if (slotUser.authorizations.length) user.mention = `<@${slotUser.authorizations[0].externalId}>`;
            else {
                const account = await Accounts.findOne({ slug: slug });
                if (account) user.mention = `<@${account.discordId}>`;
            }
            entrant.users.push(user);
        }
        entrants.push(entrant);
    }

    return entrants;
}

interface SortedEntrant {
    id: number;
    name: string;
    seed: number;
    users: SortedUser[];
    characters: GuildEmoji[];
}

interface SortedUser {
    slug: string;
    mention: string;
}


// self deletion could lead to memory leaks, im not quite sure how the garbage collector handles it


export interface MatchThread {
    slug: string;
    m: Messenger;
    channel: TextChannel;
    sets: string[];
    automaticStop: NodeJS.Timeout;
    loop: NodeJS.Timer;

    start(): void;
    stop(): void;
    iterate(): Promise<void>;
}

export class MatchCallingThread implements MatchThread {
    slug: string;
    m: Messenger;
    channel: TextChannel;
    sets: string[];
    automaticStop: NodeJS.Timeout;
    loop: NodeJS.Timer;

    constructor(slug: string, m: Messenger, channel: TextChannel) {
        this.slug = slug;
        this.m = m;
        this.channel = channel;
        this.sets = [];
    }

    start() {
        // send message to channel here saying that match calling has started for tournament
        this.automaticStop = setTimeout(() => {
            this.stop();
            this.m.sendMessage(this.channel, 'Match calling has automatically stopped after 6 hours.');
        }, 21600000);
        this.loop = setInterval(async () => { await this.iterate(); }, 10000); // 10 second interval
        matchCallingThreads.set(this.channel.guildId, this);
        this.iterate();
    }

    stop() {
        clearTimeout(this.automaticStop);
        clearInterval(this.loop);
        matchCallingThreads.delete(this.channel.guildId);
    }

    async iterate() {
        const data = await StartggAPI.getMatchCallingSets(this.slug);
        if (!data) return;

        const tournament: Tournament = data.tournament;

        if (tournament.startAt * 1000 > Date.now()) {
            this.stop();
            return this.m.sendMessage(this.channel, '**Match calling has automatically stopped because the tournament has not started.** If this is a mistake, check the tournament start time on start.gg.');
        }

        if (tournament.endAt * 1000 < Date.now()) {
            this.stop();
            return this.m.sendMessage(this.channel, '**Match calling has automatically stopped because the tournament has ended.** If this is a mistake, check the tournament end time on start.gg.');
        }

        const events = tournament.events;
        for (const event of events) {
            for (const set of event.sets.nodes) {
                if (this.sets.includes(set.id)) continue;
                this.sets.push(set.id);
                const message = await this.generateMatchupMessage(set);
                if (!message) continue;
                await this.channel.send(message);
            }
        }
    }

    async generateMatchupMessage(set: Set) {
        const entrants = await getEntrants(set.slots);
        if (!entrants.length || entrants.length === 1) return;

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${set.event.name} - ${set.fullRoundText}` })
            .setTitle(`${entrants[0].name} vs. ${entrants[1].name}`)
            .setURL(`https://start.gg/${set.event.slug}/set/${set.id}`)
            .setDescription('Your match has been called! Please check-in on start.gg.')
            .setColor(`#${process.env.EMBED_COLOR}`);

        return { content: entrants.map(e => e.users.map(u => u.mention).join('')).join('') || 'No mentions available.', embeds: [embed] }
    }
}

export class MatchReportingThread implements MatchThread {
    slug: string;
    m: Messenger;
    channel: TextChannel;
    sets: string[];
    automaticStop: NodeJS.Timeout;
    loop: NodeJS.Timer;

    constructor(slug: string, m: Messenger, channel: TextChannel) {
        this.slug = slug;
        this.m = m;
        this.channel = channel;
        this.sets = [];
    }

    start() {
        // send message to channel here saying that match reporting has started for tournament
        this.automaticStop = setTimeout(() => {
            this.stop();
            this.m.sendMessage(this.channel, 'Match reporting has automatically stopped after 6 hours.');
        }, 21600000);
        this.loop = setInterval(async () => { await this.iterate(); }, 10000); // 10 second interval
        matchReportingThreads.set(this.channel.guildId, this);
        this.iterate();
    }

    stop() {
        clearTimeout(this.automaticStop);
        clearInterval(this.loop);
        matchReportingThreads.delete(this.channel.guildId);
    }

    async iterate() {
        const data = await StartggAPI.getMatchReportingSets(this.slug);
        if (!data) return;

        const tournament: Tournament = data.tournament;

        if (tournament.startAt * 1000 > Date.now()) {
            this.stop();
            return this.m.sendMessage(this.channel, '**Match reporting has automatically stopped because the tournament has not started.** If this is a mistake, check the tournament start time on start.gg.');
        }

        if (tournament.endAt * 1000 < Date.now()) {
            this.stop();
            return this.m.sendMessage(this.channel, '**Match reporting has automatically stopped because the tournament has ended.** If this is a mistake, check the tournament end time on start.gg.');
        }

        const events = tournament.events;
        for (const event of events) {
            for (const set of event.sets.nodes) {
                if (this.sets.includes(set.id)) continue;
                this.sets.push(set.id);
                await this.channel.send(await this.generateResultsEmbed(set));
            }
        }
    }

    async generateResultsEmbed(set: Set) {
        const entrants = await getEntrants(set.slots);

        const winner = entrants.find(e => e.id === set.winnerId);
        const loser = entrants.find(e => e.id !== set.winnerId);

        const message = winner.seed > loser.seed ? `🚨 UPSET ALERT 🚨` : set.games?.length ? set.games.length === set.totalGames ? `🏆 Close One! 🏆` : `🏆 Decisive Victory! 🏆` : `🏆 Disqualification... 🏆`;
        const score = [0, 0];
        const games = [];

        if (set.games?.length) {
            for (const game of set.games) {
                if (winner.id === game.winnerId) score[0]++;
                else score[1]++;

                if (!game.selections) continue;

                const gameWinner = entrants.find(e => e.id === game.winnerId);
                let gameWinnerString = `**${gameWinner.name}**`;
                const gameLoser = entrants.find(e => e.id !== game.winnerId);
                let gameLoserString = `${gameLoser.name}`;

                for (const selection of game.selections) {
                    const emoji = Characters.getEmojiFromId(`${selection.selectionValue}`);
                    if (!emoji) continue;
                    if (parseInt(selection.entrant.id) === gameWinner.id) gameWinnerString += ` ${emoji}`;
                    else gameLoserString += ` ${emoji}`;
                }

                games.push(`${gameWinnerString} vs. ${gameLoserString}`);
            }
        }

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${set.event.name} - ${set.fullRoundText} - Best of ${set.totalGames}` })
            .setTitle(message)
            .setURL(`https://start.gg/${set.event.slug}/set/${set.id}`)
            .setDescription(set.games?.length ? `(${winner.seed}) **${winner.name}** ${winner.users.map(e => e.mention).join('')} wins ${score[0]}-${score[1]} against (${loser.seed}) **${loser.name}** ${loser.users.map(e => e.mention).join('')}!`
                : `(${loser.seed}) **${loser.name}** ${loser.users.map(e => e.mention).join('')} has been disqualified, giving (${winner.seed}) **${winner.name}** ${winner.users.map(e => e.mention).join('')} the win!`)
            .addFields(games.map((g, i) => {
                return {
                    name: `Game ${i + 1}`,
                    value: g,
                    inline: true
                }
            }))
            .setColor(`#${process.env.EMBED_COLOR}`);

        return { embeds: [embed] };
    }
}
