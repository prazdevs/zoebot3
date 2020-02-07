import { Client, Message, RichEmbed } from 'discord.js';
import fs from 'fs';

import { CommandType } from './commands/Command';
import { Herecommand } from './commands/HereCommand';
import { PingCommand } from './commands/PingCommand';
import { PostCommand } from './commands/PostCommand';
import { SayCommand } from './commands/SayCommand';

export class ZoeBot {
  private client: Client = new Client();
  private prefix: string = 'z!';

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
    this.client.on('message', async message => {
      //* filter out requests from bot and other prefixes
      if (message.author.bot) return;
      if (message.content.indexOf(this.prefix) !== 0) return;

      this.executeCommand(message);
    });
  };

  private parseCommand = (messageContent: string): [CommandType, string[]] => {
    const args = messageContent
      .slice(this.prefix.length)
      .trim()
      .split(/ +/g);
    const keyword = args.shift()?.toLowerCase() ?? '';
    const commandType = CommandType[keyword as keyof typeof CommandType];
    return [commandType, args];
  };

  private executeCommand = (message: Message): void => {
    const [keyword, args] = this.parseCommand(message.content);

    switch (keyword) {
      case CommandType.ping:
        new PingCommand(message, this.client).execute();
        break;

      case CommandType.here:
        new Herecommand(message).execute();
        break;

      case CommandType.say:
        new SayCommand(message, args).execute();
        break;

      case CommandType.post:
        new PostCommand(new RichEmbed()).execute();

      default:
        break;
    }
  };
}
