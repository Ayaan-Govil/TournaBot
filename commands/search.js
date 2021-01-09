// Dependencies
const Discord = require('discord.js');
const { SMASHGGTOKEN } = require('../config.json');
const fetch = require('node-fetch');
const { sendMessage } = require('../functions');

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
      if (gameArgs.join(' ').toLowerCase() == 'super smash bros. ultimate') {
        game = 1386;
        gameFound = true;
        gameName = 'Super Smash Bros. Ultimate';
      } else if (gameArgs.join(' ').toLowerCase() == 'valorant') {
        game = 34223;
        gameFound = true;
        gameName = 'Valorant'
      } else { sendMessage(message, `I could not find the specified game. Do \`t!help\` to get command info.`); }

      if (gameFound) {
        sendMessage(message, `Searching for the top 10 upcoming ${gameName} tournaments...`);
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
                                  height
                                  width
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
            //if (tournamentArray[index][0]
            const generateEmbed = index => {
              let imageurl = ['', ''];
              for (let image of tournamentArray[index][0].images) {
                if (image) {
                  image.height === image.width ? imageurl[0] = image.url : imageurl[1] = image.url;
                }
              }
              const results = new Discord.MessageEmbed()
                .setColor('#222326')
                .setTitle(tournamentArray[index][0].name)
                .setURL(`https://smash.gg/${tournamentArray[index][0].slug}`)
                .setThumbnail(imageurl[0])
                .setImage(imageurl[1])
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
      } else { sendMessage(message, `I could not find the specified game. Do \`t!help\` to get command info.`); }
    } else { sendMessage(message, `There is no game provided. Do \`t!help\` to get command info.`); }
  },
};
