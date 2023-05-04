import { ColorResolvable, EmbedBuilder } from "discord.js";
import { getAverageColor } from "fast-average-color-node";
import { getFullDate, Messenger } from "../messaging";
import { StartggAPI } from "../startgg/api";
import { Tournament } from "../startgg/genql";
import { TournaBotGuild } from "./guild.types";

export namespace Tournaments {
    export const getEmbed = async (tournament: Tournament, m: Messenger, timezone: string = 'America/Los_Angeles') => {
        const images = ['', ''];
        for (const image of tournament.images) {
            if (image.height === image.width) images[0] = image.url;
            else images[1] = image.url;
        }

        const color = await getAverageColor(images[0]).catch(err => null);
        const hex = color ? color.hex : `#${process.env.EMBED_COLOR}`;

        const fields = await Promise.all(tournament.events.map(async (event, index) => {
            const fullDate = getFullDate(new Date(event.startAt * 1000), timezone);

            let checkInString = '';
            if (event.checkInEnabled) {
                const openTime = new Date((event.startAt - event.checkInBuffer - event.checkInDuration) * 1000).toLocaleTimeString('en-US', {
                    hour12: true,
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZoneName: 'short',
                    timeZone: timezone
                });
                const closeTime = new Date((event.startAt - event.checkInBuffer) * 1000).toLocaleTimeString('en-US', {
                    hour12: true,
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZoneName: 'short',
                    timeZone: timezone
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
            value: await m.translate(`Registration closes on \`${getFullDate(new Date(tournament.registrationClosesAt * 1000), timezone)}\`.`),
            inline: false
        });

        if (tournament.streams) {
            // add streams here
            // fields.push({
            //     name: await m.translate('Streams'),
            //     value: 
            // });
        }

        const embed = new EmbedBuilder()
            .setTitle(tournament.name)
            .setURL(`https://start.gg/tournament/${tournament.slug.replace('tournament/', '')}`)
            // need to add startAt for tournament
            .setDescription(await m.translate(`${tournament.isOnline ? 'Online' : 'In-Person'} Tournament`))
            .addFields(fields)
            .setColor(hex as ColorResolvable)
            .setTimestamp();

        embed.setThumbnail(images[0].length ? images[0] : 'https://images.smash.gg/images/tournament/437163/image-d13fa7aa2d6d4f8efd0f78937a1405f3.png');
        embed.setImage(images[1].length ? images[1] : 'https://ssb.wiki.gallery/images/thumb/8/8a/Startgg_logo.png/1200px-Startgg_logo.png');
        // .setFooter('TournaBot', client.user.avatarURL({ format: 'png' }))

        return embed;
    }
}