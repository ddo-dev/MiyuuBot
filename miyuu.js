const Discord = require('discord.js')
const client = new Discord.Client()
require('dotenv').config()

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}!`)
})

client.on('guildMemberAdd', member=>{
    member.send(
        'Welcome! My name is Miyuu and I can assit you. Please type "~miyuu help" for instructions'
    )
})

client.on('message', message => {
    if (message.content === 'miyuu marco') {
        message.reply('Polo')
    }
})

client.on('message', message => {
    if (message.content.startsWith('miyuu test')) {
        message.mentions.members.first().send(
            `testing mentions ${message.mentions.members.first()}`
        )
    }
})

client.on('message', message => {
    if (message.content === 'miyuu help') {
        message.author.send(
            'Please type "miyuu" before the command to call on me!\n' +
            '   "help" - sends instruction set on how to use me\n' +
            '   "marco" - I will reply with "Polo"\n' +
            '   "kick @tag" - Will kick member mentioned if you have proper authority\n' +
            '   "call @tag" - Calls Mentioned tagged user\n'
        )
    }
})

client.on('message', message => {
    if(message.content.startsWith('miyuu kick')){
        const member = message.mentions.members.first()

        if(!member) {
            return message.reply(
                'Who are you trying to kick?'
            )
        }

        if(!member.kickable){
            return message.reply("I'm sorry, this person is stronger than me.")
        }

        return member
            .kick()
            .then(() => message.reply(`${member.user.tag} was kicked by ${member.author.username}.`))
            .catch(error => message.reply('Sorry, there was an error.'))
    }
})

client.on('message', message => {
    if(message.content.startsWith('miyuu call')){
        const member = message.mentions.members.first()
        //message.member.send(member.user.tag)

        if(!member) {
            return message.reply(
                `Who are you calling, ${message.author.tag}?`
            )
        }

        return message.channel.send(
                `${member.user}! ${message.author} is calling for you!`
            )
            .then(() => member.user.send(`${message.author} is calling you!`))
            .catch(error => message.reply('Something broke'))
    }
})


client.login(process.env.BOT_TOKEN)