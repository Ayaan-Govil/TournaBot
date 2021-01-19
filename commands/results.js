// Dependencies
const Discord = require('discord.js');
const { SMASHGGTOKEN } = require('../config.json');
const characters = require('../database/character_codes.json');
const characterfile = new Map(Object.entries(characters))
const fetch = require('node-fetch');
const Vibrant = require('node-vibrant');
const replaceall = require('replaceall');
const { convertEpoch, sendMessage } = require('../functions');

// MongoDB Models
const accountModel = require('../database/models/account');
const timezoneModel = require('../database/models/timezone');

module.exports = {
  name: 'results',
  description: 'Show user-specific tournament results.',
  execute(message, client) {
    // NEEDS TO BE REFORMED USING WHILE LOOP AND DOING CHECKS ON DATA AFTER SORTING
    // TODO FOR RESULTS:
    // use empty character to push set information to third inline column
    // character catch for events
    // more testing (round robin, ladder, etc.)
    // *search for anyones results by keyword
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
          sendMessage(message, `Getting the latest tournament results for ${formattedName}...`);
          playerIds = data.data.user.player.id;
          if (data.data.user.images[0]) {
            if (data.data.user.images[0].height === data.data.user.images[0].width) {
              imageurl = data.data.user.images[0].url;
            } else if (data.data.user.images[1]) {
              if ((data.data.user.images[0].height < data.data.user.images[1].height) && (data.data.user.images[0].width < data.data.user.images[1].width)) {
                imageurl = data.data.user.images[0].url;
              } else {
                imageurl = data.data.user.images[1].url;
              }
            }
          }
          let guildID = '';
          !message.guild ? guildID = message.channel.id : guildID = message.guild.id;
          timezoneModel.find({
            guildid: guildID
          }, function (err, result) {
            if (err) throw err;
            result.length ? cityTimezone = result[0].timezone : cityTimezone = 'America/Los_Angeles';
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
                              selectionValue
                              entrant {
                                name
                                id
                              }
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
                        let tournamentTime = convertEpoch(tournamentsdone[t].startAt, cityTimezone);
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
                                if (setGames) {
                                  // For each game played within the set
                                  for (g = 0; g < setGames.length; g++) {
                                    if (setGames[g].selections) {
                                      for (c = 0; c < setGames[g].selections.length; c++) {
                                        if (setGames[g].selections[c]) {
                                          let altNum = Math.abs(c - 1);
                                          if (setGames[g].selections[c].entrant.id === setsdone[s].slots[c].entrant.id) {
                                            let charName = characterfile.get(setGames[g].selections[c].selectionValue.toString());
                                            let charEmoji = client.emojis.cache.find(emoji => emoji.name === charName);
                                            if (!charactersPlayed[c].includes(charEmoji)) {
                                              charactersPlayed[c].push(charEmoji);
                                            }
                                          } else {
                                            if (setGames[g].selections[altNum]) {
                                              let charName = characterfile.get(setGames[g].selections[altNum].selectionValue.toString());
                                              let charEmoji = client.emojis.cache.find(emoji => emoji.name === charName);
                                              if (!charactersPlayed[c].includes(charEmoji)) {
                                                charactersPlayed[c].push(charEmoji);
                                              }
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
                    } else sendResults('#222326');

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

                      var currentIndex = 0;
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
                  } else { sendMessage(message, 'This user does not have any results from their past 15 tournaments (includes admined/spectated tournaments).'); }
                }
              }).catch(err => console.log(err));
          }
        }).catch(err => console.log(err));
    }

    function callBackMessage() {
      sendMessage(message, `I could not find ${potentialTag} in my account database :x: . 

\`t!account link <smash.gg profile URL>\` gives access to account-based commands.`);
    }

  },
};
