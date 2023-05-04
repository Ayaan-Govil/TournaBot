import { ColorResolvable, CommandInteraction, EmbedBuilder, GuildMember, MessageComponentInteraction, TextChannel } from "discord.js";
import { getAverageColor } from "fast-average-color-node";
import { getFullDate, Messenger } from "../messaging";
import { StartggAPI } from "../startgg/api";
import { Tournament } from "../startgg/genql";
import { GuildManager, TournaBotGuild } from "../types/guild.types";
import { Tournaments } from "../types/tournament.types";
require('dotenv').config();

export default {
    name: 'tournament',
    adminRequired: true,
    canRunInDMs: false,
    defer: true,
    commandExecute: async (interaction: CommandInteraction, m: Messenger) => {
        const guild = await GuildManager.get(interaction.guildId);
        m.setLocale(guild.locale);

        const subCommandName = interaction.options.data[0].name;
        switch (subCommandName) {
            case 'set':
                let url = interaction.options.get('url').value as string;
                // activeTournament = activeTournament.replace('https://start.gg/', '');
                if (url.startsWith('start.gg/') || url.startsWith('smash.gg/')) url = 'https://' + url;

                const fetchResponse = await fetch(url).catch((err: any) => console.error(`${interaction.user.username} provided invalid URL: ${url}`));
                if (!fetchResponse) return m.editReply('**There was an error fetching the tournament.** Please try again. Reach out to `F0ne#1933` if the problem persists.');

                url = fetchResponse.url;
                if (!url.startsWith('https://www.start.gg/tournament/')) return m.editReply('**Invalid URL.** Must be a start.gg tournament URL (non-admin).');

                const slug = url.replace('https://www.start.gg/tournament/', '').split('/')[0];
                guild.activeTournament = slug;


                // add step here that does a small query to check if the tournament exists


                const response = await guild.updateAll();
                if (!response) return m.editReply(`**An error occured setting the active tournament.** Please try again. Reach out to \`F0ne#1933\` if the problem persists.`);
                else return m.editReply(`**Success!** The active tournament is now set to https://start.gg/tournament/${slug}.`); // replace with tournament name

            case 'announce':
                if (!guild.activeTournament.length) return m.editReply('**There is no active tournament set.** You can set an active tournament using \`/tournament set\`.');
                const channel = await guild.getDiscordChannel('announcements');
                if (!channel) return m.editReply('**There is no announcement channel set.** You can set the announcement channel using `/set channel`.');

                const data = await StartggAPI.getTournament(guild.activeTournament);
                if (!data || !data?.tournament) return m.editReply('**There was an error fetching the tournament.** Please try again. Reach out to `F0ne#1933` if the problem persists.');
                const tournament: Tournament = data.tournament;

                const embed = await Tournaments.getEmbed(tournament, m, guild.timezone);

                const messageArg = interaction.options.data[0].options[0]?.value as string;
                const roleId = guild.getRole('announcements')?.id;
                const announceMessage = messageArg?.length ? messageArg : `${roleId ? `<@&${roleId}>` : '@everyone'}, ${await m.translate(`the registration for **${embed.toJSON().title}** is open!`)}`;
                await (channel as TextChannel).send({ content: announceMessage, embeds: [embed] });

                return m.editReply(`**Success!** Announced **${embed.toJSON().title}** in <#${channel.id}>.`);
        }
    },
    messageComponentExecute: async (interaction: MessageComponentInteraction, args: string[]) => {

    }
}
