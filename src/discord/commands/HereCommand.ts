import { Client, Message } from 'discord.js';

import { Command, CommandType } from './Command';

export class Herecommand extends Command<CommandType.here> {
  constructor(private message: Message) {
    super();
  }

  execute = (): void => {
    console.log(`i wanted to add this channel : ${this.message.channel.id}`);
  };

  canExecute = (): boolean =>
    this.message.member.hasPermission('ADMINISTRATOR');
}
