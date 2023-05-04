import { CategoryChannel, ChannelType, ColorResolvable, Guild, Message, ActionRow, MessageComponentInteraction, Embed, SelectMenuInteraction, TextChannel, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, SelectMenuBuilder } from "discord.js";
import { getAverageColor } from "fast-average-color-node";
import ShortUniqueId from "short-unique-id";
import { AccountData, Accounts } from "../../database/models/accounts";
import { Support } from "../../database/models/tickets";
import { cache, client } from "../main";
import { Messenger } from "../messaging";
import { StartggAPI } from "../startgg/api";
import { Event, Set, Tournament } from "../startgg/genql";
import { DataEntry } from "./global.types";
import { TournaBotGuild } from "./guild.types";

export namespace SupportManager {
    export const getByDiscordId = async (guildId: string, discordId: string, resolved: boolean = false) => {
        const channelId = await cache.hGet(`support:${guildId}`, `discordId:${discordId}`)
            .catch(err => console.error('Retrieve Cache Support Channel ID', err)) || null;
        return channelId ? await getByChannelId(guildId, channelId) : await getDatabase({ guildId: guildId, discordId: discordId, resolved: resolved } as SupportTicketData);
    }

    export const getByChannelId = async (guildId: string, channelId: string) => {
        const data = JSON.parse(await cache.hGet(`support:${guildId}`, `channelId:${channelId}`)
            .catch(err => console.error('Retrieve Cache Support', err)) || null);
        return data ? new SupportTicket(data) : await getDatabase({ guildId: guildId, channelId: channelId } as SupportTicketData);
    }

    const getDatabase = async (filter: SupportTicketData) => {
        const data = await Support.findOne(filter, {}, { sort: { created_at: -1 } });
        if (data) {
            const ticket = new SupportTicket(data);
            await ticket.updateCache();
            return ticket;
        } else return null;
    }

    export const create = async (discordGuild: Guild, discordId: string, supportCategory: CategoryChannel) => {
        const potentialTicket = await getByDiscordId(discordGuild.id, discordId);
        if (potentialTicket && await discordGuild.channels.fetch(potentialTicket.channelId).catch(async err => {
            await remove(discordGuild.id, potentialTicket.channelId, discordId);
            return false;
        })) return;
        const ticketId = new ShortUniqueId({ length: 4 })();
        const ticketChannel = await discordGuild.channels.create({
            name: `ticket-${ticketId}`,
            type: ChannelType.GuildText,
            permissionOverwrites: [{
                id: discordGuild.id,
                deny: ['ManageChannels', 'ViewChannel', 'SendMessages'],
                allow: []
            }, {
                id: discordId,
                deny: ['ManageChannels'],
                allow: ['ViewChannel', 'SendMessages'],
            }],
            parent: supportCategory
        });
        const ticket = new SupportTicket({
            id: ticketId,
            guildId: discordGuild.id,
            channelId: ticketChannel.id,
            discordId: discordId,
        } as SupportTicketData);
        await ticket.updateAll();
        return ticketChannel;
    }

    export const remove = async (guildId: string, channelId: string, discordId: string) => {
        await cache.hDel(`support:${guildId}`, `discordId:${discordId}`)
            .catch(err => console.error('Delete Cache Support Channel ID', err));
        await cache.hDel(`support:${guildId}`, `channelId:${channelId}`)
            .catch(err => console.error('Delete Cache Support', err));
        return await Support.deleteOne({ guildId: guildId, channelId: channelId, discordId: discordId })
            .catch(err => console.error('Delete Database Support', err));
    }

    export const removeCache = async (guildId: string, channelId: string, discordId: string) => {
        await cache.hDel(`support:${guildId}`, `discordId:${discordId}`)
            .catch(err => console.error('Delete Cache Support Channel ID', err));
        return await cache.hDel(`support:${guildId}`, `channelId:${channelId}`)
            .catch(err => console.error('Delete Cache Support', err));
    }

    export const buildSupportCategory = async (guild: TournaBotGuild, discordGuild: Guild) => {
        let clientSupportCategory: CategoryChannel = await guild.getDiscordChannel('support_category', discordGuild);
        if (!(clientSupportCategory instanceof CategoryChannel)) {
            clientSupportCategory = await discordGuild.channels.create({
                name: 'Support Tickets',
                type: ChannelType.GuildCategory,
                permissionOverwrites: [{
                    id: discordGuild.id,
                    deny: ['ManageChannels', 'ViewChannel', 'SendMessages'],
                    allow: []
                }]
            });
            guild.setChannel('support_category', clientSupportCategory.id);
            await guild.updateAll();
        }
        return clientSupportCategory;
    }

