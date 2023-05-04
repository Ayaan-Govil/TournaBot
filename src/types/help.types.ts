import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, SelectMenuBuilder } from "discord.js";
import { client } from "../main";
import { capitalize } from "../messaging";
import { Indexable } from "./global.types";
require('dotenv').config();

export namespace HelpStructure {
    const types: TypeStructure = {
        user: {
            features: {
                accounts: {
                    longDescription: 'TournaBot handles account linking between start.gg and Discord manually. Several commands are account-based, such as \`/support\`.',
                    shortDescription: 'TournaBot handles account linking manually.',
                    commands: [
                        {
                            command: 'account link <start.gg profile URL>',
                            description: 'Links your start.gg and Discord accounts. Enables use of commands such as `/support`. Others cannot see you use this command.',
                            image: ''
                        },
                        {
                            command: 'account unlink',
                            description: 'Unlinks your start.gg and Discord accounts. Others cannot see you use this command.',
                            image: ''
                        },
                        {
                            command: 'account status <user?>',
                            description: 'Checks if a user\'s start.gg and Discord accounts are linked. Omitting the `user` argument will check if your own start.gg and Discord accounts are linked. Others cannot see you use this command.',
                            image: ''
                        }
                    ]
                },
                support: {
                    longDescription: 'A support ticket system driven by artificial intelligence that helps you resolve any issue quickly and efficiently.',
                    shortDescription: 'Support ticket system driven by artificial intelligence.',
                    commands: [
                        {
                            command: 'support',
                            description: 'Creates a support ticket for you to address an issue related to the tournament. You can talk with TournaBot to identify your issue or select your issue from the select menu. Others cannot see you use this command.',
                            image: ''
                        }
                    ]
                }
            }
        },
        admin: {
            features: {
                tournament: {
                    longDescription: 'Set an active tournament and announce it.',
                    shortDescription: 'Set an active tournament and announce it.',
                    commands: [
                        {
                            command: 'tournament set <URL>',
                            description: 'Sets the active tournament for the server. Features such as match reporting/calling and support tickets require this command. Others cannot see you use this command.',
                            image: ''
                        },
                        {
                            command: 'tournament announce <message?>',
                            description: 'Announces a tournament with tournament and event info. If the `message` argument is omitted, TournaBot will automatically generate a message. You can set the role to ping in the automatic message using `/set role`. Others cannot see you use this command.',
                            image: ''
                        }
                    ]
                },
                support: {
                    longDescription: 'A support ticket system driven by artificial intelligence that helps you resolve any issue quickly and efficiently.',
                    shortDescription: 'Support ticket system driven by artificial intelligence.',
                    commands: [
                        {
                            command: 'support',
                            description: 'You must set a tournament using `/tournament set` to use this command. Creates a support ticket. Generates a category and dashboard for tickets when initially ran. TournaBot will identify the user\'s issue and set before sending a request for an admin in the dashboard. Others cannot see you use this command.',
                            image: ''
                        }
                    ]
                },
                match: {
                    longDescription: 'Ping users for their matches as they are called and report match outcomes as they finish.',
                    shortDescription: 'Ping users for called matches and report match outcomes.',
                    commands: [
                        {
                            command: 'match calling <start/stop>',
                            description: 'You must set a channel and tournament using `/set channel` and `/tournament set` to use this command. Pings users for their matches as they are called. Gives round information and links to the set. Needs a Discord connection via `/account link` or start.gg to work effectively. Match calling can be manually stopped using `stop`, but will automatically stop after 6 hours or when the tournament ends according to the tournament details. Others cannot see you use this command.',
                            image: ''
                        },
                        {
                            command: 'match reporting <start/stop>',
                            description: 'You must set a channel and tournament using `/set channel` and `/tournament set` to use this command. Reports match outcomes as they finish. Gives details such as the seeds, games, characters picked, and whether it was an upset or not. Needs a Discord connection via `/account link` or start.gg to work effectively. Match reporting can be manually stopped using `stop`, but will automatically stop after 6 hours or when the tournament ends according to the tournament details. Others cannot see you use this command.',
                            image: ''
                        }
                    ]
                },
                allowlist: {
                    longDescription: 'Give certain roles access to admin commands.',
                    shortDescription: 'Give certain roles access to admin commands.',
                    commands: [
                        {
                            command: 'allowlist add <role>',
                            description: 'Adds a role to the allowlist. Allows that role to use admin commands. Others cannot see you use this command.',
                            image: ''
                        },
                        {
                            command: 'allowlist remove <role>',
                            description: 'Removes a role from the allowlist. Others cannot see you use this command.',
                            image: ''
                        }
                    ]
                }
            }
        }
    }

