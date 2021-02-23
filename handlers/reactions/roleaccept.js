
export async function roleaccept(client, reaction, user, channelData) {
    const role = reaction.message.channel.guild.roles.cache.find(role => role.name == "Member");

    reaction.message.guild.member(user).roles.add(role);
}