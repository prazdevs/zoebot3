import moment from 'moment';
import snoowrap, { Submission } from 'snoowrap';

import { RedditPost } from './RedditPost';

export class SubredditFetcher {
  private R: snoowrap;

  constructor(private subreddit: string) {
    this.R = new snoowrap({
      clientId: process.env.R_CLIENT_ID,
      clientSecret: process.env.R_CLIENT_SECRET,
      username: process.env.R_USERNAME,
      password: process.env.R_PASSWORD,
      userAgent: 'ZoeBot3',
    });
  }

  async getCompleteLatestPosts(): Promise<Submission[]> {
    const latestSubmissions = await this.R.getSubreddit(
      this.subreddit
    ).getNew();
    const subs = latestSubmissions.slice(0, 10);
    return subs;
  }

  async getLatestPostsSince(delayInSeconds: number): Promise<RedditPost[]> {
    const latestPosts = await this.getLatestPosts();
    const filtered = latestPosts.filter(
      post => moment().unix() - post.created < delayInSeconds
    );
    return filtered;
  }

  async getLatestPosts(): Promise<RedditPost[]> {
    const latestSubmissions = await this.R.getSubreddit(
      this.subreddit
    ).getNew();
    const latestPosts = latestSubmissions.map(
      submission => new RedditPost(submission)
    );
    return latestPosts;
  }
}
