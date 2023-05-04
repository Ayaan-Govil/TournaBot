import { Schema, model } from 'mongoose';
import { MatchmakingQueueData } from '../../src/types/matchmaking/queue.types';

const fileName = require('path').basename(__filename);
const collectionName = fileName.substring(0, fileName.length - 3);

const schema = new Schema<MatchmakingQueueData>({
    channelId: String,
    guildId: String,
    name: String,
    game: String,
    playersInQueue: Array
});

export const Queues = model(collectionName, schema);
