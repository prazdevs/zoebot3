import { SubredditFetcher } from '../reddit/SubredditFetcher';
import { RichEmbed, TextChannel, Client } from 'discord.js';
import { buildEmbed } from '../utils/buildEmbed';

export const startFetchAndPostRoutine = async (
  delaySeconds: number,
  discordClient: Client
): Promise<void> => {
  const sub = 'zoemains';

  const chan = discordClient.channels.find(
    channel => channel.id === '675271307696406545'
  );

  const fetchAndPost = async () => {
    console.log('Started fetching subreddit posts');
    const fetcher = new SubredditFetcher(sub);
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
