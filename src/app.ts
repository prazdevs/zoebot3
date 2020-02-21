import { DiscordBot } from './DiscordBot';
import { TwitterPoster, TwitterPost } from './twitter/TwitterPoster';
import { RedditPost } from './reddit/RedditPost';
import { SubredditFetcher } from './reddit/SubredditFetcher';

require('dotenv').config();

const zoeBot = new DiscordBot();

//zoeBot.connect();

const fetcher = new SubredditFetcher('zoemains');

const poster = new TwitterPoster();

fetcher
  .getCompleteLatestPosts()
  .then(submissions => {
    const submission = submissions[0];
    const post = new RedditPost(submission);
    const t = new TwitterPost(post);
    console.log(t);

    poster
      .postReddit(post)
      .then(() => console.log('success posting'))
      .catch(() => console.error('failed posting'));
  })
  .catch(() => console.error('error fetching'));
