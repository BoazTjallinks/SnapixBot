
export async function information(client, reaction, user, channelData) {
    const role = reaction.message.channel.guild.roles.cache.find(role => role.name == channelData.customData.ReactionRoleName);

    reaction.message.guild.member(user).roles.add(role);
}