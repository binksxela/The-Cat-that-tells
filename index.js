const { channelId, ignoredChannels, token } = require('./settings.json')
const { Client, RichEmbed } = require('discord.js')
const Cat = new Client()
let channel

Cat
.on('ready', () => {
    channel = Cat.channels.get(channelId)   
    console.log('The cat want to tell a story')
})
.on('message', message => {

    if(message.author.bot) return

    if(message.channel === channel) return
    for(let i = 0; i < ignoredChannels.length; i++)
        if(message.channel === Cat.channels.get(ignoredChannels[i])) return

    if(message.mentions.roles.first()) {
        const embed = new RichEmbed()
        .setColor([122, 226, 65])
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
        .addField('Channel', `<#${message.channel.id}> (${message.channel.name ? message.channel.name : 'ERROR'})`, true)
        .addField('Content', message.content ? message.content.substr(0, 500) : '❌ _Image(s)_')
        .setFooter(`Date: ${message.createdAt}`)

        return channel.send({ embed })
    }

})
.on('messageDelete', message => {

    if(message.author.bot) return

    if(message.channel === channel) return
    for(let i = 0; i < ignoredChannels.length; i++)
        if(message.channel === Cat.channels.get(ignoredChannels[i])) return

    if(message.mentions.roles.first()) {
        const embed = new RichEmbed()
        .setColor([244, 95, 66])
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
        .addField('Channel', `<#${message.channel.id}> (${message.channel.name ? message.channel.name : 'ERROR'})`, true)
        .addField('Content', message.content ? message.content.substr(0, 500) : '❌ _Image(s)_')
        .setFooter(`Date: ${message.createdAt}`)

        return channel.send({ embed })
    }

})

Cat.login(token)
