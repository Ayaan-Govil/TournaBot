import { ActionRowBuilder, CommandInteraction, Message, MessageComponentInteraction, SelectMenuBuilder, SelectMenuInteraction, TextChannel } from "discord.js";
import { Accounts } from "../../database/models/accounts";
import { client } from "../main";
import { Messenger } from "../messaging";
import nlp from "../nlp/load_model";
import { GuildManager, TournaBotGuild } from "../types/guild.types";
import { issues, SupportManager } from "../types/support.types";



// TODO:
// - cancel ticket as user
// - disable select menus after using them



export default {
    name: 'support',
    adminRequired: false,
    canRunInDMs: false,
    defer: true,
    commandExecute: async (interaction: CommandInteraction, m: Messenger) => {
        const guild = await GuildManager.get(interaction.guildId);
        m.setLocale(guild.locale);
        if (!guild.activeTournament.length) return m.editReply('**There is no active tournament set.** Please ask an admin to set an active tournament before using this command.');

        const account = await Accounts.findOne({ discordId: interaction.user.id });
        if (!account) return m.editReply('**Your start.gg and Discord accounts must be linked to use this command.** You can use `/account link` to link your accounts.');

        const supportCategory = await SupportManager.buildSupportCategory(guild, interaction.guild);
        const supportDashboard = await SupportManager.buildSupportDashboard(guild, interaction.guild, supportCategory);

        const ticketChannel = await SupportManager.create(interaction.guild, interaction.user.id, supportCategory);
        if (ticketChannel) await m.editReply(`**I can help you out!** A ticket has just been opened for you at <#${ticketChannel.id}>.`);
        else return m.editReply('**You already have a ticket open.** Please resolve your current ticket before creating a new one.');

        const ticket = await SupportManager.getByChannelId(interaction.guildId, ticketChannel.id);
        ticket.phase = 'question';

        const actionRow = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
            new SelectMenuBuilder()
                .setCustomId('support')
                .setPlaceholder(await m.translate('Reply below or select your issue...'))
                .addOptions(issues.map(issue => {
                    return {
                        label: issue.name,
                        description: issue.description,
                        value: issue.type
                    }
                })),
        );

        await ticketChannel.send({ content: await m.translate(`**<@${interaction.user.id}>, what is your issue?**`), components: [actionRow] });

        const collector = ticketChannel.createMessageCollector({ filter: m => m.author.id === interaction.user.id });
        setTimeout(async () => {
            if (collector.ended) return;
            collector.stop();
            ticketChannel.send(await m.translate('**Message collection has automatically stopped after 5 minutes.** Please use the select menu above if you have not requested an admin yet.')).catch(err => err);
        }, 300000); // 5 minutes
        collector.on('collect', async (message) => {
            const content = await new Messenger('en').translate(message.content, true);
            const response = await nlp.process('en', content);
            const intent = response.intent.split('.');
            switch (intent[0]) {
                case 'issue':
                    ticket.phase = `affirmation_${intent[0]}_${intent[1]}`;
                    await message.reply(response.answer);
                    break;
                case 'affirmation':
                    const phase = ticket.getPhaseArray();
                    if (phase.length !== 3) break;
                    if (intent[1] === 'yes') {
                        collector.stop();
                        ticket.phase = `addressing_${phase[2]}`;
                        if (phase[2] === 'admin') {
                            message = await message.reply('**Got it.** Calling an admin...');
                            const issue = issues.find(i => i.type === phase[2]);
                            ticket.issue = {
                                name: issue.name,
                                type: issue.type
                            }
                            await ticket.requestAdmin(m, supportDashboard, await ticket.getRequestEmbed(m));
                            return issue.execute(message, guild, m);
                        }
                        const supportSets = await ticket.getSupportSets(guild.activeTournament, account.playerId);
                        await ticket.sendSetSelectMessage(m, message, supportSets);
                        await ticket.updateAll();
                    } else {
                        ticket.phase = 'question';
                        await message.reply(await m.translate(`**<@${interaction.user.id}>, what is your issue?**`));
                    }
                    break;
                case 'admin':
                    ticket.phase = 'affirmation_call_admin';
                    await message.reply(await m.translate('**Do you want me to call an admin?**'));
                    break;
                default:
                    ticket.phase = 'affirmation_call_admin';
                    await message.reply(await m.translate('**Sorry, I don\'t understand.** Would you like me to call an admin?'));
            }
        });
    },
    messageComponentExecute: async (interaction: MessageComponentInteraction | SelectMenuInteraction, args: string[], m: Messenger) => {
        const guild = await GuildManager.get(interaction.guildId);
        m.setLocale(guild.locale);

        // add check to make sure the person doing interactions is either the person for the ticket or an admin

        if (args[0] === 'resolve') {
            // NEED TO HANDLE CASE WHERE CHANNEL WAS DELETED
            const ticket = await SupportManager.getByChannelId(interaction.guildId, args[1]);
            await ticket.resolve(m, interaction);
            return SupportManager.removeCache(ticket.guildId, ticket.channelId, ticket.discordId)
        }

        if (args[0] === 'delete') {
            const ticketChannel = await client.channels.fetch(args[1]).catch(err => null);
            if (ticketChannel) await ticketChannel.delete();
            return interaction.update({ components: [] });
        }

        const supportCategory = await SupportManager.buildSupportCategory(guild, interaction.guild);
        const supportDashboard = await SupportManager.buildSupportDashboard(guild, interaction.guild, supportCategory);

        const ticket = await SupportManager.getByChannelId(interaction.guildId, interaction.channelId);
        const phase = ticket.getPhaseArray();

        if (args[0] === 'set') {
            // MAYBE ADD BEING ABLE TO CHANGE THE SET FOR THE TICKET
            if (phase[0] === 'waiting') return;
            const setId = args[1] === 'none' ? null : parseInt((interaction as SelectMenuInteraction).values[0]);
            ticket.setId = setId;
            ticket.phase = 'waiting_on_admin';
            const message = await interaction.reply({ content: await m.translate('**Got it.** Informing an admin...'), fetchReply: true });
            const issue = issues.find(i => i.type === phase[1]);
            ticket.issue = {
                name: issue.name,
                type: issue.type
            }
            await ticket.requestAdmin(m, supportDashboard, await ticket.getRequestEmbed(m, await ticket.getSupportSet()));
            return issue.execute(message as Message, guild, m);
        }

        if (phase[0] === 'addressing') return;
        const issueName = (interaction as SelectMenuInteraction).values[0];
        ticket.phase = `addressing_${issueName}`;
        if (issueName === 'admin') {
            const message = await interaction.reply({ content: '**Got it.** Calling an admin...', fetchReply: true });
            const issue = issues.find(i => i.type === issueName);
            ticket.issue = {
                name: issue.name,
                type: issue.type
            }
            await ticket.requestAdmin(m, supportDashboard, await ticket.getRequestEmbed(m));
            return issue.execute(message as Message, guild, m);
        }

        const account = await Accounts.findOne({ discordId: interaction.user.id });
        if (!account) return m.reply('**Your start.gg and Discord accounts must be linked to use this feature.** You can use `/account link` to link your accounts.', true);
        const supportSets = await ticket.getSupportSets(guild.activeTournament, account.playerId);
        await ticket.sendSetSelectMessage(m, interaction as SelectMenuInteraction, supportSets);
        await ticket.updateAll();
    }
}

const supportThread = async (guild: TournaBotGuild, userId: string, ticketChannel: TextChannel) => {
    const m = new Messenger(guild.locale);



    // need to rework below



}
