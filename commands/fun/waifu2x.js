const Discord = require("discord.js");
const { Client, Collection, MessageEmbed } = require(`discord.js`);
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const imgbbUploader = require('imgbb-uploader');
const request = require('request');

module.exports = {
    name: "waifu2x", //the command name for execution & for helpcmd [OPTIONAL]
    category: "fun", //the command category for helpcmd [OPTIONAL]
    aliases: ["w2x", "waifux"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "waifu2x [attachment]", //the command usage for helpcmd [OPTIONAL]
    description: "Double size your waifu image without losing its content and defining characteristics!", //the command description for helpcmd [OPTIONAL]
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
    if (!message.attachments.array()[0]) return message.channel.send("Please input your waifu image!");
    let gambar = message.attachments.array()[0].url;
    request({
        url: 'https://api.deepai.org/api/waifu2x',
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
            name: `waifu2x_by_eilaluth`
        }
    imgbbUploader(options)
        .then((res) => {
            let embed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle('Waifu2x AI')
            .setDescription('Waifu2x is an algorithm that upscales images while reducing noise within the image. It gets its name from the anime-style art known as waifu that it was largely trained on. Even though waifus made up most of the training data, this waifu2x ai still performs well on photographs and other types of imagery. You can use Waifu2x to double the size of your images while reducing noise.')
            .setImage(res.url)
            .setFooter(ee.footertext, ee.footericon)
            message.channel.send(embed); 
        })
        .catch((err) => console.error(err));
    }); 
}
}