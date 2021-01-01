const Discord = require('discord.js');

const generateHelpSelection = index => {
  const label = '`Respond with the corresponding category to navigate commands:`';
  const descriptions = [`
:small_orange_diamond: **Accounts**

TournaBot handles the account-linking between smash.gg and Discord manually. Several commands are account-based. 

:small_orange_diamond: **User Tournament Results**

Details and sets from a user's three latest tournaments. A user must have their accounts linked to see their results (see **Accounts**).  *You may also respond with \`results\` to see this category.*

:small_orange_diamond: **DQ Pinging (automatic match calling)**

Pings users in a specified channel about a minute after their set is called (a minute after DQ timer has started). *You may also respond with \`dq pinging\` to see this category.*

:small_orange_diamond: **Tournament Announcing**

Announces a given tournament with registration/event times and additional info. *You may also respond with \`announcing\` to see this category.*
`, `
:small_orange_diamond: **Localization**

Access complete localization through customizable timezones and languages.

:small_orange_diamond: **Matchmaking**

Discord role-based matchmaking to another level, which enables users to specify whether or not they want to be pinged for a role.

:small_orange_diamond: **Tournament Searching**

Search for smash.gg tournaments by game directly in your Discord server. *You may also respond with \`searching\` to see this category.*

:small_orange_diamond: **More Info**

Still need help? You can find the support server, developer/owner's contact information, and more, here.
`];
  const helpSelectionEmbed = new Discord.MessageEmbed()
    .setColor('#222326')
    .setDescription(`
${label}
${descriptions[index]}`)
    .setFooter(`Page ${index + 1} of 2`, 'https://cdn.discordapp.com/attachments/719461475848028201/777094320531439636/image.png');

  return helpSelectionEmbed;
}

const generateAccountsEmbed = index => {
  const label = '**Accounts**';
  const descriptions = [`
> \`t!account link <smash.gg profile URL>\`

Links your smash.gg account and Discord account together, allowing TournaBot to do tasks between Discord and smash.gg. All information stored is public (Discord tag, Discord ID, and URL slug).

Please read [this](https://help.smash.gg/en/articles/4100961-user-profiles) if you do not know how/where to find your profile.
`, `
> \`t!account unlink\`

Unlinks your smash.gg account and Discord account.
`, `
> \`t!account status <Discord tag with/without @ OR tournament URL/short URL>\`

Checks if a user as linked their accounts OR checks whether each attendee has linked their accounts for a given tournament. Providing no arguments will give you your own account status.
`];
  const examples = ['https://i.imgur.com/uvWQE1R.png', 'https://i.imgur.com/LqgWaWn.png', 'https://i.imgur.com/mnWZwki.png'];

  const accountsEmbed = new Discord.MessageEmbed()
    .setColor('#222326')
    .setDescription(`
${label}
${descriptions[index]}`)
    .setImage(examples[index])
    .setFooter(`Command ${index + 1} of 3`, 'https://cdn.discordapp.com/attachments/719461475848028201/777094320531439636/image.png');

  if (index === 2) accountsEmbed.setThumbnail('https://i.imgur.com/gUwhkw3.png');

  return accountsEmbed;
}

const generateResultsEmbed = index => {
  const accountsEmbed = new Discord.MessageEmbed()
    .setColor('#222326')
    .setDescription(`
**User Tournament Results**

> \`t!results <Discord tag with/without @ (optional)>\`

Details and sets from a user's three latest tournaments. Providing no arguments will give you your own results. A user must have their accounts linked to see their results (see **Accounts**).

Please keep in mind that the search algorithm will find up to 15 tournaments, including admined/spectated tournaments. It may not show three tournaments if a user has admined/spectated multiple tournaments.
`)
    .setImage('https://i.imgur.com/G4LzGzX.png')
    .setFooter(`Command 1 of 1`, 'https://cdn.discordapp.com/attachments/719461475848028201/777094320531439636/image.png');
  return accountsEmbed;
}

