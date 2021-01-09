// Dependencies
const Discord = require('discord.js');
const { sendMessage } = require('../functions');

// MongoDB Models
const accountModel = require('../database/models/account');

module.exports = {
  name: 'remind',
  description: 'Reminds users of their tournaments.',
  execute(message, client) {
    // How tournament reminders should work (my idea prior to coding it)
    /*
    1. Player links their accounts (info is now in MongoDB)
    2. Player does t!remind, which toggles their reminder entry on MongoDB
    3. Meanwhile, an async loop is running which finds and sets tournament reminders

    ASYNC LOOP EVERY HOUR:
    1. Create map for tracking
    2. Query all the MongoDB IDs that have reminders set to true
    3. Query the smash.gg API for an ID, looking for any upcoming tournaments
    4. For each upcoming tournament, If an ID of the tournament is found in the map, skip it
    5. If upcoming tournaments are found within the next 6-7 hours, set timeout in map (key/value = Discord ID:tournament ID/timeout)that executes exactly 6 hours before tournament (setTimeout(function() {}, start timestamp - 6 hours - current time))
    6. On timeout execution, message user saying that their tournament begins in 6 hours, provide the link, and remove timeout from map
    7. Repeat from step 2 until all IDs have been finished
    */

    let discordID = message.author.id;
    accountModel.find({
      discordid: discordID
    }, function (err, result) {
      if (err) throw err;
      if (result.length) {
        if (!result[0].reminder) {
          accountModel.updateOne({
            discordid: discordID
          }, {
            reminder: true
          }, function (err, result) {
            if (err) throw err;
            message.channel instanceof Discord.DMChannel ? sendMessage(message, '**Your tournament reminders have been toggled __on__!** You can run this command again to toggle your tournament reminders **__off__**.', 'REPLY') : sendMessage(message, '**your tournament reminders have been toggled __on__!** You can run this command again to toggle your tournament reminders **__off__**.', 'REPLY');
          }).catch(err => console.log(err));
        } else {
          accountModel.updateOne({
            discordid: discordID
          }, {
            reminder: false
          }, function (err, result) {
            if (err) throw err;
            message.channel instanceof Discord.DMChannel ? sendMessage(message, '**Your tournament reminders have been toggled __off__!** You can run this command again to toggle your tournament reminders **__on__**.', 'REPLY') : sendMessage(message, '**your tournament reminders have been toggled __off__!** You can run this command again to toggle your tournament reminders **__on__**.', 'REPLY');
          }).catch(err => console.log(err));
        }
      } else {
        message.channel instanceof Discord.DMChannel ? sendMessage(message, 'Tournament reminders require you to have your Discord and smash.gg account linked. You can link your accounts by doing `t!account link <smash.gg profile URL>`. You can run this command once your accounts are linked.', 'REPLY') : sendMessage(message, 'tournament reminders require you to have your Discord and smash.gg account linked. You can link your accounts by doing `t!account link <smash.gg profile URL>`. You can run this command once your accounts are linked.', 'REPLY');
      }
    }).catch(err => console.log(err));
  },
};