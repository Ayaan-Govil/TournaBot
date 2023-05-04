import mongoose from 'mongoose';
require('dotenv').config();

mongoose.set('strictQuery', true);

export const database = mongoose.connect(process.env.MONGODB_AUTH_URL);
