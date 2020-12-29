// Dependencies
const Discord = require('discord.js');
const { sendMessage } = require('../functions');

// MongoDB Models
const mmuserModel = require('../database/models/mmuser');
const mmroleModel = require('../database/models/mmrole');

module.exports = {
  name: 'mm',
  description: 'Improved role-based matchmaking.',
  execute(message) {
    // Matchmaking needs to be completely redone coding-wise
    // No localization for parts of matchmaking due to encoding messing with formatting
    mmArgs = message.content.split(' ');
    mmArgs.shift();
    if (message.channel instanceof Discord.DMChannel) { sendMessage(message, 'I cannot run this command in DMs.'); }
    else if (mmArgs[0] === undefined) {
      sendMessage(message, `No arguments given. Do \`t!help\` to get command info.

Possible arguments: \`set <@role/role name (optional)>\`, \`on\`, \`off\`, \`list\`, \`ping\``);
    } else {
      let activeRole;
      let activeRoleID
      let activeRoleName;
      let activeRolePing;
      let userList;
      let guildID = message.guild.id;
      switch (mmArgs[0].toString()) {

        // t!mm set <@role/role name (optional)>
        case 'set':
          if (message.member.hasPermission('ADMINISTRATOR')) {
            if (mmArgs.length >= 2) {
              mmArgs.shift();
              mmArgs = mmArgs.join(' ');
              let potentialRole = mmArgs.replace('<@&', '').replace('>', '');
              var addedRole = message.guild.roles.cache.find(role => role.id === potentialRole);
              if (addedRole) {
                activeRoleID = addedRole.id;
                activeRolePing = `<@&${activeRoleID}>`;
                setRole();
              } else {
                addedRole = message.guild.roles.cache.find(role => role.name === potentialRole);
                if (addedRole) {
                  activeRoleID = addedRole.id;
                  activeRolePing = `<@&${activeRoleID}>`;
                  setRole();
                } else { sendMessage(message, `I could not find the specified role. Make sure you are pinging the role using @.`); }
              }
              function setRole() {
                mmroleModel.find({
                  guildid: guildID
                }, function (err, result) {
                  if (err) throw err;
                  if (result.length) {
                    mmroleModel.replaceOne({
                      guildid: guildID
                    }, {
                      guildid: guildID,
                      role: addedRole
                    }, function (err, result) {
                      if (err) throw err;
                      sendMessage(message, `The matchmaking role has been changed to ${activeRolePing} :white_check_mark:`);
                    }).catch(err => console.log(err));
                  } else {
                    let roleSet = new mmroleModel({
                      guildid: guildID,
                      role: addedRole
                    }).save().then(result => sendMessage(message, `The matchmaking role is now set to ${activeRolePing} :white_check_mark:`)).catch(err => console.log(err));
                  }
                }).catch(err => console.log(err));
              }
            } else { sendMessage(message, 'Something went wrong :confused: . Do \`t!help\` to get command info.'); }
          } else { sendMessage(message, 'you don\'t have the permissions for that :sob:', 'REPLY'); }
          break;

        // t!mm on
        case 'on':
          mmroleModel.find({
            guildid: guildID
          }, function (err, result) {
            if (err) throw err;
            if (result.length) {
              activeRole = message.guild.roles.cache.find(role => role.id === result[0].role);
              activeRoleID = activeRole.id;
              activeRoleName = activeRole.name;
              if (message.member.roles.cache.some(role => role.id === activeRoleID)) { // role check
                mmuserModel.find({
                  roleid: activeRoleID
                }, function (err, result) {
                  if (err) throw err;
                  if (result.length) {
                    userList = result[0].activeusers;
                    var userMatched = false;
                    for (u = 0; u < userList.length; u++) {
                      if (`<@${message.member.id}>` === userList[u]) {
                        userMatched = true;
                      }
                    }
                    if (!userMatched) {
                      userList.push(`<@${message.member.id}>`);
                      mmuserModel.replaceOne({
                        roleid: activeRoleID
                      }, {
                        roleid: activeRoleID,
                        activeusers: userList
                      },
                        function (err, result) {
                          if (err) throw err;
                          message.reply(`you are now online for **${activeRoleName}**!`);
                        }).catch(err => console.log(err));
                    } else { message.reply(`you are already online.`); }
                  } else {
                    let userSet = new mmuserModel({
                      roleid: activeRoleID,
                      activeusers: [`<@${message.member.id}>`]
                    }).save().then(result => message.reply(`you are now online for **${activeRoleName}**!`)).catch(err => console.log(err));
                  }
                }).catch(err => console.log(err));
              } else { message.reply(`you do not have the **${activeRoleName}** role.`); }
            } else {
              message.reply(`There is no matchmaking role set. Admins can do \`t!mm set <role name without @>\` to set the matchmaking role.`);
            }
          }).catch(err => console.log(err));
          break;

        // t!mm off
        case 'off':
          // SET OFF TO SINGLE ROLE
          mmroleModel.find({
            guildid: guildID
          }, function (err, result) {
            if (err) throw err;
            if (result.length) {
              activeRole = message.guild.roles.cache.find(role => role.id === result[0].role);
              activeRoleID = activeRole.id;
              activeRoleName = activeRole.name;
              if (message.member.roles.cache.some(role => role.id === activeRoleID)) { // role check
                mmuserModel.find({
                  roleid: activeRoleID
                }, function (err, result) {
                  if (err) throw err;
                  userList = result[0].activeusers;
                  if (userList && userList.length) {
                    var userFound = false;
                    for (u = 0; u < userList.length; u++) {
                      if (`<@${message.member.id}>` === userList[u]) {
                        userFound = true;
                        userList.splice(u, 1);
                        mmuserModel.replaceOne({
                          roleid: activeRoleID
                        }, {
                          roleid: activeRoleID,
                          activeusers: userList
                        },
                          function (err, result) {
                            if (err) throw err;
                            message.reply(`you are now offline for **${activeRoleName}**!`);
                          }).catch(err => console.log(err));
                      }
                    }
                    if (!userFound) { message.reply(`you are not online for **${activeRoleName}** currently. Do \`t!mm on\` to go online.`) }
                  } else { message.reply(`no one is currently online for **${activeRoleName}**`); }
                }).catch(err => console.log(err));
              } else { message.reply(`you do not have the **${activeRoleName}** role.`); }
            } else {
              sendMessage(message, `There is no matchmaking role currently set. Admins can do \`t!mm set <role name without @>\` to set the matchmaking role.`)
            }
          }).catch(err => console.log(err));

          break;

        // t!mm list
        case 'list':
          mmroleModel.find({
            guildid: guildID
          }, function (err, result) {
            if (err) throw err;
            if (result.length) {
              activeRole = message.guild.roles.cache.find(role => role.id === result[0].role);
              activeRoleID = activeRole.id;
              activeRolePing = `<@&${activeRoleID}>`;
              mmuserModel.find({
                roleid: activeRoleID
              }, function (err, result) {
                if (err) throw err;
                let listMessage = [];
                if (result.length) {
                  userList = result[0].activeusers;
                  if (userList && userList.length) {
                    listMessage.push(`**Role:** ${activeRolePing}
**Online for Matchmaking:**
    ${userList.join(`
`)}
`);
                  } else {
                    listMessage.push(`**Role:** ${activeRolePing}
**Online for Matchmaking:**
*None*
`);
                  }
                } else {
                  listMessage.push(`**Role:** ${activeRolePing}
**Online for Matchmaking:**
*None*
`);
                }
                const rolesList = new Discord.MessageEmbed()
                  .setColor('#222326')
                  .setTitle('Matchmaking')
                  .setDescription(listMessage.join(`
`))
                  .setFooter('TournaBot', 'https://cdn.discordapp.com/attachments/719461475848028201/777094320531439636/image.png');
                message.channel.send(rolesList);
              }).catch(err => console.log(err));
            } else {
              sendMessage(message, 'There is no matchmaking role currently set. Admins can do \`t!mm set <role name without @>\` to set the matchmaking role.');
            }
          }).catch(err => console.log(err));
          break;

        // t!mm ping
        case 'ping':
          mmroleModel.find({
            guildid: guildID
          }, function (err, result) {
            if (err) throw err;
            if (result.length) {
              activeRole = message.guild.roles.cache.find(role => role.id === result[0].role);
              activeRoleID = activeRole.id;
              activeRoleName = activeRole.name;
              if (message.member.roles.cache.some(role => role.id === activeRoleID)) { // role check
                mmuserModel.find({
                  roleid: activeRoleID
                }, function (err, result) {
                  if (err) throw err;
                  userList = result[0].activeusers;
                  if (userList && userList.length) {
                    message.channel.send(userList.join(' '))
                      .then(message => {
                        message.delete();
                      })
                    message.channel.send(`\`\`\`yaml
@${activeRoleName}
\`\`\``);
                  } else { message.reply(`no one is currently online for **${activeRoleName}**`); }
                }).catch(err => console.log(err));
              } else { message.reply(`you do not have the **${activeRoleName}** role.`); }
            } else {
              sendMessage(message, 'There is no matchmaking role currently set. Admins can do \`t!mm set <role name without @>\` to set the matchmaking role.');
            }
          }).catch(err => console.log(err));
          break;

        default:
          sendMessage(message, 'I could not recognize the argument provided. Do \`t!help\` to get command info.');
      }
    }
  },
};
