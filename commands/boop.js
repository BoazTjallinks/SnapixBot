// Name
export const name = `boop`

// Usage of the message
export const usage = `boop`

// Perm lvl
export const permlvl = 0

// Emoji used for the response message
export const emoji = `🚧`

// Response to command execution
export const commandResponse = true

// Execute command
export async function execute(client, msg, response) {
    
    // Sends boop to user
    msg.mentions.users.first().send(`Boop!`)
    .then(
        // Replaces original msg with Boop send
        response.edit(`✔️ Boop send!`)
    )
    .catch(
        console.error
    )
}