    export const buildSupportDashboard = async (guild: TournaBotGuild, discordGuild: Guild, supportCategory: CategoryChannel) => {
        let clientSupportDashboard: TextChannel = await guild.getDiscordChannel('support_dashboard', discordGuild);
        if (!(clientSupportDashboard instanceof TextChannel)) {
            clientSupportDashboard = await discordGuild.channels.create({
                name: 'support-dashboard',
                type: ChannelType.GuildText,
                permissionOverwrites: [{
                    id: discordGuild.id,
                    deny: ['ManageChannels', 'ViewChannel', 'SendMessages'],
                    allow: []
                }],
                parent: supportCategory
            });
            guild.setChannel('support_dashboard', clientSupportDashboard.id);
            await guild.updateAll();
        }
        return clientSupportDashboard;
    }
}

export interface SupportTicketData extends DataEntry {
    resolved: boolean;
    id: string;
    guildId: string;
    channelId: string;
    discordId: string;
    setId: number;
    phase: string;
    issue: {
        name: string;
        type: string;
    }
}

class SupportTicket implements SupportTicketData {
    resolved: boolean;
    id: string;
    guildId: string;
    channelId: string;
    discordId: string;
    setId: number;
    phase: string;
    issue: {
        name: string;
        type: string;
    }

    constructor(data: SupportTicketData) {
        this.resolved = data.resolved || false;
        this.id = data.id;
        this.guildId = data.guildId;
        this.discordId = data.discordId;
        this.channelId = data.channelId;
        this.setId = data.setId;
        this.phase = data.phase || 'none';
        this.issue = data.issue;
    }

    getPhaseArray() {
        return this.phase.split('_');
    }

    async requestAdmin(m: Messenger, supportDashboard: TextChannel, embed: EmbedBuilder) {
        const actionRow = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setURL(`https://discord.com/channels/${this.guildId}/${this.channelId}`)
                    .setStyle(ButtonStyle.Link)
                    .setLabel(await m.translate('Go To Ticket')),
                new ButtonBuilder()
                    .setCustomId(`support_resolve_${this.channelId}`)
                    .setStyle(ButtonStyle.Success)
                    .setLabel(await m.translate('Resolve Ticket'))
            );

