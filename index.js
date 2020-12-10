// Dependencies
const Discord = require('discord.js');
const { PREFIX, DISCORDTOKEN, ALTDISCORDTOKEN, SMASHGGTOKEN } = require('./config.json');
const database = require('./database/database');
const editJsonFile = require('edit-json-file');
const characterfile = editJsonFile('./database/character_codes.json');
const fetch = require('node-fetch');
const urllib = require('urllib');
const Vibrant = require('node-vibrant');
const replaceall = require('replaceall');
const mongoose = require('mongoose');
const functions = require('./functions');
//const fs = require('fs');

const client = new Discord.Client();
// client.commands = new Discord.Collection();

// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
//   const command = require(`./commands/${file}`);
//   client.commands.set(command.name, command);
// }

// MongoDB Models
const channelModel = require('./database/models/channel');
const accountModel = require('./database/models/account');
const mmuserModel = require('./database/models/mmuser');
const mmroleModel = require('./database/models/mmrole');
const announcemessageModel = require('./database/models/announcemessage');
const pingroleModel = require('./database/models/pingrole');
const timezoneModel = require('./database/models/timezone');
const languageModel = require('./database/models/language');
//const invmsgModel = require('./database/models/invmsg');

// Map used for tracking DQ pinging
const dqPingingMap = new Map();



// Keep in mind that I (creator of TournaBot) am still a fairly inexperienced coder. I'll try to improve my own code as I learn more. 



// TODO:
/*
- Take a sweep through my own code and rework/improve everything
- Fix formatting errors and HTML entities in localization (will take a lot more testing and time than others)
- move commands to folder with each file corresponding to the command
- ping both players on a team for doubles instead of one
- come up with more discord -> smash.gg integrations
- sets on player command (once API functionality is fixed)
- pages for mm list
- add tournabots own results 
- improve efficiency and readability
*/



// On Discord client ready, inform in console
client.once('ready', () => {
  console.log(`Ready at ${functions.convertEpochToClock(Date.now() / 1000, 'America/Los_Angeles', true)}`);
  database.then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));
  client.user.setActivity('for t!help', { type: 'WATCHING' });
});

// Not sending join message to each user until bot becomes verified
// On user joining a Discord server, send message to user
// client.on('guildMemberAdd', member => {
//   const welcomeEmbed = new Discord.MessageEmbed()
//     .setColor('#222326')
//     .setDescription(`Welcome to ${member.guild.name}! Link your smash.gg account with your Discord account by doing \`t!account link <smash.gg profile URL>\`. You can link in DMs or servers. Do \`t!results\` to test it out!`);
//   member.send(welcomeEmbed).catch(err => console.log(err));
// });

// On bot being invited to a Discord server, send message
client.on('guildCreate', guild => {
  let defaultChannel = '';
  guild.channels.cache.forEach((channel) => {
    if (channel.type == 'text' && defaultChannel == '') {
      if (channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
        defaultChannel = channel;
      }
    }
  });
  const joinEmbed = new Discord.MessageEmbed()
    .setColor('#222326')
    .setDescription(`Thank you for inviting me to ${guild.name}! Information on how to use TournaBot can be found here: https://top.gg/bot/719283403698077708.`);
  defaultChannel.send(joinEmbed).catch(err => console.log(err));
  console.log('Added to: ' + guild.name);
});

