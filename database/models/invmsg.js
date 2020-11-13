const mongoose = require('mongoose');

const invmsgSchema = new mongoose.Schema({
    guildid: { type: mongoose.Schema.Types.Mixed }
});

const invmsgModel = module.exports = mongoose.model('invmsgtoggles', invmsgSchema);