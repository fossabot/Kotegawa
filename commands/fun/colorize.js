const Discord = require("discord.js");
const { Client, Collection, MessageEmbed } = require(`discord.js`);
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const imgbbUploader = require('imgbb-uploader');
const request = require('request');

module.exports = {
    name: "colorize", //the command name for execution & for helpcmd [OPTIONAL]
    category: "fun", //the command category for helpcmd [OPTIONAL]
    aliases: ["warnain", "colorized"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "colorize [attachment]", //the command usage for helpcmd [OPTIONAL]
    description: "Colorized black and white image.", //the command description for helpcmd [OPTIONAL]
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
    if (!message.attachments.array()[0]) return message.channel.send("Please input your old image!");
    let gambar = message.attachments.array()[0].url;
    request({
        url: 'https://api.deepai.org/api/colorizer',
        method: 'POST',
        headers: {
           'Api-Key': `${config.deepaiAPIKey}` 
        },
        form: {
            'image': `${gambar}`
        }
    }, function (error, response, body) {
        if (error) throw error;
        console.log('=======> DEEPAI WAIFU2X API RESULT :');
        console.log(body);
        console.log('=======> SEENDING IMAGE TO IMGBB');
        console.log('=======> SEENDING IMAGE TO DISCORD');
        const jsonObject = JSON.parse(body)
        const options = { 
            apiKey: `${config.imgbbAPIKey}`,
            imageUrl: `${jsonObject.output_url}`,
            name: `Colorize_by_eilaluth`
        }
    imgbbUploader(options)
        .then((res) => {
            let embed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle('Image Colorization AI')
            .setDescription('Colorize black and white images or videos using the image colorization AI. Add color to old family photos and historic images, or bring an old film back to life with colorization.')
            .setImage(res.url)
            .setFooter(ee.footertext, ee.footericon)
            message.channel.send(embed); 
        })
        .catch((err) => console.error(err));
    }); 
}
}