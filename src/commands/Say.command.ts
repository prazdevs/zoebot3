import { Message } from 'discord.js';

import { Command, CommandType } from './Command';

export class SayCommand extends Command<CommandType.say> {
  constructor(private message: Message, private args: string[]) {
    super();
  }

  async execute(): Promise<void> {
    if (this.canExecute()) {
      try {
        await this.message.channel.send(this.args.join(' '));
        await this.message.delete();
      } catch (err) {
        console.error(`Could not execute command Say. Error: ${err.message}`);
      }
    }
  };

  canExecute(): boolean {
    return this.message.member.hasPermission('ADMINISTRATOR');
  };
}
