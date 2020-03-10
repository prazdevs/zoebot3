export enum CommandType {
  ping,
  say,
}

export abstract class Command<CommandType> {
  abstract async execute(): Promise<void>;
  abstract canExecute(): boolean;
}
