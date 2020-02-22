import { Client, RichEmbed, TextChannel } from 'discord.js';

import { RedditPost } from '../reddit/RedditPost';
import { SubredditFetcher } from '../reddit/SubredditFetcher';
import { TwitterPoster } from '../twitter/TwitterPoster';

export const startFetchAndPostRoutine = async (
  delaySeconds: number,
  subreddit: string,
  discordClient: Client
): Promise<void> => {
  const fetchAndPost = async () => {
    const posts = await fetchPosts(subreddit, delaySeconds);

    posts.forEach(async post => {
      await postEmbed(post, ['675271307696406545'], discordClient);
      await postTweet(post);
    });
  };

  await fetchAndPost();
  setInterval(fetchAndPost, delaySeconds * 1000);
};

//* Sync methods *//

const findDiscordChannels = (
  client: Client,
  channelIds: string[]
): TextChannel[] => {
  return channelIds.map(channelId => {
    const channel = client.channels.find(c => c.id === channelId);
    return channel as TextChannel;
  });
};

const buildEmbed = (post: RedditPost): RichEmbed => {
  const embed = new RichEmbed();

  embed.setAuthor(`New post on r/zoemains ! ${post.flair}`);
  embed.setTitle(post.title);
  embed.setURL(post.url);
  embed.setColor('#9230a7');

  if (post.self) {
    embed.setDescription(post.selfText);
  } else if (post.hasMedia) {
    embed.setImage(post.thumbnail);
    embed.setDescription('This post contains media...');
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

const buildTweet = (post: RedditPost): string => {
  const title =
    post.title.length < 100 ? post.title : `${post.title.substring(0, 100)}...`;
  const hashtags = '#LeagueOfLegends #ZoeMains';

  return `${post.flair}\n\n${title}\n\nby u/${post.author}\n\n${hashtags}\n${post.url}`;
};

//* Async methods *//

const fetchPosts = async (
  subreddit: string,
  delaySeconds: number
): Promise<RedditPost[]> => {
  const fetcher = new SubredditFetcher(subreddit);
  try {
    const posts = await fetcher.getLatestPostsSince(delaySeconds);
    console.log(`Fetched ${posts.length} posts`);
    return posts;
  } catch (error) {
    console.error(`(!) Error while fetching from r/${subreddit}`);
    return [];
  }
};

const postEmbed = async (
  post: RedditPost,
  channelIds: string[],
  client: Client
): Promise<void> => {
  const channels = findDiscordChannels(client, channelIds);
  const embed: RichEmbed = buildEmbed(post);

  channels.forEach(async channel => {
    try {
      await channel.send(embed);
      console.log(
        `  Successfully posted '${post.id}' to ${channel.guild}>${channel.name}`
      );
    } catch (err) {
      console.error(
        `  Failed to post ${post.id} to ${channel.guild}>${channel.name} : ${err.message}`
      );
    }
  });
};

const postTweet = async (post: RedditPost): Promise<void> => {
  const poster = new TwitterPoster();
  const status = buildTweet(post);
  try {
    await poster.tweet(status);
    console.log(`  Successfully posted '${post.id}' to Twitter`);
  } catch (err) {
    console.error(`  Failed to post '${post.id}' to Twitter : ${err.message}`);
  }
};
