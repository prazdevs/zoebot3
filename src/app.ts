import { DiscordBot } from './DiscordBot';

require('dotenv').config();

const zoeBot = DiscordBot.getInstance();

zoeBot.connect();
