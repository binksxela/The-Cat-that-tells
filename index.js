const { channelId, ignoredChannels, token } = require("./settings.json")
const { Client, RichEmbed } = require("discord.js")
const Cat = new Client()

const toLog = (channel) => (message) => {
    // If the message was sent by a bot or on a specific channel, it's ignored
    const isSame = message.channel === channel
    const isIgnored = ignoredChannels.some(channel => message.channel.id === channel)

    if(message.author.bot || isSame || isIgnored || !message.mentions.roles.length) return

    // Check if the message contain a role mention
    const embed = new RichEmbed()
        .setColor([122, 226, 65])
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
        .addField('Channel', `${message.channel} (${message.channel.name || 'ERROR'})`, true)
        .addField(`Go to the message`, `[Link](${message.url})`, true)
        .addField('Content', message.content ? message.content.substr(0, 500) : "❌ _Image(s)_")
        .setTimestamp(message.createdAt)
        .setURL(message.url)
    // Log the message + the author in the log's channel
    return channel.send({ embed })
}

Cat.on('ready', () => {
    const channel = Cat.channels.get(channelId)   
    console.log("The cat want to tell a story")
    Cat.on("message", toLog(channel))
        .on("messageDelete", toLog(channel))
})

Cat.login(token)
