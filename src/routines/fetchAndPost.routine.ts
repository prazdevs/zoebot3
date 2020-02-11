import { DiscordBot } from '../discord/DiscordBot';
import { SubredditFetcher } from '../reddit/SubredditFetcher';
import { buildEmbed } from '../utils/buildEmbed';
import { Routine } from './Routine';

export class FetchAndPostRoutine extends Routine {
  protected async routineFunction(): Promise<void> {
    console.log('started fetching');
      const posts = await this.redditFetcher.getLatestPostsSince(this.interval);
      const embeds = posts.map(post => buildEmbed(post));
      embeds.forEach(async embed => {
        console.log(`posting embed : ${embed}`);
        await this.discordBot.postEmbedMessage(this.discordChannelIds, embed);
      });
      console.log('done fetching');
  }
  
  constructor(
    protected interval: number,
    private redditFetcher: SubredditFetcher,
    private discordBot: DiscordBot,
    private discordChannelIds: string[]
  ) {
    super(interval);
  }
}
