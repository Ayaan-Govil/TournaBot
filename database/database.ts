import mongoose from 'mongoose';
require('dotenv').config();

export const database = mongoose.connect(process.env.MONGODB_AUTH_URL);
