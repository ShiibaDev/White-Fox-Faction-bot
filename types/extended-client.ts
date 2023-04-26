// Credit to Brian-Magnuson for DiscordTsBot template
// URL: https://github.com/Brian-Magnuson/DiscordTsBot/blob/main/types/extended-client.ts

import {
   Client,
   ClientOptions,
   Collection,
   CommandInteraction
} from 'discord.js';
import Command from './Command.js';

export default class ExtClient extends Client<true> {
   commands: Collection<string, Command> = new Collection();

   constructor(clientOptions: ClientOptions) {
      super(clientOptions)
   }
}