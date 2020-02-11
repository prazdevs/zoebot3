import { DiscordBot } from './discord/DiscordBot';
import { ZoeMainsSubredditFetcher } from './reddit/ZoeMainsSubredditFetcher';
import { Routine } from './routines/Routine';
import { FetchAndPostRoutine } from './routines/fetchAndPost.routine';

require('dotenv').config();

const subFetcher = new ZoeMainsSubredditFetcher();
const zoeBot = new DiscordBot();

zoeBot.connect();

const testRoutine: Routine= new FetchAndPostRoutine(60, subFetcher, zoeBot, ['675332064664485908']);
setTimeout(testRoutine.start, 1000);