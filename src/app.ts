import { ZoeMainsSubredditFetcher } from './reddit/ZoeMainsSubredditFetcher';
import { ZoeBot } from './discord/ZoeBot';

require('dotenv').config();

const subFetcher = new ZoeMainsSubredditFetcher();
const zoeBot = new ZoeBot();

zoeBot.connect();