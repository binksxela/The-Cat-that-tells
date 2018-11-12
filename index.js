const express = require('express')
const app     = express()

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
        .addField('Content', message.content ? message.content.substr(0, 500) : '❌ _Image(s)_')
        .setFooter(`Date: ${message.createdAt}`)

        // Log the message + the author in the log's channel
        return channel.send({ embed })
    }
}

Cat
.on('ready', () => {
    channel = Cat.channels.get(channelId)   

    app.set('port', (process.env.PORT || 5000))
    app.get('/', (request, response) => {
        response.sendFile(__dirname + './index.html')
    }).listen(app.get('port'), () => {
        console.log("App is running, server is listening on port ", app.get('port'))
    })

    console.log('The cat want to tell a story')
})
.on('message', message => toLog(message))
.on('messageDelete', message => toLog(message))

Cat.login(token)
