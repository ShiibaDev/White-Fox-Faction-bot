import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import * as fs from 'fs';
const { Token, CLIENT_ID } = require('./security.json');

const commands: Array<ReturnType<typeof SlashCommandBuilder.prototype.toJSON>> = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
   const command = require(`./commands/${file}`);
   commands.push(command.data.toJSON()); // push the command data to the commands array
   console.log(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(`${Token}`);

(async() => {
   try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(
         Routes.applicationCommands(CLIENT_ID),
         { body: commands }
      );

      console.log('Succesfully reloading application (/) commands');
   } catch (error) {
      console.error(error);
   }
})();