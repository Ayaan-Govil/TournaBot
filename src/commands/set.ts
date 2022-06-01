import { CommandInteraction, DMChannel, GuildMember, MessageComponentInteraction } from "discord.js";
import { languages, timezones } from "../../command_setup/localization_objects";
import { Messenger } from "../messaging";
import { GuildManager } from "../types/guild";
const fetch = require('node-fetch');

export default {
    name: 'set',
    adminRequired: true,
    canRunInDMs: false,
    defer: true,
    commandExecute: async (interaction: CommandInteraction, m: Messenger) => {
        const type = interaction.options.getString('feature') || 'active';
        let typeName = type.replace('_', ' ');

        const guild = await GuildManager.get(interaction.guildId);
        m.setLocale(guild.locale);

        let guildObjectString: string;

        const subCommandName = interaction.options.getSubcommand();
        switch (subCommandName) {
            case 'channel':
                const channel = interaction.options.getChannel('channel');
                if (channel.type !== 'GUILD_TEXT') return m.editReply('**Invalid channel.** Must be a text channel.');

                guild.setChannel(type, channel.id);
                guildObjectString = `<#${channel.id}>`;
                break;

            case 'role':
                const role = interaction.options.getRole('role');
                if (role.id === interaction.guildId) {
                    guild.removeRole(type);
                    guildObjectString = `@everyone`;
                } else {
                    guild.setRole(type, role.id);
                    guildObjectString = `<@&${role.id}>`;
                }
                break;

            case 'language':
                const locale = interaction.options.getString('language');
                guild.locale = locale;
                typeName = 'server\'s';
                guildObjectString = `\`${languages.find(l => l.value === locale).name}\``;
                break;

            case 'timezone':
                const timezone = interaction.options.getString('timezone');
                guild.timezone = timezone;
                typeName = 'server\'s';
                guildObjectString = `\`${timezones.find(t => t.value === timezone).name}\``;
                break;
        }

        const response = await guild.updateAll();
        if (!response) return m.editReply(`**An error occured setting your ${typeName} ${subCommandName}.** Please try again. Reach out to \`F0ne#1933\` if the problem persists.`);
        else return m.editReply(`**Success!** The ${typeName} ${subCommandName} is now set to ${guildObjectString}.`);
    },
    messageComponentExecute: async (interaction: MessageComponentInteraction, args: string[]) => {

    }
}
