const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "purge", //the Command Name
    category: "Moderation", //the Command Category [OPTIONAL]
    aliases: ["clear"], //the command aliases [OPTIONAL]
    cooldown: 2, //the Command Cooldown (Default in /botconfig/settings.json) [OPTIONAL]
    usage: "clear <amount>", //the Command usage [OPTIONAL]
    description: "Clear message text.", //the command description [OPTIONAL]
    memberpermissions: ["MANAGE_MESSAGES"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "You are missing the text you wanna add to the message!", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "You are having too many arguments for this Command!", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {

        const amount = parseInt(args[0]) + 1;

        if(isNaN(amount)){
            return message.channel.send(`:x: **That isn't a valid Number**`)
        }else if(amount <= 1 || amount > 100){
            return message.channel.send(`:x: **The amount needs to be below 100**`)
        }

        message.channel.bulkDelete(amount, true).then(deletedMessages =>{
            var botMessages = deletedMessages.filter(m => m.author.bot);
            var userPins = deletedMessages.filter(m => m.pinned);

            let embed = new MessageEmbed()
            .setTitle(`Messages Purged Successfully`)
            .setColor(ee.color)
            .setDescription(`**Total Messages Purged:** ${deletedMessages.size - 1}\n **Bot Messages Purged:** ${botMessages.size} \n **User Pins Purged:** ${userPins.size}`)
            .setFooter(ee.footertext, ee.footericon)
            .setTimestamp()

            message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 7000 })
            })
        }).catch(err => {
            message.channel.send(`**There was an error trying to Purge the Messages**`)
            console.log(err)
        })

    }
}

