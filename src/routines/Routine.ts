export abstract class Routine {
  protected interval: number;
  protected abstract routineFunction(): void | Promise<void>;

  constructor(interval?: number) {
    this.interval = interval ?? 60;
  }

  start() {
    setInterval(this.routineFunction, this.interval * 1000);
  }
}
