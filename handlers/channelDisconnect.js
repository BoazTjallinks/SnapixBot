import {readdirSync} from "fs"
import { fetchCollection, addCollection, setCollection } from './database'
import { guildId } from '../var/config.json'

export async function channelDisconnect(client, newState, oldState) {
try {
    await fetchCollection('privateChannels').then(function (cont) {
        let content = JSON.parse(cont).collectionContent

        for (let i = 0; i < content.length; i++) {
            const element = content[i]

            if (element.active) {
                let channel = oldState.channel.guild.channels.cache.get(element.channelId)
            
                if (channel.members.size <= 0) {
                    channel.delete()

                    let newContent = content
                    newContent[i].channelId = ""
                    newContent[i].active = false
                    
                    setCollection('privateChannels', newContent)
                }
            }
        }
    })
    

    await fetchCollection('createdPublicChannels').then(function (cont) {
        let content = JSON.parse(cont).collectionContent

        for (let i = 0; i < content.length; i++) {
            const element = content[i]

            if (element.channelId !== "") {
                let channel = oldState.channel.guild.channels.cache.get(element.channelId)
            
                if (channel.members.size <= 0) {
                    channel.delete()
    
                    let newContent = content
                    newContent.splice(i, 1)
                    
                    setCollection('createdPublicChannels', newContent)
                }
            }
        }
    })  
} catch (error) {
    console.error(error)
}
}