// A lot of the code has been taken from discord.js guide
import {
   Client,
   Events,
   GatewayIntentBits,
   Collection
} from 'discord.js'
import fs from 'node:fs';
import path from 'node:path';
import ExtClient from './types/extended-client';
import Command from './types/Command';
import { Token } from './security.json';

// Create a new client instance
const client = new ExtClient({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = (fs.readdirSync(commandsPath) as string[]).filter(file => file.endsWith('.ts'));
// For each file...
for (const file of commandFiles) {
   // Get the contents of each file....
   const filePath = path.join(commandsPath, file);
   const command: Command = require(filePath);
   // Set a new item in the Collection with the key as the command name and the value as the exported module
   client.commands.set(command.data.name, command);
}

// ADD ALL THE EVENTS
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));
// For each file...
for (const file of eventFiles) {
  // Get the contents of each file...
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  // If the event has the 'once' property set to true...
  if (event.once) {
    // Set the event using .once()
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    // Set the event using .on()
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.on(Events.InteractionCreate, interaction => {
   if (!interaction.isChatInputCommand()) return;
   console.log(interaction);
})

// Log in discord with your client's token
client.login(Token);