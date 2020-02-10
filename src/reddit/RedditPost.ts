import { Submission } from 'snoowrap';

export class RedditPost {
  title: string;
  author: string;
  self: boolean;
  thumbnail: string;
  selfText: string;
  image: string;
  url: string;
  isVideo: boolean;
  created: number;

  constructor(submission: Submission) {
    this.title = submission.title;
    this.author = submission.author.name;
    this.self = submission.is_self;
    this.selfText = submission.selftext;
    this.thumbnail = submission.thumbnail;
    this.image = submission.url;
    this.url = `http://reddit.com/${submission.permalink}`;
    this.isVideo = submission.is_video;
    this.created = submission.created_utc;
  }
}