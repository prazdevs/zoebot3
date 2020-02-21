import Twitter from 'twitter';

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

  tweet = async (tweet: string): Promise<void> => {
    await this.T.post('statuses/update', { status: tweet });
  };
}
