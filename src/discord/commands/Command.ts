import { Client, Message } from 'discord.js';

export enum CommandType {
  ping,
  say,
}

export abstract class Command<CommandType> {
  abstract execute(): void;
  abstract canExecute(): boolean;
}
