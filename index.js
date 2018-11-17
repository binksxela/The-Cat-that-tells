const { channelId, ignoredChannels, token } = require('./settings.json')
const { Client, RichEmbed } = require('discord.js')
const Cat = new Client()
let channel

const toLog = (message) => {
    // If the message was sent by a bot, it's ignored
    if(message.author.bot) return

    // Ignore all messages was sent in a specific channel
    if(message.channel === channel) return
    for(let i = 0; i < ignoredChannels.length; i++)
        if(message.channel === Cat.channels.get(ignoredChannels[i])) return

    // Check if the message contain a role mention
    if(message.mentions.roles.first()) {
        const embed = new RichEmbed()
        .setColor([122, 226, 65])
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
        .addField('Channel', `<#${message.channel.id}> (${message.channel.name ? message.channel.name : 'ERROR'})`, true)
        .addField(`Go to the message`, `[Link](${message.url})`, true)
        .addField('Content', message.content ? message.content.substr(0, 500) : '❌ _Image(s)_')
        .setFooter(`Date: ${message.createdAt}`)
        .setURL(message.url)

        // Log the message + the author in the log's channel
        return channel.send({ embed })
    }
}

Cat
.on('ready', () => {
    channel = Cat.channels.get(channelId)   
    console.log('The cat want to tell a story')
})
.on('message', toLog)
.on('messageDelete', toLog)

Cat.login(token)
