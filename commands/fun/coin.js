const Discord = require("discord.js");
const { Client, Collection, MessageEmbed } = require(`discord.js`);
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");


module.exports = {
    name: "coin", //the command name for execution & for helpcmd [OPTIONAL]
    category: "fun", //the command category for helpcmd [OPTIONAL]
    aliases: ["flipcoin"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "coin", //the command usage for helpcmd [OPTIONAL]
    description: "Flip a coin, good luck!.", //the command description for helpcmd [OPTIONAL]
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
        let messages = [':coin: Angka!', ':eagle: Burung!']
        let random = Math.floor(Math.random() * 2)
        console.log('=======> FLIPCOIN RESULT')
        console.log(messages[random])
        console.log('=======> SENDING RESULT TO DISCORD')
        message.channel.send(messages[random])
}
}