import Discord from 'discord.js';
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const client = new Discord.Client({ intents: ['GUILDS'] });
const TOKEN = process.env.DISCORD_BOT_TOKEN;

client.once('ready', () => {
    const rest = new REST({ version: '9' }).setToken(TOKEN);

    rest.get(Routes.applicationCommands(client.user.id))
        .then((data: any) => {
            const promises = [];
            for (const command of data) {
                const deleteUrl = `${Routes.applicationCommands(client.user.id)}/${command.id}`;
                promises.push(rest.delete(deleteUrl));
            }
            return Promise.all(promises);
        })
        .then(() => console.log('Successfully deleted all commands globally.'))
        .then(() => process.exit(0))
        .catch(console.error);
});

client.login(TOKEN);
