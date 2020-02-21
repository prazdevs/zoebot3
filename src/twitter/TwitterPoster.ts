import Twitter, { AccessTokenOptions } from 'twitter';
import { RedditPost } from '../reddit/RedditPost';

export class TwitterPoster {
  private T: Twitter;

  constructor() {
    if (
      !process.env.T_CONSUMER_KEY ||
      !process.env.T_CONSUMER_SECRET ||
      !process.env.T_ACCESS_TOKEN_KEY ||
      !process.env.T_ACCESS_TOKEN_SECRET
    ) {
      throw new Error('Missing Twitter config in env');
    }
    this.T = new Twitter({
      consumer_key: process.env.T_CONSUMER_KEY,
      consumer_secret: process.env.T_CONSUMER_SECRET,
      access_token_key: process.env.T_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.T_ACCESS_TOKEN_SECRET,
    });
  }

  postReddit =  async(post: RedditPost): Promise<void> => {
    const twitterPost = new TwitterPost(post);

    this.T.post('statuses/update', { status: twitterPost.status });
  };

  postTweet = async (tweet: string): Promise<void> => {
    await this.T.post('statuses/update', { status: tweet });
  };

  
}
export class TwitterPost {
  status: string;

  constructor(post: RedditPost) {
    this.status = `${post.title} by u/${post.author} ${post.url}`;
  }
};