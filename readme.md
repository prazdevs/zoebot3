# The Zo3 Bot
![Banner](https://i.imgur.com/NiXCe7Q.jpg)

[![Build](https://github.com/prazdevs/zoemains-bot/workflows/Build/badge.svg?branch=master)](https://github.com/prazdevs/zoebot3/actions?query=workflow%3ABuild)
[![Vulnerabilities](https://snyk.io/test/github/prazdevs/zoebot3/badge.svg)](https://snyk.io/test/github/prazdevs/zoebot3)
[![Maintainability](https://api.codeclimate.com/v1/badges/c8807eec09ae3d536867/maintainability)](https://codeclimate.com/github/prazdevs/zoebot3/maintainability)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

## A discord bot that shares from Reddit to Discord & Twitter, but also gives sparkly powers to your Discord experience

Originally made for the **[r/zoemains](http://reddit.com/r/zoemains)** community, I try to keep this bot as generic as possible for anyone to re-use. If you do so, just make sure to credit me :)

### What can she do now ?

- Answer commands : ZoeBot3 can react to discord commands in channels she has access to, with a prefix (z! by default). Default implemented commands are ping and say. More to come!
- Fetch submissions from a given subreddit (default to r/zoemains, obviously) automatically every X seconds (default to 30)
- Post the fetched submissions, formatted as an embed to a Discord text channel the bot has access to. (Runtime database-stored channel settings coming soon).
- Tweet the fetched submissions, formatted in a short message (status < 280 characters), to a Twitter account set in the env.

### What do you need to get it working ?

To ensure having a 100% working Zoe, you will need to provide access to different APIs through environment variables :
- Discord :
  - `D_TOKEN`: \<Discord bot token\>
- Reddit (you can create a special account for safety purpose) : 
  - `R_CLIENT_ID`: \<reddit app id\>
  - `R_CLIENT_SECRET`: \<reddit app secret\>
  - `R_USERNAME`: \<reddit username\>
  - `R_PASSWORD`: \<reddit password\>
- Twitter :
  - `T_CONSUMER_KEY`:\<Twitter API key\>
  - `T_CONSUMER_SECRET`:\<Twitter API secret key\>
  - `T_ACCESS_TOKEN_KEY`:\<Twitter access token\>
  - `T_ACCESS_TOKEN_SECRET`:\<Twitter access token secret\>
  
### How do you start it ?

This assumes you have created a bot at [discordapp/developers](https://discordapp.com/developers/applications) and have invited it to your Discord server.

1. Make sure to replace the hardcoded (for now) discord channel in `src/routines/fetchAndPost.routine.ts` with the one you want (your bot must have messages and visibility permissions to the channel).
2. Set the environment variables mentioned above.
3. Execute the following :
```
yarn
yarn build
yarn start
```
4. Feel free to deploy on Heroku as a worker if you feel like it!

### Notes

This project is still under construction and a big work in progress, you may encounter some unexpected behaviors and funny *undocumented surprise features* (bugs don't exist, right ?). A lot of features and potential will be added to the project! But hey, at least you shouldn't face a type error... :)

### Helping me

Feel free to submit issues if something is odd or not working on your side, I'd be glad to help you.
