import { DiscordBot } from './DiscordBot';
import { SubredditFetcher } from './reddit/SubredditFetcher';

require('dotenv').config();

const zoeBot = new DiscordBot();

zoeBot.connect();
