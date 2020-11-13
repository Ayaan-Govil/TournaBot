const mongoose = require('mongoose');
const { MONGOPASS } = require('../config.json');


// Replace the connection string before running
module.exports = mongoose.connect(MONGOPASS, { useNewUrlParser: true, useUnifiedTopology: true });