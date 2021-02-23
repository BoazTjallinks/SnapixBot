import { createvc } from './reactions/createvc'
import { createprivatevc } from './reactions/createprivatevc'
import { information } from './reactions/information'
import { roleaccept } from './reactions/roleaccept'
import { fetchCollection, addCollection, setCollection } from './database'

export async function ReactionHandler(client, reaction, user) {
    fetchCollection('reactionthingy').then(function (cont) {
        let JSONcontent = JSON.parse(cont)
        let content = JSONcontent.collectionContent

        for (let i = 0; i < content.length; i++) {
            let channelData = content[i];
            if (reaction.message.id === channelData.messageId && reaction.emoji.name === channelData.reaction) {
                switch (channelData.type) {
                    case "information":
                        information(client, reaction, user, channelData)
                        break;
    
                    case "createvc":
                        createvc(client, reaction, user, channelData)
                        break;

                    case "createprivatevc":
                        createprivatevc(client, reaction, user, channelData)
                        break;

                    case "roleaccept":
                        roleaccept(client, reaction, user, channelData)
                        break;
                }
            }
        }
    })
}