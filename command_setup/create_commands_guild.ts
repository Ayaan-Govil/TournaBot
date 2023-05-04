import { REST } from '@discordjs/rest';
import Discord from 'discord.js';
import { commands } from "./commands";
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const client = new Discord.Client({ intents: ['Guilds'] });
const TOKEN = process.env.DEV_DISCORD_BOT_TOKEN;

client.once('ready', () => {
    const rest = new REST({ version: '9' }).setToken(TOKEN);

    rest.put(Routes.applicationGuildCommands(client.user.id, process.env.DEV_GUILD_ID), { body: commands })
        .then(() => console.log(`Successfully created ${commands.length} commands in the development guild.`))
        .then(() => process.exit(0))
        .catch(console.error);
});

client.login(TOKEN);
