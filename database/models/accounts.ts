import { Schema, model } from 'mongoose';

const fileName = require('path').basename(__filename);
const collectionName = fileName.substring(0, fileName.length - 3);

const accountSchema = new Schema<AccountData>({
    discordTag: String,
    discordId: String,
    slug: String,
    playerId: Number,
    remind: Boolean,
    authorizations: Array
});

export interface AccountData {
    discordTag: string;
    discordId: string;
    slug: string;
    playerId: number;
    remind: boolean;
    authorizations: {
        externalId: string | null;
        externalUsername: string;
        type: string;
    }[]
}

export const Accounts = model(collectionName, accountSchema);
