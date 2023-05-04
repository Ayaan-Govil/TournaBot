import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, Guild, MessageComponentInteraction, OverwriteResolvable, Snowflake, TextChannel } from "discord.js";
import ShortUniqueId from "short-unique-id";
import { client, guilds } from "../main";
import { Messenger } from "../messaging";
import { TournaBotDiscordData, TournaBotGuild } from "./guild.types";

const games: MatchmakingGame[] = [
    {
        shorthand: 'ssbu',
        name: 'Super Smash Bros. Ultimate',
        playersPerGame: 2
    }
]

export interface MatchmakingGame {
    shorthand: string;
    name: string;
    playersPerGame: number;
}

export class MatchmakingQueue {
    id: string;
    name: string;
    game: MatchmakingGame;
    guildId: string;
    categoryId: string = ''
    channelId: string = '';
    messageId: string = '';
    players: MatchmakingPlayer[] = [];
    playersInQueue: string[] = [];
    matches: MatchmakingMatch[] = [];

    constructor(guildId: string, name: string, gameShorthand: string) {
        this.id = new ShortUniqueId({ length: 8 })();
        this.guildId = guildId;
        this.name = name;
        this.game = games.find(g => g.shorthand === gameShorthand);
    }

    async refresh(clientGuild: Guild, guild: TournaBotGuild) {
        for (const match of this.matches) {
            await this.deleteMatch(match);
        }
        this.playersInQueue = [];
        await this.buildQueueChannel(clientGuild, guild);
    }

    async buildQueueChannel(clientGuild: Guild, guild: TournaBotGuild, interactionChannel?: TextChannel) {
        if (interactionChannel) this.categoryId = interactionChannel.parent.id;
        let queueChannel: TextChannel = await guild.getDiscordChannel(this.channelId);
        if (!(queueChannel instanceof TextChannel)) {
            queueChannel = await clientGuild.channels.create({
                name: this.name,
                type: ChannelType.GuildText,
                permissionOverwrites: [{
                    id: clientGuild.id,
                    deny: ['ManageChannels', 'SendMessages'],
                    allow: ['ViewChannel']
                }],
                parent: this.categoryId as Snowflake
            });
            this.channelId = queueChannel.id;
            this.messageId = '';
            await guilds.updateGuild(guild);
        }
        await this.buildQueuePanel(queueChannel);
        return queueChannel;
    }

    async buildQueuePanel(channel: TextChannel) {
        const guild = await guilds.getGuild(this.guildId);
        const m = new Messenger(guild.locale);

        const embed = new EmbedBuilder()
            .setTitle(this.name)
            .setDescription(`${await m.translate('Game:')} ${this.game.name}`)
            .addFields({
                name: await m.translate('Players Needed To Start Game'),
                value: `**${(this.game.playersPerGame - this.playersInQueue.length).toString()}**`
            })
            .setColor(`#${process.env.EMBED_COLOR}`)
            .setFooter({ text: 'TournaBot', iconURL: client.user.avatarURL({ extension: 'png' }) });

        const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId(`matchmaking_queue`)
                .setStyle(ButtonStyle.Success)
                .setLabel(await m.translate('Join Queue')),
            new ButtonBuilder()
                .setCustomId(`matchmaking_unqueue`)
                .setStyle(ButtonStyle.Danger)
                .setLabel(await m.translate('Leave Queue'))
        );

        let message = await channel.messages.fetch(this.messageId).catch(err => null);
        message = message ? await message.edit({ embeds: [embed], components: [buttons] }) : await channel.send({ embeds: [embed], components: [buttons] });

