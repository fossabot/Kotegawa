const Discord = require("discord.js");
const { Client, Collection, MessageEmbed } = require(`discord.js`);
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const { API, } = require('nhentai-api');
const api = new API();
const shortUrl = require('node-url-shortener');

module.exports = {
    name: "nhentai", //the command name for execution & for helpcmd [OPTIONAL]
    category: "fun", //the command category for helpcmd [OPTIONAL]
    aliases: ["nh", "nhen", "ndl"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "nhentai [args]", //the command usage for helpcmd [OPTIONAL]
    description: "Download doujin from nhentai as ZIP.", //the command description for helpcmd [OPTIONAL]
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
        if (!message.channel.nsfw) { message.channel.send("You only can use this command in NSFW channel ❤️."); return; };
        if (args.length == 0) return message.channel.send("Please input your nHentai code!");
        api.getBook(args[0]).then(book => {
            const gambarcover = api.getImageURL(book.cover);    // https://t.nhentai.net/galleries/987560/cover.jpg
            shortUrl.short(`https://mangadl.herokuapp.com/download/nhentai/${args[0]}/zip`, function (err, url) {
                //console.log(book)
                console.log('=======> NHENTAI API RESULT');
                console.log(book.title.english);
                console.log(book.title.japanese);
                console.log(url);
                console.log('=======> SENDING RESULT TO DISCORD');
                let embed = new MessageEmbed();
                embed.setColor(ee.color);
                embed.setTitle(book.title.english || '');
                embed.setDescription(book.title.japanese || '');
                embed.addField('Tags :', book.tags.map((tag) => tag.name).join(', '));
                embed.addField('Favorites :', book.favorites);
                embed.addField('Pages :', book.pages.length);
                embed.addField('Download:', `[DOWNLOAD ZIP](${url})`);
                embed.setImage(gambarcover);
                embed.setFooter(ee.footertext, ee.footericon);
                message.channel.send(embed);
            });
        }).catch(error => {
            console.log(error)
            message.reply("Something error")
        })

    }
}