        await this.updateAll();
        await supportDashboard.send({ embeds: [embed], components: [actionRow] });
    }

    async getRequestEmbed(m: Messenger, set?: SupportSet) {
        const user = await client.users.fetch(this.discordId);
        const avatar = user.avatarURL({ extension: 'png' });
        const color = await getAverageColor(avatar).catch(err => console.error('No Thumbnail', err));
        const hex = color ? color.hex : `#${process.env.EMBED_COLOR}`;

        const embed = new EmbedBuilder()
            .setTitle(await m.translate(`Request from ${user.username}`))
            .addFields(
                { name: await m.translate('Issue'), value: this.issue.name, inline: true },
                { name: await m.translate('User'), value: `<@${user.id}>`, inline: true },
                { name: await m.translate('Ticket'), value: `<#${this.channelId}>`, inline: true },
                { name: await m.translate('Status'), value: await m.translate(this.resolved ? '\`RESOLVED\` :white_check_mark:' : '\`NOT RESOLVED\` :x:'), inline: true }
            )
            .setColor(hex as ColorResolvable)
            .setThumbnail(avatar)
            .setTimestamp();

        if (set) {
            const entrantOne = set.entrants[0];
            const entrantTwo = set.entrants[1];
            embed.addFields(
                { name: await m.translate('Matchup'), value: `**${entrantOne.name}** ${entrantOne.mentions.join('')} vs. **${entrantTwo.name}** ${entrantTwo.mentions.join('')}`, inline: true },
                { name: await m.translate('Set'), value: `[Set Link](${set.url})`, inline: true }
            );
        }

        return embed;
    }

    async getSupportSets(tournamentSlug: string, playerId: number) {
        const data = await StartggAPI.getSupportSets(tournamentSlug, playerId.toString());
        const supportSets: SupportSet[] = [];
        if (!data) return supportSets;

        for (const event of (data.tournament as Tournament).events) {
            for (const set of event.sets.nodes) {
                supportSets.push(await this.parseSet(set, event));
            }
        }

        return supportSets;
    }

    async getSupportSet() {
        if (!this.setId) return null;
        const data = await StartggAPI.getSupportSet(this.setId);
        return await this.parseSet(data.set);
    }

    async parseSet(set: Set, event?: Event) {
        const supportSet: SupportSet = {
            id: parseInt(set.id),
            url: `https://start.gg/${event?.slug || set.event.slug}/set/${set.id}`,
            eventName: event?.name || set.event.name,
            roundText: set.fullRoundText,
            entrants: []
        }
        for (const slot of set.slots) {
            const slotEntrant = slot.entrant;
            const entrant: SupportEntrant = {
                name: slotEntrant.name,
                seed: slotEntrant.initialSeedNum,
                mentions: []
            }
            for (const participant of slotEntrant.participants) {
                const slotUser = participant.user;
                if (!slotUser) continue;
                if (slotUser.authorizations.length) entrant.mentions.push(`<@${slotUser.authorizations[0].externalId}>`);
                else {
                    const account = await Accounts.findOne({ slug: slotUser.slug.replace('user/', '') });
                    if (account) entrant.mentions.push(`<@${account.discordId}>`);
                }
            }
            supportSet.entrants.push(entrant);
        }
        return supportSet;
    }

    async sendSetSelectMessage(m: Messenger, response: Message | SelectMenuInteraction, supportSets: SupportSet[]) {
        const supportEvents = [[supportSets[0]]];
        supportSets.slice(1).forEach((set, index) => {
            if (set.eventName == supportSets[index].eventName) supportEvents[supportEvents.length - 1].push(set);
            else supportEvents.push([set]);
        });

        const actionRows: ActionRowBuilder<SelectMenuBuilder | ButtonBuilder>[] = [];

        for (let i = 0; i < supportEvents.length; i++) {
            if (actionRows.length < 4) {
                const actionRow = new ActionRowBuilder<SelectMenuBuilder>()
                    .addComponents(
                        new SelectMenuBuilder()
                            .setCustomId(`support_set_${i}`)
                            .setPlaceholder(supportEvents[i][0].eventName)
                            .addOptions(supportEvents[i].map(supportSet => {
                                const entrantOne = supportSet.entrants[0];
                                const entrantTwo = supportSet.entrants[1];
                                return {
                                    label: `${entrantOne.name} vs. ${entrantTwo.name}`,
                                    description: supportSet.roundText,
                                    value: `${supportSet.id}`
                                }
                            })),
                    );
                actionRows.push(actionRow);
            }
        }

        const noneButton = new ButtonBuilder()
            .setCustomId(`support_set_none`)
            .setStyle(ButtonStyle.Secondary)
            .setLabel(`None`);

        actionRows.push(new ActionRowBuilder<ButtonBuilder>().addComponents(noneButton));

        return await response.reply({ content: await m.translate('**Got it.** Please select the set related to your issue below...'), components: actionRows });
    }

    async resolve(m: Messenger, interaction: MessageComponentInteraction | SelectMenuInteraction) {
        const actionRow = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`support_delete_${this.channelId}`)
                    .setStyle(ButtonStyle.Danger)
                    .setLabel(await m.translate('Delete Ticket Channel'))
            );

        const ticketChannel = await (client.channels.fetch(this.channelId).catch(err => null) as Promise<TextChannel>);
        if (ticketChannel) {
            await ticketChannel.permissionOverwrites.set([{
                id: this.discordId,
                deny: ['SendMessages'],
                allow: []
            }]);
            await ticketChannel.send(await m.translate(`**<@${this.discordId}>, this ticket has been resolved by <@${interaction.user.id}>.** Please create another support ticket if the problem persists.`));
        }

        this.phase = 'resolved'
        this.resolved = true;

        await interaction.update({ embeds: [await this.getRequestEmbed(m, await this.getSupportSet())], components: [actionRow] });
        await this.updateAll();
    }

    async updateAll() {
        await this.updateCache();
        return await this.updateDatabase();
    }

    async updateCache() {
        await cache.hSet(`support:${this.guildId}`, `discordId:${this.discordId}`, this.channelId)
            .catch(err => console.error('Set Cache Support Channel ID', err));
        return await cache.hSet(`support:${this.guildId}`, `channelId:${this.channelId}`, JSON.stringify(this))
            .catch(err => console.error('Set Cache Support', err));
    }

    async updateDatabase() {
        return await Support.updateOne({ guildId: this.guildId, channelId: this.channelId, discordId: this.discordId }, this, { upsert: true })
            .catch(err => console.error('Set Database Support', err));
    }
}

interface SupportSet {
    id: number;
    url: string;
    eventName: string;
    roundText: string;
    entrants: SupportEntrant[];
}

interface SupportEntrant {
    name: string;
    seed: number;
    mentions: string[];
}

export const issues: Issue[] = [
    {
        name: 'Opponent Absent',
        type: 'absent',
        description: 'Your opponent has not shown up for your match.',
        async execute(message: Message, guild: TournaBotGuild, m: Messenger) {
            await message.reply(await m.translate('**An admin has been requested for this ticket.** They will contact or disqualify the absent player and then resolve this ticket.'));
        }
    },
    {
        name: 'Bracket Issue',
        type: 'bracket',
        description: 'Bracket has conflicts or incorrect reporting/seeding.',
        async execute(message: Message, guild: TournaBotGuild, m: Messenger) {
            await message.reply(await m.translate('**An admin has been requested for this ticket.** They will take a look at the bracket and resolve this ticket once the bracket is fixed.'));
        }
    },
    {
        name: 'Unknown',
        type: 'admin',
        description: 'Just call an admin.',
        async execute(message: Message, guild: TournaBotGuild, m: Messenger) {
            await message.reply(await m.translate('**An admin has been requested for this ticket.** They will resolve this ticket once they have addressed the issue.'));
        }
    }
];

interface Issue {
    name: string;
    type: string;
    description: string;
    execute: (message: Message, guild: TournaBotGuild, m: Messenger) => Promise<void>
}
