import { Document, Schema, model } from 'mongoose';

export interface IRedditLink extends Document {
  channelId: string;
  guildId: string;
  subreddit: string;
}

export const RedditLinkSchema = new Schema({
  channelId: { type: String, required: true },
  guildId: { type: String, required: true },
  subreddit: { type: String, required: true },
});

const RedditLink = model<IRedditLink>('RedditLink', RedditLinkSchema);

export default RedditLink;
