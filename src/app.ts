import { ZoeBot } from './discord/ZoeBot';
import { ZoeMainsSubredditFetcher } from './reddit/ZoeMainsSubredditFetcher';

require('dotenv').config();

const subFetcher = new ZoeMainsSubredditFetcher();
const zoeBot = new ZoeBot();

zoeBot.connect();
// subFetcher.getLatestPosts().then(console.log)