import { Client, RichEmbed } from 'discord.js';
import fs from 'fs';

export class ZoeBot {
  private client: Client;
  private prefix: string = '!zbot';

  constructor() {
    this.client = new Client();
    this.initializeCient();
  }

  private initializeCient = (): void => {
    if (!this.client) return;

    this.client.on('ready', () => {
      console.log('Discord Bot connected');
      this.client.user.setActivity('OwO');
    });

    this.client.on('message', async message => {
      if(message.author.bot) return;

      if(message.content.indexOf(this.prefix) !== 0) return;




      if (message.content.startsWith ('here')) {
        fs.mkdir('posts', () => console.log('added folder'))
        fs.writeFile(`posts/${message.guild.id}.txt`, `${message.channel.id}\n`, () => console.log('written in file'))
      }
    });
  };

  connect = () => {
    this.client.login(process.env.D_TOKEN);
  };
}
