import { Schema, model } from 'mongoose';
import { MatchmakingPlayerData } from '../../src/types/matchmaking/player.types';

const fileName = require('path').basename(__filename);
const collectionName = fileName.substring(0, fileName.length - 3);

const schema = new Schema<MatchmakingPlayerData>({
    discordId: String,
    queueId: String,
    points: Number,
    wins: Number,
    losses: Number
});

export const Players = model(collectionName, schema);
