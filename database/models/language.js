const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    guildid: { type: mongoose.Schema.Types.Mixed },
    language: { type: mongoose.Schema.Types.Mixed }
});

const languageModel = module.exports = mongoose.model('languages', languageSchema);