        this.messageId = message.id;
    }

    async addPlayerToQueue(discordId: string) {
        const player = await this.getPlayer(discordId);
        if (this.playersInQueue.includes(discordId)) return false;
        this.playersInQueue.push(discordId);
        return true;
    }

    async removePlayerFromQueue(discordId: string) {
        if (!this.playersInQueue.includes(discordId)) return false;
        const index = this.playersInQueue.indexOf(discordId);
        this.playersInQueue.splice(index, 1);
        return true;
    }

    async checkToStartMatch(channel: TextChannel) {
        if (this.playersInQueue.length >= this.game.playersPerGame) {
            const playerIds = [];
            for (let i = 0; i < this.game.playersPerGame; i++) {
                playerIds.push(this.playersInQueue.splice(Math.floor(Math.random() * this.playersInQueue.length), 1)[0]);
            }
            await this.buildQueuePanel(channel);
            // add checking if player is in game for queueing back up
            const match = new MatchmakingMatch(this.id, this.name, this.game, this.guildId, playerIds, []);

            const guild = await guilds.getGuild(this.guildId);
            const clientGuild = await guild.getClientGuild();

            await match.startMatch(clientGuild);
            this.matches.push(match);
            guilds.updateGuild(guild);
        }
    }

    async deleteMatch(match: MatchmakingMatch) {
        for (const channel of match.channels) {
            const clientChannel = await client.channels.fetch(channel.id).catch(err => null);
            if (clientChannel) await clientChannel.delete();
        }

        const index = this.matches.indexOf(match);
        if (index !== -1) this.matches.splice(index, 1);

        const guild = await guilds.getGuild(this.guildId);
        await guilds.updateGuild(guild);
    }

    async getPlayer(discordId: string) {
        let player = this.players.find(p => p.discordId === discordId);
        if (!player) {
            player = new MatchmakingPlayer({ discordId: discordId });
            this.players.push(player);
            const guild = await guilds.getGuild(this.guildId);
            await guilds.updateGuild(guild);
        }
        return player;
    }

    convertForMongo() {
        return {
            id: this.id,
            name: this.name,
            game: this.game,
            guildId: this.guildId,
            categoryId: this.categoryId,
            channelId: this.channelId,
            messageId: this.messageId,
            players: this.players,
            matches: this.matches
        }
    }
}

export interface MatchmakingMatchInterface {
    queueId: string;
    queueName: string;
    game: MatchmakingGame;
    guildId: string;
    playerIds: string[];
    channels: TournaBotDiscordData[];
    checkedIn: boolean;
}

export class MatchmakingMatch implements MatchmakingMatchInterface {
    queueId;
    queueName;
    game;
    guildId;
    playerIds;
    channels;
    checkedIn = false;

    constructor(queueId: string, queueName: string, game: MatchmakingGame, guildId: string, playerIds: string[], channels: TournaBotDiscordData[]) {
        this.queueId = queueId;
        this.queueName = queueName;
        this.game = game;
        this.guildId = guildId;
        this.playerIds = playerIds;
        this.channels = channels;
    }

    async startMatch(clientGuild: Guild) {
        await this.createChannels(clientGuild);
        await this.phases.checkIn(true, clientGuild);
    }

    async createChannels(clientGuild: Guild) {
        const category = await clientGuild.channels.create({
            name: `${this.queueName} Match`,
            type: ChannelType.GuildCategory,
            permissionOverwrites: [{
                id: clientGuild.id,
                deny: ['ManageChannels', 'ViewChannel', 'SendMessages'],
                allow: []
            }]
        });
        this.setChannel('category', category.id);

        const adminChannel = await clientGuild.channels.create({
            name: 'admin',
            type: ChannelType.GuildText,
            parent: category
        });
        this.setChannel('admin', adminChannel.id);

        const gameChannelPerms = this.playerIds.map(id => {
            return {
                id: id,
                deny: ['SEND_MESSAGES'],
                allow: ['VIEW_CHANNEL']
            }
        });
        gameChannelPerms.push({
            id: clientGuild.id,
            deny: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'SEND_MESSAGES'],
            allow: []
        });
        const gameChannel = await clientGuild.channels.create({
            name: 'match',
            type: ChannelType.GuildText,
            permissionOverwrites: gameChannelPerms as OverwriteResolvable[],
            parent: category
        });
        this.setChannel('game', gameChannel.id);

