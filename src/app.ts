import dotenv from 'dotenv';

import { ZoeSubredditFetcher } from './ZoeSubredditFetcher';

dotenv.config();

const subFetcher = new ZoeSubredditFetcher();

subFetcher.getLatestPostsSince(54000).then(data => console.log(data));
