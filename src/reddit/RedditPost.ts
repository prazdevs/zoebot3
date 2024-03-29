import { Submission } from 'snoowrap';

export class RedditPost {
  id: string;
  title: string;
  author: string;
  self: boolean;
  thumbnail: string;
  selfText: string;
  image: string;
  url: string;
  hasMedia: boolean;
  flair: string;
  created: number;

  constructor(submission: Submission) {
    this.id = submission.id;
    this.title = submission.title;
    this.author = submission.author.name;
    this.self = submission.is_self;
    this.selfText = submission.selftext;
    this.thumbnail = submission.thumbnail;
    this.image = submission.url;
    this.url = `http://reddit.com${submission.permalink}`;
    this.hasMedia = !!submission.media;
    this.flair = submission.link_flair_text
      ? `[${submission.link_flair_text}]`
      : '[Post]';
    this.created = submission.created_utc;
  }
}
