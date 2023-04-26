import { SlashCommandBuilder } from 'discord.js'

module.exports = {
   data: new SlashCommandBuilder()
      .setName('Ad')
      .setDescription('Say an announce, pinging everyone'),
   async execute(interaction) {
      await interaction.reply();
   },
};