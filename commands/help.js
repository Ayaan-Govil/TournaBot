// Dependencies
const Discord = require('discord.js');
const { generateHelpSelection, generateAccountsEmbed, generateResultsEmbed, generateDQPingingEmbed, generateAnnounceEmbed, generateLocalizationEmbed, generateMatchmakingEmbed, generateSearchEmbed, generateInfoEmbed } = require('./help_embeds/help_embeds.js');
const { generateHelp } = require('./help_embeds/generate_help.js');
const { sendMessage } = require('../functions.js');

module.exports = {
  name: 'help',
  description: 'Help command.',
  execute(message, client) {
    if (message.channel instanceof Discord.DMChannel) {
      console.log(`${message.author.tag} executed t!help in DM`);
      sendMessage(message, `Please run the help command in a server. Due to permissions, the proper help command does not work in DMs.
      
Feel free to contact **F0ne#1933** with any specific issues or feedback, or join the [support/development server](https://discord.gg/ssYPUk6Snc).`);
      return;
    }

    if (message.author.tag != 'TournaBot#7477') console.log(`${message.author.tag} executed t!help`);

    var currentIndex = 0;
    message.channel.send(generateHelpSelection(currentIndex)).then(message => {
      let emojiArray = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '◀️', '▶️'];
      let firstEmojiArray = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '◀️', '▶️'];
      let secondEmojiArray = ['5️⃣', '6️⃣', '7️⃣', '8️⃣', '◀️', '▶️'];
      for (i = 0; i < firstEmojiArray.length; i++) {
        message.react(firstEmojiArray[i]);
      }

      const filter = (reaction, user) => {
        return (emojiArray.includes(reaction.emoji.name)) && user.id != message.author.id;
      };

      const collector = message.createReactionCollector(filter, { time: 180000 });

      collector.on('collect', (reaction, user) => {
        switch (reaction.emoji.name) {
          // Accounts
          case '1️⃣':
            generateHelp(message, client, generateAccountsEmbed, 3);
            break;

          // Results
          case '2️⃣':
            generateHelp(message, client, generateResultsEmbed, 1);
            break;

          // DQ Pinging
          case '3️⃣':
            generateHelp(message, client, generateDQPingingEmbed, 3);
            break;
          // Announcing
          case '4️⃣':
            generateHelp(message, client, generateAnnounceEmbed, 4);
            break;

          // Localization
          case '5️⃣':
            generateHelp(message, client, generateLocalizationEmbed, 2);
            break;

          // Matchmaking
          case '6️⃣':
            generateHelp(message, client, generateMatchmakingEmbed, 5);
            break;

          // Search
          case '7️⃣':
            generateHelp(message, client, generateSearchEmbed, 1);
            break;

          // More Info
          case '8️⃣':
            generateHelp(message, client, generateInfoEmbed, 1);
            break;

          case '▶️':
            if (currentIndex < 1) {
              currentIndex++;
              message.reactions.removeAll();
              message.edit(generateHelpSelection(currentIndex));
              for (i = 0; i < secondEmojiArray.length; i++) {
                message.react(secondEmojiArray[i]);
              }
            }
            break;

          case '◀️':
            if (currentIndex > 0) {
              currentIndex--;
              message.reactions.removeAll();
              message.edit(generateHelpSelection(currentIndex));
              for (i = 0; i < firstEmojiArray.length; i++) {
                message.react(firstEmojiArray[i]);
              }
            }
            break;
        }
      });
    }).catch(err => console.log(err));
  },
};
