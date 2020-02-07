import { Submission } from 'snoowrap';
import moment from 'moment';

export class RedditPost {
  title: string;
  author: string;
  self: boolean;
  thumbnail: string;
  selfText: string;
  created: number;
  
  constructor(submission: Submission) {
    this.title = submission.title;
    this.author = submission.author.name;
    this.self = submission.is_self;
    this.selfText = submission.selftext;
    this.thumbnail = submission.thumbnail;
    this.created = submission.created_utc;
  }
}
