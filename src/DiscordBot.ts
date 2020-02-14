import { Channel, Client, Message, RichEmbed, TextChannel } from 'discord.js';

import { CommandFactory } from './commands/CommandFactory';
import { buildEmbed } from './utils/buildEmbed';
import { SubredditFetcher } from './reddit/SubredditFetcher';

export class DiscordBot {
  private prefix: string = 'z!';
  private client: Client = new Client();
  private commandFactory: CommandFactory = new CommandFactory(
    this.client,
    this.prefix
  );

  constructor() {
    this.initializeCient();
  }

  connect = (): void => {
    this.client.login(process.env.D_TOKEN);
  };

  private initializeCient = (): void => {
    if (!this.client) return;

    this.setReadyHandler();
    this.setMessageHandler();
  };

  private setReadyHandler = (): void => {
    this.client.on('ready', async () => {
      console.log('Discord Bot connected');
      await this.client.user.setActivity('with sparkles');

      // await this.startFetchingRoutine();
    });
  };

  private setMessageHandler = (): void => {
    this.client.on('message', async (message: Message) => {
      //* filters out requests from bot and other prefixes
      if (message.author.bot) return;
      if (message.content.indexOf(this.prefix) !== 0) return;

      //* delegates creation to factory & executes
      const command = this.commandFactory.createCommand(message);
      command.execute();
    });
  };

  private startFetchingRoutine = async (): Promise<void> => {
    const delaySeconds = 300;
    
    const chan = this.client.channels.find(
      channel => channel.id === '675271307696406545'
    );

    const fetchAndPost = async () => {
      console.log('Started fetching subreddit posts');
      const fetcher = new SubredditFetcher('zoemains');
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
}
