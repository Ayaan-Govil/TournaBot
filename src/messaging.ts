import { ColorResolvable, CommandInteraction, EmbedBuilder, MessageComponentInteraction, TextChannel } from "discord.js";
import ShortUniqueId from "short-unique-id";
import { client } from "./main";
import { Indexable } from "./types/global.types";
import fetch from 'node-fetch';
require('dotenv').config();

export class Messenger {
    private locale: string;
    private interaction: CommandInteraction | MessageComponentInteraction;

    constructor(locale: string, interaction: CommandInteraction | MessageComponentInteraction = null) {
        this.setLocale(locale);
        this.setInteraction(interaction);
    }

    async setLocale(locale: string) {
        this.locale = locale;
    }

    async setInteraction(interaction: CommandInteraction | MessageComponentInteraction) {
        this.interaction = interaction;
    }

    async editReply(content: string) {
        content = await this.translate(content);
        await this.interaction.editReply({ embeds: [this.getEmbed(content)] })
            .catch(err => console.error('Messenger Edit Reply Interaction Null', err));
    }

    async reply(content: string, ephemeral: boolean) {
        content = await this.translate(content);
        await this.interaction.reply({ embeds: [this.getEmbed(content)], ephemeral: ephemeral })
            .catch(err => console.error('Messenger Reply Interaction Null', err));
    }

    async sendMessage(channel: TextChannel, content: string) {
        content = await this.translate(content);
        await channel.send({ embeds: [this.getEmbed(content)] })
            .catch(err => console.error('Messenger Send Message', err));
    }

    getEmbed(content: string) {
        return new EmbedBuilder()
            .setDescription(content)
            .setColor(`#${process.env.EMBED_COLOR}`);
    }

    async translate(message: string, forceTranslate: boolean = false) {
        if (this.locale === 'en' && !forceTranslate) return message;
        else return await fetch(`https://api.mymemory.translated.net/get?q=${this.fixedEncodeURIComponent(message)}&langpair=en|${this.locale}&de=${new ShortUniqueId({ length: 4 })()}@gmail.com`)
            .then((r: any) => r.json())
            .then((data: any) => {
                const translation: string = data?.responseData?.translatedText;
                let translatedMessage: string = translation === null ? message : translation !== translation.toUpperCase() ? translation : message;

                const encodedValues = [
                    {
                        encoded: '&gt;',
                        decoded: '>'
                    },
                    {
                        encoded: '&lt;# ',
                        decoded: '<#'
                    },
                    {
                        encoded: '&lt;',
                        decoded: '<'
                    },
                    {
                        encoded: '&#10;',
                        decoded: '\n'
                    },
                    {
                        encoded: '&#39;',
                        decoded: '\''
                    }
                ]

                for (const encodedValue of encodedValues) {
                    translatedMessage = replaceAll(translatedMessage, encodedValue.encoded, encodedValue.decoded);
                }

                return translatedMessage;
            }).catch(err => '');
    }

    private fixedEncodeURIComponent(str: string) {
        return encodeURIComponent(str).replace(/[!'()*]/g, (c) => {
            return '%' + c.charCodeAt(0).toString(16);
        });
    }
}

export const capitalize = (str: string) => {
    const strSplit = str.split('-');
    let tempStr = '';

    for (const word of strSplit) {
        tempStr += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
    }

    return tempStr.substring(0, tempStr.length - 1);;
}

export const replaceAll = (str: string, find: string, replace: string) => {
    return str.replace(new RegExp(find, 'g'), replace);
}

export const getFullDate = (date: Date, timezone: string) => {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
        timeZone: timezone
    });
}
