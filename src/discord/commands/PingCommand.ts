import { Client, Message } from 'discord.js';

import { Command, CommandType } from './Command';

export class PingCommand extends Command<CommandType.ping> {
  constructor(private message: Message, private client: Client) {
    super();
  }

  execute = (): void => {
    if (this.canExecute()) {
      this.message.channel.send(`My latency is ${this.client.ping}ms`);
    }
  };

  canExecute = (): boolean => true;
}
