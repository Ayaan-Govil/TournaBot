const mongoose = require('mongoose');

const announcemessageSchema = new mongoose.Schema({
    guildid: { type: mongoose.Schema.Types.Mixed },
    announcemessage: { type: mongoose.Schema.Types.Mixed }
});

const announcemessageModel = module.exports = mongoose.model('announcemessages', announcemessageSchema);