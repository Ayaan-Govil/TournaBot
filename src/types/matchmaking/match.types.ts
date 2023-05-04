import { DataEntry } from "../global.types";
import { TournaBotDiscordData } from "../guild.types";

export namespace MatchManager {

}

export interface MatchmakingMatchData extends DataEntry {
    queueId: string;
    queueName: string;
    guildId: string;
    playerIds: string[];
    channels: TournaBotDiscordData[];
    game: GameShorthand;
    checkedIn: boolean;
}

export class MatchmakingMatch implements MatchmakingMatchData {
    queueId: string;
    queueName: string;
    guildId: string;
    playerIds: string[];
    channels: TournaBotDiscordData[];
    game: GameShorthand;
    checkedIn: boolean;

    constructor(data: MatchmakingMatchData) {
        this.queueId = data.queueId;
        this.queueName = data.queueName;
        this.guildId = data.guildId;
        this.playerIds = data.playerIds;
        this.channels = data.channels || [];
        this.game = data.game;
        this.checkedIn = data.checkedIn || false;
    }

    updateAll(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    updateCache(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    updateDatabase(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}

export const games: { [shorthand in GameShorthand]: MatchmakingGame } = {
    'ssbu': {
        name: 'Super Smash Bros. Ultimate',
        playersPerGame: 2
    }
}

export type GameShorthand = 'ssbu';

interface MatchmakingGame {
    name: string;
    playersPerGame: number;
}
