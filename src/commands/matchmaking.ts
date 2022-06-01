import { CommandInteraction, DMChannel, GuildMember, MessageComponentInteraction, SelectMenuInteraction, TextChannel, ThreadManager } from "discord.js";
import { Messenger } from "../messaging";
import { GuildManager } from "../types/guild";
import { GameShorthand } from "../types/matchmaking/match";
import { MatchmakingQueue, MatchmakingQueueData, QueueManager } from "../types/matchmaking/queue";


// ADD DELETE GAME THROUGH ADMIN PANEL


export default {
    name: 'matchmaking',
    adminRequired: true,
    canRunInDMs: false,
    defer: true,
    commandExecute: async (interaction: CommandInteraction, m: Messenger) => {
        const guild = await GuildManager.get(interaction.guildId);
        m.setLocale(guild.locale);
        const queue = await QueueManager.get(interaction.guildId, interaction.channelId);

        const subCommandName = interaction.options.getSubcommand();
        switch (subCommandName) {
            case 'create':
                const name = interaction.options.getString('name');
                const gameShorthand = interaction.options.getString('game') as GameShorthand;

                const newQueue = await QueueManager.create(
                    {
                        guildId: interaction.guildId,
                        channelId: interaction.channelId,
                        name: name,
                        game: gameShorthand,
                    } as MatchmakingQueueData
                );
                //new MatchmakingQueue(interaction.guildId, name, gameShorthand);
                //await newQueue.buildQueueChannel(interaction.guild, guild, interaction.channel as TextChannel);
                //guild.queues.push(newQueue);

                await m.editReply(`**Success!** Created ${name}.`).catch(err => err);
                break;

            case 'delete':
                if (queue?.channelId === interaction.channelId) {
                    // delete single queue
                    await QueueManager.remove(interaction.guildId, interaction.channelId);
                } else {
                    // delete all queues
                    await QueueManager.removeAll(interaction.guildId);
                    await m.editReply('**Success!** All queues have been deleted.').catch(err => err);
                }
                break;

            case 'refresh':
                if (queue?.channelId === interaction.channelId) {
                    // refresh single queue
                    await QueueManager.refresh(queue);
                    await m.editReply(`**Success!** ${queue.name} has been refreshed.`).catch(err => err);;
                } else {
                    // refresh all queues
                    await QueueManager.refreshAll(interaction.guildId);
                    await m.editReply('**Success!** All queues have been refreshed.').catch(err => err);;
                }
                break;
        }
    },
    messageComponentExecute: async (interaction: MessageComponentInteraction | SelectMenuInteraction, args: string[], m: Messenger) => {
        // await interaction.deferReply({ ephemeral: true });
        const guild = await GuildManager.get(interaction.guildId);
        m.setLocale(guild.locale);
        const queue = await QueueManager.get(interaction.guildId, interaction.channelId);


        // need to rework everything below


        // switch (args[0]) {
        //     case 'queue':
        //         await interaction.deferReply({ ephemeral: true });
        //         const matchExists = queue.matches.find(m => m.playerIds.includes(interaction.user.id));
        //         if (matchExists) return m.editReply('You are currently in a match. If this is a mistake, please ask an admin to refresh the queue.');

        //         const isPlayerAdded = await queue.addPlayerToQueue(interaction.user.id);
        //         if (isPlayerAdded) {
        //             await queue.buildQueuePanel(interaction.channel as TextChannel);
        //             await m.editReply('**Success!** You have been added to the queue.');
        //         } else return m.editReply('You are already in the queue.');
        //         break;

        //     case 'unqueue':
        //         await interaction.deferReply({ ephemeral: true });
        //         const isPlayerRemoved = await queue.removePlayerFromQueue(interaction.user.id);
        //         if (isPlayerRemoved) {
        //             await queue.buildQueuePanel(interaction.channel as TextChannel);
        //             await m.editReply('**Success!** You have been removed from the queue.');
        //         } else return m.editReply('You are not in the queue.');
        //         break;

        //     default:
        //         // todo:
        //         // - replace everything with translations
        //         // - complete play and report phase
        //         await interaction.deferUpdate();

        //         let match;
        //         for (const queue of guild.queues) {
        //             match = queue.matches.find(m => m.playerIds.includes(interaction.user.id));
        //             if (match) break;
        //         }

        //         if (interaction.componentType === 'SELECT_MENU') args = args.concat((interaction as SelectMenuInteraction).values);
        //         return match.updateMatchPanel(args, interaction as MessageComponentInteraction);
        // }


        // queue.checkToStartMatch(interaction.channel as TextChannel);
    }
}