// On message recieved, check for commands
client.on('message', message => {

  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  // const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  // const command = args.shift().toLowerCase();

  // if (!client.commands.has(command)) return;

  // try {
  //   client.commands.get(command).execute(message, args);
  // } catch (err) {
  //   console.log(err);
  //   //message.reply('there was an error trying to execute that command!');
  // }

  // t!help
  if (message.content.toLowerCase().startsWith(`${PREFIX}help`)) {
    sendMessage('Command info can be found at https://top.gg/bot/719283403698077708. Feel free to contact **F0ne#1933** with any specific issues or feedback, or join the support/development server: https://discord.gg/ssYPUk6Snc.');
    console.log(`${message.author.tag} executed t!help`);
  }

  // t!account <argument>
  if (message.content.toLowerCase().startsWith(`${PREFIX}account`)) {
    let accountArgs = message.content.split(' ');
    accountArgs.shift();

    if (accountArgs[0] === undefined) {
      sendMessage(`No arguments given. Do \`t!help\` to get command info.
Possible Arguments: \`link <profile URL>\`, \`unlink\`, \`status <discord (optional)>\``);
    } else {
      switch (accountArgs[0].toString()) {

        // t!account link <profile url>
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
                  accountModel.replaceOne({
                    discordid: discordID
                  }, {
                    discordtag: discordTag,
                    discordid: discordID,
                    profileslug: accountSlug
                  },
                    function (err, result) {
                      if (err) throw err;
                      sendMessage('**your accounts have been re-linked!**', 'REPLY');
                      console.log(`re-linked ${discordTag}`);
                    }).catch(err => console.log(err));
                } else {
                  let accountLinking = new accountModel({
                    discordtag: discordTag,
                    discordid: discordID,
                    profileslug: accountSlug
                  }).save().then(result => sendMessage('**your Discord account and smash.gg account are now linked!**', 'REPLY'), console.log(`linked ${discordTag}`)).catch(err => console.log(err));
                }
              }).catch(err => console.log(err));
            } else { sendMessage('I could not recognize the profile URL. Do \`t!help\` to get command info.') }
          } else { sendMessage('Something went wrong :confused: . Do \`t!help\` to get command info.'); }
          break;

        // t!account unlink
        case 'unlink':
          let discordID = message.author.id;
          accountModel.findOneAndDelete({
            discordid: discordID
          }, function (err, result) {
            if (err) throw err;
            if (result) {
              sendMessage('**your Discord account and smash.gg account have been unlinked.**', 'REPLY');
              console.log(`unlinked ${message.author.tag}`);
            } else {
              sendMessage('**your accounts are not currently linked.**', 'REPLY');
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
                  } else { sendMessage('I could not find a tournament from the short URL. Do \`t!help\` to get command info.'); }
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
                sendMessage(`Querying...`);
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
                            if (attendeeBools[a]) {
                              attendeeString = `${attendeeNames[a]} :white_check_mark:`;
                            } else {
                              attendeeString = `${attendeeNames[a]} :x:`;
                            }
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
                          let currentIndex = 0;
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
                  sendMessage(`${potentialTag} has linked their accounts! :white_check_mark:`);
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
                  sendMessage(`${potentialTag} has linked their accounts! :white_check_mark:`);
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
                sendMessage('your accounts are linked! :white_check_mark:', 'REPLY');
              } else { sendMessage('your accounts are not linked :x:', 'REPLY'); }
            }).catch(err => console.log(err));
          }

          function callBackMessage() {
            sendMessage(`${potentialTag} does not have their accounts linked :x:`);
          }
          break;

        default:
          sendMessage('I could not recognize the argument provided. Do \`t!help\` to get command info.');
      }
    }
  }

  // t!results <discord (optional)>
  if (message.content.toLowerCase().startsWith(`${PREFIX}results`)) {
    // NEEDS TO BE REFORMED USING WHILE LOOP AND DOING CHECKS ON DATA AFTER SORTING
    // TODO FOR RESULTS:
    // use empty character to push set information to third inline column
    // character catch for events
    // more testing (round robin, ladder, etc.)
    // *search for anyones results by keyword
    // compare admin list to user and use variables to query more tournaments for filtering out TO'd tournaments
    // more character emojis
    let resultsArgs = message.content.split(' ');
    resultsArgs.shift();
    let potentialTag;
    let userslug;
    if (resultsArgs.length) {
      // Sort arguments for something to query and find slug
      potentialTag = resultsArgs.join(' ');
      if (potentialTag.includes('#')) {
        accountModel.find({
          discordtag: potentialTag
        }, function (err, result) {
          if (err) throw err;
          if (result.length) {
            userslug = result[0].profileslug;
            runResults();
          } else { callBackMessage(); }
        }).catch(err => console.log(err));
      } else {
        let userID = resultsArgs[0].replace('<@', '').replace('!', '').replace('>', '');
        accountModel.find({
          discordid: userID
        }, function (err, result) {
          if (err) throw err;
          if (result.length) {
            userslug = result[0].profileslug;
            runResults();
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
          userslug = result[0].profileslug;
          runResults();
        } else { callBackMessage(); }
      }).catch(err => console.log(err));
    }

    // Queries and parses all the data, then sends to the user
    function runResults() {
      var tIndex = -1;
      var tournamentNames = [[], [], []];
      var eventstats = [[], [], []];
      var sets = [[], [], []];
      var cityTimezone;
      var formattedName;
      var playerIds;
      var page = 1;
      var imageurl;
      var slug = userslug;
      var query = `query PlayerInfo($slug: String) {
                user(slug: $slug) {
                  images {
                    url
                    height
                    width
                  }
                  player {
                    id
                    gamerTag
                  }
                }
            }`;
      // First query for specific user information
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
          let name = data.data.user.player.gamerTag;
          console.log(`Getting results for ${name}`);
          formattedName = replaceall('*', '\\*', name);
          formattedName = replaceall('_', '\\_', formattedName);
          sendMessage(`Getting the latest tournament results for ${formattedName}...`);
          playerIds = data.data.user.player.id;
          if (data.data.user.images[0] != undefined) {
            if (data.data.user.images[0].height === data.data.user.images[0].width) {
              imageurl = data.data.user.images[0].url;
            } else if (data.data.user.images[1] != undefined) {
              if ((data.data.user.images[0].height < data.data.user.images[1].height) && (data.data.user.images[0].width < data.data.user.images[1].width)) {
                imageurl = data.data.user.images[0].url;
              } else {
                imageurl = data.data.user.images[1].url;
              }
            }
          }
          let guildID;
          message.guild === null ? guildID = '' : guildID = message.guild.id;
          timezoneModel.find({
            guildid: guildID
          }, function (err, result) {
            if (err) throw err;
            if (result.length) {
              cityTimezone = result[0].timezone;
            } else {
              cityTimezone = 'America/Los_Angeles';
            }
          }).catch(err => console.log(err));
        }).then(function () {
          // Second query for tournament info, recurses if identifies a tournament as a spectated/TO'd (but can be done iteratively)
          queryRecurseAndSend();
          function queryRecurseAndSend() {
            query = `query Results($page: Int, $slug: String, $playerIds: ID) {
              user(slug: $slug) {
                tournaments(query: {page: $page, perPage: 3,
                filter: {
                  past: true
                }}) {
                  nodes {
                    slug
                    startAt
                    name
                    isOnline
                    numAttendees
                    events {
                      name
                      numEntrants
                      sets(
                        sortType: RECENT
                        filters: {
                          playerIds: [$playerIds]
                        }
                      ) {
                        nodes {
                          games {
                            selections {
                              entrant {
                                name
                                id
                              }
                              selectionValue
                            }
                          }
                          fullRoundText
                          displayScore
                          winnerId
                          event {
                            name
                          }
                          slots(includeByes: true) {
                            entrant {
                              id
                              name
                              standing {
                                placement
                              }
                              participants {
                                gamerTag
                                player {
                                  id
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }`;
            fetch('https://api.smash.gg/gql/alpha', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + SMASHGGTOKEN
              },
              body: JSON.stringify({
                query,
                variables: { page, slug, playerIds },
              })
            })
              .then(r => r.json())
              .then(data => {
                // Data parsing below is intricate and could be reworked to be more efficient/readable
                let recursing = false;
                console.log(`current tournament index: ${tIndex}`);
                if (!(data.data.user.tournaments.nodes === null)) {
                  let tournamentsdone = data.data.user.tournaments.nodes
                  // For each tournament (3 in total)
                  for (t = 0; t < tournamentsdone.length; t++) {
                    if (tournamentNames[2].length === 0) {
                      let setsFound = false;
                      tIndex++;
                      if (!(tournamentsdone[t] === null)) {
                        // Push basic tournament info
                        tournamentNames[tIndex].push(tournamentsdone[t].name);
                        eventstats[tIndex].push(`*Total Attendees: ${tournamentsdone[t].numAttendees}*`);
                        if (tournamentsdone[t].isOnline) {
                          eventstats[tIndex].push(`*Online Tournament*`);
                        } else { eventstats[tIndex].push(`*Offline Tournament*`); }
                        let tournamentTime = functions.convertEpoch(tournamentsdone[t].startAt, cityTimezone);
                        eventstats[tIndex].push(`*${tournamentTime}*`);
                        let tournamentLink = `https://smash.gg/${tournamentsdone[t].slug}`;
                        eventstats[tIndex].push(`*${tournamentLink}*
`);
                        let eventsdone = tournamentsdone[t].events
                        let eventsEntered = 0;
                        // For each event within the tournament
                        for (i = 0; i < eventsdone.length; i++) {
                          let placementAdded = false;
                          let setsdone = eventsdone[i].sets.nodes;
                          let currentEventName;
                          if (!(setsdone === null)) {
                            setsFound = true;
                            // For each set within the event
                            for (s = 0; s < setsdone.length; s++) {
                              // Begin adding set info
                              if (!(setsdone[s].event.name === currentEventName)) {
                                currentEventName = setsdone[s].event.name;
                                let eventName = replaceall('*', '\\*', currentEventName);
                                eventName = replaceall('_', '\\_', eventName);
                                sets[tIndex].push(`*For ${eventName}:*`);
                              }
                              if (!(setsdone[s].displayScore === null)) {
                                sets[tIndex].push(`\`${setsdone[s].fullRoundText}:\``);
                                // For each set slot (contains placement and entrant information)
                                for (d = 0; d < setsdone[s].slots.length; d++) {
                                  if (setsdone[s].winnerId == setsdone[s].slots[d].entrant.id) {
                                    let entrantGamerTag = replaceall('*', '\\*', setsdone[s].slots[d].entrant.participants[0].gamerTag);
                                    entrantGamerTag = replaceall('_', '\\_', entrantGamerTag);
                                    sets[tIndex].push(`Winner: **${entrantGamerTag}**`);
                                  }
                                  if (!placementAdded) {
                                    if (setsdone[s].slots[d].entrant.participants[0].player.id === playerIds) {
                                      eventsEntered++;
                                      placementAdded = true;
                                      let eventName = replaceall('*', '\\*', eventsdone[i].name);
                                      eventName = replaceall('_', '\\_', eventName);
                                      eventstats[tIndex].push(`Event: **${eventName}**`);
                                      eventstats[tIndex].push(`__Placement: ${setsdone[s].slots[d].entrant.standing.placement}__`);
                                      eventstats[tIndex].push(`Total Entrants: ${eventsdone[i].numEntrants}`);
                                    }
                                  }
                                }
                                let charactersPlayed = [[], []];
                                let setGames = setsdone[s].games;
                                if (!(setGames === null)) {
                                  // For each game played within the set
                                  for (g = 0; g < setGames.length; g++) {
                                    // Needs to be rewritten 
                                    if (!(setGames[g].selections === null)) {
                                      if (!(setGames[g].selections[0] === undefined)) {
                                        if (setGames[g].selections[0].entrant.id === setsdone[s].slots[0].entrant.id) {
                                          let charName = characterfile.get(setGames[g].selections[0].selectionValue.toString());
                                          let charEmoji = client.emojis.cache.find(emoji => emoji.name === charName);
                                          if (!charactersPlayed[0].includes(charEmoji)) {
                                            charactersPlayed[0].push(charEmoji);
                                          }
                                        } else {
                                          if (!(setGames[g].selections[1] === undefined)) {
                                            let charName = characterfile.get(setGames[g].selections[1].selectionValue.toString());
                                            let charEmoji = client.emojis.cache.find(emoji => emoji.name === charName);
                                            if (!charactersPlayed[0].includes(charEmoji)) {
                                              charactersPlayed[0].push(charEmoji);
                                            }
                                          }
                                        }
                                      }

                                      if (!(setGames[g].selections[1] === undefined)) {
                                        if (setGames[g].selections[1].entrant.id === setsdone[s].slots[1].entrant.id) {
                                          let charName = characterfile.get(setGames[g].selections[1].selectionValue.toString());
                                          let charEmoji = client.emojis.cache.find(emoji => emoji.name === charName);
                                          if (!charactersPlayed[1].includes(charEmoji)) {
                                            charactersPlayed[1].push(charEmoji);
                                          }
                                        } else {
                                          if (!(setGames[g].selections[0] === undefined)) {
                                            let charName = characterfile.get(setGames[g].selections[0].selectionValue.toString());
                                            let charEmoji = client.emojis.cache.find(emoji => emoji.name === charName);
                                            if (!charactersPlayed[1].includes(charEmoji)) {
                                              charactersPlayed[1].push(charEmoji);
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }

                                let finalScore = setsdone[s].displayScore.replace(setsdone[s].slots[0].entrant.name, `${setsdone[s].slots[0].entrant.participants[0].gamerTag} ${charactersPlayed[0].join(' ')}`);
                                finalScore = finalScore.replace(setsdone[s].slots[1].entrant.name, `${setsdone[s].slots[1].entrant.participants[0].gamerTag} ${charactersPlayed[1].join(' ')}`);
                                finalScore = replaceall('*', '\\*', finalScore);
                                finalScore = replaceall('_', '\\_', finalScore);

                                sets[tIndex].push(`Score: ${finalScore}`);
                                // Character catch needs to be reworked to be more accurate
                                let setsCharLength = 800;
                                if ((charactersPlayed[0].length === 0) && (charactersPlayed[1].length === 0)) {
                                  setsCharLength = 400;
                                }
                                if (sets[tIndex].join('\n').length + 13 >= setsCharLength) {
                                  doubleCheckCount();
                                  function doubleCheckCount() {
                                    if (sets[tIndex].join('\n').length > 1000) {
                                      sets[tIndex].pop();
                                      if (sets[tIndex][sets[tIndex].length - 1].startsWith('*For ')) {
                                        sets[tIndex].pop();
                                      }
                                      if (sets[tIndex][sets[tIndex].length - 1] === '*And more...*') {
                                        sets[tIndex].pop();
                                      }
                                      console.log(`pushed out set for count: ${sets[tIndex].join('\n').length}`);
                                      doubleCheckCount();
                                    }
                                  }
                                  sets[tIndex].push('*And more...*');
                                  s = setsdone.length;
                                }
                              } else { sets[tIndex].push('No score found.') }
                            }
                            if (eventsEntered < eventsdone.length) {
                              eventstats[tIndex].push(`*Hid event(s) not entered*`);
                            }
                          }
                        }
                      } else {
                        tournamentNames[tIndex] = 'No tournament found.';
                        eventstats[tIndex].push('No events found.');
                        sets[tIndex].push('No sets found');
                      }
                      if (!setsFound) {
                        tournamentNames[tIndex] = [];
                        eventstats[tIndex] = [];
                        sets[tIndex] = [];
                        tIndex--;
                      }
                    }
                  }


                  // If 3 tournaments have not been added
                  if (tIndex != 2) {
                    if (page < 5) {
                      recursing = true;
                      page++;
                      queryRecurseAndSend();
                      console.log('recursing');
                    } else { console.log('reached 5 queries'); }
                  }
                }

                if (!recursing) {
                  if (tIndex > -1) {
                    // Search profile picture for most vibrant color then send data to user
                    // Rework algorithm to use pixel density and other factors to get more appealing colors
                    if (imageurl) {
                      let v = new Vibrant(imageurl);
                      v.getPalette(function (err, palette) {
                        if (err) throw err;
                        sendResults(palette.Vibrant._rgb);
                      }).catch(err => console.log(err));
                    } else {
                      sendResults('#222326');
                    }

                    function sendResults(sideColor) {
                      const generateResults = index => {
                        const results = new Discord.MessageEmbed()
                          .setColor(sideColor)
                          .setTitle(formattedName)
                          .setURL(`https://smash.gg/user/${userslug}`)
                          .setThumbnail(imageurl)
                          .addFields(
                            {
                              name: tournamentNames[index], value: eventstats[index].join(`
`), inline: true
                            },
                            {
                              name: 'Sets', value: sets[index].join(`
`), inline: true
                            })
                          //.setTimestamp()
                          .setFooter(`Tournament ${index + 1} of ${tIndex + 1}`, 'https://cdn.discordapp.com/attachments/719461475848028201/777094320531439636/image.png');
                        return results;
                      }

                      let currentIndex = 0;
                      message.channel.send(generateResults(currentIndex)).then(message => {
                        message.react('⬅️');
                        message.react('➡️');
                        const filter = (reaction, user) => {
                          return (reaction.emoji.name === '⬅️' || reaction.emoji.name === '➡️') && user.id != message.author.id;
                        };

                        const collector = message.createReactionCollector(filter, { time: 180000 });

                        collector.on('collect', (reaction, user) => {

                          if (reaction.emoji.name === '➡️') {
                            if (currentIndex < tIndex) {
                              currentIndex++;
                              message.edit(generateResults(currentIndex));
                            }
                          } else {
                            if (currentIndex > 0) {
                              currentIndex--;
                              message.edit(generateResults(currentIndex));
                            }
                          }
                        });

                        collector.on('end', collected => {
                          console.log(`Done collecting for results`);
                        });
                      }).catch(err => console.log(err));
                    }
                  } else { sendMessage('This user does not have any results from their past 15 tournaments (includes admined + spectated tournaments).'); }
                }
              }).catch(err => console.log(err));
          }
        }).catch(err => console.log(err));
    }

    function callBackMessage() {
      sendMessage(`I could not find ${potentialTag} in my account database :x: . 
\`t!account link <smash.gg profile URL>\` gives access to account-based commands.`);
    }

  }

  // NOT CURRENTLY VIABLE DUE TO API FUNCTIONALITY - CAN BE DONE IF UPSCALED (possibly using smashgg.data SQL database or creating a sub-program)
  // // t!playersets <player's Discord mention/tag>
  // if (message.content.toLowerCase().startsWith(`${PREFIX}playersets`)) {
  //   let resultsArgs = message.content.split(' ');
  //   resultsArgs.shift();
  //   let potentialTag;
  //   let authorSlug;
  //   let playerSlug;
  //   if (resultsArgs.length) {
  //     accountModel.find({
  //       discordid: message.author.id
  //     }, function (err, result) {
  //       potentialTag = 'your Discord account';
  //       if (result.length) {
  //         authorSlug = result[0].profileslug;
  //         potentialTag = resultsArgs.join(' ');
  //         if (potentialTag.includes('#')) {
  //           accountModel.find({
  //             discordtag: potentialTag
  //           }, function (err, result) {
  //             if (result.length) {
  //               playerSlug = result[0].profileslug;
  //             } else { callBackMessage(); }
  //           });
  //         } else {
  //           let userID = resultsArgs[0].replace('<@', '').replace('!', '').replace('>', '');
  //           accountModel.find({
  //             discordid: userID
  //           }, function (err, result) {
  //             if (result.length) {
  //               playerSlug = result[0].profileslug;
  //             } else { callBackMessage(); }
  //           });
  //         }
  //       } else { callBackMessage(); }
  //     });
  //   } else { sendMessage(`I need a user's Discord mention or tag to run this command. Do \`t!help\` to get command info.`); }

  //   function callBackMessage() {
  //     sendMessage(`I could not find ${potentialTag} in my account database :x: . 
  //\`t!account link <smash.gg profile URL>\` gives access to account-based commands.`);
  //   }

  // }

  /*
  How DQ Pinging should work (my idea prior to coding it):
  1. TO does t!set dqpingchannel <channel> to set the dq pinging channel
  2. TO does t!dq ping (short url or tournament link) - Bot queries for timestamps
  3. If tournament has not started, callback message
  4. Else bot will continue with the DQ pinging loop:
      
      a. Query the smash.gg API using the link given for all sets that have been called (state 6) after checking for tournament end
      b. If the set ID does not match previous sets, get the slug, gamertag, and linked accounts of each player as well as the round name
      c. If a Discord account is not found on a player's smash.gg profile, use the slug to query MongoDB for Discord tags 
      d. Ping both players using tags, "@Player1 and @Player2, your match for Winners Finals has been called! Please check-in through smash.gg."
      e. If user has not linked their Discord with smash.gg or TournaBot, show smash.gg gamer tag in bold instead
      f. Store the set ID
 
  5. Repeat steps b-f in a loop until all called sets have been pinged for the current query
  6. Wait 5 seconds then repeat from step 4
  7. If TO does t!dq stop break from steps 4-8 loop
  */

  // DQ PINGING
  if (message.content.toLowerCase().startsWith(`${PREFIX}dq`)) {
    // DQ pinging can be rewritten to be more efficient and readable
    if (message.channel instanceof Discord.DMChannel) { sendMessage('I cannot run this command in DMs.') }//do not execute
    else if (message.member.hasPermission('ADMINISTRATOR')) {
      let dqArgs = message.content.split(' ');
      dqArgs.shift();
      if (dqArgs[0] === undefined) {
        sendMessage(`No arguments given. Do \`t!help\` to get command info.
Possible Arguments: \`ping <tournament URL or smash.gg short URL>\`, \`stop\``)
      } else {
        switch (dqArgs[0].toLowerCase()) {

          // t!dq ping <tournament URL or smash.gg short URL>
          case 'ping':
            // Step 2
            if (dqArgs.length >= 2) {
              dqArgs.shift();
              if (dqPingingMap.get(message.guild.id) === undefined) {
                var dqchannel = undefined;
                if (dqArgs[0].startsWith('smash.gg/')) {
                  // Find path of short URL and parse URL for slug
                  urllib.request('https://' + dqArgs[0], function (err, data, res) {
                    if (err) console.log(err);
                    if (!(res.headers.location == undefined)) {
                      let urlslug = res.headers.location.replace('https://smash.gg/tournament/', '');
                      urlslug = urlslug.split('/');
                      urlslug.splice(1);
                      urlslug = urlslug.toString();
                      channelModel.find({
                        guildid: `${message.guild.id}dq`
                      }, function (err, result) {
                        if (err) throw err;
                        if (result.length) {
                          dqchannel = result[0].channelid;
                        }
                        dqPing(urlslug);
                      }).catch(err => console.log(err));
                    } else { sendMessage('I could not find a tournament from the short URL. Do \`t!help\` to get command info.'); }
                  });
                } else if (dqArgs[0].startsWith('https://smash.gg/tournament/')) {
                  let urlslug = dqArgs[0].replace('https://smash.gg/tournament/', '');
                  urlslug = urlslug.split('/');
                  urlslug.splice(1);
                  urlslug = urlslug.toString();
                  channelModel.find({
                    guildid: `${message.guild.id}dq`
                  }, function (err, result) {
                    if (err) throw err;
                    if (result.length) {
                      dqchannel = result[0].channelid;
                    }
                    dqPing(urlslug);
                  }).catch(err => console.log(err));
                } else { sendMessage('I could not recognize the URL provided. Do \`t!help\` to get command info.'); }

                function dqPing(slugSpecified) {
                  if (!(dqchannel === undefined)) {
                    sendMessage('Starting DQ pinging...');
                    dqchannel = client.channels.cache.get(dqchannel);
                    let eventNumber = parseInt(dqArgs[1]);
                    var pingEvent = false;
                    var indexEvent;
                    if (Number.isInteger(eventNumber)) {
                      if (eventNumber > 0) {
                        indexEvent = parseInt(dqArgs[1]) - 1;
                        console.log('integer: ' + indexEvent);
                      }
                    }
                    dqArgs.shift();
                    var potentialEventName = dqArgs.join(' ');
                    var filterByName = false;
                    var tournamentEnd;
                    var tournamentStarted = true;
                    var autoStop = Date.now() + 21600000;
                    var slug = slugSpecified;
                    var query = `query TournamentStartAndEnd($slug: String) {
                                      tournament(slug: $slug) {
                                        name
                                        endAt
                                        events {
                                          startAt
                                          name
                                        } 
                                      }
                                    }`;
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
                        if (data.data.tournament != null) {
                          tournamentEnd = data.data.tournament.endAt * 1000;
                          console.log('tournament end: ' + tournamentEnd);
                          console.log('current time: ' + Date.now());
                          console.log(data.data.tournament.events[indexEvent])
                          if (!(data.data.tournament.events[indexEvent] == undefined)) {
                            console.log('filtering by index');
                            pingEvent = true;
                          }
                          eventsTotal = 0;
                          for (d = 0; d < data.data.tournament.events.length; d++) {
                            if (Date.now() < data.data.tournament.events[d].startAt * 1000) {
                              eventsTotal++;
                              if (eventsTotal === data.data.tournament.events.length) {
                                tournamentStarted = false;
                                console.log('tournament has not started');
                              }
                            }
                            if (data.data.tournament.events[d].name.toLowerCase() === potentialEventName.toLowerCase()) {
                              filterByName = true;
                              console.log('filtering by name');
                            }
                          }
                          DQLoop();
                        } else { sendMessage('I could not find any tournament data from the URL provided :confused: . Do \`t!help\` to get command info.'); }
                      }).catch(err => console.log(err));
                    function DQLoop() {
                      var setsPingedArray = [];
                      // Step a + 6
                      if (tournamentStarted) {
                        dqPingingMap.set(message.guild.id, setInterval(function () {
                          if (Date.now() < tournamentEnd) {
                            if (Date.now() < autoStop) {
                              query = `query EventSets($slug: String) {
                                    tournament(slug: $slug) {
                                      events {
                                        name
                                        sets(sortType: RECENT, filters: {state: 6}) {
                                          nodes {
                                            id
                                            state
                                            fullRoundText
                                            slots {
                                              entrant {
                                                name
                                                participants {
                                                  gamerTag
                                                  user {
                                                    slug
                                                    authorizations {
                                                      type
                                                      externalUsername
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    } 
                                  }`;

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
                                  // STEPS b-f
                                  let activeEvents = data.data.tournament.events
                                  if (!pingEvent) {

                                    // EVENT NAME
                                    if (filterByName) {
                                      for (e = 0; e < activeEvents.length; e++) {
                                        if (activeEvents[e].name.toLowerCase() === potentialEventName.toLowerCase()) {
                                          let calledWave = [activeEvents[e].sets.nodes];
                                          if (!(calledWave == undefined)) {
                                            for (w = 0; w < calledWave.length; w++) {
                                              //console.log('wave found');
                                              if (calledWave[w] === null) {
                                                console.log('no dq timers');
                                              } else {
                                                for (s = 0; s < calledWave[w].length; s++) {
                                                  console.log('set found');
                                                  if (!setsPingedArray.includes(calledWave[w][s].id)) {
                                                    setsPingedArray.push(calledWave[w][s].id);
                                                    console.log('id added');
                                                    let quips = ['Please check-in on smash.gg!', 'Get ready to rumble!', 'Round 1, FIGHT!', '3.. 2.. 1.. GO!', 'Choose your character!', 'Start battle!'];
                                                    let endText = `\`${calledWave[w][s].fullRoundText}\` in **${activeEvents[e].name}** has been called. ${quips[Math.floor(Math.random() * 6)]}`;

                                                    let entrantOneMention = replaceall('*', '\\*', calledWave[w][s].slots[0].entrant.participants[0].gamerTag);
                                                    entrantOneMention = replaceall('_', '\\_', entrantOneMention);
                                                    entrantOneMention = `**${entrantOneMention}**`;
                                                    let entrantOneSlug = '';
                                                    if (!(calledWave[w][s].slots[0].entrant.participants[0].user === null)) {
                                                      entrantOneSlug = calledWave[w][s].slots[0].entrant.participants[0].user.slug.replace('user/', '');
                                                      let entrantOneAccounts = calledWave[w][s].slots[0].entrant.participants[0].user.authorizations;
                                                      if (!(entrantOneAccounts === null)) {
                                                        for (d = 0; d < entrantOneAccounts.length; d++) {
                                                          if (entrantOneAccounts[d].type === 'DISCORD') {
                                                            let userID = message.guild.members.cache.filter(member => member.user.tag === entrantOneAccounts[d].externalUsername).map(member => member.user.id);
                                                            if (!(userID[0] === undefined)) {
                                                              entrantOneMention = `<@${userID[0]}>`;
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }

                                                    let entrantTwoMention = replaceall('*', '\\*', calledWave[w][s].slots[1].entrant.participants[0].gamerTag);
                                                    entrantTwoMention = replaceall('_', '\\_', entrantTwoMention);
                                                    entrantTwoMention = `**${entrantTwoMention}**`;
                                                    let entrantTwoSlug = '';
                                                    if (!(calledWave[w][s].slots[1].entrant.participants[0].user === null)) {
                                                      entrantTwoSlug = calledWave[w][s].slots[1].entrant.participants[0].user.slug.replace('user/', '');
                                                      let entrantTwoAccounts = calledWave[w][s].slots[1].entrant.participants[0].user.authorizations;
                                                      if (!(entrantTwoAccounts === null)) {
                                                        for (d = 0; d < entrantTwoAccounts.length; d++) {
                                                          if (entrantTwoAccounts[d].type === 'DISCORD') {
                                                            let userID = message.guild.members.cache.filter(member => member.user.tag === entrantTwoAccounts[d].externalUsername).map(member => member.user.id);
                                                            if (!(userID[0] === undefined)) {
                                                              entrantTwoMention = `<@${userID[0]}>`;
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }

                                                    accountModel.find({
                                                      profileslug: { $in: [entrantOneSlug, entrantTwoSlug] }
                                                    }, function (err, result) {
                                                      if (err) throw err;
                                                      if (result[0]) {
                                                        if (entrantOneSlug === result[0].profileslug) {
                                                          console.log('slugs matched on first');
                                                          entrantOneMention = `<@${result[0].discordid}>`;
                                                        } else {
                                                          console.log('slugs matched on second');
                                                          entrantTwoMention = `<@${result[0].discordid}>`;
                                                        }
                                                      }

                                                      if (result[1]) {
                                                        if (entrantOneSlug === result[1].profileslug) {
                                                          console.log('slugs matched on first');
                                                          entrantOneMention = `<@${result[1].discordid}>`;
                                                        } else {
                                                          console.log('slugs matched on second');
                                                          entrantTwoMention = `<@${result[1].discordid}>`;
                                                        }
                                                      }
                                                      dqchannel.send(`${entrantOneMention} and ${entrantTwoMention}, your match for ${endText}`).catch(err => console.log(err));
                                                    }).catch(err => console.log(err));
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }

                                      // ALL EVENTS
                                    } else {
                                      for (e = 0; e < activeEvents.length; e++) {
                                        let calledWave = [activeEvents[e].sets.nodes];
                                        if (!(calledWave == undefined)) {
                                          for (w = 0; w < calledWave.length; w++) {
                                            //console.log('wave found');
                                            if (calledWave[w] === null) {
                                              console.log('no dq timers');
                                            } else {
                                              for (s = 0; s < calledWave[w].length; s++) {
                                                console.log('set found');
                                                if (!setsPingedArray.includes(calledWave[w][s].id)) {
                                                  setsPingedArray.push(calledWave[w][s].id);
                                                  console.log('id added');
                                                  let quips = ['Please check-in on smash.gg!', 'Get ready to rumble!', 'Round 1, FIGHT!', '3.. 2.. 1.. GO!', 'Choose your character!', 'Start battle!'];
                                                  let endText = `\`${calledWave[w][s].fullRoundText}\` in **${activeEvents[e].name}** has been called. ${quips[Math.floor(Math.random() * 6)]}`;

                                                  let entrantOneMention = replaceall('*', '\\*', calledWave[w][s].slots[0].entrant.participants[0].gamerTag);
                                                  entrantOneMention = replaceall('_', '\\_', entrantOneMention);
                                                  entrantOneMention = `**${entrantOneMention}**`;
                                                  let entrantOneSlug = '';
                                                  if (!(calledWave[w][s].slots[0].entrant.participants[0].user === null)) {
                                                    entrantOneSlug = calledWave[w][s].slots[0].entrant.participants[0].user.slug.replace('user/', '');
                                                    let entrantOneAccounts = calledWave[w][s].slots[0].entrant.participants[0].user.authorizations;
                                                    if (!(entrantOneAccounts === null)) {
                                                      for (d = 0; d < entrantOneAccounts.length; d++) {
                                                        if (entrantOneAccounts[d].type === 'DISCORD') {
                                                          let userID = message.guild.members.cache.filter(member => member.user.tag === entrantOneAccounts[d].externalUsername).map(member => member.user.id);
                                                          if (!(userID[0] === undefined)) {
                                                            entrantOneMention = `<@${userID[0]}>`;
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }

                                                  let entrantTwoMention = replaceall('*', '\\*', calledWave[w][s].slots[1].entrant.participants[0].gamerTag);
                                                  entrantTwoMention = replaceall('_', '\\_', entrantTwoMention);
                                                  entrantTwoMention = `**${entrantTwoMention}**`;
                                                  let entrantTwoSlug = '';
                                                  if (!(calledWave[w][s].slots[1].entrant.participants[0].user === null)) {
                                                    entrantTwoSlug = calledWave[w][s].slots[1].entrant.participants[0].user.slug.replace('user/', '');
                                                    let entrantTwoAccounts = calledWave[w][s].slots[1].entrant.participants[0].user.authorizations;
                                                    if (!(entrantTwoAccounts === null)) {
                                                      for (d = 0; d < entrantTwoAccounts.length; d++) {
                                                        if (entrantTwoAccounts[d].type === 'DISCORD') {
                                                          let userID = message.guild.members.cache.filter(member => member.user.tag === entrantTwoAccounts[d].externalUsername).map(member => member.user.id);
                                                          if (!(userID[0] === undefined)) {
                                                            entrantTwoMention = `<@${userID[0]}>`;
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }

                                                  accountModel.find({
                                                    profileslug: { $in: [entrantOneSlug, entrantTwoSlug] }
                                                  }, function (err, result) {
                                                    if (err) throw err;
                                                    if (result[0]) {
                                                      if (entrantOneSlug === result[0].profileslug) {
                                                        console.log('slugs matched on first');
                                                        entrantOneMention = `<@${result[0].discordid}>`;
                                                      } else {
                                                        console.log('slugs matched on second');
                                                        entrantTwoMention = `<@${result[0].discordid}>`;
                                                      }
                                                    }

                                                    if (result[1]) {
                                                      if (entrantOneSlug === result[1].profileslug) {
                                                        console.log('slugs matched on first');
                                                        entrantOneMention = `<@${result[1].discordid}>`;
                                                      } else {
                                                        console.log('slugs matched on second');
                                                        entrantTwoMention = `<@${result[1].discordid}>`;
                                                      }
                                                    }
                                                    dqchannel.send(`${entrantOneMention} and ${entrantTwoMention}, your match for ${endText}`).catch(err => console.log(err));
                                                  }).catch(err => console.log(err));
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }

                                    // EVENT NUMBER
                                  } else {
                                    let calledWave = [activeEvents[indexEvent].sets.nodes];
                                    if (!(calledWave == undefined)) {
                                      for (w = 0; w < calledWave.length; w++) {
                                        //console.log('wave found');
                                        if (calledWave[w] === null) {
                                          console.log('no dq timers');
                                        } else {
                                          for (s = 0; s < calledWave[w].length; s++) {
                                            console.log('set found');
                                            if (!setsPingedArray.includes(calledWave[w][s].id)) {
                                              setsPingedArray.push(calledWave[w][s].id);
                                              console.log('id added');
                                              let quips = ['Please check-in on smash.gg!', 'Get ready to rumble!', 'Round 1, FIGHT!', '3.. 2.. 1.. GO!', 'Choose your character!', 'Start battle!'];
                                              let endText = `\`${calledWave[w][s].fullRoundText}\` in **${activeEvents[indexEvent].name}** has been called. ${quips[Math.floor(Math.random() * 6)]}`;

                                              let entrantOneMention = replaceall('*', '\\*', calledWave[w][s].slots[0].entrant.participants[0].gamerTag);
                                              entrantOneMention = replaceall('_', '\\_', entrantOneMention);
                                              entrantOneMention = `**${entrantOneMention}**`;
                                              let entrantOneSlug = '';
                                              if (!(calledWave[w][s].slots[0].entrant.participants[0].user === null)) {
                                                entrantOneSlug = calledWave[w][s].slots[0].entrant.participants[0].user.slug.replace('user/', '');
                                                let entrantOneAccounts = calledWave[w][s].slots[0].entrant.participants[0].user.authorizations;
                                                if (!(entrantOneAccounts === null)) {
                                                  for (d = 0; d < entrantOneAccounts.length; d++) {
                                                    if (entrantOneAccounts[d].type === 'DISCORD') {
                                                      let userID = message.guild.members.cache.filter(member => member.user.tag === entrantOneAccounts[d].externalUsername).map(member => member.user.id);
                                                      if (!(userID[0] === undefined)) {
                                                        entrantOneMention = `<@${userID[0]}>`;
                                                      }
                                                    }
                                                  }
                                                }
                                              }

                                              let entrantTwoMention = replaceall('*', '\\*', calledWave[w][s].slots[1].entrant.participants[0].gamerTag);
                                              entrantTwoMention = replaceall('_', '\\_', entrantTwoMention);
                                              entrantTwoMention = `**${entrantTwoMention}**`;
                                              let entrantTwoSlug = '';
                                              if (!(calledWave[w][s].slots[1].entrant.participants[0].user === null)) {
                                                entrantTwoSlug = calledWave[w][s].slots[1].entrant.participants[0].user.slug.replace('user/', '');
                                                let entrantTwoAccounts = calledWave[w][s].slots[1].entrant.participants[0].user.authorizations;
                                                if (!(entrantTwoAccounts === null)) {
                                                  for (d = 0; d < entrantTwoAccounts.length; d++) {
                                                    if (entrantTwoAccounts[d].type === 'DISCORD') {
                                                      let userID = message.guild.members.cache.filter(member => member.user.tag === entrantTwoAccounts[d].externalUsername).map(member => member.user.id);
                                                      if (!(userID[0] === undefined)) {
                                                        entrantTwoMention = `<@${userID[0]}>`;
                                                      }
                                                    }
                                                  }
                                                }
                                              }

                                              accountModel.find({
                                                profileslug: { $in: [entrantOneSlug, entrantTwoSlug] }
                                              }, function (err, result) {
                                                if (err) throw err;
                                                if (result[0]) {
                                                  if (entrantOneSlug === result[0].profileslug) {
                                                    console.log('slugs matched on first');
                                                    entrantOneMention = `<@${result[0].discordid}>`;
                                                  } else {
                                                    console.log('slugs matched on second');
                                                    entrantTwoMention = `<@${result[0].discordid}>`;
                                                  }
                                                }

                                                if (result[1]) {
                                                  if (entrantOneSlug === result[1].profileslug) {
                                                    console.log('slugs matched on first');
                                                    entrantOneMention = `<@${result[1].discordid}>`;
                                                  } else {
                                                    console.log('slugs matched on second');
                                                    entrantTwoMention = `<@${result[1].discordid}>`;
                                                  }
                                                }
                                                dqchannel.send(`${entrantOneMention} and ${entrantTwoMention}, your match for ${endText}`).catch(err => console.log(err));
                                              }).catch(err => console.log(err));
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }).catch(err => console.log(err));
                            } else {
                              clearInterval(dqPingingMap.get(message.guild.id));
                              dqPingingMap.delete(message.guild.id);
                              sendMessage('Stopping DQ pinging - automatically end DQ pinging after six hours.');
                              console.log(`auto stopped after six hours in ${message.guild.name}`);
                            }
                          } else {
                            clearInterval(dqPingingMap.get(message.guild.id));
                            dqPingingMap.delete(message.guild.id);
                            sendMessage('Stopping DQ pinging - tournament has ended. If this is a mistake, check the tournament end time on smash.gg.');
                            console.log(`auto stopped in ${message.guild.name} because tournament ended`);
                          }
                        }, 5000));
                      } else { sendMessage('I could not start DQ pinging - tournament has not started.'); }
                    }
                  } else { sendMessage(`I could not start DQ pinging - no DQ pinging channel set. Do \`t!set dqpingchannel <#channel>\` to set DQ pinging channel.`); }
                }
              } else { sendMessage('I could not start DQ pinging - DQ pinging is currently happening.'); }
            } else { sendMessage('Something went wrong :confused: . Do \`t!help\` to get command info.'); }
            break;

          // t!dq stop
          case 'stop':
            // Step 7
            clearInterval(dqPingingMap.get(message.guild.id));
            if (dqPingingMap.delete(message.guild.id)) {
              sendMessage('DQ Pinging has stopped! :white_check_mark:');
              console.log(`TO stopped pinging in ${message.guild.name}`);
            } else {
              sendMessage('There is no active DQ pinging currently.');
            }
            break;

          default:
            sendMessage('I could not recognize the argument provided. Do \`t!help\` to get command info.');
        }
      }
    } else { sendMessage('you don\'t have the permissions for that :sob:', 'REPLY'); }
  }

  // t!set <argument>
  if (message.content.toLowerCase().startsWith(`${PREFIX}set`)) {
    if (message.channel instanceof Discord.DMChannel) { sendMessage('I cannot run this command in DMs.') }//do not execute
    else if (message.member.hasPermission('ADMINISTRATOR')) {
      let setArgs = message.content.split(' ');
      setArgs.shift();
      var Channel;
      let guildID = message.guild.id;

      if (setArgs[0] === undefined) {
        sendMessage(`No arguments given. Do \`t!help\` to get command info.
Possible Arguments: \`announcemessage <message>\`, \`announcechannel <#channel>\`, \`dqpingchannel <#channel>\`, \`pingrole <@role>\``);
      } else {
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
                sendMessage(`Previous Announcement Message: ${tournamentAnnounceMessage}
New Announcement Message: ${setArgs}`);
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
                  sendMessage(`The announcement message has been reset! :white_check_mark:`);
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
                      }).save().then(result => sendMessage('The announcement channel is now set! :white_check_mark:')).catch(err => console.log(err));
                    } else {
                      sendMessage('The announcement channel has been changed! :white_check_mark:')
                    }
                  }).catch(err => console.log(err));
                } else { sendMessage('I could not find the specified channel.'); }
              } else { sendMessage('I could not find the specified channel. Make sure you are pinging the channel using #.'); }
            } else { sendMessage('Something went wrong :confused: . Do \`t!help\` to get command info.'); }
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
                          sendMessage('The DQ pinging channel has been changed! :white_check_mark:');
                        }).catch(err => console.log(err));
                    } else {
                      let channelSet = new channelModel({
                        guildid: guildID,
                        channelid: Channel
                      }).save().then(result => sendMessage('The DQ pinging channel is now set! :white_check_mark:')).catch(err => console.log(err));
                    }
                  }).catch(err => console.log(err));
                } else { sendMessage('I could not find the specified channel.'); }
              } else { sendMessage('I could not find the specified channel. Make sure you are pinging the channel using #.'); }
            } else { sendMessage('Something went wrong :confused: . Do \`t!help\` to get command info.'); }
            break;

          // t!set pingrole <@role>
          case 'pingrole':
            if (setArgs.length === 2) {
              setArgs.shift();
              setArgs = setArgs.join(' ');
              let potentialRole = setArgs.replace('<@', '').replace('&', '').replace('>', '');
              var addedRole = message.guild.roles.cache.find(role => role.id === potentialRole);
              if (!(addedRole === undefined)) {
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
                      sendMessage(`The announcement pinging role has been changed to ${setArgs} :white_check_mark:`);
                    }).catch(err => console.log(err));
                  } else {
                    let roleSet = new pingroleModel({
                      guildid: guildID,
                      role: addedRole
                    }).save().then(result => sendMessage(`The announcement pinging role is now set to ${setArgs} :white_check_mark:`)).catch(err => console.log(err));
                  }
                }).catch(err => console.log(err));
              } else { sendMessage(`I could not find the specified role. Make sure you are pinging the role using @.`) }
            } else if (setArgs.length === 1) {
              pingroleModel.findOneAndDelete({
                guildid: guildID
              }, function (err, result) {
                if (err) throw err;
                sendMessage(`The announcement pinging role has been reset! :white_check_mark:`);
              }).catch(err => console.log(err));
            } else { sendMessage('Something went wrong :confused: . Do \`t!help\` to get command info.'); }
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
                      sendMessage(`The timezone has been changed to **${newTimezone}** :white_check_mark:`);
                    }).catch(err => console.log(err));
                  } else {
                    let timezoneSet = new timezoneModel({
                      guildid: guildID,
                      timezone: setArgs
                    }).save().then(result => sendMessage(`The timezone is now set to **${newTimezone}** :white_check_mark:`)).catch(err => console.log(err));
                  }
                }).catch(err => console.log(err));
              } else {
                sendMessage(`I could not recognize the city specified for timezone.
Currently Supported Cities: \`America/Los_Angeles\`, \`America/Phoenix\`, \`America/Denver\`, \`America/Regina\`, \`America/Chicago\`, \`America/New_York\`, \`Pacific/Honolulu\``)
              }
            } else if (setArgs.length === 1) {
              let currentDate = new Date();
              let newTimezone = currentDate.toLocaleString('default', { timeZoneName: 'short', timeZone: 'America/Los_Angeles' });
              newTimezone = newTimezone.slice(newTimezone.length - 3);
              timezoneModel.findOneAndDelete({
                guildid: guildID
              }, function (err, result) {
                if (err) throw err;
                sendMessage(`The timezone has been reset to **${newTimezone}** :white_check_mark:`);
              }).catch(err => console.log(err));
            } else { sendMessage('Something went wrong :confused: . Do \`t!help\` to get command info.'); }
            break;

          // t!set language <language>
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
                      sendMessage(`The language has been changed to **${setArgs}**.`);
                    }).catch(err => console.log(err));
                  } else {
                    let languageSet = new languageModel({
                      guildid: guildID,
                      language: setArgs
                    }).save().then(result => sendMessage(`The language is now set to **${setArgs}**.`)).catch(err => console.log(err));
                  }
                }).catch(err => console.log(err));
              } else { sendMessage('I could not find or do not support the language provided :sob: . Make sure the language specified is in shorthand format (ISO-639-1 Code). Check this to see which languages/codes are supported: https://cloud.google.com/translate/docs/languages.'); }
            } else if (setArgs.length === 1) {
              languageModel.findOneAndDelete({
                guildid: guildID
              }, function (err, result) {
                if (err) throw err;
                sendMessage(`The language has been reset to **English (en)**.`);
              }).catch(err => console.log(err));
            } else { sendMessage('Something went wrong :confused: . Do \`t!help\` to get command info.'); }
            break;

          default:
            sendMessage(`I could not recognize the argument provided. Do \`t!help\` to get command info.`);
        }
      }
    } else { sendMessage('you don\'t have the permissions for that :sob:', 'REPLY'); }
  }

  // t!announce <url> <ping/no ping>
  // Announce code is old, needs to be rewritten to be more readable and efficient
  if (message.content.toLowerCase().startsWith(`${PREFIX}announce`)) {
    if (message.channel instanceof Discord.DMChannel) { sendMessage('I cannot run this command in DMs.') }//do not execute
    else //execute
      if (message.member.hasPermission('ADMINISTRATOR')) {
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
                sendMessage(`Announcing in ${announcechannel.name}...`);
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
                    } else { sendMessage('I could not find a tournament from the short URL. Do \`t!help\` to get command info.'); }
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
                              eventNames.push(` - ${functions.convertEpoch(events[i].startAt, cityTimezone)}
Check-in opens at ${functions.convertEpochToClock(events[i].startAt - events[i].checkInBuffer - events[i].checkInDuration, cityTimezone, false)} and closes at ${functions.convertEpochToClock(events[i].startAt - events[i].checkInBuffer, cityTimezone, false)}.
`);
                            } else {
                              eventNames.push(` - ${functions.convertEpoch(events[i].startAt, cityTimezone)}
`);
                            }
                          }
                          let registrationCloseTime = functions.convertEpoch(data.data.tournament.registrationClosesAt, cityTimezone);
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
                              } else { sendMessage('I could not understand whether to ping or not. Do \`t!help\` to get command info.') }
                              function sendAnnouncement(ping) {
                                let finalAnnounceMessage = `${tournamentAnnounceMessage} ${tournamentURL}

Registration closes on ${registrationCloseTime}. 

Events:
${eventNames.join(``)}`;
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
                      } else { sendMessage(`I could not find the specified tournament. Do \`t!help\` to get command info.`); }
                    }).catch(err => console.log(err));
                }
              } else { sendMessage('There is no announcement channel set. Do \`t!help\` to get command info.'); }
            }).catch(err => console.log(err));
          } else (sendMessage('I could not recognize the URL provided. Do \`t!help\` to get command info.'));
        } else { sendMessage('Something went wrong :confused: . Do \`t!help\` to get command info.'); }
      } else { sendMessage('you don\'t have the permissions for that :sob:', 'REPLY'); }
  }

  // t!mm <argument>
  // Matchmaking needs to be completely redone coding-wise
  // No localization for part of matchmaking due to encoding messing with formatting
  if (message.content.toLowerCase().startsWith(`${PREFIX}mm`)) {
    mmArgs = message.content.split(' ');
    mmArgs.shift();

    if (mmArgs[0] === undefined) {
      sendMessage(`No arguments given. Do \`t!help\` to get command info.
Possible Arguments: \`set <@role>\`, \`on\`, \`off\`, \`list\`, \`ping\``);
    } else {
      let activeRole;
      let activeRoleID
      let activeRoleName;
      let activeRolePing;
      let userList;
      let guildID = message.guild.id;
      switch (mmArgs[0].toString()) {

        // t!mm set <@role>
        case 'set':
          if (message.member.hasPermission('ADMINISTRATOR')) {
            if (mmArgs.length >= 2) {
              mmArgs.shift();
              mmArgs = mmArgs.join(' ');
              let potentialRole = mmArgs.replace('<@&', '').replace('>', '');
              var addedRole = message.guild.roles.cache.find(role => role.id === potentialRole);
              if (!(addedRole === undefined)) {
                activeRoleID = addedRole.id;
                activeRolePing = `<@&${activeRoleID}>`;
                setRole();
              } else {
                addedRole = message.guild.roles.cache.find(role => role.name === potentialRole);
                if (!(addedRole === undefined)) {
                  activeRoleID = addedRole.id;
                  activeRolePing = `<@&${activeRoleID}>`;
                  setRole();
                } else { sendMessage(`I could not find the specified role. Make sure you are pinging the role using @.`); }
              }
              function setRole() {
                mmroleModel.find({
                  guildid: guildID
                }, function (err, result) {
                  if (err) throw err;
                  if (result.length) {
                    mmroleModel.replaceOne({
                      guildid: guildID
                    }, {
                      guildid: guildID,
                      role: addedRole
                    }, function (err, result) {
                      if (err) throw err;
                      sendMessage(`The matchmaking role has been changed to ${activeRolePing} :white_check_mark:`);
                    }).catch(err => console.log(err));
                  } else {
                    let roleSet = new mmroleModel({
                      guildid: guildID,
                      role: addedRole
                    }).save().then(result => sendMessage(`The matchmaking role is now set to ${activeRolePing} :white_check_mark:`)).catch(err => console.log(err));
                  }
                }).catch(err => console.log(err));
              }
            } else { sendMessage('Something went wrong :confused: . Do \`t!help\` to get command info.'); }
          } else { sendMessage('you don\'t have the permissions for that :sob:', 'REPLY'); }
          break;

        // t!mm on
        case 'on':
          mmroleModel.find({
            guildid: guildID
          }, function (err, result) {
            if (err) throw err;
            if (result.length) {
              activeRole = message.guild.roles.cache.find(role => role.id === result[0].role);
              activeRoleID = activeRole.id;
              activeRoleName = activeRole.name;
              if (message.member.roles.cache.some(role => role.id === activeRoleID)) { // role check
                mmuserModel.find({
                  roleid: activeRoleID
                }, function (err, result) {
                  if (err) throw err;
                  if (result.length) {
                    userList = result[0].activeusers;
                    var userMatched = false;
                    for (u = 0; u < userList.length; u++) {
                      if (`<@${message.member.id}>` === userList[u]) {
                        userMatched = true;
                      }
                    }
                    if (!userMatched) {
                      userList.push(`<@${message.member.id}>`);
                      mmuserModel.replaceOne({
                        roleid: activeRoleID
                      }, {
                        roleid: activeRoleID,
                        activeusers: userList
                      },
                        function (err, result) {
                          if (err) throw err;
                          message.reply(`you are now online for **${activeRoleName}**!`);
                        }).catch(err => console.log(err));
                    } else { message.reply(`you are already online.`); }
                  } else {
                    let userSet = new mmuserModel({
                      roleid: activeRoleID,
                      activeusers: [`<@${message.member.id}>`]
                    }).save().then(result => message.reply(`you are now online for **${activeRoleName}**!`)).catch(err => console.log(err));
                  }
                }).catch(err => console.log(err));
              } else { message.reply(`you do not have the **${activeRoleName}** role.`); }
            } else {
              message.reply(`There is no matchmaking role set. Admins can do \`t!mm set <role name without @>\` to set the matchmaking role.`);
            }
          }).catch(err => console.log(err));
          break;

        // t!mm off
        case 'off':
          // SET OFF TO SINGLE ROLE
          mmroleModel.find({
            guildid: guildID
          }, function (err, result) {
            if (err) throw err;
            if (result.length) {
              activeRole = message.guild.roles.cache.find(role => role.id === result[0].role);
              activeRoleID = activeRole.id;
              activeRoleName = activeRole.name;
              if (message.member.roles.cache.some(role => role.id === activeRoleID)) { // role check
                mmuserModel.find({
                  roleid: activeRoleID
                }, function (err, result) {
                  if (err) throw err;
                  userList = result[0].activeusers;
                  if (userList && userList.length) {
                    var userFound = false;
                    for (u = 0; u < userList.length; u++) {
                      if (`<@${message.member.id}>` === userList[u]) {
                        userFound = true;
                        userList.splice(u, 1);
                        mmuserModel.replaceOne({
                          roleid: activeRoleID
                        }, {
                          roleid: activeRoleID,
                          activeusers: userList
                        },
                          function (err, result) {
                            if (err) throw err;
                            message.reply(`you are now offline for **${activeRoleName}**!`);
                          }).catch(err => console.log(err));
                      }
                    }
                    if (!userFound) { message.reply(`you are not online for **${activeRoleName}** currently. Do \`t!mm on\` to go online.`) }
                  } else { message.reply(`no one is currently online for **${activeRoleName}**`); }
                }).catch(err => console.log(err));
              } else { message.reply(`you do not have the **${activeRoleName}** role.`); }
            } else {
              sendMessage(`There is no matchmaking role currently set. Admins can do \`t!mm set <role name without @>\` to set the matchmaking role.`)
            }
          }).catch(err => console.log(err));

          break;

        // t!mm list
        case 'list':
          mmroleModel.find({
            guildid: guildID
          }, function (err, result) {
            if (err) throw err;
            if (result.length) {
              activeRole = message.guild.roles.cache.find(role => role.id === result[0].role);
              activeRoleID = activeRole.id;
              activeRolePing = `<@&${activeRoleID}>`;
              mmuserModel.find({
                roleid: activeRoleID
              }, function (err, result) {
                if (err) throw err;
                let listMessage = [];
                if (result.length) {
                  userList = result[0].activeusers;
                  if (userList && userList.length) {
                    listMessage.push(`**Role:** ${activeRolePing}
**Online for Matchmaking:**
    ${userList.join(`
`)}
`);
                  } else {
                    listMessage.push(`**Role:** ${activeRolePing}
**Online for Matchmaking:**
*None*
`);
                  }
                } else {
                  listMessage.push(`**Role:** ${activeRolePing}
**Online for Matchmaking:**
*None*
`);
                }
                const rolesList = new Discord.MessageEmbed()
                  .setColor('#222326')
                  .setTitle('Matchmaking')
                  .setDescription(listMessage.join(`
`))
                  .setFooter('TournaBot', 'https://cdn.discordapp.com/attachments/719461475848028201/777094320531439636/image.png');
                message.channel.send(rolesList);
              }).catch(err => console.log(err));
            } else {
              sendMessage('There is no matchmaking role currently set. Admins can do \`t!mm set <role name without @>\` to set the matchmaking role.');
            }
          }).catch(err => console.log(err));
          break;

        // t!mm ping
        case 'ping':
          mmroleModel.find({
            guildid: guildID
          }, function (err, result) {
            if (err) throw err;
            if (result.length) {
              activeRole = message.guild.roles.cache.find(role => role.id === result[0].role);
              activeRoleID = activeRole.id;
              activeRoleName = activeRole.name;
              if (message.member.roles.cache.some(role => role.id === activeRoleID)) { // role check
                mmuserModel.find({
                  roleid: activeRoleID
                }, function (err, result) {
                  if (err) throw err;
                  userList = result[0].activeusers;
                  if (userList && userList.length) {
                    message.channel.send(userList.join(' '))
                      .then(message => {
                        message.delete();
                      })
                    message.channel.send(`\`\`\`yaml
@${activeRoleName}
\`\`\``);
                  } else { message.reply(`no one is currently online for **${activeRoleName}**`); }
                }).catch(err => console.log(err));
              } else { message.reply(`you do not have the **${activeRoleName}** role.`); }
            } else {
              sendMessage('There is no matchmaking role currently set. Admins can do \`t!mm set <role name without @>\` to set the matchmaking role.');
            }
          }).catch(err => console.log(err));
          break;

        default:
          sendMessage('I could not recognize the argument provided. Do \`t!help\` to get command info.');
      }
    }
  }

  //t!search <game>
  if (message.content.toLowerCase().startsWith(`${PREFIX}search`)) {
    // ids:
    // smash ultimate: 1386
    // valorant: 34223
    if (message.channel instanceof Discord.DMChannel) { sendMessage('I cannot run this command in DMs.') }//do not execute
    else //execute
      if (message.member.hasPermission('ADMINISTRATOR')) {
        let gameArgs = message.content.split(' ');
        gameArgs.shift();
        let game;
        let gameFound = false;
        let gameName;
        if (gameArgs.length >= 1) {
          if (gameArgs.join(' ').toLowerCase() == 'super smash bros. ultimate') {
            game = 1386;
            gameFound = true;
            gameName = 'Super Smash Bros. Ultimate';
          } else if (gameArgs.join(' ').toLowerCase() == 'valorant') {
            game = 34223;
            gameFound = true;
            gameName = 'Valorant'
          } else { sendMessage(`I could not find the specified game. Do \`t!help\` to get command info.`); }

          if (gameFound) {
            sendMessage(`Searching for the top 10 upcoming ${gameName} tournaments...`);
            var perPage = 10;
            var videogameId = game;
            var query = `query TournamentsByVideogame($videogameId: ID!) {
                            tournaments(query: {
                              perPage: 10
                              page: 1
                              sortBy: "startAt asc"
                              filter: {
                              upcoming: true
                              videogameIds: [
                              $videogameId
                                ]
                              }
                            }) {
                              nodes {
                                name
                                slug
                                images {
                                  url
                                }
                              }
                            }
                          }`;

            fetch('https://api.smash.gg/gql/alpha', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + SMASHGGTOKEN
              },
              body: JSON.stringify({
                query,
                variables: { perPage, videogameId },
              })
            })
              .then(r => r.json())
              .then(data => {
                let upcomingTournaments = data.data.tournaments.nodes;
                let tournamentArray = [[], [], [], [], [], [], [], [], [], []];
                for (i = 0; i < upcomingTournaments.length; i++) {
                  tournamentArray[i].push(upcomingTournaments[i]);
                }
                const generateEmbed = index => {
                  let iconurl;
                  let backgroundurl;
                  // replace below with ternary operator
                  if (tournamentArray[index][0].images[0]) {
                    iconurl = tournamentArray[index][0].images[0].url;
                  }
                  if (tournamentArray[index][0].images[1]) {
                    backgroundurl = tournamentArray[index][0].images[1].url;
                  }
                  const results = new Discord.MessageEmbed()
                    .setColor('#222326')
                    .setTitle(tournamentArray[index][0].name)
                    .setURL(`https://smash.gg/${tournamentArray[index][0].slug}`)
                    .setThumbnail(iconurl)
                    .setImage(backgroundurl)
                    .setFooter(`Tournament ${index + 1} of 10`, 'https://cdn.discordapp.com/attachments/719461475848028201/777094320531439636/image.png');
                  return results;
                }

                let currentIndex = 0;
                message.channel.send(generateEmbed(currentIndex)).then(message => {
                  message.react('⬅️');
                  message.react('➡️');
                  const filter = (reaction, user) => {
                    return (reaction.emoji.name === '⬅️' || reaction.emoji.name === '➡️') && user.id != message.author.id;
                  };

                  const collector = message.createReactionCollector(filter, { time: 300000 });

                  collector.on('collect', (reaction, user) => {

                    if (reaction.emoji.name === '➡️') {
                      if (currentIndex < 9) {
                        currentIndex++;
                        message.edit(generateEmbed(currentIndex));
                      }
                    } else {
                      if (currentIndex > 0) {
                        currentIndex--;
                        message.edit(generateEmbed(currentIndex));
                      }
                    }
                  });

                  collector.on('end', collected => {
                    console.log(`Done collecting for search`);
                  });
                }).catch(err => console.log(err));

              }).catch(err => console.log(err));
          } else { sendMessage(`I could not find the specified game. Do \`t!help\` to get command info.`); }
        } else { sendMessage(`There is no game provided. Do \`t!help\` to get command info.`); }
      } else { sendMessage('you don\'t have the permissions for that :sob:', 'REPLY'); }
  }

  function sendMessage(specifiedMessage, messageType) {
    let guildID;
    message.guild === null ? guildID = '' : guildID = message.guild.id;
    languageModel.find({
      guildid: guildID
    }, function (err, result) {
      if (err) throw err;
      if (result.length) {
        fetch(`https://api.mymemory.translated.net/get?q=${fixedEncodeURIComponent(specifiedMessage)}&langpair=en|${result[0].language}&de=random@gmail.com`)
          .then(res => res.json())
          .then(json => {
            let translation = json.responseData.translatedText;
            translation === null ? generateAndSend(specifiedMessage) : translation.toUpperCase() != translation ? generateAndSend(translation) : generateAndSend(specifiedMessage);
          }).catch(err => console.log(err));
        function fixedEncodeURIComponent(str) {
          return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
          });
        }
      } else { generateAndSend(specifiedMessage); }
    }).catch(err => console.log(err));
    function generateAndSend(finalMessage) {
      const messageEmbed = new Discord.MessageEmbed()
        .setColor('#222326')
        .setDescription(finalMessage);
      switch (messageType) {
        case 'EMBED':

          message.channel.send(messageEmbed);
          break;

        case 'REPLY':
          message.reply(finalMessage);
          break;

        case 'SEND':
          message.channel.send(finalMessage);
          break;

        default:
          message.channel.send(messageEmbed);
      }
    }
  }
});

//client.login(ALTDISCORDTOKEN);
client.login(DISCORDTOKEN);
