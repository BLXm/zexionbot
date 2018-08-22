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
    bot.user.setGame("Modération Discord Zexion");
    bot.user.setAvatar('./avatar.png')
    .then(() => console.log('Avatar mis avec succès'))
    .catch(console.error)
})


bot.on('message', function(message) {
    if (message.content == '!ping') {
        message.channel.send('pong')
    }
})



bot.on('message', message => {
    if (message.author.bot) return;
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
                value: "Alerte les membres du staff et vous déplaces dans le channel adapté (si vous vous trouvez déjà dans un channel vocal)."
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
            const chan = bot.channels.get('481189105401724958')
            var user_id = message.author.id
            var user = message.guild.members.find("id", user_id);

            bot.channels.get('481178032518725667').send(`Hey <@&481182702112997376> ! ${message.author.toString()} a besoin d'aide !`)
                       
            user.setVoiceChannel(chan)
            .then(() => console.log(`Moved  to ${chan}`))
            .catch(console.error);
        }

        function blague(max) {
            var nombre = Math.floor(Math.random() * (max - 1 + 1)) + 1
            switch (nombre) {
                case '0':
                message.channel.send(`Méfiez vous de l’oiseau sur le lac :\nC’est peut-être un mauvais cygne !`)
                break;
                case 1:
                    message.channel.send(`Les girafes, ça n'existe pas...\nNormal, c'est un cou monté !`)
                    break;
                case 2:
                    message.channel.send(`Qui est-ce qui court et qui se jette ?\nUne courgette.`)
                    break;
                case 3:
                    message.channel.send(`Tu connais la blague de la chaise?\nElle est pliante.`)
                    break;
                case 4:
                    message.channel.send(`C'est un gars qui rentre dans un café et plouf !`)
                    break;
                case 5:
                    message.channel.send(`C'est l'histoire du ptit dej, vous la connaissez ?\nPas de bol.`)
                    break;
                case 6:
                    message.channel.send(`Qu'est ce qui fait toin toin ?\nUn tanard`)
                    break;
                default:
                  message.channel.send(`Je ne connais pas de bonnes blagues`)
                    break;
            }
           
        }

        if (splitMessage[0] === '!zexionbot') {
            let Fondateur = message.guild.roles.find("name", "Fondateur")
            if(splitMessage.length === 2){
                switch (splitMessage[1]) {
                    case 'fils':
                    if(message.member.roles.has(Fondateur.id)){
                        message.channel.send('Papa ! :hearts:')
                    } else { message.channel.send("Vous n'avez pas la permission de m'adresser la parole.") }
                        break;
                    case 'salut':
                        message.reply('Salut !')
                        break;
                    case 'tg':
                        message.channel.send(`Hey <@&481182702112997376> ! ${message.author.toString()} a manqué de respect !`)
                        break;
                    case 'fdp':
                        message.channel.send(`Hey <@&481182702112997376> ! ${message.author.toString()} a manqué de respect !`)
                        break;
                    case 'blague':
                        blague(5);
                    break;
                    default:
                    message.channel.send('Euh.. Je ne peux pas aider')
                        break;
                }
            } else {
                message.channel.send('Euh.. Je ne peux pas aider')
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

