import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { languages, timezones } from "./localization_objects";

const commandObjects: CommandObject[] = [
    {
        name: 'account',
        description: 'Link, unlink, or check the status of your start.gg and Discord account.',
        subcommands: [
            {
                name: 'link',
                description: 'Link your start.gg and Discord accounts. Other users cannot see you use this command.',
                options: [
                    {
                        name: 'profile',
                        description: 'Your start.gg profile URL.',
                        optionType: 'STRING',
                        required: true,
                    }
                ]
            },
            {
                name: 'unlink',
                description: 'Unlink your start.gg and Discord accounts. Other users cannot see you use this command.',
            },
            {
                name: 'status',
                description: 'Check if a user\'s start.gg and Discord accounts are linked. Other\'s cannot see you use this command.',
                options: [
                    {
                        name: 'user',
                        description: 'The user you are checking.',
                        optionType: 'USER',
                        required: false,
                    }
                ]
            },
            // {
            //     name: 'profile',
            //     description: 'Check a user\'s profile and recent placements.',
            //     options: [
            //         {
            //             name: 'user',
            //             description: 'The user you are checking. If omitted, gets your own profile.',
            //             optionType: 'USER',
            //             required: false,
            //         },
            //         {
            //             name: 'hide',
            //             description: 'Choose to hide the message from others. By default, this is false.',
            //             optionType: 'BOOLEAN',
            //             required: false,
            //         }
            //     ]
            // }
        ]
    },
    {
        name: 'set',
        description: 'Set channel or role for different features.',
        subcommands: [
            {
                name: 'channel',
                description: 'Set channel for announcements, match calling, and match reports',
                options: [
                    {
                        name: 'feature',
                        description: 'The feature you are setting a channel for.',
                        optionType: 'STRING',
                        required: true,
                        choices: [
                            {
                                name: 'announcements',
                                value: 'announcements'
                            },
                            {
                                name: 'match calling',
                                value: 'match_calling'
                            },
                            {
                                name: 'match reports',
                                value: 'match_reports'
                            }
                        ]
                    },
                    {
                        name: 'channel',
                        description: 'The channel you are setting.',
                        optionType: 'CHANNEL',
                        required: true,
                    }
                ]
            },
            {
                name: 'role',
                description: 'Set role for announcements.',
                options: [
                    {
                        name: 'feature',
                        description: 'The feature you are setting a role for.',
                        optionType: 'STRING',
                        required: true,
                        choices: [
                            {
                                name: 'announcements',
                                value: 'announcements'
                            }
                        ]
                    },
                    {
                        name: 'role',
                        description: 'The role you are setting.',
                        optionType: 'ROLE',
                        required: true,
                    }
                ]
            },
            {
                name: 'language',
                description: 'Set the language you would like TournaBot to respond in.',
                options: [
                    {
                        name: 'language',
                        description: 'The language you would like TournaBot to respond in.',
                        optionType: 'STRING',
                        required: true,
                        choices: languages
                    }
                ]
            },
            {
                name: 'timezone',
                description: 'Set the timezone you would like TournaBot to use.',
                options: [
                    {
                        name: 'timezone',
                        description: 'The timezone you would like TournaBot to use.',
                        optionType: 'STRING',
                        required: true,
                        choices: timezones
                    }
                ]
            }
        ]
    },
    {
        name: 'tournament',
        description: 'Commands related to tournament moderation and automation.',
        subcommands: [
            {
                name: 'set',
                description: 'Set the server\'s active tournament.',
                options: [
                    {
                        name: 'url',
                        description: 'The URL/short URL for the tournament you are setting.',
                        optionType: 'STRING',
                        required: true,
                    }
                ]
            },
            {
                name: 'announce',
                description: 'Announce the active start.gg tournament with additional info.',
                options: [
                    {
                        name: 'message',
                        description: 'Shows at the beginning of the announcement. Automatically filled if not provided.',
                        optionType: 'STRING',
                        required: false,
                    }
                ]
            }
        ]
    },
    {
        name: 'allowlist',
        description: 'Add or remove roles with access to TournaBot\'s admin commands.',
        subcommands: [
            {
                name: 'add',
                description: 'Add a role to the allowlist.',
                options: [
                    {
                        name: 'role',
                        description: 'The role you would like to add.',
                        optionType: 'ROLE',
                        required: true,
                    }
                ]
            },
            {
                name: 'remove',
                description: 'Remove a role from the allowlist.',
                options: [
                    {
                        name: 'role',
                        description: 'The role you would like to from.',
                        optionType: 'ROLE',
                        required: true,
                    }
                ]
            }
        ]
    },
    {
        name: 'match',
        description: 'Start match pinging and reporting',
        subcommands: [
            {
                name: 'calling',
                description: 'Pings player\'s a minute after check-in begins. Based on the server\'s active tournament.',
                options: [
                    {
                        name: 'action',
                        description: 'Choose whether to start or stop match calling.',
                        optionType: 'STRING',
                        required: true,
                        choices: [
                            {
                                name: 'start',
                                value: 'start'
                            },
                            {
                                name: 'stop',
                                value: 'stop'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'reporting',
                description: 'Alerts when matches complete. Based on the server\'s active tournament.',
                options: [
                    {
                        name: 'action',
                        description: 'Choose whether to start or stop match reporting.',
                        optionType: 'STRING',
                        required: true,
                        choices: [
                            {
                                name: 'start',
                                value: 'start'
                            },
                            {
                                name: 'stop',
                                value: 'stop'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'support',
        description: 'Creates a support ticket for your match. Requires that your accounts are linked.',
        subcommands: []
    },
    {
        name: 'help',
        description: 'Explains how to use TournaBot\'s features/commands.',
        subcommands: []
    },
    // {
    //     name: 'reminders',
    //     description: 'Toggle automatic tournament reminders.',
    //     subcommands: [
    //         {
    //             name: 'toggle',
    //             description: 'Toggle automatic tournament reminders.',
    //             options: [
    //                 {
    //                     name: 'toggle',
    //                     description: 'Whether you want reminders on or off.',
    //                     optionType: 'STRING',
    //                     required: true,
    //                     choices: [
    //                         {
    //                             name: 'on',
    //                             value: 'true',
    //                         },
    //                         {
    //                             name: 'off',
    //                             value: 'false',
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     name: 'matchmaking',
    //     description: 'Create, delete, or refresh a matchmaking queue.',
    //     subcommands: [
    //         {
    //             name: 'create',
    //             description: 'Create a matchmaking queue. Generates a queue channel in this category.',
    //             options: [
    //                 {
    //                     name: 'name',
    //                     description: 'The name of the queue.',
    //                     optionType: 'STRING',
    //                     required: true,
    //                 },
    //                 {
    //                     name: 'game',
    //                     description: 'The game that the queue is based on.',
    //                     optionType: 'STRING',
    //                     required: true,
    //                     choices: [
    //                         {
    //                             name: 'Super Smash Bros. Ultimate',
    //                             value: 'ssbu'
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             name: 'delete',
    //             description: 'Delete one or all queues. To delete one, run command in queue channel.',
    //         },
    //         {
    //             name: 'refresh',
    //             description: 'Refresh one or all queues. To refresh one, run command in queue channel.',
    //         },
    //         {
    //             name: 'test',
    //             description: 'Refresh one or all queues. To refresh one, run command in queue channel.',
    //         }
    //     ]
    // }
]

const assignOption = (c: SlashCommandBuilder | SlashCommandSubcommandBuilder, option: Option) => {
    switch (option.optionType) {
        case 'STRING':
            c.addStringOption((opt) => {
                opt.setName(option.name).setDescription(option.description).setRequired(option.required);
                if (!option.choices?.length) return opt;
                for (const choice of option.choices) {
                    opt.addChoices({ name: choice.name, value: choice.value as string });
                }
                return opt;
            });
            break;
        case 'INTEGER':
            c.addIntegerOption((opt) => {
                opt.setName(option.name).setDescription(option.description).setRequired(option.required);
                if (!option.choices?.length) return opt;
                for (const choice of option.choices) {
                    opt.addChoices({ name: choice.name, value: choice.value as number });
                }
                return opt;
            });
            break;
        case 'BOOLEAN':
            c.addBooleanOption((opt) => {
                opt.setName(option.name).setDescription(option.description).setRequired(option.required);
                return opt;
            });
            break;
        case 'USER':
            c.addUserOption((opt) => {
                opt.setName(option.name).setDescription(option.description).setRequired(option.required);
                return opt;
            });
            break;
        case 'CHANNEL':
            c.addChannelOption((opt) => {
                opt.setName(option.name).setDescription(option.description).setRequired(option.required);
                return opt;
            });
            break;
        case 'ROLE':
            c.addRoleOption((opt) => {
                opt.setName(option.name).setDescription(option.description).setRequired(option.required);
                return opt;
            });
            break;
    }
    return c;
}

export const commands = commandObjects.map(commandObject => {
    let command = new SlashCommandBuilder()
        .setName(commandObject.name)
        .setDescription(commandObject.description);
    // check and iterate through command options
    if (commandObject.options?.length) {
        for (const option of commandObject.options) {
            command = assignOption(command, option) as SlashCommandBuilder;
        }
    }
    if (!commandObject.subcommands?.length) return command.toJSON();
    for (const subcommand of commandObject.subcommands) {
        command.addSubcommand((sc) => {
            sc.setName(subcommand.name).setDescription(subcommand.description);
            if (!subcommand.options?.length) return sc;
            for (const option of subcommand.options) {
                sc = assignOption(sc, option) as SlashCommandSubcommandBuilder;
            }
            return sc;
        });
    }

    return command.toJSON();
});

interface CommandObject {
    name: string;
    description: string;
    subcommands?: Subcommand[];
    options?: Option[];
}

interface Subcommand {
    name: string;
    description: string;
    options?: Option[];
}

interface Option {
    name: string;
    description: string;
    optionType: OptionType;
    required: boolean;
    choices?: Choice[];
}

type OptionType = 'STRING' | 'INTEGER' | 'BOOLEAN' | 'USER' | 'CHANNEL' | 'ROLE';

interface Choice {
    name: string;
    value: string | number;
}
