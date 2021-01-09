const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    discordtag: { type: mongoose.Schema.Types.Mixed },
    discordid: { type: mongoose.Schema.Types.Mixed },
    profileslug: { type: mongoose.Schema.Types.Mixed },
    reminder: { type: mongoose.Schema.Types.Mixed }
});

const accountModel = module.exports = mongoose.model('userids', accountSchema);