    export const getEmbed = (type: string, pageIndex: number, feature: string = '') => {
        const embed = new EmbedBuilder().setColor(`#${process.env.EMBED_COLOR}`);
        const typeObj = (types as Indexable)[type];

        if (feature.length) {
            const featureObj = typeObj.features[feature];
            const embedObj = featureObj.commands[pageIndex];
            const commandFormatted = embedObj.command.length ? `> \`/${embedObj.command}\`\n\n` : '';

            embed.setAuthor({ name: `${capitalize(type)} Features` })
                .setTitle(capitalize(feature))
                .setDescription(`${commandFormatted}${embedObj.description}`)
                .setFooter({ text: `Page ${pageIndex + 1} of ${typeObj.features[feature].commands.length}` });
            if (embedObj.image) embed.setImage(embedObj.image);
            if (embedObj.thumbnail) embed.setThumbnail(embedObj.thumbnail);
        } else {
            const numFeatures = Object.keys(typeObj.features).length;
            const numFeaturesPerPage = 5;

            embed.setTitle(`${capitalize(type)} Features`)
                .setFooter({ text: `Page ${pageIndex + 1} of ${Math.floor(numFeatures / numFeaturesPerPage) + 1}` });

            let embedDescription = '';

            let countIndex = 0;
            const min = pageIndex * numFeaturesPerPage;
            const max = min + numFeaturesPerPage;
            for (const feature in typeObj.features) {
                if (countIndex >= min && countIndex < max) {
                    const featureObj = typeObj.features[feature];
                    embedDescription += `:small_orange_diamond:**${capitalize(feature)}**\n\n${featureObj.longDescription}\n\n`;
                }
                countIndex++;
            }

            const otherType = type === 'user' ? 'admin' : 'user';
            embedDescription += `__**You can use the select menu below to switch to ${otherType} features.**__`;

            embed.setDescription(embedDescription);
        }

        return embed;
    }

    export const getComponents = (type: string, pageIndex: number, feature: string = '') => {
        const typeObj = (types as Indexable)[type];
        const maxPageIndex = feature.length ? typeObj.features[feature].commands.length - 1 : Math.floor(Object.keys(typeObj.features).length / 5);

        const actionRows: ActionRowBuilder<ButtonBuilder | SelectMenuBuilder>[] = [];
        const actionRow = generateArrowButtons(type, pageIndex, maxPageIndex, feature);
        actionRows.push(actionRow);

        if (!feature.length) {
            const selectMenu = generateSelectMenu(type);
            actionRows.push(new ActionRowBuilder<SelectMenuBuilder>().addComponents(selectMenu));
        }

        return actionRows;
    }

    export const generateArrowButtons = (type: string, pageIndex: number, maxPageIndex: number, feature: string = '') => {
        return new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId(`help_${type}_${pageIndex - 1}_${feature}`)
                .setStyle(ButtonStyle.Primary)
                .setLabel('⬅️')
                .setDisabled(pageIndex === 0),
            new ButtonBuilder()
                .setCustomId(`help_${type}_${pageIndex + 1}_${feature}`)
                .setStyle(ButtonStyle.Primary)
                .setLabel('➡️')
                .setDisabled(pageIndex + 1 > maxPageIndex),
            new ButtonBuilder()
                .setCustomId(`help_${type}_0`)
                .setStyle(ButtonStyle.Danger)
                .setLabel('Back')
                .setDisabled(feature.length === 0)
        );
    }

    export const generateSelectMenu = (type: string) => {
        const typeObj = (types as Indexable)[type];

        const selectMenu = new SelectMenuBuilder()
            .setCustomId(`help_${type}_select`)
            .setPlaceholder('Select a feature...');

        const otherType = type === 'user' ? 'admin' : 'user';
        selectMenu.addOptions({
            label: `See ${capitalize(otherType)} Features ↗️`,
            value: `otherType_${otherType}`
        })

        for (const feature in typeObj.features) {
            const featureObj = typeObj.features[feature];
            selectMenu.addOptions({
                label: capitalize(feature),
                description: featureObj.shortDescription,
                value: `${feature}_0`
            });
        }

        return selectMenu;
    }
}

interface TypeStructure {
    user: {
        features: {
            [feature: string]: FeatureStructure;
        }
    }
    admin: {
        features: {
            [feature: string]: FeatureStructure;
        }
    }
}

interface FeatureStructure {
    longDescription: string;
    shortDescription: string;
    commands: CommandStructure[];
}

interface CommandStructure {
    command: string;
    description: string;
    image: string;
    thumbnail?: string;
}
