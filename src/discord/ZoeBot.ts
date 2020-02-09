import { Client, Message, RichEmbed, TextChannel } from 'discord.js';

import { ZoeMainsSubredditFetcher } from '../reddit/ZoeMainsSubredditFetcher';
import { CommandFactory } from './commands/CommandFactory';
import { buildEmbed } from './functions/buildEmbed';
import { postEmbed } from './functions/postEmbed';

export class ZoeBot {
  private prefix: string = 'z!';
  private client: Client = new Client();
  private commandFactory: CommandFactory = new CommandFactory(
    this.client,
    this.prefix
  );

  constructor() {
    this.initializeCient();
  }

  connect = () => {
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

      const chan = this.client.channels.find(
        channel => channel.id === '675271307696406545'
      );

      const fetchAndPost = async () => {
        const fetcher = new ZoeMainsSubredditFetcher();
        const posts = await fetcher.getLatestPostsSince(300);
        posts.forEach(post => {
          const embed: RichEmbed = buildEmbed(post);
          (chan as TextChannel).send(embed);
        });
      };

      setInterval(fetchAndPost, 300000);
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
}
