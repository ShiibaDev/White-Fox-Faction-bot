import { 
   SlashCommandBuilder,
   ChannelType,
   CommandInteraction,
   TextChannel
 } from 'discord.js'

module.exports = {
   data: new SlashCommandBuilder()
      // Requires name & description
      .setName('announces')
      .setDescription('Do an @everyone, and publish the text you write')

      // Add Options
      .addStringOption(option =>
         option.setName('input')
         .setRequired(true)
         .setMaxLength(3000)
      )
      .addChannelOption(option =>
         option.setName('channel')
            .setDescription('The channel to publish it')
            .addChannelTypes(ChannelType.GuildText)
      ),

   // Execution function
   async execute(interaction: CommandInteraction) {
      // Cast option values
      const input = interaction.options.get('input')?.value as string;
      const channel = interaction.options.get('channel')?.channel as TextChannel;
      if (channel) {
         await interaction.reply('Message sent');
         await channel.send(input);
      } else {
         await interaction.reply(input);
      }
   }
};