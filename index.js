// Dependencies
const Discord = require('discord.js');
const { PREFIX, DISCORDTOKEN, ALTDISCORDTOKEN, SMASHGGTOKEN } = require('./config.json');
const database = require('./database/database');
const fetch = require('node-fetch');
const urllib = require('urllib');
const replaceall = require('replaceall');
const accurateInterval = require('accurate-interval');
const { closest } = require('fastest-levenshtein');
const { convertEpochToClock, sendMessage } = require('./functions');
const remindLoop = require('./remind_loop');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// MongoDB Models
const channelModel = require('./database/models/channel');
const accountModel = require('./database/models/account');

// Maps used for tracking DQ pinging
const dqReminderMap = new Map();
const dqPingingMap = new Map();

// Keep in mind that I (creator of TournaBot) am still a relatively inexperienced coder. I'll try to improve my own code as I learn more.

// Reminders + DQ Pinging are currently located in index.js for async tasking, however, I would like to seperate them entirely into seperate files/processes while still retaining async.

// On Discord client ready
client.once('ready', () => {
  console.log(`Ready at ${convertEpochToClock(Date.now() / 1000, 'America/Los_Angeles', true)}`);
  database.then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));
  client.user.setActivity('for t!help - v4.1.3', { type: 'WATCHING' });

  // Loop for tracking and setting tournament reminders
  // Comment this function out for development unrelated to it
  remindLoop(client);
});

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
    .setDescription(`Thank you for inviting me to ${guild.name}! You can do \`t!help\` to get command info. If you enjoy TournaBot's features, please upvote it on the [top.gg page](https://top.gg/bot/719283403698077708)!`);
  defaultChannel.send(joinEmbed).catch(err => console.log(err));
  console.log('Added to: ' + guild.name);
});