        const chatChannelPerms = this.playerIds.map(id => {
            return {
                id: id,
                deny: [],
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            }
        });
        chatChannelPerms.push({
            id: clientGuild.id,
            deny: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'SEND_MESSAGES'],
            allow: []
        });
        const chatChannel = await clientGuild.channels.create({
            name: 'chat',
            type: ChannelType.GuildText,
            permissionOverwrites: chatChannelPerms as OverwriteResolvable[],
            parent: category
        });
        this.setChannel('chat', chatChannel.id);
    }

    async updateMatchPanel(phase: string[], interaction: MessageComponentInteraction) {
        const guild = await guilds.getGuild(this.guildId);
        const clientGuild = await guild.getClientGuild();
        const phaseString = phase.shift();
        switch (phaseString) {
            case 'checkin':
                return this.phases.checkIn(false, clientGuild, interaction);
            // case 'stageselectstart':
            //     return this.phases.stageSelectionStarter(phase, interaction);
            // case 'stageselectcounter':
            //     return;
        }
    }

    phases = {
        checkIn: async (send: boolean = false, clientGuild: Guild, interaction?: MessageComponentInteraction) => {
            const guild = await guilds.getGuild(this.guildId);
            const m = new Messenger(guild.locale, interaction);

            const playerId = interaction?.user?.id;
            let content = interaction ? interaction.message.embeds[0].fields[0].value : this.playerIds.map(id => `<@${id}>`).join('\n');
            if (content.includes(playerId)) content = content.replace(`<@${playerId}>`, '');

            if (content.length === 0) { // if all are checked in, move on to next phase
                this.checkedIn = true;
                switch (this.game.shorthand) {
                    case 'ssbu':
                        // return this.phases.stageSelectionStarter([], interaction);
                        const stages = ['Battlefield', 'Final Destination', 'Smashville', 'Pokemon Stadium 2', 'Town and City'];
                        return this.phases.playAndReport(stages[Math.floor(Math.random() * stages.length)], interaction);
                }
            }

            const embed = new EmbedBuilder()
                .setTitle(await m.translate('Check-in'))
                .setDescription(await m.translate('Please check-in with the button below. You have 60 seconds to check-in.'))
                .addFields({ name: await m.translate('Not Checked-in'), value: content })
                .setColor(`#${process.env.EMBED_COLOR}`)
                .setFooter({ text: 'TournaBot', iconURL: client.user.avatarURL({ extension: 'png' }) })
                .setTimestamp();

            const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setCustomId('matchmaking_checkin')
                    .setStyle(ButtonStyle.Success)
                    .setLabel(await m.translate('Check-in'))
            );

            const gameChannel = await this.getClientChannel(clientGuild, 'game');
            if (send) {
                await gameChannel.send(this.playerIds.map(id => `<@${id}>`).join(''));
                gameChannel.send({ embeds: [embed], components: [actionRow] });
                setTimeout(async () => {
                    if (this.checkedIn) return;
                    const guild = await guilds.getGuild(this.guildId);
                    const queue = guild.queues.find((q: { id: string; }) => q.id === this.queueId);
                    queue.deleteMatch(this); // self reference deletion (could possibly create a memory leak?)
                }, 60000);
            } else interaction.editReply({ embeds: [embed], components: [actionRow] });
        },

        // stageSelectionStarter: async (args: string[], interaction: MessageComponentInteraction) => {
        //     // if (this.game.shorthand === 'ssbu') { // for when support for more than one game is added
        //     const guild = await guilds.getGuild(this.guildId);
        //     const m = new Messenger(interaction, guild.locale);

        //     const description = interaction.message.embeds[0].description;
        //     let stages = [];
        //     let player = this.playerIds[Math.floor(Math.random() * 2)];

        //     if (args.length) {
        //         const currentPickPlayer = description.substring(description.indexOf('<@') + 2, description.indexOf('>'));
        //         if (interaction.user.id != currentPickPlayer) return;

        //         const menu = interaction.message.components[0].components[0] as MessageSelectMenu;
        //         for (const stage of menu.options) {
        //             stages.push(stage.label);
        //         }

        //         const stageIndex = parseInt(args[0]);
        //         if (stages.length === 2) return this.phases.playAndReport([stages[stageIndex]], interaction);
        //         stages.splice(stageIndex, 1);

        //         if (stages.length != 3) player = this.playerIds[Math.abs(this.playerIds.indexOf(currentPickPlayer) - 1)];
        //         else player = currentPickPlayer;
        //     } else {
        //         this.firstBan = player;
        //         stages = ['Battlefield', 'Final Destination', 'Smashville', 'Pokemon Stadium 2', 'Town and City'];
        //         await guilds.updateGuild(guild);
        //     }

        // translating stages could be optimized by translating beforehand

        //     const embed = new MessageEmbed()
        //         .setTitle(await m.translate('Stage Selection (Starter)'))
        //         // need to continue translating
        //         .setDescription(await m.translate(`*Ruleset from the [2021 SWT Rulebook](https://smashworldtour.com/wp-content/uploads/2021/02/SWT-2021-Rulebook-2020.2.16.pdf)*

        //         <@${player}>, it is your turn to **${stages.length === 5 ? 'ban 1 stage' : this.firstBan === player ? 'select a stage' : 'ban 2 stages'}**!

        //         • ${stages.join('\n• ')}`))
        //         .setFooter('TournaBot', client.user.avatarURL({ format: 'png' }))
        //         .setTimestamp();


        //     const actionRow = new MessageActionRow().addComponents(
        //         new MessageSelectMenu()
        //             .setCustomId('matchmaking_stageselectstart')
        //             .setPlaceholder(await m.translate('Pick a stage...'))
        //             .setOptions(await Promise.all(stages.map(async (stage, index) => {
        //                 return {
        //                     label: await m.translate(stage),
        //                     value: index.toString()
        //                 }
        //             })))
        //     );

        //     interaction.editReply({ embeds: [embed], components: [actionRow] });
        //     // }
        // },

        // stageSelectionCounterpick: async (args: string[], interaction: MessageComponentInteraction) => {
        //     const guild = await guilds.getGuild(this.guildId);
        //     const m = new Messenger(interaction, guild.locale);

        //     // if (this.game.shorthand === 'ssbu') { // for when support for more than one game is added

        //     const embed = new MessageEmbed()
        //         .setTitle(await m.translate('Stage Selection (Counterpick)'))
        //         .setDescription(await m.translate(`*Ruleset from the [2021 SWT Rulebook](https://smashworldtour.com/wp-content/uploads/2021/02/SWT-2021-Rulebook-2020.2.16.pdf)*

        //         `))
        //         .setFooter('TournaBot', client.user.avatarURL({ format: 'png' }))
        //         .setTimestamp();

        //     interaction.editReply({ embeds: [embed], components: [] });
        //     // }
        // },

        playAndReport: async (stage: string, interaction: MessageComponentInteraction) => {
            const guild = await guilds.getGuild(this.guildId);
            const m = new Messenger(guild.locale);

            // if (this.game.shorthand === 'ssbu') { // for when support for more than one game is added
            const embed = new EmbedBuilder()
                .setTitle(await m.translate(`Play and Report`))
                .setDescription(await m.translate(`*Ruleset from the [2021 SWT Rulebook](https://smashworldtour.com/wp-content/uploads/2021/02/SWT-2021-Rulebook-2020.2.16.pdf)*
                
                Stage: ${stage}
                
                Game Settings: 
                • Stock: 3
                • Timer: 7:00
                • Handicap: Off
                • Team Attack: On
                • Launch Rate: 1.0x
                • Items: Off and None
                • FS Meter: Off
                • Damage Handicap: Off
                • Custom Balance: Off
                • Spirits: Off
                • Pause: Off
                • Stage Selection: Loser’s Pick
                • Stage Hazards: Off
                • Stage Morph: Off
                • Underdog Boost: Off
                • Score Display: Off
                • Show Damage: Yes`))
                .setFooter({ text: 'TournaBot', iconURL: client.user.avatarURL({ extension: 'png' }) })
                .setTimestamp();

            interaction.editReply({ embeds: [embed], components: [] });

            // todo
            // - add best of option
            // - add variable for storing winners

            // }
        }
    }

    setChannel(type: string, channelId: string) {
        const channel = this.getChannel(type);
        if (channel) channel.id = channelId;
        else this.channels.push({
            type: type,
            id: channelId
        });
    }

    getChannel(type: string) {
        return this.channels.find(c => c.type === type);
    }

    async getClientChannel(clientGuild: Guild, type: string) {
        return await clientGuild.channels.fetch(this.getChannel(type)?.id).catch(err => err);
    }
}

export class MatchmakingPlayer {
    discordId: string;
    points: number;
    wins: number;
    losses: number;

    constructor(mongoPlayer: { discordId: string, points?: number, wins?: number, losses?: number }) {
        this.discordId = mongoPlayer.discordId;
        this.points = mongoPlayer?.points || 1000;
        this.wins = mongoPlayer?.wins || 0;
        this.losses = mongoPlayer?.losses || 0;
    }

    win(playerTwo: MatchmakingPlayer) {
        this.wins++;
        this.points += playerTwo.points / this.points * 100;
        playerTwo.loss(this);
    }

    private loss(playerTwo: MatchmakingPlayer) {
        this.losses++;
        this.points -= this.points / playerTwo.points * 90;
        if (this.points < 1000) this.points = 1000;
    }
}
