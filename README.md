# TournaBot

![Logo](https://i.imgur.com/UN1gKXO.png)

TournaBot is a Discord bot designed to streamline [smash.gg](https://smash.gg/) tournaments and improve user quality-of-life through specialized commands - built on [Node.js](https://nodejs.org/en/) and [Discord.js](https://discord.js.org/#/).

Please check out [TournaBot's top.gg page](https://top.gg/bot/719283403698077708) and the [support/development Discord server](https://discord.gg/ssYPUk6Snc) if you need any help. You can find the [invite link](https://discord.com/oauth2/authorize?client_id=719283403698077708&scope=bot&permissions=268659832) here.

## Table of Contents

- [TournaBot](#tournabot)
  - [Table of Contents](#table-of-contents)
  - [Main Features](#main-features)
  - [Contributing](#contributing)
    - [Running TournaBot Locally](#running-tournabot-locally)
      - [Dependencies](#dependencies)
        - [Node.js](#nodejs)
        - [MongoDB](#mongodb)
        - [Environment Variables](#environment-variables)
      - [Testing](#testing)
      - [Support/Development](#supportdevelopment)

## Main Features

- **Automatic tournament reminders** an hour before your tournaments begin, which provide tournament/event information.

- **Automatic match calling** called DQ pinging, which automatically pings users in a specified channel a minute after their match has been called.

- **User tournament results** that include details and sets from a user's three latest tournaments.

- **Announcing tournaments with event and tournament information** so that you don't have to.

- **A better matchmaking system** that takes Discord role-based matchmaking to another level, enabling users to specify whether or not they want to be pinged for a role.

- **Search for tournaments** by game directly in your Discord server.

- **Full localization** through custom timezones and languages.

## Contributing

### Running TournaBot Locally

TournaBot was initially created on Windows, but is compatible with any UNIX-based system.

To create a Discord bot client, make an application through the [Discord Developer Portal](https://discord.com/developers/applications) and create a client through the **Bot** tab. The bot's **Token** is used for authentication.

#### Dependencies

##### Node.js

TournaBot uses [Node.js](https://nodejs.org/en/) v12.0.0 or higher.

To install the required npm dependencies, execute `npm run build` through the console within the project folder. If you clone the project using git and the `package.json` file is empty, you can copy and paste the text from the web repository.

##### MongoDB

TournaBot requires a [MongoDB instance](https://www.mongodb.com/basics/create-database) to store data. The production version of TournaBot uses [Mongoose](https://mongoosejs.com/) to connect to a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database. If you don't know how to set up a local database, I recommend using [this guide](https://zellwk.com/blog/local-mongodb/).

A connection string is required to connect to any database. Read [this](https://mongoosejs.com/docs/connections.html) if you don't know what the connection string should look like. It must be set up **before** running TournaBot. 

Don't be afraid to join the [support/development Discord server](https://discord.gg/ssYPUk6Snc) if you need help setting up the database.

TournaBot uses the following collections for categorizing data:

- `announcemessages`
- `channels`
- `languages`
- `matchmakingroles`
- `matchmakingusers`
- `pingroles`
- `timezones`
- `userids`

If there is no collection present for a specific model, no data for that model will be collected.

##### Environment Variables

The following environment variables are required to run TournaBot locally:

- `PREFIX` - The prefix used for each command
- `DISCORDTOKEN` - A valid Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications)
- `SMASHGGTOKEN` - a valid developer token used to access the [smash.gg API](https://developer.smash.gg). You can create a developer token through **Developer Settings** found when clicking your profile picture on the bottom left of the smash.gg website.
- `MONGOPASS` - The connection string used to authenticate into a MongoDB database.

Note that within the original production code, `ALTDISCORDTOKEN` is used to authenticate into a dummy bot that is used for local development. It is not required for testing locally.

The original production code uses a  `config.json` file to store the environment variables, but there are other methods to storing them.

#### Testing

To run TournaBot locally on your machine, execute `node index.js` through a console within the project folder. It is recommended that you use [nodemon](https://www.npmjs.com/package/nodemon) for any testing that requires lots of saving and re-executing.

#### Support/Development

For any help you need, feel free to join the [support/development Discord server](https://discord.gg/ssYPUk6Snc) and give yourself the **Contributor** role. This server also contains a list of requested features, incase you want an idea to start!
