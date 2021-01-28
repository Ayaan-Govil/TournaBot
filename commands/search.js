// Dependencies
const Discord = require('discord.js');
const { SMASHGGTOKEN } = require('../config.json');
const fetch = require('node-fetch');
const { convertEpoch, convertEpochToClock, sendMessage } = require('../functions');

module.exports = {
  name: 'search',
  description: 'Search for the top 10 upcoming tournaments by game.',
  execute(message) {
    // IDs:
    // Smash Ultimate: 1386
    // Valorant: 34223
    // if (!(message.channel instanceof Discord.DMChannel) && !message.member.hasPermission('ADMINISTRATOR')) {
    //   message.channel instanceof Discord.DMChannel ? sendMessage(message, 'You don\'t have the permissions for that :sob:', 'REPLY') : sendMessage(message, 'you don\'t have the permissions for that :sob:', 'REPLY');
    //   return;
    // }
    let gameArgs = message.content.split(' ');
    gameArgs.shift();
    let game;
    let gameFound = false;
    let gameName;
    if (gameArgs.length >= 1) {

      switch (gameArgs.join(' ').toLowerCase()) {
        case 'super smash bros. ultimate':
        case 'super smash bros ultimate':
        case 'smash bros. ultimate':
        case 'smash bros ultimate':
        case 'smash ultimate':
        case 'ultimate':
          game = 1386;
          gameFound = true;
          gameName = 'Super Smash Bros. Ultimate';
          break;

        case 'valorant':
          game = 34223;
          gameFound = true;
          gameName = 'Valorant'
          break;
      }

      if (gameFound) {
        sendMessage(message, `Searching for upcoming ${gameName} tournaments...`);
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
                            id
                            name
                            slug
                            numAttendees
                            startAt
                            isOnline
                            images {
                              height
                              width
                              url
                            }
                            events {
                              id
                              name
                              numEntrants
                              startAt
                              checkInEnabled
                              checkInBuffer
                              checkInDuration
                            }
                            streams {
                              streamSource
                              streamName
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
            let tournamentArray = [];

            for (i = 0; i < upcomingTournaments.length; i++) {
              tournamentArray[i] = upcomingTournaments[i];
            }

            const generateEmbed = index => {

              return searchEmbed();

              function searchEmbed() {
                let tournament = tournamentArray[index];

                let imageurl = ['', ''];
                for (let image of tournament.images) {
                  if (image) image.height === image.width ? imageurl[0] = image.url : imageurl[1] = image.url;
                }

                let tournamentOnline = 'Offline';
                if (tournament.isOnline) tournamentOnline = 'Online';

                let events = [];
                for (e = 0; e < tournament.events.length; e++) {
                  if (e < 3) {
                    events.push(`\`${tournament.events[e].name}\``);
                    events.push(`${tournament.events[e].numEntrants} Entrants`);
                    events.push(`*${convertEpoch(tournament.events[e].startAt, 'America/Los_Angeles')}*`);
                    if (tournament.events[e].checkInEnabled) events.push(`__Check-in opens at ${convertEpochToClock(tournament.events[e].startAt - tournament.events[e].checkInBuffer - tournament.events[e].checkInDuration, 'America/Los_Angeles', false)} and closes at ${convertEpochToClock(tournament.events[e].startAt - tournament.events[e].checkInBuffer, 'America/Los_Angeles', false)}.__`);
                  } else {
                    events.push('\`And more...\`');
                    e = tournament.events.length;
                  }
                }

                let streams = [];
                if (tournament.streams) {
                  for (let stream of tournament.streams) {
                    if (stream.streamSource === 'TWITCH') {
                      streams.push(`https://twitch.tv/${stream.streamName}`);
                    }
                  }
                }

                const searchEmbed = new Discord.MessageEmbed()
                  .setColor('#222326')
                  .setTitle(tournament.name)
                  .setURL(`https://smash.gg/${tournament.slug}`)
                  .setThumbnail(imageurl[0])
                  .setImage(imageurl[1])
                  .addFields(
                    {
                      name: 'Tournament Info', value: `
${tournament.numAttendees} Attendees
*${tournamentOnline} Tournament*
*${convertEpoch(tournament.startAt, 'America/Los_Angeles')}*`, inline: true
                    },
                    { name: 'Events', value: events.join('\n'), inline: true },
                  )
                  .setFooter(`Tournament ${index + 1} of ${tournamentArray.length}`, 'https://cdn.discordapp.com/attachments/719461475848028201/777094320531439636/image.png');
                if (streams.length) searchEmbed.addField('Streams', streams.join('\n'));
                return searchEmbed;
              }
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
                  if (currentIndex < tournamentArray.length - 1) {
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
      } else { sendMessage(message, `I could not find the specified game. Do \`t!help\` to get command info.`); }
    } else { sendMessage(message, `There is no game provided. Do \`t!help\` to get command info.`); }
  },
};
