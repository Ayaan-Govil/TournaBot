// Dependencies
const Discord = require('discord.js');
const { generateHelpSelection, generateAccountsEmbed, generateReminderEmbed, generateResultsEmbed, generateDQPingingEmbed, generateAnnounceEmbed, generateLocalizationEmbed, generateMatchmakingEmbed, generateSearchEmbed, generateInfoEmbed } = require('./help_embeds/help_embeds.js');
const { generateHelp } = require('./help_embeds/generate_help.js');
const { sendMessage } = require('../functions.js');
const { closest } = require('fastest-levenshtein');

module.exports = {
  name: 'help',
  description: 'Help command.',
  execute(message, client, userMessage) {
    // replace top "reply with" message with message.reply
    if (message.channel instanceof Discord.DMChannel) {
      console.log(`${message.author.tag} executed t!help in DM`);
      sendMessage(message, `Please run the help command in a server. Due to permissions, the help command does not work in DMs.
      
Feel free to contact **F0ne#1933** with any specific issues or feedback, or join the [support/development server](https://discord.gg/ssYPUk6Snc).`);
      return;
    }

    if (message.author.tag != 'TournaBot#7477') console.log(`${message.author.tag} executed t!help`);

    //const userMessage = message;
    let currentIndex = 0;
    message.channel.send(generateHelpSelection(currentIndex)).then(message => {
      userMessage.reply('please reply with the category you would like to see:').catch(err => console.log(err));
      
      // MESSAGE COLLECTOR

      const filter = m => m.author.id === userMessage.author.id && m.author.id != message.author.id && !m.author.bot;

      const collector = new Discord.MessageCollector(message.channel, filter, { time: 120000, max: 2, maxMatches: 2 });
      let matches = 0;

      collector.on('collect', m => {
        matches++;
        switch (m.content.toLowerCase()) {
          // Accounts
          case 'accounts':
            generateHelp(message, client, generateAccountsEmbed, 3, m);
            break;

          case 'tournament reminders (beta)':
          case 'tournament reminders':
          case 'reminders':
            generateHelp(message, client, generateReminderEmbed, 2, m);
            break;

          // Results
          case 'user tournament results':
          case 'results':
            generateHelp(message, client, generateResultsEmbed, 1, m);
            break;

          // DQ Pinging
          case 'dq pinging (automatic match calling)':
          case 'dq pinging':
            generateHelp(message, client, generateDQPingingEmbed, 3, m);
            break;
          // Announcing
          case 'tournament announcing':
          case 'announcing':
            generateHelp(message, client, generateAnnounceEmbed, 4, m);
            break;

          // Localization
          case 'localization':
            generateHelp(message, client, generateLocalizationEmbed, 2, m);
            break;

          // Matchmaking
          case 'matchmaking':
            generateHelp(message, client, generateMatchmakingEmbed, 5, m);
            break;

          // Search
          case 'tournament searching':
          case 'searching':
            generateHelp(message, client, generateSearchEmbed, 1, m);
            break;

          // More Info
          case 'more info':
            generateHelp(message, client, generateInfoEmbed, 1, m);
            break;

          default:
            if (matches < 2) userMessage.reply(`There is no category called \`${m.content}\`. Did you mean \`${closest(m.content, ['accounts', 'tournament reminders (beta)', 'tournament reminders', 'reminders', 'user tournament results', 'results', 'dq pinging (automatic match calling)', 'dq pinging', 'tournament announcing', 'announcing', 'localization', 'matchmaking', 'tournament searching', 'searching', 'more info'])}\`?`).catch(err => console.log(err));
        }
      });

      // EMOJI COLLECTOR

      let emojiArray = ['◀️', '▶️'];
      for (i = 0; i < emojiArray.length; i++) {
        message.react(emojiArray[i]).catch(err => console.log(err));
      }

      const emojiFilter = (reaction, user) => {
        return user.id != message.author.id && !user.bot;
      };

      const emojiCollector = message.createReactionCollector(emojiFilter, { time: 120000 });

      emojiCollector.on('collect', (reaction, user) => {
        switch (reaction.emoji.name) {
          case '▶️':
            if (currentIndex < 1) {
              currentIndex++;
              message.edit(generateHelpSelection(currentIndex)).catch(err => console.log(err));
            }
            break;

          case '◀️':
            if (currentIndex > 0) {
              currentIndex--;
              message.edit(generateHelpSelection(currentIndex)).catch(err => console.log(err));
            }
            break;
        }
      });

    }).catch(err => console.log(err));
  },
};
