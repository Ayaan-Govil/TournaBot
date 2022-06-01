import { Players } from "../../../database/models/players";
import { DataEntry } from "../global";

export namespace PlayerManager {
    export const get = async (discordId: string, queueId: string) => {
        const data = await Players.findOne({ discordId: discordId, queueId: queueId })
            .catch(err => console.error('Retrieve Database Player', err));
        return data ? new MatchmakingPlayer(data) : null;
    }

    export const create = async (data: MatchmakingPlayerData) => {
        const player = new MatchmakingPlayer(data);
        await player.updateAll();
        return player;
    }

    export const remove = async (discordId: string, queueId: string) => {
        return await Players.deleteOne({ discordId: discordId, queueId: queueId })
            .catch(err => console.error('Delete Database Player', err));
    }
}

export interface MatchmakingPlayerData extends DataEntry {
    discordId: string;
    queueId: string;
    points: number;
    wins: number;
    losses: number;
}

export class MatchmakingPlayer implements MatchmakingPlayerData {
    discordId: string;
    queueId: string;
    points: number;
    wins: number;
    losses: number;

    constructor(data: MatchmakingPlayerData) {
        this.discordId = data.discordId;
        this.queueId = data.queueId;
        this.points = data.points;
        this.wins = data.wins;
        this.losses = data.losses;
    }

    win(otherPlayer: MatchmakingPlayer) {
        this.wins++;
        this.points += otherPlayer.points / this.points * 100;
        otherPlayer.loss(this);
    }

    private loss(winningPlayer: MatchmakingPlayer) {
        this.losses++;
        this.points -= this.points / winningPlayer.points * 90;
        if (this.points < 1000) this.points = 1000;
    }

    async updateAll() {
        return await this.updateDatabase();
    }

    async updateCache() {
        throw new Error('Cache does not contain players.');
    }

    async updateDatabase() {
        return await Players.updateOne({ discordId: this.discordId, queueId: this.queueId }, this, { upsert: true })
            .catch(err => console.error('Update Database Player', err));
    }
}
