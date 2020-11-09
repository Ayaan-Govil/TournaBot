# TournaBot

TournaBot is a Discord bot designed to streamline [smash.gg](https://smash.gg/) tournaments and improve user quality-of-life through specialized commands - built on [Node.js](https://nodejs.org/en/) and [Discord.js](https://discord.js.org/#/). TournaBot's automatic match calling feature was used for the GOML 2020 NA Northeast Qualifiers, which included nearly 270 attendees! 

## Table of Contents

- [TournaBot](#tournabot)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Inviting TournaBot](#inviting-tournabot)
  - [Commands](#commands)
    - [Account-Based Commands](#account-based-commands)
      - [Account](#account)
      - [DQ Pinging (Admin-only)](#dq-pinging-admin-only)
      - [User Tournament Results](#user-tournament-results)
    - [Admin Commands](#admin-commands)
      - [Tournament Announcing](#tournament-announcing)
      - [Tournament Searching](#tournament-searching)
    - [Other Commands](#other-commands)
      - [Timezone](#timezone)
      - [Matchmaking](#matchmaking)
      - [Help](#help)
  - [Upcoming Features](#upcoming-features)
  - [Development and Help](#development-and-help)

## Features

- **Automatic match calling** called DQ pinging, which automatically pings users in a specified channel a minute after their match has been called.

- **User tournament results** that include details and sets from a user's three latest tournaments.

- **Announcing tournaments with event and tournament information** so that you don't have to.

- **A better matchmaking system** that takes Discord role-based matchmaking to another level, enabling users to specify whether or not they want to be pinged for a role.

- **Search for tournaments** by game directly in your server.

## Inviting TournaBot

You can invite TournaBot to your Discord server through [this link](https://discord.com/oauth2/authorize?client_id=719283403698077708&scope=bot&permissions=8).

## Commands

### Account-Based Commands

#### Account

> `t!account link <smash.gg profile URL>`

Links your smash.gg account and Discord account together, allowing TournaBot to do tasks interchangeably between Discord and smash.gg. All information stored is public (Discord tag, Discord ID, and URL slug).

![Imgur](https://i.imgur.com/LYXucHT.png)

> `t!account unlink`

Unlinks your smash.gg account and Discord account.

![Imgur](https://i.imgur.com/4mmR4o7.png)

> `t!account status <Discord tag with/without @ OR tournament URL/short URL>`

Checks if a user as linked their account OR checks if an attendee has linked their accounts for all attendees of a tournament.

Example 1 (with mention):

![Imgur](https://i.imgur.com/tTMfqEr.png)

Example 2 (with tag):

![Imgur](https://i.imgur.com/KGoU2bs.png)

Example 3 (no argument):

![Imgur](https://i.imgur.com/92dje2R.png)

Example 4 (with full URL):

![Imgur](https://i.imgur.com/LAQ7FsX.png)

Example 5 (with short URL):

![Imgur](https://i.imgur.com/ewDsa8h.png)

#### DQ Pinging (Admin-only)

> `t!set dqpingchannel <#channel>`

Sets the channel for DQ pinging. **Required to do before DQ pinging**.

![Imgur](https://i.imgur.com/1VhZA5h.png)

> `t!dq ping <tournament URL or smash.gg short URL>  <event name OR event number (optional)>`

Pings users in the DQ pinging channel a minute after their set is called (DQ timer has started). Specifying the event name or number will ping only for that event (check examples to see how events are numbered), otherwise pinging will happen across all events. Pinging will automatically stop after six hours or when the tournament has ended. **To get pinged, the user must have their Discord account public on their smash.gg profile page or have linked their accounts through TournaBot**.

![Imgur](https://i.imgur.com/Br9Vcmo.png)

Events are numbered in order from top to bottom, starting with 1.

Example 1 (without event name or number):

![Imgur](https://i.imgur.com/9A9DPd7.png)

![Imgur](https://i.imgur.com/dInFT5J.png)

Example 2 (with event name):

Event name specification is not case-sensitive.

![Imgur](https://i.imgur.com/b0lD2jr.png)

![Imgur](https://i.imgur.com/AbwZ6nW.png)

Example 3 (with event number):

![Imgur](https://i.imgur.com/cc6bbf8.png)

![Imgur](https://i.imgur.com/G6VzMZ0.png)

**If your Discord account is not public on your smash.gg profile and your accounts have not been linked through TournaBot, your smash.gg username will be shown in bold instead**. As you can see, my username is shown in bold.

> `t!dq stop`

Pretty self-explanatory - stops DQ pinging.

![Imgur](https://i.imgur.com/6qhNjyN.png)

#### User Tournament Results

> `t!results <Discord tag with or without @ (optional)>`

Provides a user's results from their three latest tournaments. Reactions are used to see each tournament individually. Leaving the argument empty gives you your own results. **Requires the user to have linked their accounts through TournaBot**.

![Imgur](https://i.imgur.com/0t9Xjqy.png)

This would work as well by sending `t!results Turple#numbers`. Being able to refer to people with their full Discord tag enables users to see each other's results from different servers, as long as their accounts are linked. The side color of the results matches the most vibrant color from the user's profile picture.

### Admin Commands

#### Tournament Announcing

> `t!set announcechannel <#channel>`

Sets the channel for announcements. **Required to do before announcing tournaments**.

![Imgur](https://i.imgur.com/OiaxOE2.png)

> `t!set announcemessage <message (optional)>`

Sets the message shown in the announcement. Leaving the &lt;message> argument blank will reset the message. The tournament link comes directly after the message, seperated by a space.

![Imgur](https://i.imgur.com/G8VPt9W.png)

As you can see, the default message is: `The registration for <tournament name> is up:`
The `<tournament name>` part is replaced by the tournament name from the given URL in bold. Leaving `<message>` empty will reset the announcement message.

![Imgur](https://i.imgur.com/7QKGLVc.png)

> `t!set pingrole <@role (optional)>`

Sets the role to ping when announcing a tournament.

![Imgur](https://i.imgur.com/9VWeQg2.png)

Leaving `<@role>` empty will reset the role to ping to default. By default, announcing will ping `@everyone`.

![Imgur](https://i.imgur.com/42VqhLh.png)

> `t!announce <tournament URL or smash.gg short URL> <ping/no ping>`

Announces the given tournament with timings and names. Using the short URL will always send the latest tournament linked to the URL. To see usage in detail, look at the examples below. Both use the default message and pinging.

Example 1 (full URL and ping):

![Imgur](https://i.imgur.com/LMrzRME.png)

![Imgur](https://i.imgur.com/XqHwJ1o.png)

Example 2: (short URL and no ping)

![Imgur](https://i.imgur.com/tcr03pm.png)

![Imgur](https://i.imgur.com/TZDAfBt.png)

#### Tournament Searching

> `t!search <game>`

Searches for the top 10 upcoming tournaments by game. Games are not case sensitive.

![Imgur](https://i.imgur.com/jo3TJ1J.png)

Currently Supported Games: `Super Smash Bros. Ultimate`, `Valorant`

### Other Commands

#### Timezone

> `t!set timezone <city>`

Sets the timezone that TournaBot uses, unique by server. The timestamps shown on `t!results` and `t!announce` will use the timezone provided.
Currently Supported Cities: `America/Los_Angeles`, `America/Phoenix`, `America/Denver`, `America/Regina`, `America/Chicago`, `America/New_York`, `Pacific/Honolulu`

![Imgur](https://i.imgur.com/U71vwaF.png)

Leaving `<city>` empty will reset the timezone to default. By default, the timezone is set to `America/Los_Angeles`.

![Imgur](https://i.imgur.com/MpUWcfK.png)

#### Matchmaking

> `t!mm set <@role or role name>`

Sets the matchmaking role that represents the matchmaking.

![Imgur](https://i.imgur.com/bLPaS8q.png)

![Imgur](https://i.imgur.com/qKTwzm2.png)

> `t!mm on`

Makes you active for matchmaking.

![Imgur](https://i.imgur.com/zBc8zCn.png)

> `t!mm off`

Makes you inactive for matchmaking.

![Imgur](https://i.imgur.com/UYkFlPX.png)

> `t!mm list`

Shows all users that are active for matchmaking (@'s in embeds don't ping a user).

![Imgur](https://i.imgur.com/y8LV4Li.png)

> `t!mm ping`

Pings all users that are active for matchmaking then deletes the mentions.

![Imgur](https://i.imgur.com/disNRyp.png)

#### Help

> `t!help`

Provides a link to this repository.

## Upcoming Features

- Support Server

- `t!sets`, which shows a user's set count against another specified user along with recent sets.

- More to come!

## Development and Help

TournaBot is being updated frequently! If you have any suggestions or encounter a bug, feel free to contact me through Discord: **F0ne#1933**.
