// Dependencies
const Discord = require('discord.js');
const { SMASHGGTOKEN } = require('./config.json');
const fetch = require('node-fetch');
const Vibrant = require('node-vibrant');
const accurateInterval = require('accurate-interval');
const setAccurateTimeout = require('set-accurate-timeout');
const { convertEpoch, convertEpochToClock } = require('./functions');

// MongoDB Models
const accountModel = require('./database/models/account');

// Map used for tracking reminders
// Cannot ping two tournaments within the same hour for a person, but that shouldn't be an issue
const reminderMap = new Map();

async function remindLoop(client) {

  const loop = accurateInterval(setReminders, 3600000, { immediate: true });

  let loopTracker = 0;
  function setReminders() {
    loopTracker++;
    console.log(`Iterating through reminder loop ${loopTracker} at ${convertEpochToClock(Date.now() / 1000, 'America/Los_Angeles', true)}`);
    accountModel.find({
      reminder: true
    }, function (err, result) {
      if (err) throw err;
      // Will add delay for one second per iteration or ask for rate limit upgrade if rate limit is reached
      for (let user of result) {
        //console.log(`Iterating through ${user.discordtag}`);
        let discordID = user.discordid;
        var slug = user.profileslug;
        var query = `query UserUpcomingTournaments($slug: String) {
          user(slug: $slug) {
            tournaments(query: {filter: {
              upcoming: true,
              past: false
            }}) {
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
            let upcomingTournaments = data.data.user.tournaments.nodes
            if (upcomingTournaments) {
              upcomingTournaments.reverse();
              for (let tournament of upcomingTournaments) {
                if (!reminderMap.has(discordID)) {
                  let timeDiff = tournament.startAt - Date.now() / 1000;
                  //console.log(`Time Difference: ${timeDiff / 3600} Hours`);
                  if (timeDiff <= 7200 && timeDiff >= 3600) {
                    console.log(`Tournament found that is within 1-2 hour constraint at ${convertEpoch(Date.now() / 1000, 'America/Los_Angeles')}. Setting reminder...`);
                    let offset = tournament.startAt * 1000 - Date.now() - 3600000;

                    reminderMap.set(discordID, setAccurateTimeout(function () { reminder(discordID, tournament) }, offset));

                    function reminder(id, tournament) {
                      let imageurl = ['', ''];
                      for (let image of tournament.images) {
                        if (image) image.height === image.width ? imageurl[0] = image.url : imageurl[1] = image.url;
                      }

                      if (imageurl[0].length) {
                        let v = new Vibrant(imageurl[0]);
                        v.getPalette(function (err, palette) {
                          if (err) throw err;
                          sendReminder(palette.Vibrant._rgb);
                        }).catch(err => console.log(err));
                      } else sendReminder('#222326');

                      function sendReminder(sideColor) {

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

                        const reminderEmbed = new Discord.MessageEmbed()
                          .setColor(sideColor)
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
                          .setTimestamp()
                          .setFooter('TournaBot', 'https://cdn.discordapp.com/attachments/719461475848028201/777094320531439636/image.png');
                        if (streams.length) reminderEmbed.addField('Streams', streams.join('\n'));

                        reminderMap.delete(id) ? console.log('Removed reminder from list.') : console.log('Could not remove reminder from list');

                        console.log(`Executing a reminder at ${convertEpoch(Date.now() / 1000, 'America/Los_Angeles')}`);
                        let DMChannel = client.users.cache.get(id.toString());
                        DMChannel.send('**REMINDER:** You have signed up for the following tournament, which begins in an hour:').then(() => DMChannel.send(reminderEmbed)).catch(err => console.log(err));
                      }
                    }
                  }
                }
              }
            } //else console.log(`No upcoming tournaments for ${user.discordtag}`);
          }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err));
  }
}

module.exports = remindLoop;
