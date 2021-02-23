import { fetchCollection, addCollection } from '../handlers/database'

// Name
export const name = `kenanisbae`

// Usage of the message
export const usage = `kenan is bae`

// Perm lvl
export const permlvl = 0

// Emoji used for the response message
export const emoji = `🥰`

// Response to command execution
export const commandResponse = false

// Execute command
export async function execute(client, msg, response) {
    //response.edit("kenan is cute")
    msg.reply("Kenan is indeed cute https://thispersondoesnotexist.com/image")
    // fetchCollection('data').then(function (cont) {
    //     let JSONcontent = JSON.parse(cont)
    //     let content = JSONcontent.collectionContent
    //     response.edit(content[0])
    // })
    //console.log( addCollection('data', { username: `Michael`, password: `Password123😘` }) )   
}
