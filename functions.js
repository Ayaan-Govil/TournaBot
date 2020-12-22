const Discord = require('discord.js');
const languageModel = require('./database/models/language');
const fetch = require('node-fetch');

function convertEpoch(epoch, citytimezone) {
  let convertedTime;
  let date = new Date(0);
  date.setUTCSeconds(epoch);
  let year = date.toLocaleString('default', { year: 'numeric', timeZone: citytimezone });
  let month = date.toLocaleString('default', { month: 'long', timeZone: citytimezone });
  let monthDate = date.toLocaleString('default', { day: '2-digit', timeZone: citytimezone });
  let dayOfTheWeek = date.toLocaleString('default', { weekday: 'long', timeZone: citytimezone });
  let hour = date.toLocaleString('default', { hour: '2-digit', timeZone: citytimezone });
  let minutes = date.toLocaleString('default', { minute: '2-digit', timeZone: citytimezone });
  let timezone = date.toLocaleString('default', { timeZoneName: 'short', timeZone: citytimezone });
  let firstTen = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
  let ampm;
  if (monthDate.startsWith(0)) {
    monthDate = monthDate.slice(1);
  }
  // replace below with ternary operator
  if (hour.includes('PM')) {
    ampm = 'PM';
  } else {
    ampm = 'AM';
  }
  hour = hour.replace(/\D/g, '');
  if (hour.startsWith(0)) {
    hour = hour.slice(1);
  }
  if (minutes.length === 1) {
    minutes = firstTen[minutes];
  }
  timezone = timezone.slice(timezone.length - 3);
  convertedTime = `${dayOfTheWeek}, ${month} ${monthDate}, ${year}, at ${hour}:${minutes} ${ampm} ${timezone}`;
  return convertedTime;
}

function convertEpochToClock(epoch, citytimezone, showSeconds) {
  let convertedTime;
  let date = new Date(0);
  date.setUTCSeconds(epoch);
  let hour = date.toLocaleString('default', { hour: '2-digit', timeZone: citytimezone });
  let minutes = date.toLocaleString('default', { minute: '2-digit', timeZone: citytimezone });
  let firstTen = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
  let seconds = '';
  let ampm;
  // replace below with ternary operator
  if (hour.includes('PM')) {
    ampm = 'PM';
  } else {
    ampm = 'AM';
  }
  hour = hour.replace(/\D/g, '');
  if (hour.startsWith(0)) {
    hour = hour.slice(1);
  }
  if (minutes.length === 1) {
    minutes = firstTen[minutes];
  }
  if (showSeconds) {
    if (seconds.length === 1) {
      seconds = `:${firstTen[date.getSeconds()]}`
    } else {
      seconds = `:${date.getSeconds()}`;
    }
  }
  convertedTime = `${hour}:${minutes}${seconds} ${ampm}`;
  return convertedTime;
}

function sendMessage(message, specifiedMessage, messageType) {
  let guildID;
  !message.guild ? guildID = '' : guildID = message.guild.id;
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

module.exports = {
  convertEpoch: convertEpoch,
  convertEpochToClock: convertEpochToClock,
  sendMessage: sendMessage
};
