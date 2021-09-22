const Discord = require("discord.js");
const fetch = require("node-fetch");
const { Client, Collection, MessageEmbed } = require(`discord.js`);
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");

module.exports = {
    name: "wiki", //the command name for execution & for helpcmd [OPTIONAL]
    category: "fun", //the command category for helpcmd [OPTIONAL]
    aliases: ["wikipedia"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "wiki [args] ", //the command usage for helpcmd [OPTIONAL]
    description: "Search wikipedia page", //the command description for helpcmd [OPTIONAL]
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
    
    const wiki = args.join(' ')
    if(!wiki) return message.reply('Provide A Query To Search.') // If No Topic Provided To Searched
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}` // From Here BOT Will Search For Searched Topic

    let response
    try {
        response = await fetch(url).then(res => res.json()) // Getting Result
    }
    catch (e) {
        return message.reply('An Error Occured, Try Again.') // If Error Occur's
    }

    try {
        if(response.type === 'disambiguation') { // If Their Are Many Results With Same Searched Topic
            const embed = new Discord.MessageEmbed()
                .setColor(ee.color)
            .setTitle(response.title) // Title Of Topic
            .setURL(response.content_urls.desktop.page) // URL Of Searched Topic
            .setDescription([`
            ${response.extract}
            Links For Topic You Searched [Link](${response.content_urls.desktop.page}).`])
            .setFooter(ee.footertext, ee.footericon)
            message.channel.send(embed)
        }
        else { // If Only One Result
            const embed = new Discord.MessageEmbed()
            try{embed.setColor(ee.color)}catch{}
            try{embed.setTitle(response.title)}catch{} // Title Of Topic
            try{embed.setURL(response.content_urls.desktop.page)}catch{} // URL Of Searched Topic
            try{embed.setThumbnail(response.thumbnail.source)}catch(e){console.log(e)}
            try{embed.setDescription(response.extract)}catch{}
            try{embed.setFooter(ee.footertext, ee.footericon)}catch{}
            message.channel.send(embed)
        }
    }
    catch (e){
      console.log(e)
        return message.reply('Provide A Valid Query To Search.') // If Searched Topic Is Not Available
    }
  }
};