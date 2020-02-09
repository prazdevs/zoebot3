import { RichEmbed } from 'discord.js';

import { RedditPost } from '../../reddit/RedditPost';
import { ZoeMainsSubredditFetcher } from '../../reddit/ZoeMainsSubredditFetcher';

export const buildEmbed = (post: RedditPost): RichEmbed => {
  const embed = new RichEmbed();

  embed.setAuthor('New post on r/zoemains !');
  embed.setTitle(post.title);
  embed.setURL(post.url);
  embed.setColor('#9230a7');

  if (post.self) {
    embed.setDescription(post.selfText);
  } else if (post.isVideo) {
    embed.setImage(post.thumbnail);
  } else {
    embed.setImage(post.image);
  }

  embed.setThumbnail('https://i.imgur.com/cjPynWD.png');

  embed.setFooter(
    `Posted by u/${post.author}`,
    'https://i.imgur.com/cjPynWD.png'
  );

  return embed;
};
