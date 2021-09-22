const Discord = require("discord.js");
const translate = require("translatte");
const { Client, Collection, MessageEmbed } = require(`discord.js`);
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");

module.exports = {
    name: "translate", //the command name for execution & for helpcmd [OPTIONAL]
    category: "fun", //the command category for helpcmd [OPTIONAL]
    aliases: ["ts", "tl"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "translate <from> <to> <text> ", //the command usage for helpcmd [OPTIONAL]
    description: "Translate you text into some lang", //the command description for helpcmd [OPTIONAL]
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


     if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle(":x: Error | Unknown Command Usage!").setDescription(`${prefix}translate <from> <to> <text>\nExample: ${prefix}translate id en Kamu siapa`))

      if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle(":x: Error | Unknown Command Usage!").setDescription(`${prefix}translate <from> <to> <text>\nExample: ${prefix}translate id en Kamu siapa`))

      if(!args[2]) return message.channel.send(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle(":x: Error | Unknown Command Usage!").setDescription(`${prefix}translate <from> <to> <text>\nExample: ${prefix}translate id en Kamu siapa`))

    translate(args.slice(2).join(" "), {from: args[0], to: args[1]}).then(res=>{
      let embed = new MessageEmbed()
      .setColor(ee.color)
      .setThumbnail("https://imgur.com/0DQuCgg.png")
      .setFooter(ee.footertext, ee.footericon)
      .addField(`From: \`${args[0]}\``.substr(0, 256), args.slice(2).join(" ").substr(0, 1024))
      .addField("\u200B", "\u200B")
      .addField(`To: \`${args[1]}\``.substr(0, 256), res.text.substr(0, 1024))
      message.channel.send(embed)
      }).catch(err => {
        let embed = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTitle(":x: Error | Something went wrong")
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(String("```"+err.stack+"```").substr(0, 2000))
        message.channel.send(embed)
          console.log(err);
      });
    }
  };