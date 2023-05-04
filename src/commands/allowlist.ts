import { CommandInteraction, MessageComponentInteraction } from "discord.js";
import { Messenger } from "../messaging";
import { GuildManager } from "../types/guild.types";

export default {
    name: 'allowlist',
    adminRequired: true,
    canRunInDMs: false,
    defer: true,
    commandExecute: async (interaction: CommandInteraction, m: Messenger) => {
        const guild = await GuildManager.get(interaction.guildId);
        m.setLocale(guild.locale);

        const role = interaction.options.get('role').role;
        let reply: string;

        const subCommandName = interaction.options.data[0].name;
        switch (subCommandName) {
            case 'add':
                if (guild.allowlist.includes(role.id)) return m.editReply('**This role is already added.**');
                guild.allowlist.push(role.id);
                reply = `**Success!** Added <@&${role.id}> to the allowlist.`;
                break;

            case 'remove':
                if (!guild.allowlist.includes(role.id)) return m.editReply('**This role is not currently added.**');
                guild.allowlist.splice(guild.allowlist.indexOf(role.id), 1);
                reply = `**All done.** Removed <@&${role.id}> from the allowlist.`;
                break;
        }

        const response = await guild.updateAll();
        if (!response) return m.editReply(`**An error occured.** Please try again. Reach out to \`F0ne#1933\` if the problem persists.`);
        else return m.editReply(reply);
    },
    messageComponentExecute: async (interaction: MessageComponentInteraction, args: string[]) => {

    }
}
