import { Client, Message } from 'discord.js';

import { Command, CommandType } from './Command';
import { PingCommand } from './Ping.command';
import { SayCommand } from './Say.command';

export class CommandFactory {
  constructor(private client: Client, private prefix: string) {}

  createCommand = (message: Message): Command<CommandType> => {
    const [keyword, args] = this.parseCommand(message.content);

    switch (keyword) {
      case CommandType.say:
        return new SayCommand(message, args);

      case CommandType.ping:
        return new PingCommand(message, this.client);

      default:
        throw 'Keyword not implemented';
    }
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
}
