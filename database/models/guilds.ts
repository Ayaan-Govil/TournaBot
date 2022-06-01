import { Schema, model } from 'mongoose';
import { TournaBotGuildData } from '../../src/types/guild';

const fileName = require('path').basename(__filename);
const collectionName = fileName.substring(0, fileName.length - 3);

const schema = new Schema<TournaBotGuildData>({
    guildId: String,
    locale: String,
    timezone: String,
    activeTournament: String,
    channels: Array,
    roles: Array,
    allowlist: Array
});

export const Guilds = model(collectionName, schema);