const generateDQPingingEmbed = index => {
  const label = '**DQ Pinging (automatic match calling)**';
  const descriptions = [`
> \`t!set dqpingchannel <#channel>\`

Before beginning DQ pinging, you need to set the channel that TournaBot will ping users in. This allows you to run \`t!dq ping\` in a separate channel.
`, `
> \`t!dq ping <tournament URL/smash.gg short URL>  <event name/event number (optional)>\`

Pings users in the DQ pinging channel a minute after their set is called (a minute after DQ timer has started). Specifying the event name or number as the second argument will ping only for that event, otherwise pinging will happen across all events (check example on the right to see how events are numbered). Pinging will automatically stop after six hours or when the tournament has ended.

If your Discord account is not public on your smash.gg profile and your accounts have not been linked through TournaBot, your smash.gg username will be shown in bold instead.
`, `
> \`t!dq stop\`

Stops DQ pinging.
`];
  const examples = ['https://i.imgur.com/5swyvDE.png', 'https://i.imgur.com/PttOLYc.png', 'https://i.imgur.com/KeVuRDW.png'];

  const DQPingingEmbed = new Discord.MessageEmbed()
    .setColor('#222326')
    .setDescription(`
${label}
${descriptions[index]}`)
    .setImage(examples[index])
    .setFooter(`Command ${index + 1} of 3`, 'https://cdn.discordapp.com/attachments/719461475848028201/777094320531439636/image.png');

  if (index === 1) DQPingingEmbed.setThumbnail('https://i.imgur.com/Br9Vcmo.png');

  return DQPingingEmbed;
}

const generateAnnounceEmbed = index => {
  const label = '**Tournament Announcing**';
  const descriptions = [`
> \`t!set announcechannel <#channel>\`

Before announcing a tournament, you need to set the channel that TournaBot will announce in. This allows you to run \`t!announce\` in a separate channel.
`, `
> \`t!set announcemessage <message (optional)>\`

Sets the message shown in the announcement. Providing no arguments will reset the message to default.

Default message: \`The registration for <tournament name> is up:\`

Announcements are formatted as such: 
\`\`\`<announce message> <URL>

<registration end time>

<event name and start time>
<check-in time (if enabled)>

<streams>\`\`\`
Keep in mind that \`<announce message>\` is the message that YOU specify. The rest is of the announcement is automatically done by TournaBot.
`, `
> \`t!set pingrole <@role/role name (optional)>\`

Sets the role to ping when announcing a tournament. Providing no arguments will reset the role to default, which is @everyone.
`, `
> \`t!announce <tournament URL/smash.gg short URL> <ping/no ping>\`

Announces a given tournament with registration/event times, streams, and additional info. Using the short URL will always send the latest tournament linked to the URL. 

Please read [this](https://help.smash.gg/en/articles/1465692-adding-streams-and-creating-stations) if you do not know how/where to set up streams on smash.gg.
`];
  const examples = ['https://i.imgur.com/6L75GCI.png', 'https://i.imgur.com/YVDnWo0.png', 'https://i.imgur.com/IH6PZjD.png', 'https://i.imgur.com/TXZYBZD.png'];
  const thumbnails = ['https://i.imgur.com/wZ9IbTf.png', 'https://i.imgur.com/TO7tlrA.png', 'https://i.imgur.com/OpbRMIM.png'];

  const announceEmbed = new Discord.MessageEmbed()
    .setColor('#222326')
    .setDescription(`
${label}
${descriptions[index]}`)
    .setImage(examples[index])
    .setFooter(`Command ${index + 1} of 4`, 'https://cdn.discordapp.com/attachments/719461475848028201/777094320531439636/image.png');

  if (index > 0) announceEmbed.setThumbnail(thumbnails[index - 1]);

  return announceEmbed;
}

