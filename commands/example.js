// Dependencies
const Discord = require('discord.js');
const urllib = require('urllib');
const Vibrant = require('node-vibrant');
const replaceall = require('replaceall');
const { distance, closest } = require('fastest-levenshtein');
const accurateInterval = require('accurate-interval');
const setAccurateTimeout = require('set-accurate-timeout');
const mongoose = require('mongoose');
const { convertEpoch, convertEpochToClock, sendMessage, queryAPI } = require('../functions');

// MongoDB Models
const channelModel = require('../database/models/channel');
const accountModel = require('../database/models/account');
const mmuserModel = require('../database/models/mmuser');
const mmroleModel = require('../database/models/mmrole');
const announcemessageModel = require('../database/models/announcemessage');
const pingroleModel = require('../database/models/pingrole');
const timezoneModel = require('../database/models/timezone');
const languageModel = require('../database/models/language');
const prefixModel = require('../database/models/prefix');

module.exports = {
  name: 'REPLACE NAME',
  description: 'REPLACE DESCRIPTION',
  execute(message, client) {

  },
};
