import { Schema, model } from 'mongoose';
import { SupportTicketData } from '../../src/types/support';

const fileName = require('path').basename(__filename);
const collectionName = fileName.substring(0, fileName.length - 3);

const schema = new Schema<SupportTicketData>({
    resolved: Boolean,
    id: String,
    guildId: String,
    discordId: String,
    channelId: String,
    setId: String,
    phase: String,
    issue: Object
});

export const Support = model(collectionName, schema);
