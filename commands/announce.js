// Dependencies
const Discord = require('discord.js');
const { SMASHGGTOKEN } = require('../config.json');
const fetch = require('node-fetch');
const urllib = require('urllib');
const { convertEpoch, convertEpochToClock, sendMessage } = require('../functions');

// MongoDB Models
const channelModel = require('../database/models/channel');
const announcemessageModel = require('../database/models/announcemessage');
const pingroleModel = require('../database/models/pingrole');
const timezoneModel = require('../database/models/timezone');
const languageModel = require('../database/models/language');

module.exports = {
  name: 'announce',
  description: 'Announce tournaments with event information.',
  execute(message, client) {
    // Announce code is old, needs to be rewritten to be more readable and efficient
    if (message.channel instanceof Discord.DMChannel) { sendMessage(message, 'I cannot run this command in DMs.') }
    else if (message.member.hasPermission('ADMINISTRATOR')) {
      let tournamentArgs = message.content.split(' ');
      tournamentArgs.shift();
      if (tournamentArgs.length >= 2) {
        if (tournamentArgs[0].startsWith('smash.gg/') || tournamentArgs[0].startsWith('https://smash.gg/tournament/')) {
          let guildID = message.guild.id;
          channelModel.find({
            guildid: guildID
          }, function (err, result) {
            if (err) throw err;
            if (result.length) {
              let announcechannel = client.channels.cache.get(result[0].channelid);
              sendMessage(message, `Announcing in ${announcechannel.name}...`);
              if (tournamentArgs[0].startsWith('smash.gg/')) {
                // Find path of short URL and parse URL for slug
                urllib.request('https://' + tournamentArgs[0], function (err, data, res) {
                  if (err) console.log(err);
                  if (!(res.headers.location == undefined)) {
                    let urlslug = res.headers.location.replace('https://smash.gg/tournament/', '');
                    urlslug = urlslug.split('/');
                    urlslug.splice(1);
                    urlslug = urlslug.toString();
                    getDataAndAnnounce(urlslug, res.headers.location);
                  } else { sendMessage(message, 'I could not find a tournament from the short URL. Do \`t!help\` to get command info.'); }
                });
              } else {
                let urlslug = tournamentArgs[0].replace('https://smash.gg/tournament/', '');
                urlslug = urlslug.split('/');
                urlslug.splice(1);
                urlslug = urlslug.toString();
                getDataAndAnnounce(urlslug, `https://smash.gg/tournament/${urlslug}/events`);
              }

              function getDataAndAnnounce(slugSpecified, tournamentURL) {
                var slug = slugSpecified;
                var query = `query TournamentQuery($slug: String) {
		                            tournament(slug: $slug) {
                                  name
                                  registrationClosesAt
                                  state
			                            events {
                                    name
                                    startAt
                                    checkInEnabled
                                    checkInBuffer
                                    checkInDuration
			                            }
                                  streams {
                                    isOnline
                                    streamSource
                                    streamGame
                                    streamName
                                  }
		                            }
	                            }`;
                // Query basic tournament info
                fetch('https://api.smash.gg/gql/alpha', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + SMASHGGTOKEN
                  },
                  body: JSON.stringify({
                    query,
                    variables: { slug },
                  })
                })
                  .then(r => r.json())
                  .then(data => {
                    if (!(data.data.tournament == null)) {
                      let eventNames = [];
                      let tournamentname = `**${data.data.tournament.name}**`;
                      let events = data.data.tournament.events;
                      let cityTimezone;

                      // Stream code written by shrianshChari, last edited by Ayaan-Govil on 1/1/2021
                      let streamAnnouncementMessage = ['Streams:\n'];
                      let streamData = data.data.tournament.streams;
                      if (streamData) {
                        // Check that somebody is streaming the tournament.
                        //let numStreaming = 0;
                        // for (let i = 0; i < streamData.length; i++) {
                        //   let stream = streamData[i];
                        //   //if (stream.isOnline) { // Ideally would also check if the stream's game matches the tournament game
                        //   numStreaming++;
                        //   //}
                        // }
                        //if (numStreaming > 0) {
                        for (let stream of streamData) {
                          //let stream = streamData[i];
                          //if (stream.isOnline) {
                          if (stream.streamSource == 'TWITCH') {
                            streamAnnouncementMessage.push(`https://twitch.tv/${stream.streamName}\n`);
                          }
                          // else {
                          //   streamAnnouncementMessage = streamAnnouncementMessage + `**${stream.streamName}'s ${stream.streamSource.substring(0, 1).toUpperCase() + stream.streamSource.substring(1).toLowerCase()} channel**`; // Might not work with Facebook Gaming
                          // }
                          //}
                        }
                        //}
                      }
                      if (streamAnnouncementMessage.length === 1) streamAnnouncementMessage = [];

                      timezoneModel.find({
                        guildid: guildID
                      }, function (err, result) {
                        if (err) throw err;
                        if (result.length) {
                          cityTimezone = result[0].timezone;
                        } else {
                          cityTimezone = 'America/Los_Angeles';
                        }
                        for (i = 0; i < events.length; i++) {
                          eventNames.push(`**${events[i].name}**`);
                          if (events[i].checkInEnabled) {
                            eventNames.push(` - ${convertEpoch(events[i].startAt, cityTimezone)}
Check-in opens at ${convertEpochToClock(events[i].startAt - events[i].checkInBuffer - events[i].checkInDuration, cityTimezone, false)} and closes at ${convertEpochToClock(events[i].startAt - events[i].checkInBuffer, cityTimezone, false)}.
`);
                          } else {
                            eventNames.push(` - ${convertEpoch(events[i].startAt, cityTimezone)}
`);
                          }
                        }
                        let registrationCloseTime = convertEpoch(data.data.tournament.registrationClosesAt, cityTimezone);
                        let tournamentAnnounceMessage;
                        announcemessageModel.find({
                          guildid: guildID
                        }, function (err, result) {
                          if (err) throw err;
                          // replace with ternary operator
                          if (result.length) {
                            tournamentAnnounceMessage = result[0].announcemessage;
                          } else {
                            tournamentAnnounceMessage = undefined;
                          }
                          pingroleModel.find({
                            guildid: guildID
                          }, function (err, result) {
                            if (err) throw err;
                            let pingingRole;
                            // replace with ternary operator
                            if (result.length) {
                              pingingRole = `<@&${result[0].role}>`;
                            } else {
                              pingingRole = '@everyone';
                            }
                            if (tournamentArgs[1] == 'ping') {
                              if (tournamentAnnounceMessage === undefined) {
                                tournamentAnnounceMessage = 'the registration for ' + tournamentname + ' is up:';
                              }
                              sendAnnouncement(true);
                            } else if (tournamentArgs[1] == 'no' && tournamentArgs[2] == 'ping') {
                              if (tournamentAnnounceMessage === undefined) {
                                tournamentAnnounceMessage = 'The registration for ' + tournamentname + ' is up:';
                              }
                              sendAnnouncement(false);
                            } else {
                              sendMessage(message, `I could not understand whether to ping or not. Do \`t!help\` to get command info.
Command format: \`t!announce <tournament URL/smash.gg short URL> <ping/no ping>\`
`)
                            }
                            function sendAnnouncement(ping) {

                              let finalAnnounceMessage = `${tournamentAnnounceMessage} ${tournamentURL}

Registration closes on ${registrationCloseTime}.

Events:
${eventNames.join('')}
${streamAnnouncementMessage.join('')}`;

                              languageModel.find({
                                guildid: guildID
                              }, function (err, result) {
                                if (err) throw err;
                                if (result.length) {
                                  fetch(`https://api.mymemory.translated.net/get?q=${fixedEncodeURIComponent(finalAnnounceMessage)}&langpair=en|${result[0].language}&de=random@gmail.com`)
                                    .then(res => res.json())
                                    .then(json => {
                                      let translation;
                                      ping ? translation = `${pingingRole}, ${json.responseData.translatedText}` : translation = json.responseData.translatedText;
                                      translation.toUpperCase() != translation ? generateAndSend(translation) : generateAndSend(finalAnnounceMessage);
                                    }).catch(err => console.log(err));
                                  function fixedEncodeURIComponent(str) {
                                    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
                                      return '%' + c.charCodeAt(0).toString(16);
                                    });
                                  }
                                } else {
                                  if (ping) {
                                    finalAnnounceMessage = `${pingingRole}, ${finalAnnounceMessage}`;
                                  }
                                  generateAndSend(finalAnnounceMessage);
                                }
                              }).catch(err => console.log(err));
                              function generateAndSend(finalMessage) {
                                announcechannel.send(finalMessage);
                                console.log(`announced in ${message.guild.name}`);
                              }
                            }
                          }).catch(err => console.log(err));
                        }).catch(err => console.log(err));
                      }).catch(err => console.log(err));
                    } else { sendMessage(message, `I could not find the specified tournament. Do \`t!help\` to get command info.`); }
                  }).catch(err => console.log(err));
              }
            } else { sendMessage(message, 'There is no announcement channel set. Do \`t!help\` to get command info.'); }
          }).catch(err => console.log(err));
        } else (sendMessage(message, 'I could not recognize the URL provided. Do \`t!help\` to get command info.'));
      } else {
        sendMessage(message, `Something went wrong :confused: . Do \`t!help\` to get command info.
Command format: \`t!announce <tournament URL/smash.gg short URL> <ping/no ping>\`
`);
      }
    } else { sendMessage(message, 'you don\'t have the permissions for that :sob:', 'REPLY'); }
  },
};
