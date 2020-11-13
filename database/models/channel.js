const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    guildid: { type: mongoose.Schema.Types.Mixed },
    channelid: { type: mongoose.Schema.Types.Mixed }
});

const channelModel = module.exports = mongoose.model('channels', channelSchema);