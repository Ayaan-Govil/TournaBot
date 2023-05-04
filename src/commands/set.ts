import { ChannelType, CommandInteraction, DMChannel, GuildMember, MessageComponentInteraction } from "discord.js";
import { languages, timezones } from "../../command_setup/localization_objects";
import { Messenger } from "../messaging";
import { GuildManager } from "../types/guild.types";
const fetch = require('node-fetch');

export default {
    name: 'set',
    adminRequired: true,
    canRunInDMs: false,
    defer: true,
    commandExecute: async (interaction: CommandInteraction, m: Messenger) => {
        const type = interaction.options.get('feature')?.value as string || 'active';
        let typeName = type.replace('_', ' ');

        const guild = await GuildManager.get(interaction.guildId);
        m.setLocale(guild.locale);

        let guildObjectString: string;

        const subCommandName = interaction.options.data[0].name;
        switch (subCommandName) {
            case 'channel':
                const channel = interaction.options.get('channel').channel;
                if (channel.type !== ChannelType.GuildText) return m.editReply('**Invalid channel.** Must be a text channel.');

                guild.setChannel(type, channel.id);
                guildObjectString = `<#${channel.id}>`;
                break;

            case 'role':
                const role = interaction.options.get('role').role;
                if (role.id === interaction.guildId) {
                    guild.removeRole(type);
                    guildObjectString = `@everyone`;
                } else {
                    guild.setRole(type, role.id);
                    guildObjectString = `<@&${role.id}>`;
                }
                break;

            case 'language':
                const locale = interaction.options.get('language').value as string;
                guild.locale = locale;
                typeName = 'server\'s';
                guildObjectString = `\`${languages.find(l => l.value === locale).name}\``;
                break;

            case 'timezone':
                const timezone = interaction.options.get('timezone').value as string;
                guild.timezone = timezone;
                typeName = 'server\'s';
                guildObjectString = `\`${timezones.find(t => t.value === timezone).name}\``;
                break;

            case 'tournament':
                let url = interaction.options.get('url').value as string;
                // activeTournament = activeTournament.replace('https://start.gg/', '');
                if (url.startsWith('start.gg/') || url.startsWith('smash.gg/')) url = 'https://' + url;

                const fetchResponse = await fetch(url).catch((err: any) => console.error(`${interaction.user.username} provided invalid URL: ${url}`));
                if (!fetchResponse) return m.editReply('**There was an error fetching the tournament.** Please try again. Reach out to `F0ne#1933` if the problem persists.');

                url = fetchResponse.url;
                if (!url.startsWith('https://www.start.gg/tournament/')) return m.editReply('**Invalid URL.** Must be a start.gg tournament URL (non-admin).');

                const slug = url.replace('https://www.start.gg/tournament/', '').split('/')[0];
                guild.activeTournament = slug;

                guildObjectString = `[https://start.gg/tournament/${slug}](https://start.gg/tournament/${slug})`;
                break;
        }

        const response = await guild.updateAll();
        if (!response) return m.editReply(`**An error occured setting the ${typeName} ${subCommandName}.** Please try again. Reach out to \`F0ne#1933\` if the problem persists.`);
        else return m.editReply(`**Success!** The ${typeName} ${subCommandName} is now set to ${guildObjectString}.`);
    },
    messageComponentExecute: async (interaction: MessageComponentInteraction, args: string[]) => {

    }
}
