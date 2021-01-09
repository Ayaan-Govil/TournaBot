// Dependencies
const Discord = require('discord.js');
const { SMASHGGTOKEN } = require('../config.json');
const fetch = require('node-fetch');
const urllib = require('urllib');
const replaceall = require('replaceall');
const { sendMessage } = require('../functions');

// MongoDB Models
const accountModel = require('../database/models/account');

module.exports = {
  name: 'account',
  description: 'Linking, unlinking, and status for accounts.',
  execute(message) {
    // ADD SMASHDATA.GG PROFILE SUPPORT
    let accountArgs = message.content.split(' ');
    accountArgs.shift();

    if (accountArgs[0] === undefined) {
      sendMessage(message, `No arguments given. Do \`t!help\` to get command info.

Possible arguments: \`link <profile URL>\`, \`unlink\`, \`status <discord (optional)>\``);
    } else {
      switch (accountArgs[0].toString()) {

        // t!account link <smash.gg profile URL>
        case 'link':
          accountArgs.shift();
          if (accountArgs.length === 1) {
            let accountSlug = accountArgs.toString();
            if (accountSlug.startsWith('https://smash.gg/user/')) {
              accountSlug = replaceall('/', '', accountSlug);
              accountSlug = accountSlug.replace('https:smash.gguser', '');
              let discordID = message.author.id;
              let discordTag = message.author.tag;
              accountModel.find({
                discordid: discordID
              }, function (err, result) {
                if (err) throw err;
                if (result.length) {
                  accountModel.updateOne({
                    discordid: discordID
                  }, {
                    profileslug: accountSlug
                  },
                    function (err, result) {
                      if (err) throw err;
                      message.channel instanceof Discord.DMChannel ? sendMessage(message, '**Your accounts have been re-linked!**', 'REPLY') : sendMessage(message, '**your accounts have been re-linked!**', 'REPLY');
                      console.log(`re-linked ${discordTag}`);
                    }).catch(err => console.log(err));
                } else {
                  let accountLinking = new accountModel({
                    discordtag: discordTag,
                    discordid: discordID,
                    profileslug: accountSlug,
                    reminder: false
                  }).save().then(result => message.channel instanceof Discord.DMChannel ? sendMessage(message, '**Your Discord account and smash.gg account are now linked!**', 'REPLY') : sendMessage(message, '**your Discord account and smash.gg account are now linked!**', 'REPLY'), console.log(`linked ${discordTag}`)).catch(err => console.log(err));
                }
              }).catch(err => console.log(err));
            } else { sendMessage(message, 'I could not recognize the profile URL. Do \`t!help\` to get command info.') }
          } else { sendMessage(message, 'Something went wrong :confused: . Do \`t!help\` to get command info.'); }
          break;

        // t!account unlink
        case 'unlink':
          let discordID = message.author.id;
          accountModel.findOneAndDelete({
            discordid: discordID
          }, function (err, result) {
            if (err) throw err;
            if (result) {
              message.channel instanceof Discord.DMChannel ? sendMessage(message, '**Your Discord account and smash.gg account have been unlinked.**', 'REPLY') : sendMessage(message, '**your Discord account and smash.gg account have been unlinked.**', 'REPLY');
              console.log(`unlinked ${message.author.tag}`);
            } else {
              message.channel instanceof Discord.DMChannel ? sendMessage(message, '**Your accounts are not currently linked.**', 'REPLY') : sendMessage(message, '**your accounts are not currently linked.**', 'REPLY');
            }
          }).catch(err => console.log(err));
          break;

        // t!account status <Discord tag with/without @ OR tournament URL/short URL>
        case 'status':
          accountArgs.shift();
          let potentialTag;
          if (accountArgs.length) {
            potentialTag = accountArgs.join(' ');
            // TOURNAMENT LINK
            if (potentialTag.startsWith('smash.gg/') || potentialTag.startsWith('https://smash.gg/tournament/')) {
              if (potentialTag.startsWith('smash.gg/')) {
                // Find path of short URL and parse URL for slug
                urllib.request('https://' + potentialTag, function (err, data, res) {
                  if (err) console.log(err);
                  if (!(res.headers.location == undefined)) {
                    let urlslug = res.headers.location.replace('https://smash.gg/tournament/', '');
                    urlslug = urlslug.split('/');
                    urlslug.splice(1);
                    urlslug = urlslug.toString();
                    getAttendeesAndList(urlslug, res.headers.location);
                  } else { sendMessage(message, 'I could not find a tournament from the short URL. Do \`t!help\` to get command info.'); }
                });
              } else {
                let urlslug = potentialTag.replace('https://smash.gg/tournament/', '');
                urlslug = urlslug.split('/');
                urlslug.splice(1);
                urlslug = urlslug.toString();
                getAttendeesAndList(urlslug, `https://smash.gg/tournament/${urlslug}/events`);
              }
              // Function that fetches data from API and sends it to user, but recurses if not all the data has been collected
              // Can be done iteratively but easier to write recursively
              function getAttendeesAndList(slugSpecified, tournamentURL) {
                var slug = slugSpecified;
                var page = 1;
                var perPage = 256;
                var query = `query AttendeeQuery($slug: String, $page: Int, $perPage: Int) {
                                tournament(slug: $slug) {
                                  name
                                  participants(query: {page: $page, perPage: $perPage}) {
                                    pageInfo {
                                      total
                                      totalPages
                                      page
                                      perPage
                                    }
                                    nodes {
                                      user {
                                        slug
                                        player {
                                          gamerTag
                                        }
                                      }
                                    }
                                  }
                                }
                              }`;
                let attendeeInfo = new Map();
                let attendeeSlugs = [];
                sendMessage(message, `Querying...`);
                recurseAttendees();
                function recurseAttendees() {
                  fetch('https://api.smash.gg/gql/alpha', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Authorization': 'Bearer ' + SMASHGGTOKEN
                    },
                    body: JSON.stringify({
                      query,
                      variables: { slug, page, perPage },
                    })
                  })
                    .then(r => r.json())
                    .then(data => {
                      let tournamentInfo = data.data.tournament;
                      let attendees = tournamentInfo.participants.nodes;
                      let tournamentName = tournamentInfo.name;
                      // Add data from smash.gg into key/value pairs
                      for (a = 0; a < attendees.length; a++) {
                        if (!(attendees[a].user === null)) {
                          let attendeeName = replaceall('*', '\\*', attendees[a].user.player.gamerTag);
                          attendeeName = replaceall('_', '\\_', attendeeName);
                          let attendeeSlug = attendees[a].user.slug.replace('user/', '');
                          attendeeInfo.set(attendeeName, false);
                          attendeeInfo.set(attendeeSlug, attendeeName);
                          attendeeSlugs.push(attendeeSlug);
                        }
                      }
                      // If queried all the data from smash.gg, query from MongoDB then send to user, else recurse with next page
                      if (page === data.data.tournament.participants.pageInfo.totalPages) {
                        accountModel.find({
                          profileslug: { $in: attendeeSlugs }
                        }, function (err, result) {
                          if (err) throw err;
                          for (r = 0; r < result.length; r++) {
                            let attendeeName = attendeeInfo.get(result[r].profileslug);
                            attendeeInfo.set(attendeeName, true);
                          }
                          for (a = 0; a < attendeeSlugs.length; a++) {
                            attendeeInfo.delete(attendeeSlugs[a]);
                          }
                          let attendeeNames = Array.from(attendeeInfo.keys());
                          let attendeeBools = Array.from(attendeeInfo.values());
                          let attendeeArray = [];
                          for (a = 0; a < attendeeNames.length; a++) {
                            let attendeeString;
                            attendeeBools[a] ? attendeeString = `${attendeeNames[a]} :white_check_mark:` : attendeeString = `${attendeeNames[a]} :x:`;
                            attendeeArray.push(attendeeString);
                          }

                          const generateResult = index => {
                            const current = attendeeArray.slice(index, index + 20);
                            let fieldArray = [];
                            current.forEach(a => fieldArray.push(a));
                            const embed = new Discord.MessageEmbed()
                              .setColor('#222326')
                              .setTitle(tournamentName)
                              .setURL(tournamentURL)
                              .addField('User Accounts Linked:', fieldArray.slice(0, 10).join(`
  `), true)
                              .setFooter(`Showing ${index + 1}-${index + current.length} out of ${attendeeArray.length} attendees`, 'https://cdn.discordapp.com/attachments/719461475848028201/777094320531439636/image.png');
                            if (fieldArray.length > 10) {
                              embed.addField('\u2800', fieldArray.slice(10, 20).join(`
                                  `), true);
                            }
                            return embed;
                          }

                          var currentIndex = 0;
                          message.channel.send(generateResult(currentIndex)).then(message => {
                            message.react('⬅️');
                            message.react('➡️');

                            const filter = (reaction, user) => {
                              return (reaction.emoji.name === '⬅️' || reaction.emoji.name === '➡️') && user.id != message.author.id;
                            };

                            const collector = message.createReactionCollector(filter, { time: 300000 });

                            collector.on('collect', (reaction, user) => {

                              if (reaction.emoji.name === '➡️') {
                                if (currentIndex + 20 < attendeeArray.length) {
                                  currentIndex = currentIndex + 20;
                                  message.edit(generateResult(currentIndex));
                                }
                              } else {
                                if (currentIndex > 0) {
                                  currentIndex = currentIndex - 20;
                                  message.edit(generateResult(currentIndex));
                                }
                              }
                            });

                            collector.on('end', collected => {
                              console.log(`Done checking account statuses for ${tournamentName}`);
                            });
                          }).catch(err => console.log(err));
                        }).catch(err => console.log(err));
                      } else {
                        page++;
                        recurseAttendees();
                      }
                    }).catch(err => console.log(err));
                }
              }

              // DISCORD TAG
            } else if (potentialTag.includes('#')) {
              accountModel.find({
                discordtag: potentialTag
              }, function (err, result) {
                if (err) throw err;
                if (result.length) {
                  sendMessage(message, `${potentialTag} has linked their accounts! :white_check_mark:`);
                } else { callBackMessage(); }
              }).catch(err => console.log(err));

              // DISCORD MENTION
            } else {
              let userID = accountArgs[0].replace('<@', '').replace('!', '').replace('>', '');
              accountModel.find({
                discordid: userID
              }, function (err, result) {
                if (err) throw err;
                if (result.length) {
                  sendMessage(message, `${potentialTag} has linked their accounts! :white_check_mark:`);
                } else { callBackMessage(); }
              }).catch(err => console.log(err));
            }
          } else {
            accountModel.find({
              discordid: message.author.id
            }, function (err, result) {
              if (err) throw err;
              potentialTag = 'your Discord account';
              if (result.length) {
                message.channel instanceof Discord.DMChannel ? sendMessage(message, 'Your accounts are linked! :white_check_mark:', 'REPLY') : sendMessage(message, 'your accounts are linked! :white_check_mark:', 'REPLY');
              } else { message.channel instanceof Discord.DMChannel ? sendMessage(message, 'Your accounts are not linked :x:', 'REPLY') : sendMessage(message, 'your accounts are not linked :x:', 'REPLY'); }
            }).catch(err => console.log(err));
          }

          function callBackMessage() {
            sendMessage(message, `${potentialTag} does not have their accounts linked :x:`);
          }
          break;

        default:
          sendMessage(message, 'I could not recognize the argument provided. Do \`t!help\` to get command info.');
      }
    }
  },
};
