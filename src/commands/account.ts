import { CommandInteraction, MessageComponentInteraction } from "discord.js";
import { Accounts } from "../../database/models/accounts";
import { Messenger } from "../messaging";
import { StartggAPI } from "../startgg/api";
import { User } from "../startgg/genql";
import { GuildManager } from "../types/guild";



// add double check during linking that verifies account authenticity (if discord is linked on startgg)



export default {
    name: 'account',
    adminRequired: false,
    canRunInDMs: true,
    defer: true,
    commandExecute: async (interaction: CommandInteraction, m: Messenger) => {
        if (interaction.inGuild()) {
            const guild = await GuildManager.get(interaction.guildId);
            m.setLocale(guild.locale);
        }

        const subCommandName = interaction.options.getSubcommand();
        switch (subCommandName) {
            case 'link':
                const profileURL = interaction.options.getString('profile');
                if (!profileURL.startsWith('https://www.start.gg/user/')) return callBackMessage();
                const slug = profileURL.replace('https://www.start.gg/user/', '');

                const data = await StartggAPI.getUser(slug);
                const user = data.user as User;
                if (!user) return callBackMessage();

                const updateQuery = {
                    discordId: interaction.user.id,
                }

                const update = {
                    discordTag: interaction.user.tag,
                    discordId: interaction.user.id,
                    slug: slug,
                    playerId: user.player.id,
                    remind: true,
                    authorizations: user.authorizations
                }

                const updateOptions = {
                    new: true,
                    upsert: true
                }

                const updateResponse = await Accounts.findOneAndUpdate(updateQuery, update, updateOptions);
                console.log(`Linked ${updateResponse.discordTag}`);

                return m.editReply('**Success!** Your start.gg and Discord accounts are now linked. Check out `/results` for a custom embed of your placements!');

                async function callBackMessage() {
                    await m.editReply('**Invalid URL.** Please provide a valid start.gg profile URL.\nExample: https://start.gg/user/96687337');
                }

            case 'unlink':
                const conditions = {
                    discordId: interaction.user.id
                }

                const deleteResponse = await Accounts.findOneAndDelete(conditions);

                if (deleteResponse) return m.editReply('**All done.** Your start.gg and Discord accounts are now unlinked.');
                else return m.editReply('**Your start.gg and Discord accounts are not currently linked.** You can use `/account link` to link your accounts.');

            case 'status':
                const userArg = interaction.options.getUser('user');
                const userId = userArg ? userArg.id : interaction.user.id;
                const mention = userId === interaction.user.id ? 'Your' : `<@${userId}>'s`;

                const findQuery = {
                    discordId: userId
                }

                const findResponse = await Accounts.findOne(findQuery);
                if (findResponse) return m.editReply(`**${mention} start.gg and Discord accounts are linked!** :white_check_mark:`);
                else return m.editReply(`**${mention} start.gg and Discord accounts are not currently linked.** :x:`);
            case 'profile':
                // write this
                break;
        }
    },
    messageComponentExecute: async (interaction: MessageComponentInteraction, args: string[]) => {

    }
}
