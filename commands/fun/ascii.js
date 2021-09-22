const Discord = require("discord.js");
const { Client, Collection, MessageEmbed } = require(`discord.js`);
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const figlet = require('figlet');
const BannedWords = require('../../botconfig/badword.json');

module.exports = {
    name: "ascii", //the command name for execution & for helpcmd [OPTIONAL]
    category: "fun", //the command category for helpcmd [OPTIONAL]
    aliases: ["textgede"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "ascii [args]", //the command usage for helpcmd [OPTIONAL]
    description: "Ｃｏｎｖｅｒｔ　ｔｅｘｔ　ｔｏ　ＡＳＣＩＩ　ｓｔｙｌｅ．", //the command description for helpcmd [OPTIONAL]
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
        if (!args[0]) return message.reply("Ｙｏｕ　ｄｉｄｎ＇ｔ　ｔｅｌｌ　ｍｅ　ｗｈａｔ　ｔｏ　ｃｏｎｖｅｒｔ!");
        if (BannedWords.some(word => message.toString().toLowerCase().trim().match(/\w+|\s+|[^\s\w]+/g) !== null && message.toString().toLowerCase().trim().match(/\w+|\s+|[^\s\w]+/g).includes(word)))  return;
        figlet(args.join(' '), function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log('=======> ASCII RESULT')
            console.log(data)
            console.log('=======> SENDING RESULT TO DISCORD')
            message.channel.send("```" + data + "```")
        });
    }
}