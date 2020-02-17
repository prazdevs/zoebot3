import { Client, Message } from 'discord.js';

import { CommandFactory } from './commands/CommandFactory';
import { startFetchAndPostRoutine } from './routines/fetchAndPost.routine';

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

      //* routines
      await startFetchAndPostRoutine(30,'zoemains', this.client);
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
