import { ColorResolvable, CommandInteraction, GuildMember, MessageComponentInteraction, MessageEmbed, TextChannel } from "discord.js";
import { getAverageColor } from "fast-average-color-node";
import { getFullDate, Messenger } from "../messaging";
import { StartggAPI } from "../startgg/api";
import { Tournament } from "../startgg/genql";
import { GuildManager, TournaBotGuild } from "../types/guild";
require('dotenv').config();

export default {
    name: 'tournament',
    adminRequired: true,
    canRunInDMs: false,
    defer: true,
    commandExecute: async (interaction: CommandInteraction, m: Messenger) => {
        const guild = await GuildManager.get(interaction.guildId);
        m.setLocale(guild.locale);
        if (!(interaction.member as GuildMember).permissions.has('ADMINISTRATOR')) return m.editReply('**You do not have the permissions to run this command.**');

        const subCommandName = interaction.options.getSubcommand();
        switch (subCommandName) {
            case 'set':
                let url = interaction.options.getString('url');
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
                if (!response) return m.editReply(`**An error occured setting your active tournament.** Please try again. Reach out to \`F0ne#1933\` if the problem persists.`);
                else return m.editReply(`**Success!** The active tournament is now set to [https://start.gg/tournament/${slug}](https://start.gg/tournament/${slug}).`); // replace with tournament name

            case 'announce':
                return announce(guild, interaction);
        }
    },
    messageComponentExecute: async (interaction: MessageComponentInteraction, args: string[]) => {

    }
}

const announce = async (guild: TournaBotGuild, interaction: CommandInteraction) => {
    const m = new Messenger(guild.locale, interaction);

    if (!guild.activeTournament.length) return m.editReply('**There is no active tournament set.** You can set an active tournament using \`/set tournament\`.');
    const channel = await guild.getDiscordChannel('announcements');
    if (!channel) return m.editReply('**There is no announcement channel set.** You can set the announcement channel using `/set channel`.');

    const data = await StartggAPI.getTournament(guild.activeTournament);
    if (!data) return m.editReply('**There was an issue contacting start.gg, please try again.** Reach out to `F0ne#1933` if the problem persist.');

    const tournament: Tournament = data.tournament;

    const images = ['', ''];
    for (const image of tournament.images) {
        if (image.height === image.width) images[0] = image.url;
        else images[1] = image.url;
    }

    const color = await getAverageColor(images[0]).catch(err => console.error('No Thumbnail', err));
    const hex = color ? color.hex : `#${process.env.EMBED_COLOR}`;

    const fields = await Promise.all(tournament.events.map(async (event, index) => {
        const fullDate = getFullDate(new Date(event.startAt * 1000), guild.timezone);

        let checkInString = '';
        if (event.checkInEnabled) {
            const openTime = new Date((event.startAt - event.checkInBuffer - event.checkInDuration) * 1000).toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short',
                timeZone: guild.timezone
            });
            const closeTime = new Date((event.startAt - event.checkInBuffer) * 1000).toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short',
                timeZone: guild.timezone
            });
            checkInString = `Check-in opens at \`${openTime}\` and closes at \`${closeTime}\`.`;
        }

        return {
            name: event.name,
            value: await m.translate(`Starts on \`${fullDate}\`. ${checkInString}`),
            inline: true
        };
    }));

    fields.splice(0, 0, {
        name: await m.translate('Tournament Info'),
        value: await m.translate(`Registration closes on \`${getFullDate(new Date(tournament.registrationClosesAt * 1000), guild.timezone)}\`.\n\n__**Events:**__`),
        inline: false
    });

    const embed = new MessageEmbed()
        .setTitle(tournament.name)
        .setURL(`https://start.gg/tournament/${guild.activeTournament}`)
        // need to add startAt for tournament
        .setDescription(await m.translate(`${tournament.isOnline ? 'Online' : 'In-Person'} Tournament`))
        .addFields(fields)
        .setColor(hex as ColorResolvable)
        .setThumbnail(images[0])
        .setImage(images[1])
        // .setFooter('TournaBot', client.user.avatarURL({ format: 'png' }))
        .setTimestamp();

    const messageArg = interaction.options.getString('message');
    const roleId = guild.getRole('announcements')?.id;
    const announceMessage = messageArg?.length ? messageArg : `${roleId ? `<@&${roleId}>` : '@everyone'}, ${await m.translate(`the registration for **${tournament.name}** is open!`)}`;
    await (channel as TextChannel).send({ content: announceMessage, embeds: [embed] });

    return m.editReply(`**Success!** Announced **${tournament.name}** in <#${channel.id}>.`);
}
