const mongoose = require('mongoose');

const mmuserSchema = new mongoose.Schema({
    roleid: { type: mongoose.Schema.Types.Mixed },
    activeusers: { type: mongoose.Schema.Types.Mixed }
});

const mmuserModel = module.exports = mongoose.model('matchmakingusers', mmuserSchema);