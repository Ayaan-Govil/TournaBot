// Dependencies
// const Discord = require('discord.js');
const { sendMessage } = require('../functions');

// MongoDB Models
const channelModel = require('../database/models/channel');
const announcemessageModel = require('../database/models/announcemessage');
const pingroleModel = require('../database/models/pingrole');
const timezoneModel = require('../database/models/timezone');
const languageModel = require('../database/models/language');

module.exports = {
  name: 'set',
  description: 'Set announce message, announce channel, DQ pinging channel, pinging role, timezone, and language.',
  execute(message) {
    let setArgs = message.content.split(' ');
    setArgs.shift();
    let guildID = '';
    let possibleArgs = '';
    let memberPerms = true;
    let localization = true;

    if (!message.guild) {
      guildID = message.channel.id;
      possibleArgs = 'Possible arguments: \`timezone <city>\`, \`language <language in ISO-639-1 code>\`';
    } else {
      guildID = message.guild.id;
      possibleArgs = 'Possible arguments: \`announcemessage <message>\`, \`announcechannel <#channel>\`, \`dqpingchannel <#channel>\`, \`pingrole <@role>\`, \`timezone <city>\`, \`language <language in ISO-639-1 code>\`';
      if (!message.member.hasPermission('ADMINISTRATOR')) memberPerms = false;
    }

    if (memberPerms) {
      let Channel;

      if (setArgs[0] === undefined) {
        sendMessage(message, `No arguments given. Do \`t!help\` to get command info.

${possibleArgs}`);
      } else {
        if (!message.guild) {
          let localizationArray = ['timezone', 'language'];
          if (!localizationArray.includes(setArgs[0].toLowerCase())) localization = false;
        }
        if (localization) {
          switch (setArgs[0].toLowerCase()) {

            // t!set announcemessage <message>
            case 'announcemessage':
              let tournamentAnnounceMessage;
              announcemessageModel.find({
                guildid: guildID
              }, function (err, result) {
                if (err) throw err;
                if (result.length) {
                  tournamentAnnounceMessage = result[0].announcemessage;
                } else {
                  tournamentname = '<tournament name>';
                  tournamentAnnounceMessage = `The registration for ${tournamentname} is up:`;
                }
                setArgs.shift();
                if (setArgs.length >= 1) {
                  setArgs = setArgs.join(' ');
                  sendMessage(message, `Previous announcement message: ${tournamentAnnounceMessage}
New announcement message: ${setArgs}`);
                  announcemessageModel.find({
                    guildid: guildID
                  }, function (err, result) {
                    if (err) throw err;
                    if (result.length) {
                      announcemessageModel.replaceOne({
                        guildid: guildID
                      }, {
                        guildid: guildID,
                        announcemessage: setArgs
                      }, function (err, result) {
                        if (err) throw err;
                        console.log(`changed announcement message for ${message.guild.name}`);
                      }).catch(err => console.log(err));
                    } else {
                      let announceMessageSet = new announcemessageModel({
                        guildid: guildID,
                        announcemessage: setArgs
                      }).save().then(result => console.log(`set new announce message for ${message.guild.name}`)).catch(err => console.log(err));
                    }
                  }).catch(err => console.log(err));
                } else {
                  announcemessageModel.findOneAndDelete({
                    guildid: guildID
                  }, function (err, result) {
                    if (err) throw err;
                    sendMessage(message, `The announcement message has been reset! :white_check_mark:`);
                  }).catch(err => console.log(err));
                }
              }).catch(err => console.log(err));
              break;

            // t!set announcechannel <#channel>
            case 'announcechannel':
              setArgs.shift();
              if (setArgs.length === 1) {
                Channel = setArgs[0].toString();
                if (Channel.startsWith('<#')) {
                  const chanl = message.member.guild.channels.cache.find(channel => channel.id === Channel.replace('<#', '').replace('>', ''));
                  if (chanl) {
                    Channel = Channel.slice(2, -1);
                    channelModel.replaceOne({
                      guildid: guildID
                    }, {
                      guildid: guildID,
                      channelid: Channel
                    }, function (err, result) {
                      if (err) throw err;
                      if (result.n === 0) {
                        let channelSet = new channelModel({
                          guildid: guildID,
                          channelid: Channel
                        }).save().then(result => sendMessage(message, 'The announcement channel is now set! :white_check_mark:')).catch(err => console.log(err));
                      } else {
                        sendMessage(message, 'The announcement channel has been changed! :white_check_mark:')
                      }
                    }).catch(err => console.log(err));
                  } else { sendMessage(message, 'I could not find the specified channel.'); }
                } else { sendMessage(message, 'I could not find the specified channel. Make sure you are pinging the channel using #.'); }
              } else { sendMessage(message, 'Something went wrong :confused: . Do \`t!help\` to get command info.'); }
              break;

            // t!set dqpingchannel <#channel>
            case 'dqpingchannel':
              setArgs.shift();
              if (setArgs.length === 1) {
                Channel = setArgs[0].toString();
                if (Channel.startsWith('<#')) {
                  const chanl = message.member.guild.channels.cache.find(channel => channel.id === Channel.replace('<#', '').replace('>', ''));
                  if (chanl) {
                    Channel = Channel.slice(2, -1);
                    guildID = `${message.guild.id}dq`;
                    channelModel.find({
                      guildid: guildID
                    }, function (err, result) {
                      if (err) throw err;
                      if (result.length) {
                        channelModel.replaceOne({
                          guildid: guildID
                        }, {
                          guildid: guildID,
                          channelid: Channel
                        },
                          function (err, result) {
                            if (err) throw err;
                            sendMessage(message, 'The DQ pinging channel has been changed! :white_check_mark:');
                          }).catch(err => console.log(err));
                      } else {
                        let channelSet = new channelModel({
                          guildid: guildID,
                          channelid: Channel
                        }).save().then(result => sendMessage(message, 'The DQ pinging channel is now set! :white_check_mark:')).catch(err => console.log(err));
                      }
                    }).catch(err => console.log(err));
                  } else { sendMessage(message, 'I could not find the specified channel.'); }
                } else { sendMessage(message, 'I could not find the specified channel. Make sure you are pinging the channel using #.'); }
              } else { sendMessage(message, 'Something went wrong :confused: . Do \`t!help\` to get command info.'); }
              break;

            // t!set pingrole <@role>
            case 'pingrole':
              if (setArgs.length === 2) {
                setArgs.shift();
                setArgs = setArgs.join(' ');
                let potentialRole = setArgs.replace('<@', '').replace('&', '').replace('>', '');
                var addedRole = message.guild.roles.cache.find(role => role.id === potentialRole);
                if (addedRole) {
                  addNewRole();
                } else {
                  addedRole = message.guild.roles.cache.find(role => role.name === potentialRole);
                  if (addedRole) {
                    addNewRole();
                  } else { sendMessage(message, `I could not find the specified role. Do \`t!help\` to get command info.`) }
                }
                function addNewRole() {
                  pingroleModel.find({
                    guildid: guildID
                  }, function (err, result) {
                    if (err) throw err;
                    if (result.length) {
                      pingroleModel.replaceOne({
                        guildid: guildID
                      }, {
                        guildid: guildID,
                        role: addedRole
                      }, function (err, result) {
                        if (err) throw err;
                        sendMessage(message, `The announcement pinging role has been changed to <@&${addedRole.id}> :white_check_mark:`);
                      }).catch(err => console.log(err));
                    } else {
                      let roleSet = new pingroleModel({
                        guildid: guildID,
                        role: addedRole
                      }).save().then(result => sendMessage(message, `The announcement pinging role is now set to <@&${addedRole.id}> :white_check_mark:`)).catch(err => console.log(err));
                    }
                  }).catch(err => console.log(err));
                }
              } else if (setArgs.length === 1) {
                pingroleModel.findOneAndDelete({
                  guildid: guildID
                }, function (err, result) {
                  if (err) throw err;
                  sendMessage(message, `The announcement pinging role has been reset! :white_check_mark:`);
                }).catch(err => console.log(err));
              } else { sendMessage(message, 'Something went wrong :confused: . Do \`t!help\` to get command info.'); }
              break;

            // t!set timezone <city>
            case 'timezone':
              if (setArgs.length === 2) {
                setArgs.shift();
                setArgs = setArgs.join('');
                let potentialTimezones = ['America/Los_Angeles', 'America/Phoenix', 'America/Denver', 'America/Regina', 'America/Chicago', 'America/New_York', 'Pacific/Honolulu'];
                if (potentialTimezones.includes(setArgs)) {
                  let currentDate = new Date();
                  let newTimezone = currentDate.toLocaleString('default', { timeZoneName: 'short', timeZone: setArgs });
                  newTimezone = newTimezone.slice(newTimezone.length - 3);
                  timezoneModel.find({
                    guildid: guildID
                  }, function (err, result) {
                    if (err) throw err;
                    if (result.length) {
                      timezoneModel.replaceOne({
                        guildid: guildID
                      }, {
                        guildid: guildID,
                        timezone: setArgs
                      }, function (err, result) {
                        if (err) throw err;
                        sendMessage(message, `The timezone has been changed to **${newTimezone}** :white_check_mark:`);
                      }).catch(err => console.log(err));
                    } else {
                      let timezoneSet = new timezoneModel({
                        guildid: guildID,
                        timezone: setArgs
                      }).save().then(result => sendMessage(message, `The timezone is now set to **${newTimezone}** :white_check_mark:`)).catch(err => console.log(err));
                    }
                  }).catch(err => console.log(err));
                } else {
                  sendMessage(message, `I could not recognize the city specified for timezone.

Currently supported cities: \`America/Los_Angeles\`, \`America/Phoenix\`, \`America/Denver\`, \`America/Regina\`, \`America/Chicago\`, \`America/New_York\`, \`Pacific/Honolulu\``)
                }
              } else if (setArgs.length === 1) {
                let currentDate = new Date();
                let newTimezone = currentDate.toLocaleString('default', { timeZoneName: 'short', timeZone: 'America/Los_Angeles' });
                newTimezone = newTimezone.slice(newTimezone.length - 3);
                timezoneModel.findOneAndDelete({
                  guildid: guildID
                }, function (err, result) {
                  if (err) throw err;
                  sendMessage(message, `The timezone has been reset to **${newTimezone}** :white_check_mark:`);
                }).catch(err => console.log(err));
              } else { sendMessage(message, 'Something went wrong :confused: . Do \`t!help\` to get command info.'); }
              break;

            // t!set language <language in ISO-639-1 code>
            case 'language':
              if (setArgs.length === 2) {
                setArgs.shift();
                setArgs = setArgs.join('');
                let languages = ['af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'zh-cn', 'zh', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 'en', 'eo', 'et', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw', 'he', 'iw', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jv', 'kn', 'kk', 'km', 'rw', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'ny', 'or', 'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tl', 'tg', 'ta', 'tt', 'te', 'th', 'tr', 'tk', 'uk', 'ur', 'ug', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu'];
                if (languages.includes(setArgs)) {
                  languageModel.find({
                    guildid: guildID
                  }, function (err, result) {
                    if (err) throw err;
                    if (result.length) {
                      languageModel.replaceOne({
                        guildid: guildID
                      }, {
                        guildid: guildID,
                        language: setArgs
                      }, function (err, result) {
                        if (err) throw err;
                        sendMessage(message, `The language has been changed to **${setArgs}**.`);
                      }).catch(err => console.log(err));
                    } else {
                      let languageSet = new languageModel({
                        guildid: guildID,
                        language: setArgs
                      }).save().then(result => sendMessage(message, `The language is now set to **${setArgs}**.`)).catch(err => console.log(err));
                    }
                  }).catch(err => console.log(err));
                } else { sendMessage(message, 'I could not find or do not support the language provided :sob: . Make sure the language specified is in shorthand format (ISO-639-1 code). Check [this](https://cloud.google.com/translate/docs/languages) to see which languages/codes are supported.'); }
              } else if (setArgs.length === 1) {
                languageModel.findOneAndDelete({
                  guildid: guildID
                }, function (err, result) {
                  if (err) throw err;
                  sendMessage(message, `The language has been reset to **English (en)**.`);
                }).catch(err => console.log(err));
              } else { sendMessage(message, 'Something went wrong :confused: . Do \`t!help\` to get command info.'); }
              break;

            default:
              sendMessage(message, `I could not recognize the argument provided. Do \`t!help\` to get command info.
            
${possibleArgs}`);
          }
        } else { sendMessage(message, 'I cannot run this command in DMs.'); }
      }
    } else { sendMessage(message, 'you don\'t have the permissions for that :sob:', 'REPLY'); }
  },
};
