import { Client, Message, RichEmbed } from 'discord.js';

import { CommandType } from './commands/Command';
import { CommandFactory } from './commands/CommandFactory';

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
      await this.client.user.setActivity('OwO');
    });
  };

  private setMessageHandler = (): void => {
    this.client.on('message', async (message: Message) => {
      //* filter out requests from bot and other prefixes
      if (message.author.bot) return;
      if (message.content.indexOf(this.prefix) !== 0) return;

      //* delegates creation to factory
      const command = this.commandFactory.createCommand(message);
      command.execute();
    });
  };
}
