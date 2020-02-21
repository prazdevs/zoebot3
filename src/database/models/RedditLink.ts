import { Document, Schema, model } from 'mongoose';

export interface IRedditLink extends Document {
  channelId: string;
  guildId: string;
}

export const RedditLinkSchema = new Schema({
  channelId: { type: String, required: true },
  guildId: { type: String, required: true },
});

const RedditLink = model<IRedditLink>('RedditLink', RedditLinkSchema);

export default RedditLink;
