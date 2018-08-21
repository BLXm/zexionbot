const Discord = require('discord.js')
const bot = new Discord.Client()

const PREFIX = "!";

function sendError(message, description){
    message.channel.send({ embed: {
        color: 15158332,
        description: ':warning: ' + description
    }})
}

bot.on('ready', function(){
    bot.user.setAvatar('./avatar.png')
    .then(() => console.log('Avatar mis avec succès'))
    .catch(console.error)
})

bot.on('guildMemberAdd', member => {
    member.guild.channels.find("name", "481176846797635599").send(`Bienvenue sur le Discord de Zexion ${member.user.username} !`)
})

bot.on('message', function(message) {
    if (message.content == '!ping') {
        message.channel.send('pong')
    }
})



bot.on('message', message => {
    if (message.content[0] === PREFIX) {
    let splitMessage = message.content.split(" ")
    if (splitMessage[0] === '!commandes') {
        message.channel.send({embed: {
            color: 3447003,
            title: "Listes des commandes :",
            fields: [{
                name: "!lien site",
                value: "Vous donnes le lien du site."
              },
              {
                name: "!lien launcher",
                value: "Vous donnes le lien du launcher."
              },
              {
                name: "!lien boutique",
                value: "Vous donnes le lien de la boutique."
              },
              {
                name: "!lien forum",
                value: "Vous donnes le lien du forum."
              },
              {
                name: "!staff",
                value: "Alerte les membres du staff et vous déplaces dans le channel adapté."
              }
            ]
        }});
    }

        if (splitMessage[0] === '!clear') {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission.")
        let args = message.content.split(" ").slice(1);


                if(!args[0]) return  sendError(message, `Tu dois préciser combien de messages tu veux supprimer.`)
                if(args[0] <= 100) {
                message.channel.bulkDelete(args[0]).then(() => {
                    sendError(message, `${args[0]} messages ont été supprimés.`)
                })
            } else {
                sendError(message, `Houla pas trop de messages je n'y arriverai pas !`)
            }
        }


        if (splitMessage[0] === '!staff') {
        const mem = message.mentions.members.first()
        const chan = bot.channel.get("481189105401724958")
            mem.setVoiceChannel(chan)
            .then(() => console.log(`Moved ${mem.displayName} to ${chan}`))
        .catch(console.error);
        }

        exports.run = function(client, message) {

            
            if (splitMessage[0] === '!move') {
              mem.setVoiceChannel(client.channels.get('481189105401724958'))
                  .then(() => console.log(`Moved ${mem.displayName} to ${chan}`))
              .catch(console.error);
              }
            }

        if (splitMessage[0] === '!lien') {
            if(splitMessage.length === 2){
                if (splitMessage[1] === 'site') {
                    message.channel.send('https://zexion.fr')
                }
                if (splitMessage[1] === 'launcher') {
                    message.channel.send('https://zexion.fr/launcher')
                }
                if (splitMessage[1] === 'boutique') {
                    message.channel.send('https://zexion.fr/boutique')
                }
                if (splitMessage[1] === 'forum') {
                    message.channel.send('https://zexion.fr/forum')
                }
            } else {
                sendError(message, 'Erreur, problème dans les paramètres.')
            }
        }
    }
})

bot.login(process.env.BOT_TOKEN)

