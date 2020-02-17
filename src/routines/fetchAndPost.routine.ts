import { Client, RichEmbed, TextChannel } from 'discord.js';

import { RedditPost } from '../reddit/RedditPost';
import { SubredditFetcher } from '../reddit/SubredditFetcher';

export const startFetchAndPostRoutine = async (
  delaySeconds: number,
  subreddit: string,
  discordClient: Client
): Promise<void> => {
  const chan = discordClient.channels.find(
    channel => channel.id === '675271307696406545'
  );

  const fetchAndPost = async () => {
    console.log('Started fetching subreddit posts');

    const fetcher = new SubredditFetcher(subreddit);

    const posts = await fetcher.getLatestPostsSince(delaySeconds);
    posts.forEach(async post => {
      console.log(`> Posting: ${post.title}`);
      const embed: RichEmbed = buildEmbed(post);
      await (chan as TextChannel).send(embed);
    });
    console.log('Done fetching subreddit posts');
  };

  await fetchAndPost();

  setInterval(fetchAndPost, delaySeconds * 1000);
};

const buildEmbed = (post: RedditPost): RichEmbed => {
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
