import {readdirSync} from "fs"

export async function CommandHandeler(client) {
    const commands = readdirSync(`./commands/`).filter(file => file.endsWith(".js"))
    
    for (let file of commands) {
        let pull = require(`../commands/${file}`)

        if (pull.name) {
        client.commands.set(pull.name, pull)
        }

        if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
    }
}