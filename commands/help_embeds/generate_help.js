// const Discord = require('discord.js');
// If there's an API error on method patch, it's perfectly fine.
const generateHelp = (message, client, generateEmbed, commandAmount, userMessage) => {
  message.reactions.removeAll().catch(err => { });

  let currentIndex = 0;
  message.edit(generateEmbed(currentIndex)).then(message => {
    let emojiArray = ['⬅️', '➡️', '⏮'];
    if (commandAmount > 1) {
      for (i = 0; i < emojiArray.length; i++) {
        message.react(emojiArray[i]).catch(err => console.log(err));
      }
    } else message.react('⏮').catch(err => console.log(err));

    const filter = (reaction, user) => {
      return (emojiArray.includes(reaction.emoji.name)) && user.id != message.author.id;
    };

    const collector = message.createReactionCollector(filter, { time: 120000 });

    collector.on('collect', (reaction, user) => {

      if (reaction.emoji.name === '➡️') {
        if (currentIndex < commandAmount - 1) {
          currentIndex++;
          message.edit(generateEmbed(currentIndex)).catch(err => console.log(err));
        }
      } else if (reaction.emoji.name === '⬅️') {
        if (currentIndex > 0) {
          currentIndex--;
          message.edit(generateEmbed(currentIndex)).catch(err => console.log(err));
        }
      } else {
        client.commands.get('help').execute(message, client, userMessage);
        message.delete().catch(err => console.log(err));
      }
    });
  }).catch(err => console.log(err));
}

module.exports = {
  generateHelp: generateHelp
};
