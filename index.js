// Imported modules
import discord from 'discord.js'
import { CommandHandeler } from './handlers/commands'
import {commandPrefix, discordToken} from './var/config.json'
import { mainvoiceHandler } from './handlers/mainvoice'
import { ReactionHandler } from './handlers/reactions'

// Creates instance of dsc.js
const client = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

// Commands collection
client.commands = new discord.Collection()

// Ready system dsc.js and setup handlers
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

// Setup command handler
CommandHandeler(client)
  
// Message Listener dsc.js 
client.on('message', async message => {
    if (message.channel.id === "792048639475974154") {
        message.delete()
    }
    // check for bot
    if (message.author.bot) return;
    
    if (message.cleanContent.startsWith(commandPrefix)) {
        client.commands.forEach(async command => {
            if (message.cleanContent.startsWith(`${commandPrefix}${command.usage}`)) {
                let responseMsg = null;
                
                if (command.commandResponse) {
                    // Sends message
                    responseMsg = await message.channel.send(`${command.emoji} Constructing message...`)
                }

                command.execute(client, message, responseMsg)
            }
        })
    }
})


// Voice Listener dsc.js
client.on('voiceStateUpdate', async (oldState, newState) => {
     // check for bot
     if (oldState.member.user.bot) return;

     // Voice channel handler when user joins a vc
     mainvoiceHandler(client, newState, oldState);
})

// Message Listener dsc.js
client.on("messageReactionAdd", async (reaction, user) => {

    // Check for bot
    if (user.bot) return; 

    ReactionHandler(client, reaction, user)
});


// Login for discord
client.login(discordToken)