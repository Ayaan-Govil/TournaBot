import { REST } from '@discordjs/rest';
import Discord from 'discord.js';
import { commands } from "./commands";
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const client = new Discord.Client({ intents: ['GUILDS'] });
const TOKEN = process.env.DISCORD_BOT_TOKEN;

client.once('ready', () => {
    const rest = new REST({ version: '9' }).setToken(TOKEN);

    rest.put(Routes.applicationCommands(client.user.id), { body: commands })
        .then(() => console.log(`Successfully created ${commands.length} commands globally.`))
        .then(() => process.exit(0))
        .catch(console.error);
});

client.login(TOKEN);
