import { DiscordBot } from './DiscordBot';

require('dotenv').config();

const zoeBot = new DiscordBot();

zoeBot.connect();