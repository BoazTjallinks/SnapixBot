import { fetchCollection, addCollection, setCollection } from '../handlers/database'
import Discord from "discord.js"

// Name
export const name = `requestJoinCall`

// Usage of the message
export const usage = `vc join `

// Perm lvl
export const permlvl = 0

// Emoji used for the response message
export const emoji = `🚧`

// Response to command execution
export const commandResponse = false

// Execute command
export async function execute(client, msg, response) {
    let user = msg.mentions.users.first()
    await addCollection('joinRequests', {
        authorId: msg.author.id,
        userId: user.id
    })

    let senderMessage = await user.send(generateEmbed(msg.author.username, msg.author.displayAvatarURL(), msg.author.id, 60))

    requestMessagethingy(client, msg, response, user, senderMessage, 60)
}


function generateEmbed(username, tumpnailImage, userId, time) {

    if (time === 0) {
        return new Discord.MessageEmbed()
        .setColor(`#ff0000`)
        .setTitle(`Channel join alert!`)
        .setDescription(`This request has been expired!`)
        .setThumbnail(tumpnailImage)
        .setFooter(`${time} second(s) left`, `https://i.imgur.com/B21F3su.png`)
    }

    return new Discord.MessageEmbed()
        .setColor(`#0099ff`)
        .setTitle(`Channel join alert!`)
        .setDescription(`${username} wants to join your channel! You have 60 seconds to accept. If you choose to accept the user will be moved to your channel.\nType ~bot vc accept ${userId} to accept the user!`)
        .setThumbnail(tumpnailImage)
        .setFooter(`${time} second(s) left`, `https://i.imgur.com/B21F3su.png`)
}



function requestMessagethingy(client, msg, response, user, senderMessage, counter) {
    setTimeout(async function () {
        if (counter == 0) {
            // msg.author.id, user.id
            fetchCollection('joinRequests').then(function (cont) {
                let JSONcontent = JSON.parse(cont)
                let content = JSONcontent.collectionContent

                let index = content.indexOf({
                    authorId: msg.author.id,
                    userId: user.id
                })

                if (index !== null) {
                    content.splice(index, 1);

                    setCollection('joinRequests', content)
                    senderMessage.edit(generateEmbed(msg.author.username, msg.author.displayAvatarURL(), msg.author.id, 0))
                }
            })
        } else {
            let newcounter = counter - 1;

            if (newcounter === 0 || newcounter === 1 || newcounter === 2 || newcounter === 3 || newcounter === 4 || newcounter === 5 || newcounter === 6 || newcounter === 7 || newcounter === 8 || newcounter === 29 || newcounter === 14 || newcounter === 19 || newcounter === 24 || newcounter === 29 || newcounter === 34 || newcounter === 39 || newcounter === 44 || newcounter === 49 || newcounter === 54) senderMessage.edit(generateEmbed(msg.author.username, msg.author.displayAvatarURL(), msg.author.id, counter))

            requestMessagethingy(client, msg, response, user, senderMessage, newcounter)
        }
    }, 1000)

}