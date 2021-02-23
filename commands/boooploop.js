// Name
export const name = `boooploop`

// Usage of the message
export const usage = `sldoghbsdgkljbnzsdkjgbikdhsblihdsuivhbzdnfgvhdshufbvdfxvuysdvfzsdfhgugsdkjhfvsdpihfguhzsdbgsdgh`

// Perm lvl
export const permlvl = 0

// Emoji used for the response message
export const emoji = `🚧`

// Response to command execution
export const commandResponse = true

// Execute command
export async function execute(client, msg, response) {
    
    let msgsplit = msg.content.split(`!${this.usage}`)
    let secondSplit = msgsplit[1].split(' ')
    let amount = secondSplit[2]

    msg.delete()

    console.log(msgsplit)

    console.log(secondSplit)

    console.log(amount)


    booploop(amount)

    async function booploop(num) {
	if (num === 0) {
	    return false
	}

        setTimeout(function () {
            msg.mentions.users.first().send(`Boop!`)
            
            let newnum = num - 1
            booploop(newnum)
        }, 1000)
    }
}
