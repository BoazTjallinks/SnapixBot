import { MessageReaction } from 'discord.js'
import { fetchCollection, addCollection, setCollection } from '../database'
import config from '../../var/config.json'

export async function createvc(client, reaction, user, channelData) {
    try {
        if (!reaction.message.guild.member(user.id).voice.channel) {
            reaction.users.remove(user)
            user.send("You will have to join a voice channel to do that!")
            return
        }

        // Fetch all public channels
        let perms = [
            {
                id: reaction.message.guild.id,
                deny: ['CONNECT'],
            },
            {
                id: channelData.customData.permrole,
                allow: ['CONNECT'],
            }
        ]
        
        
        // channelData.customData.viewPerms
        let amount = 1

        await fetchCollection('createdPublicChannels').then(function (cont) {
            let content = JSON.parse(cont).collectionContent
            for (let i = 0; i < content.length; i++) {
                let allchannels = content[i]
                if (allchannels.channelType == channelData.customData.ChannelName) {
                    amount++
                }        
            }
        })

        if (amount > channelData.customData.MaxChannels) {
            reaction.users.remove(user)
            user.send("Amount of voice channels for this category exceeded!")
            return
        }

        let channelName = `${channelData.customData.ChannelName} | ${amount}`;
        
        await reaction.message.guild.channels.create(channelName, {
            type: 'voice' 
        }).then((channel) => {
            channel.setParent(config.mainDiscordVoiceCategoryId)
            reaction.message.guild.member(user.id).voice.setChannel(channel.id)
            
            channel.overwritePermissions(perms)

            addCollection('createdPublicChannels', {
                channelName: channelName,
                channelType: channelData.customData.ChannelName,
                channelId: channel.id
            })
        }).catch(console.error)
        reaction.users.remove(user)
    } catch (error) {
            
    }
    // reaction.message.react(reaction.emoji.name)
}