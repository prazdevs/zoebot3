import { Client, Message } from 'discord.js';

import { Command, CommandType } from './Command';

export class SayCommand extends Command<CommandType.say> {
  constructor(private message: Message, private args: string[]) {
    super();
  }

  execute = (): void => {
    this.message.channel.send(this.args.join(' '));
  };

  canExecute = (): boolean => true;
}
