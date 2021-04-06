const mongoose = require('mongoose');

const prefixSchema = new mongoose.Schema({
    guildid: { type: mongoose.Schema.Types.Mixed },
    prefix: { type: mongoose.Schema.Types.Mixed }
});

const prefixModel = module.exports = mongoose.model('prefixes', prefixSchema);
