import { Channel, Guild } from "discord.js";
import { Guilds } from "../../database/models/guilds";
import { cache, client } from "../main";
import { DataEntry } from "./global.types";

export namespace GuildManager {
    export const get = async (guildId: string) => {
        return await getCache(guildId) || await getDatabase(guildId);
    }

    const getCache = async (guildId: string) => {
        const data = JSON.parse(await cache.get(`guild:${guildId}`)
            .catch(err => console.error('Retrieve Cache Guild', err)) || null);
        return data ? new TournaBotGuild(data) : null;
    }

    const getDatabase = async (guildId: string) => {
        const data = await Guilds.findOne({ guildId: guildId })
            .catch(err => console.error('Retrieve Database Guild', err));
        if (data) {
            const guild = new TournaBotGuild(data);
            await guild.updateCache();
            return guild;
        } else return await create({
            guildId: guildId
        } as TournaBotGuildData);
    }

    export const create = async (data: TournaBotGuildData) => {
        const guild = new TournaBotGuild(data);
        await guild.updateAll();
        return guild;
    }

    export const remove = async (guildId: string) => {
        await cache.del(`matchmaking:${guildId}`)
            .catch(err => console.error('Delete Cache Guild', err));
        return await Guilds.deleteOne({ guildId: guildId })
            .catch(err => console.error('Delete Database Guild', err));
    }
}

export interface TournaBotGuildData extends DataEntry {
    guildId: string;
    locale: string;
    timezone: string;
    activeTournament: string;
    channels: TournaBotDiscordData[];
    roles: TournaBotDiscordData[];
    allowlist: string[];
}

export interface TournaBotDiscordData {
    type: string;
    id: string;
}

export class TournaBotGuild implements TournaBotGuildData {
    guildId: string;
    locale: string;
    timezone: string;
    activeTournament: string;
    channels: TournaBotDiscordData[];
    roles: TournaBotDiscordData[];
    allowlist: string[];

    constructor(data: TournaBotGuildData) {
        this.guildId = data.guildId;
        this.locale = data.locale || 'en';
        this.timezone = data.timezone || 'America/Los_Angeles';
        this.activeTournament = data.activeTournament || '';
        this.channels = data.channels || [];
        this.roles = data.roles || [];
        this.allowlist = data.allowlist || [];
    }

    getChannel(type: string) {
        return this.channels.find(c => c.type === type);
    }

    getRole(type: string) {
        return this.roles.find(r => r.type === type);
    }

    async getDiscordGuild(): Promise<Guild> {
        return client.guilds.cache.get(this.guildId) || await client.guilds.fetch(this.guildId).catch(err => null);
    }

    async getDiscordChannel(type: string, discordGuild?: Guild): Promise<any> {
        const guild = (discordGuild || await this.getDiscordGuild());
        const channelId = this.getChannel(type)?.id;
        if (!channelId) return null;
        return guild.channels.cache.get(channelId) || await guild.channels.fetch(channelId).catch(err => null);
    }

    setChannel(type: string, channelId: string) {
        const channel = this.getChannel(type);
        if (channel) channel.id = channelId;
        else this.channels.push({
            type: type,
            id: channelId
        });
    }

    setRole(type: string, roleId: string) {
        const role = this.getRole(type);
        if (role) role.id = roleId;
        else this.roles.push({
            type: type,
            id: roleId
        });
    }

    removeRole(type: string) {
        const role = this.getRole(type);
        const index = this.roles.indexOf(role);
        if (index !== -1) this.roles.splice(index, 1);
        return role;
    }

    async updateAll() {
        await this.updateCache();
        return await this.updateDatabase();
    }

    async updateCache() {
        return await cache.set(`guild:${this.guildId}`, JSON.stringify(this))
            .catch(err => console.error('Set Cache Guild', err));
    }

    async updateDatabase() {
        return await Guilds.updateOne({ guildId: this.guildId }, this, { upsert: true })
            .catch(err => console.error('Set Database Guild', err));
    }

}
