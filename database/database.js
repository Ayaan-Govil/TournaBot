const mongoose = require('mongoose');
const { MONGOPASS } = require('../config.json');


// Specify the connection string (MONGOPASS) before running
module.exports = mongoose.connect(MONGOPASS, { useNewUrlParser: true, useUnifiedTopology: true });
