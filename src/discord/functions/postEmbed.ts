import { Channel, Client, Message, RichEmbed, TextChannel } from 'discord.js';

export const postEmbed = async (
  channel: TextChannel,
  title: string,
  content: string,
  author: string,
  imageUrl: string
) => {
  const embed = new RichEmbed()
    .setDescription(content)
    .setAuthor(author)
    .setTitle(title)
    .setImage(imageUrl);

  await channel.send(embed);
};
