const mongoose = require('mongoose');

const mmroleSchema = new mongoose.Schema({
    guildid: { type: mongoose.Schema.Types.Mixed },
    role: { type: mongoose.Schema.Types.Mixed }
});

const mmroleModel = module.exports = mongoose.model('matchmakingroles', mmroleSchema);