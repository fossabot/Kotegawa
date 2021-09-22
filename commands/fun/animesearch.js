const Discord = require("discord.js");
const malScraper = require('mal-scraper');
const { Client, Collection, MessageEmbed } = require(`discord.js`);
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");

module.exports = {
    name: "animesearch", //the command name for execution & for helpcmd [OPTIONAL]
    category: "fun", //the command category for helpcmd [OPTIONAL]
    aliases: ["searchanime", "anime", "carianime", "infoanime"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "animesearch [args]", //the command usage for helpcmd [OPTIONAL]
    description: "Show anime statistic", //the command description for helpcmd [OPTIONAL]
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
          let search = args.join(" ");
        if (!search) search = await awaitMessages(message);
        if (!search) return;
        
            malScraper.getInfoFromName(search)
                .then((data) => {
                    let cahra = '';
                    data.characters.forEach(al => {
                        cahra += `[${al.name}](${al.link}),`;
                    });
                    const malEmbed = new MessageEmbed()
                    malEmbed.setThumbnail(data.picture)
                    malEmbed.setColor(ee.color)
                    malEmbed.setTitle(data.englishTitle || data.title)
                    malEmbed.setDescription(data.japaneseTitle)
                    malEmbed.addField('Type', data.type, true)
                    malEmbed.addField('Episodes', data.episodes, true)
                    malEmbed.addField('Rating', data.rating, true)
                    malEmbed.addField('Aired', data.aired, true)
                    malEmbed.addField('Score', data.score, true)
                    malEmbed.addField('Score Stats', data.scoreStats, true)
                    malEmbed.addField('Characters', cahra);
                    malEmbed.addField('Synopsis', data.synopsis);
                    malEmbed.setFooter(ee.footertext, ee.footericon)
                    message.channel.send(malEmbed);
                })
        async function awaitMessages(message) {
            let responce;

            const filter = (user) => {
                return user.author.id === message.author.id;
            };

            message.channel.send("**What do you want to search anime for?** \n**Type `cancel` to cancel the command. for 10 seconds**");

            await message.channel
                .awaitMessages(filter, { max: 1, time: 10000, errors: ["time"] })
                .then((msg) => {
                    const firstMsg = msg.first();
                    if (firstMsg.content.toLowerCase() === "cancel") return firstMsg.react("👍");
                    responce = firstMsg.content;
                })
                .catch(() => {
                    message.channel.send("Welp.. you took too long, cancelling the command.");
                });

            return responce;
        }
    }
}