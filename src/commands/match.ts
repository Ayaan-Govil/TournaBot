import { CommandInteraction, DMChannel, GuildMember, MessageComponentInteraction, SelectMenuInteraction } from "discord.js";
import { Messenger } from "../messaging";
import { GuildManager } from "../types/guild.types";
import { MatchCallingThread, MatchReportingThread } from "../types/match.types";

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

        const subCommandName = interaction.options.data[0].name;
        const action = interaction.options.get('action').value;
        if (subCommandName === 'calling') {
            const activeThread = matchCallingThreads.get(interaction.guildId);
            if (action === 'start') {
                if (activeThread) return m.reply('**Match calling is currently active.** You can use `/match calling stop` to stop it.', true);

                const channel = await guild.getDiscordChannel('match_calling', interaction.guild);
                if (!channel) return m.reply('**There is no channel set for match calling.** You can use `/set channel` to set the channel.', true);

                m.reply('**Match calling has started!** You can use `/match calling stop` to stop it at any time.', true);
                console.log('Match calling thread created.');

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

                const channel = await guild.getDiscordChannel('match_reports', interaction.guild);
                if (!channel) return m.reply('**There is no channel set for match reporting.** You can use `/set channel` to set the channel.', true);

                m.reply('**Match reporting has started!** You can use `/match reporting stop` to stop it at any time.', true);
                console.log('Match reporting thread created.');

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
