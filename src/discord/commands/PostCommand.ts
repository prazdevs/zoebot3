import { RichEmbed } from 'discord.js';

import { Command, CommandType } from './Command';

export class PostCommand extends Command<CommandType.post> {
  constructor(private embed: RichEmbed) {
    super();
  }

  execute = (): void => {
    throw new Error('Method not implemented.');
  };
  canExecute = (): boolean => {
    throw new Error('Method not implemented.');
  };
}
