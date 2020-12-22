const generateHelp = (message, client, generateEmbed, commandAmount) => {
  message.reactions.removeAll();

  var currentIndex = 0;
  message.edit(generateEmbed(currentIndex)).then(message => {
    let emojiArray = ['⬅️', '➡️', '⏮'];
    if (commandAmount > 1) {
      for (i = 0; i < emojiArray.length; i++) {
        message.react(emojiArray[i]);
      }
    } else message.react('⏮');

    const filter = (reaction, user) => {
      return (emojiArray.includes(reaction.emoji.name)) && user.id != message.author.id;
    };

    const collector = message.createReactionCollector(filter, { time: 180000 });

    collector.on('collect', (reaction, user) => {

      if (reaction.emoji.name === '➡️') {
        if (currentIndex < commandAmount - 1) {
          currentIndex++;
          message.edit(generateEmbed(currentIndex));
        }
      } else if (reaction.emoji.name === '⬅️') {
        if (currentIndex > 0) {
          currentIndex--;
          message.edit(generateEmbed(currentIndex));
        }
      } else {
        client.commands.get('help').execute(message, client);
        message.delete();
      }
    });
  }).catch(err => console.log(err));
}

module.exports = {
  generateHelp: generateHelp
};
