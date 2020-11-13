const mongoose = require('mongoose');

const pingroleSchema = new mongoose.Schema({
    guildid: { type: mongoose.Schema.Types.Mixed },
    role: { type: mongoose.Schema.Types.Mixed }
});

const pingroleModel = module.exports = mongoose.model('pingroles', pingroleSchema);