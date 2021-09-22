const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const { version: discordjsVersion } = require("discord.js");
const ms = require("pretty-ms");
const os = require("os");

module.exports = {
  name: "botinfo", //the command name for execution & for helpcmd [OPTIONAL]
  category: "Information", //the command category for helpcmd [OPTIONAL]
  aliases: ["infobot", "ifb"], //the command aliases for helpcmd [OPTIONAL]
  cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
  usage: "infobot ", //the command usage for helpcmd [OPTIONAL]
  description: "Shows statistic bots", //the command description for helpcmd [OPTIONAL]
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
    try {
    let bicon = client.user.displayAvatarURL; //bot avatar
    let botembed = new MessageEmbed()
      .setAuthor(`${client.user.username} Bot Information`, client.user.displayAvatarURL())
      .setColor(ee.color) //hex color randomizer
      .setThumbnail(bicon)
      .addField("**Uptime**", `\`\`\`${ms(client.uptime)}\`\`\``, true)
      .addField("**WebSocket Ping**", `\`\`\`${client.ws.ping}ms\`\`\``, true)
      .addField("**Memory**", `\`\`\`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap\`\`\``, true)
      .addField("**Guild Count**", `\`\`\`${client.guilds.cache.size} guilds\`\`\``, true)
      .addField(`**User Count**`, `\`\`\`${client.users.cache.size} users\`\`\``, true)
      .addField("**Commands**", `\`\`\`${client.commands.size} cmds\`\`\``, true)
      .addField("**Node Js**", `\`\`\`${process.version} on ${process.platform} ${process.arch}\`\`\``, true)
      .addField("**Cores**", `\`\`\`${os.cpus().length}\`\`\``, true)
      .addField('**Architecture**', `\`\`\`${os.arch()}\`\`\`` , true)
      .addField("**Cached Data**", `\`\`\`${client.users.cache.size} users\n${client.emojis.cache.size} emojis\`\`\``, true)
      .addField("**Discord.js**", `\`\`\`${discordjsVersion}\`\`\``, true)
      .addField("**Platform**", `\`\`\`${process.platform}\`\`\``, true)
      .setTimestamp()
      .setFooter(ee.footertext, ee.footericon);

    message.lineReply(botembed);
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`<:no:833101993668771842> ERROR | An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}

