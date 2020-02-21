import { DiscordBot } from './DiscordBot';
import { SubredditFetcher } from './reddit/SubredditFetcher';

require('dotenv').config();

const zoeBot = new DiscordBot();

//zoeBot.connect();

const fetcher = new SubredditFetcher('zoemains');
fetcher.getCompleteLatestPosts().then(submissions => {
  submissions.forEach(submission => {
    console.log(submission.link_flair_text);
    console.log(submission.link_flair_type);
  });
});
