/*
Part of the following source code was retrieved from discordjs/guide.
discordjs/guide is licensed under the MIT License
Copyright (c) 2017 - 2022 Sanctuary
*/

import {
   Events,
   BaseInteraction
} from "discord.js";
import ExtClient from "../types/extended-client";

module.exports = {
   name: Events.InteractionCreate,
   async execute(interaction: BaseInteraction) {
      // CHAT INPUT COMMANDS
      if (interaction.isChatInputCommand()) {
         const command = (interaction.client as ExtClient).commands.get(interaction.commandName);

         if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
         }

         try {
            await command.execute(interaction);
         } catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
         }

         // BUTTON COMMANDS
      }
   }
}