import { Events } from 'discord.js'

module.exports = {
   name: Events.ClientReady,
   once: true,
   async execute(client) {
      console.log(`READY! LOGGED IN AS -> ${ client.user.tag }`)
   }
}