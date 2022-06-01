import Discord, { GuildMember } from 'discord.js';
import fs from 'fs';
import { createClient } from 'redis';
import { database } from '../database/database';
import { Messenger } from './messaging';
import { Command, TournaBotClient } from './types/client';
import { GuildManager } from './types/guild';
require('dotenv').config();


export const client = new TournaBotClient({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_WEBHOOKS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_PRESENCES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS'] });
export const guilds: any = null;
export const cache = createClient();

let ready = false;

client.commands = new Discord.Collection<string, Command>();
const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.default.name, command.default);
}

client.once('ready', async () => {
    await database
        .then(() => console.log('Connected to MongoDB!'))
        .catch(err => console.error('MongoDB Connection', err));

    await cache.connect()
        .then(() => console.log('Connected to Redis!'))
        .catch(err => console.error('Redis Connection', err));

    // await guilds.syncAll().then(() => ready = true).catch(err => console.error(err));
    client.user.setActivity('for /help', { type: 'WATCHING' });
    console.log(`# of users: ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`);

    // Loop for tracking and setting tournament reminders
    // Comment this function out for development unrelated to it
    // client.startReminderLoop();

    ready = true;
});

client.on('interactionCreate', async interaction => {
    if (!ready) return;
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        const m = new Messenger('en', interaction);

        if (command.defer) await interaction.deferReply({ ephemeral: true });
        if (!command.canRunInDMs && !interaction.inGuild()) return m.editReply('**This command cannot be used in DMs.**');
        if (command.adminRequired && !(await hasPerms(interaction.member as GuildMember))) return m.editReply('**You do not have the permissions to run that command.**');

        // console.log(interaction.member)

        command.commandExecute(interaction, m);
    } else if (interaction.isMessageComponent()) {
        const args = interaction.customId.split('_');
        const command = client.commands.get(args.shift());
        const m = new Messenger('en', interaction);
        command.messageComponentExecute(interaction, args, m);
    }
});

const hasPerms = async (member: GuildMember): Promise<boolean> => {
    if (!member) return true;
    if (member.permissions.has('ADMINISTRATOR')) return true;
    // const guild = await guilds.getGuild(member.guild.id);
    // for (const roleId of guild.allowlist) {
    //     if (member.roles.cache.find(r => r.id === roleId)) return true;
    // }
    return false;
}

const TOKEN = process.env.DEV_MODE ? process.env.DEV_DISCORD_BOT_TOKEN : process.env.DISCORD_BOT_TOKEN;
client.login(TOKEN);
