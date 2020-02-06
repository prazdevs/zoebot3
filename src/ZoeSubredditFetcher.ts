import snoowrap, { Listing, SnoowrapOptions, Submission } from 'snoowrap';
import { ListingOptions } from 'snoowrap/dist/objects';

export class ZoeSubredditFetcher {
  private R: snoowrap;

  constructor() {
    this.R = new snoowrap({
      clientId: process.env.R_CLIENT_ID,
      clientSecret: process.env.R_CLIENT_SECRET,
      username: process.env.R_USERNAME,
      password: process.env.R_PASSWORD,
      userAgent: 'ZoemainsBot-V3',
    });
  }

  getLatestPostsSince = async (delayInSeconds: number) => {
    const latestPosts = await this.getLatestPosts();
    const now = this.nowSeconds();
    const filtered = latestPosts.filter(
      post => now - post.created_utc < delayInSeconds
    );
    return filtered;
  };

  private getLatestPosts = async () => {
    return await this.R.getSubreddit('zoemains').getNew();
  };

  private nowSeconds = (): number => Math.floor(Date.now() / 1000);
}
