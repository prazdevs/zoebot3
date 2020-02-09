import { Client, Message } from 'discord.js';

export enum CommandType {
  ping,
  here,
  say,
  post,
}

export abstract class Command<CommandType> {
  abstract execute(): void;
  abstract canExecute(): boolean;
}
