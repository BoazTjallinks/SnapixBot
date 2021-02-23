import { fetchCollection, addCollection } from '../handlers/database'

// Name
export const name = `vc accept`

// Usage of the message
export const usage = `vc accept `

// Perm lvl
export const permlvl = 0

// Emoji used for the response message
export const emoji = `🚧`

// Response to command execution
export const commandResponse = false

// Execute command
export async function execute(client, msg, response) {
    // fetchCollection('data').then(function (cont) {
    //     let JSONcontent = JSON.parse(cont)
    //     let content = JSONcontent.collectionContent
    //     response.edit(content[0])
    // })


}