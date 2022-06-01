import { Queues } from "../../../database/models/queues";
import { cache } from "../../main";
import { DataEntry } from "../global";
import { GameShorthand } from "./match";

export namespace QueueManager {
    export const get = async (guildId: string, channelId: string) => {
        return await getCache(guildId, channelId) || await getDatabase(channelId);
    }

    const getCache = async (guildId: string, channelId: string) => {
        const data = JSON.parse(await cache.hGet(`queues:${guildId}`, channelId)
            .catch(err => console.error('Retrieve Cache Queue', err)) || null);
        return data ? new MatchmakingQueue(data) : null;
    }

    const getDatabase = async (channelId: string) => {
        const data = await Queues.findOne({ channelId: channelId })
            .catch(err => console.error('Retrieve Database Queue', err));
        if (data) {
            const queue = new MatchmakingQueue(data);
            await queue.updateCache();
            return queue;
        } else return null;
    }

    export const create = async (data: MatchmakingQueueData) => {
        const queue = new MatchmakingQueue(data);
        await queue.updateAll();
        return queue;
    }

    export const remove = async (guildId: string, channelId: string) => {
        await cache.hDel(`queues:${guildId}`, channelId)
            .catch(err => console.error('Delete Cache Queue', err));
        return await Queues.deleteOne({ guildId: guildId, channelId: channelId })
            .catch(err => console.error('Delete Database Queue', err));
    }

    export const removeAll = async (guildId: string) => {
        // need to implement
    }

    export const refresh = async (queue: MatchmakingQueue) => {
        // need to implement
    }

    export const refreshAll = async (guildId: string) => {
        // need to implement
    }
}

export interface MatchmakingQueueData extends DataEntry {
    guildId: string;
    channelId: string;
    name: string;
    game: GameShorthand;
    playersInQueue: string[];
}

export class MatchmakingQueue implements MatchmakingQueueData {
    guildId: string;
    channelId: string;
    name: string;
    game: GameShorthand;
    playersInQueue: string[];

    constructor(data: MatchmakingQueueData) {
        this.guildId = data.guildId;
        this.channelId = data.channelId;
        this.name = data.name;
        this.game = data.game;
        this.playersInQueue = data.playersInQueue || [];
    }

    async updateAll() {
        await this.updateCache();
        return await this.updateDatabase();
    }

    async updateCache() {
        return await cache.hSet(`queues:${this.guildId}`, this.channelId, JSON.stringify(this))
            .catch(err => console.error('Set Cache Queue', err));
    }

    async updateDatabase() {
        return await Queues.updateOne({ guildId: this.guildId, channelId: this.channelId }, this, { upsert: true })
            .catch(err => console.error('Set Database Queue', err));
    }
}
