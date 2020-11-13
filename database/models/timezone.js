const mongoose = require('mongoose');

const timezoneSchema = new mongoose.Schema({
    guildid: { type: mongoose.Schema.Types.Mixed },
    timezone: { type: mongoose.Schema.Types.Mixed }
});

const timezoneModel = module.exports = mongoose.model('timezones', timezoneSchema);