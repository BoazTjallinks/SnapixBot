// Imports
import {mainDiscordVoiceChannelId} from '../var/config.json'
import { channelDisconnect } from './channelDisconnect'

export async function mainvoiceHandler(client, newState, oldState) {
    
    if (newState.channel) {
        // Checks whether the user joined the main voice channel
        // if (newState.channel.id === mainDiscordVoiceChannelId ) { 
           
        // }

        const role = newState.channel.guild.roles.cache.find(role => role.name == "ShowMeVoiceChannels");
        let member = newState.member

        member.roles.add(role).catch(console.error)
    }
    
    else {
        // if (oldState.channel.id === mainDiscordVoiceChannelId) {
        
        // }
        const role = oldState.channel.guild.roles.cache.find(role => role.name == "ShowMeVoiceChannels");
        let member = oldState.member

        member.roles.remove(role).catch(console.error)

        channelDisconnect(client, newState, oldState)
    }
}