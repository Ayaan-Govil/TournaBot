import { CommandInteraction, DMChannel, GuildMember, MessageComponentInteraction, SelectMenuInteraction } from "discord.js";
import { Messenger } from "../messaging";
import { GuildManager } from "../types/guild";
import { MatchCallingThread, MatchReportingThread } from "../types/match";

export const matchCallingThreads = new Map<string, MatchCallingThread>();
export const matchReportingThreads = new Map<string, MatchReportingThread>();

// add event choosing layer

export default {
    name: 'match',
    adminRequired: true,
    canRunInDMs: false,
    defer: false,
    commandExecute: async (interaction: CommandInteraction, m: Messenger) => {
        const guild = await GuildManager.get(interaction.guildId);
        m.setLocale(guild.locale);

        if (!guild.activeTournament.length) return m.reply('**There is no active tournament set.** You can use `/tournament set` to set the active tournament.', true);

        const subCommandName = interaction.options.getSubcommand();
        const action = interaction.options.getString('action');
        if (subCommandName === 'calling') {
            const activeThread = matchCallingThreads.get(interaction.guildId);
            if (action === 'start') {
                if (activeThread) return m.reply('**Match calling is currently active.** You can use `/match calling stop` to stop it.', true);
                else m.reply('**Match calling has started!** You can use `/match calling stop` to stop it at any time.', true);
                const channel = await guild.getDiscordChannel('match_calling', interaction.guild);
                const thread = new MatchCallingThread(guild.activeTournament, m, channel);
                thread.start();
            } else if (action === 'stop') {
                if (!activeThread) return m.reply('**Match calling is not currently active.** You can use `/match calling start` to start it.', true);
                else m.reply('**Stopped match calling!**', true);
                activeThread.stop();
            }
        } else if (subCommandName === 'reporting') {
            const activeThread = matchReportingThreads.get(interaction.guildId);
            if (action === 'start') {
                if (activeThread) return m.reply('**Match reporting is currently active.** You can use `/match reporting stop` to stop it.', true);
                else m.reply('**Match reporting has started!** You can use `/match reporting stop` to stop it at any time.', true);
                const channel = await guild.getDiscordChannel('match_reports', interaction.guild);
                const thread = new MatchReportingThread(guild.activeTournament, m, channel);
                thread.start();
            } else if (action === 'stop') {
                if (!activeThread) return m.reply('**Match reporting is not currently active.** You can use `/match reporting start` to start it.', true);
                else m.reply('**Stopped match reporting!**', true);
                activeThread.stop();
            }
        }
    },
    messageComponentExecute: async (interaction: MessageComponentInteraction | SelectMenuInteraction, args: string[], m: Messenger) => {

    }
}
