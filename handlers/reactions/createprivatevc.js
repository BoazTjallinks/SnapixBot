import { MessageReaction } from 'discord.js'
import { fetchCollection, addCollection, setCollection } from '../database'
import config from '../../var/config.json'

export async function createprivatevc(client, reaction, user, channelData) {
    try{
        if (!reaction.message.guild.member(user.id).voice.channel) {
            reaction.users.remove(user)
            user.send("You will have to join a voice channel to do that!")
            return
        }

        let amount = 0
        let data = null
        let allData = null
        let whitelistedUsers = null

        await fetchCollection('privateChannels').then(function (cont) {
            let content = JSON.parse(cont).collectionContent
            allData = content
            for (let i = 0; i < content.length; i++) {
                let allchannels = content[i]
                if (allchannels.userId === user.id) {
                    amount++
                    data = content[i]
                    whitelistedUsers = content[i].whitelistedUsers
                }
            }
        })


        if (data == null) {
            data = {
                userId: user.id,
                channelName: `${user.username}'s channel`,
                active: false,
                channelId: "",
                whitelistedUsers: [
                    user.id
                ]
            }

            whitelistedUsers = [ user.id ]

            await addCollection('privateChannels', data)
        }


        if (amount > 0 && data.active) {
            reaction.users.remove(user)
            user.send("You already have an existing channel.")
            return
        }

        let userperms = [
            {
                id: reaction.message.guild.id,
                deny: ['CONNECT']
            } 
        ]


        for (let i = 0; i < data.whitelistedUsers.length; i++) {
            let usr = data.whitelistedUsers[i]

            userperms.push(
                {
                    id: usr,
                    allow: ['CONNECT']
                }
            )
        }


        console.log(userperms)

        await reaction.message.guild.channels.create(data.channelName, {
            type: 'voice'
        })
        .then((channel) => {
            channel.setParent(config.mainDiscordVoiceCategoryId)
            reaction.message.guild.member(user.id).voice.setChannel(channel.id)
            
            channel.overwritePermissions(userperms)

            let newdata = allData
            try {
                newdata[allData.indexOf(data)] = {
                    userId: data.userId,
                    channelName: data.channelName,
                    active: true,
                    channelId: channel.id,
                    whitelistedUsers: whitelistedUsers
                }
        
                setCollection('privateChannels', newdata)   
            } catch (error) {
                console.error()
            }

            // channelData.message.id
        })
        .catch(console.error)
        reaction.users.remove(user)
    } catch (error) {
        console.error(error) 
    }
    // reaction.message.react(reaction.emoji.name)
}