const generateLocalizationEmbed = index => {
  const label = '**Localization**';
  const descriptions = [`
> \`t!set timezone <city>\`

Sets the timezone that TournaBot uses, altering the timestamps shown in \`t!results\` and \`t!announce\`. Providing no arguments will reset the timezone to \`America/Los_Angeles\` (PST/PDT).

Currently supported cities: \`America/Los_Angeles\`, \`America/Phoenix\`, \`America/Denver\`, \`America/Regina\`, \`America/Chicago\`, \`America/New_York\`, \`Pacific/Honolulu\`

Join the support server or contact the developer/owner (see **More Info**) if you need support for a city/timezone not shown above.
`, `
> \`t!set language <language in ISO-639-1 code>\`

Sets the language that Tournabot uses. Language localization does not apply to DQ Pinging, User Tournament Results, and some other messages due to formatting issues and restrictions. Providing no arguments will reset the language to \`English (en)\`.

You can find all the supported language ISO-639-1 codes [here](https://cloud.google.com/translate/docs/languages).
`];
  const examples = ['https://i.imgur.com/OOFBH0O.png', 'https://i.imgur.com/TEpnXU0.png'];
  //const thumbnails = ['https://i.imgur.com/a7QADaC.png', 'https://i.imgur.com/Gcqog7c.png'];

  const localizationEmbed = new Discord.MessageEmbed()
    .setColor('#222326')
    .setDescription(`
${label}
${descriptions[index]}`)
    //.setThumbnail(thumbnails[index])
    .setImage(examples[index])
    .setFooter(`Command ${index + 1} of 2`, 'https://cdn.discordapp.com/attachments/719461475848028201/777094320531439636/image.png');

  return localizationEmbed;
}

const generateMatchmakingEmbed = index => {
  const label = '**Matchmaking**';
  const descriptions = [`
> \`t!mm set <@role/role name>\`

Sets the representative matchmaking role.
`, `
> \`t!mm on\`

Sets you active for matchmaking.
`, `
> \`t!mm off\`

Sets you inactive for matchmaking.
`, `
> \`t!mm list\`

Shows all users that are active for matchmaking (keep in mind that mentions in embeds do not ping users).
`, `
> \`t!mm ping\`

Pings all users that are active for matchmaking, deletes the mentions, and then sends a message related to the role. 
`];
  const examples = ['https://i.imgur.com/9QaaYOX.png', 'https://i.imgur.com/326Dds4.png', 'https://i.imgur.com/SlLeWsb.png', 'https://i.imgur.com/mEAJcD3.png', 'https://i.imgur.com/Oy5xx1M.png'];

  const matchmakingEmbed = new Discord.MessageEmbed()
    .setColor('#222326')
    .setDescription(`
${label}
${descriptions[index]}`)
    .setImage(examples[index])
    .setFooter(`Command ${index + 1} of 5`, 'https://cdn.discordapp.com/attachments/719461475848028201/777094320531439636/image.png');

  return matchmakingEmbed;
}

const generateSearchEmbed = index => {
  const searchEmbed = new Discord.MessageEmbed()
    .setColor('#222326')
    .setDescription(`
**Tournament Searching**

> \`t!search <game>\`

Searches for the top 10 upcoming tournaments by game. The \`<game>\` argument is not case-sensitive.

Currently supported games: \`Super Smash Bros. Ultimate\`, \`Valorant\`

Join the support server or contact the developer/owner (see **More Info**) if you need support for a game not shown above.
`)
    .setImage('https://i.imgur.com/AzhELPj.png')
    .setFooter(`Command 1 of 1`, 'https://cdn.discordapp.com/attachments/719461475848028201/777094320531439636/image.png');

  return searchEmbed;
}

const generateInfoEmbed = index => {
  const infoEmbed = new Discord.MessageEmbed()
    .setColor('#222326')
    .setDescription(`For any inquiries or help, feel free to join the [support/development server](https://discord.gg/ssYPUk6Snc) or contact the developer/owner of TournaBot, **F0ne#1933**. Please upvote the bot on the [top.gg page](https://top.gg/bot/719283403698077708) if you can as well! TournaBot is also a open-source project, you can find the code at the [Github repository](https://github.com/Ayaan-Govil/TournaBot).`)
    .setFooter(`TournaBot`, 'https://cdn.discordapp.com/attachments/719461475848028201/777094320531439636/image.png');

  return infoEmbed;
}

module.exports = {
  generateHelpSelection: generateHelpSelection,
  generateAccountsEmbed: generateAccountsEmbed,
  generateResultsEmbed: generateResultsEmbed,
  generateDQPingingEmbed: generateDQPingingEmbed,
  generateAnnounceEmbed: generateAnnounceEmbed,
  generateLocalizationEmbed: generateLocalizationEmbed,
  generateMatchmakingEmbed: generateMatchmakingEmbed,
  generateSearchEmbed: generateSearchEmbed,
  generateInfoEmbed: generateInfoEmbed
};
