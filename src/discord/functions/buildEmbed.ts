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
  } else if (post.hasMedia) {
    embed.setImage(post.thumbnail);
    embed.setDescription('*Click to see the media...');
  } else {
    embed.setImage(post.image);
  }

  embed.setThumbnail('https://i.imgur.com/cjPynWD.png');

  embed.setFooter(
    `Posted by u/${post.author}`,
    'https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png'
  );

  return embed;
};