// On message recieved, check for commands
client.on('message', message => {

  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const command = message.content.slice(PREFIX.length).trim().split(/ +/).shift().toLowerCase();
  if (command != 'dq') {

    if (!client.commands.has(command)) {
      if (!command) {
        message.channel instanceof Discord.DMChannel ? message.reply('You can do `t!help` to see command info.') : message.reply('you can do `t!help` to see command info.');
      } else { message.reply(`I could not recognize that command. Did you mean \`t!${closest(command, ['help', 'account', 'results', 'dq', 'set', 'announce', 'mm', 'search'])}\`?`); }
      return;
    }

    try {
      client.commands.get(command).execute(message, client, message);
    } catch (err) {
      console.log(err);
    }

  } else {
    // DQ PINGING

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

    // TODO:
    // Need to add doubles/teams support to DQ pinging
    // for event name stop dq pinging when reached grand finals
    // allow people to choose multiple events with event number
    // simplify one/two variables into loop
    // DQ pinging can be rewritten to be more efficient and readable
    // Catch for event name if the event could not be found
    if (message.channel instanceof Discord.DMChannel) { sendMessage(message, 'I cannot run this command in DMs.'); } //do not execute
    else if (message.member.hasPermission('ADMINISTRATOR')) {
      let dqArgs = message.content.split(' ');
      dqArgs.shift();
      if (dqArgs[0] === undefined) {
        sendMessage(message, `No arguments given. Do \`t!help\` to get command info.

Possible arguments: \`ping <tournament URL or smash.gg short URL>\`, \`stop\``);
      } else {
        switch (dqArgs[0].toLowerCase()) {

          // t!dq ping <tournament URL or smash.gg short URL>
          case 'ping':
            // Step 2
            if (dqArgs.length >= 2) {
              dqArgs.shift();
              if (!dqPingingMap.has(message.guild.id)) {
                let dqChannel;
                let urlSlug;
                if (dqArgs[0].startsWith('smash.gg/')) {
                  // Find path of short URL and parse URL for slug
                  urllib.request('https://' + dqArgs[0], function (err, data, res) {
                    if (err) console.log(err);
                    if (!(res.headers.location == undefined)) {
                      urlSlug = res.headers.location.replace('https://smash.gg/tournament/', '');
                      urlSlug = urlSlug.split('/');
                      urlSlug.splice(1);
                      urlSlug = urlSlug.toString();
                      channelModel.find({
                        guildid: `${message.guild.id}dq`
                      }, function (err, result) {
                        if (err) throw err;
                        if (result.length) dqChannel = result[0].channelid;

                        dqPing(urlSlug);

                      }).catch(err => console.log(err));
                    } else { sendMessage(message, 'I could not find a tournament from the short URL. Do \`t!help\` to get command info.'); }
                  });
                } else if (dqArgs[0].startsWith('https://smash.gg/tournament/')) {
                  urlSlug = dqArgs[0].replace('https://smash.gg/tournament/', '');
                  urlSlug = urlSlug.split('/');
                  urlSlug.splice(1);
                  urlSlug = urlSlug.toString();
                  channelModel.find({
                    guildid: `${message.guild.id}dq`
                  }, function (err, result) {
                    if (err) throw err;
                    if (result.length) dqChannel = result[0].channelid;

                    dqPing(urlSlug);

                  }).catch(err => console.log(err));
                } else { sendMessage(message, 'I could not recognize the URL provided. Do \`t!help\` to get command info.'); }

                function dqPing(slugSpecified) {
                  if (dqChannel) {
                    console.log(`starting dq pinging in ${message.guild.name}`);
                    sendMessage(message, 'Starting DQ pinging...');

                    dqChannel = client.channels.cache.get(dqChannel);
                    let eventNumber = parseInt(dqArgs[1]);
                    let pingEvent = false;
                    let indexEvent;
                    if (Number.isInteger(eventNumber)) {
                      if (eventNumber > 0) {
                        indexEvent = parseInt(dqArgs[1]) - 1;
                        console.log('integer: ' + indexEvent);
                      }
                    }
                    dqArgs.shift();
                    let potentialEventName = dqArgs.join(' ');

                    let filterByName = false;
                    let tournamentEnd;
                    let tournamentStarted = true;
                    let autoStop = Date.now() + 21600000;

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
                        if (data.data.tournament) {
                          tournamentEnd = data.data.tournament.endAt * 1000;
                          console.log('tournament end: ' + tournamentEnd);
                          console.log('current time: ' + Date.now());
                          if (data.data.tournament.events[indexEvent]) {
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

                        } else { sendMessage(message, 'I could not find any tournament data from the URL provided :confused: . Do \`t!help\` to get command info.'); }
                      }).catch(err => console.log(err));

                    function DQLoop() {
                      let messagesSent = 20;
                      let setsPinged = new Set();
                      // Step a + 6
                      if (tournamentStarted) {
                        // test functions.js to use dqChannel in replacement of message argument
                        const reminderEmbed = new Discord.MessageEmbed()
                          .setColor('#222326')
                          .setDescription(`If your username shows up in **bold**, make sure to link your account via \`t!account link <smash.gg profile URL>\` (DMs or server) in order to get pinged!

You can also get pinged by going to **Connected Accounts** on smash.gg and displaying your Discord account on your profile.`);

                        // Need to create intuitive algorithm for linking reminders
                        dqReminderMap.set(message.guild.id, accurateInterval(function () {
                          if (messagesSent === 20) {
                            messagesSent = 0;
                            dqChannel.send(reminderEmbed);
                          }
                        }, 3600000, { immediate: true }));

                        dqPingingMap.set(message.guild.id, accurateInterval(function () {
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
                                              if (calledWave[w]) {
                                                for (s = 0; s < calledWave[w].length; s++) {
                                                  // console.log('set found');
                                                  if (!setsPinged.has(calledWave[w][s].id)) {
                                                    setsPinged.add(calledWave[w][s].id);
                                                    // console.log('id added');
                                                    let quips = ['Please check-in on smash.gg!', 'Get ready to rumble!', 'Round 1, FIGHT!', '3.. 2.. 1.. GO!', 'Choose your character!', 'Start battle!'];
                                                    let endText = `\`${calledWave[w][s].fullRoundText}\` in **${activeEvents[e].name}** has been called. ${quips[Math.floor(Math.random() * 6)]}`;

                                                    pingUser(calledWave, endText, w, s);

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
                                        if (calledWave) {
                                          for (w = 0; w < calledWave.length; w++) {
                                            // console.log('wave found');
                                            if (calledWave[w]) {
                                              for (s = 0; s < calledWave[w].length; s++) {
                                                // console.log('set found');
                                                if (!setsPinged.has(calledWave[w][s].id)) {
                                                  setsPinged.add(calledWave[w][s].id);
                                                  // console.log('id added');
                                                  let quips = ['Please check-in on smash.gg!', 'Get ready to rumble!', 'Round 1, FIGHT!', '3.. 2.. 1.. GO!', 'Choose your character!', 'Start battle!'];
                                                  let endText = `\`${calledWave[w][s].fullRoundText}\` in **${activeEvents[e].name}** has been called. ${quips[Math.floor(Math.random() * 6)]}`;

                                                  pingUser(calledWave, endText, w, s);

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
                                    if (calledWave) {
                                      for (w = 0; w < calledWave.length; w++) {
                                        //console.log('wave found');
                                        if (calledWave[w]) {
                                          for (s = 0; s < calledWave[w].length; s++) {
                                            // console.log('set found');
                                            if (!setsPinged.has(calledWave[w][s].id)) {
                                              setsPinged.add(calledWave[w][s].id);
                                              // console.log('id added');
                                              let quips = ['Please check-in on smash.gg!', 'Get ready to rumble!', 'Round 1, FIGHT!', '3.. 2.. 1.. GO!', 'Choose your character!', 'Start battle!'];
                                              let endText = `\`${calledWave[w][s].fullRoundText}\` in **${activeEvents[indexEvent].name}** has been called. ${quips[Math.floor(Math.random() * 6)]}`;

                                              pingUser(calledWave, endText, w, s);

                                            }
                                          }
                                        }
                                      }
                                    }
                                  }

                                  function pingUser(calledWave, endText, w, s) {
                                    let entrantMentions = ['', ''];
                                    let entrantSlugs = ['', ''];

                                    for (ent = 0; ent < 2; ent++) {
                                      entrantMentions[ent] = replaceall('*', '\\*', calledWave[w][s].slots[ent].entrant.participants[0].gamerTag);
                                      entrantMentions[ent] = replaceall('_', '\\_', entrantMentions[ent]);
                                      entrantMentions[ent] = `**${entrantMentions[ent]}**`;
                                      if (calledWave[w][s].slots[ent].entrant.participants[0].user) {
                                        entrantSlugs[ent] = calledWave[w][s].slots[ent].entrant.participants[0].user.slug.replace('user/', '');
                                        let entrantOneAccounts = calledWave[w][s].slots[ent].entrant.participants[0].user.authorizations;
                                        if (entrantOneAccounts) {
                                          for (d = 0; d < entrantOneAccounts.length; d++) {
                                            if (entrantOneAccounts[d].type === 'DISCORD') {
                                              let userID = message.guild.members.cache.filter(member => member.user.tag === entrantOneAccounts[d].externalUsername).map(member => member.user.id);
                                              if (userID[0]) {
                                                entrantMentions[ent] = `<@${userID[0]}>`;
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }

                                    accountModel.find({
                                      profileslug: { $in: entrantSlugs }
                                    }, function (err, result) {
                                      if (err) throw err;

                                      if (result[0]) entrantSlugs[0] === result[0].profileslug ? entrantMentions[0] = `<@${result[0].discordid}>` : entrantMentions[1] = `<@${result[0].discordid}>`;

                                      if (result[1]) entrantSlugs[0] === result[1].profileslug ? entrantMentions[0] = `<@${result[1].discordid}>` : entrantMentions[1] = `<@${result[1].discordid}>`;

                                      dqChannel.send(`${entrantMentions[0]} and ${entrantMentions[1]}, your match for ${endText}`).catch(err => console.log(err));
                                      messagesSent++;

                                    }).catch(err => console.log(err));
                                  }
                                }).catch(err => console.log(err));
                            } else {
                              let dqLoop = dqPingingMap.get(message.guild.id);
                              let dqReminderLoop = dqReminderMap.get(message.guild.id);
                              if (dqLoop) dqLoop.clear();
                              if (dqReminderLoop) dqReminderLoop.clear();
                              dqPingingMap.delete(message.guild.id);
                              dqReminderMap.delete(message.guild.id);
                              sendMessage(message, 'Stopping DQ pinging - automatically end DQ pinging after six hours.');
                              console.log(`auto stopped after six hours in ${message.guild.name}`);
                              return;
                            }
                          } else {
                            let dqLoop = dqPingingMap.get(message.guild.id);
                            let dqReminderLoop = dqReminderMap.get(message.guild.id);
                            if (dqLoop) dqLoop.clear();
                            if (dqReminderLoop) dqReminderLoop.clear();
                            dqPingingMap.delete(message.guild.id);
                            dqReminderMap.delete(message.guild.id);
                            sendMessage(message, 'Stopping DQ pinging - tournament has ended. If this is a mistake, check the tournament end time on smash.gg.');
                            console.log(`auto stopped in ${message.guild.name} because tournament ended`);
                            return;
                          }
                        }, 5000, { immediate: true }));
                      } else { sendMessage(message, 'I could not start DQ pinging - tournament has not started.'); }
                    }
                  } else { sendMessage(message, `I could not start DQ pinging - no DQ pinging channel set. Do \`t!set dqpingchannel <#channel>\` to set DQ pinging channel.`); }
                }
              } else { sendMessage(message, 'I could not start DQ pinging - DQ pinging is currently happening.'); }
            } else { sendMessage(message, 'Something went wrong :confused: . Do \`t!help\` to get command info.'); }
            break;

          // t!dq stop
          case 'stop':
            // Step 7
            let dqLoop = dqPingingMap.get(message.guild.id);
            let dqReminderLoop = dqReminderMap.get(message.guild.id);
            if (dqLoop) dqLoop.clear();
            if (dqReminderLoop) dqReminderLoop.clear();
            if (dqPingingMap.delete(message.guild.id) && dqReminderMap.delete(message.guild.id)) {
              sendMessage(message, 'DQ Pinging has stopped! :white_check_mark:');
              console.log(`TO stopped pinging in ${message.guild.name}`);
            } else {
              sendMessage(message, 'There is no active DQ pinging currently.');
            }
            break;

          default:
            sendMessage(message, 'I could not recognize the argument provided. Do \`t!help\` to get command info.');
        }
      }
    } else { sendMessage(message, 'you don\'t have the permissions for that :sob:', 'REPLY'); }
  }

});

//client.login(ALTDISCORDTOKEN);
client.login(DISCORDTOKEN);
