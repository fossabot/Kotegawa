const Discord = require("discord.js");
const { Client, Collection, MessageEmbed } = require(`discord.js`);
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const sagiri = require('sagiri');
const isImageUrl = require('is-image-url');
const path = require('path');
const notSupportedExts = new Set(['gif']);
const search = new sagiri(config.saucenaoAPIKey, {
  numRes: 1
});

module.exports = {
    name: "sauce", //the command name for execution & for helpcmd [OPTIONAL]
    category: "fun", //the command category for helpcmd [OPTIONAL]
    aliases: ["search", "wait"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "sauce [args]/[attachment]", //the command usage for helpcmd [OPTIONAL]
    description: "Find spicy sauce from internet", //the command description for helpcmd [OPTIONAL]
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
        let getSauce = function (image) {
            search.getSauce(image).then(response => {
              let data = response[0];
              //console.log(data.original.data)
              let results = {
                thumbnail: data.original.header.thumbnail,
                similarity: data.similarity,
                material: data.original.data.material || 'none',
                characters: data.original.data.characters || 'none',
                creator: data.original.data.creator || 'none',
                site: data.site,
                url: data.url
              };
              console.log('=======> SAUCENAO RESULT');
              console.log(results);
              const minSimilarity = 70;
              if (minSimilarity <= ~~results.similarity) {
                console.log(`=======> Similarity : ${results.similarity}% | Original site : ${results.site} - ${results.url}`);
                console.log('=======> SENDING RESULT TO DISCORD');
                message.channel.send({
                  embed: {
                    'image': {
                      url: results.thumbnail
                    },
                    'fields': [{
                      'name': 'Similarity',
                      'value': `${results.similarity}%`
                    }, {
                      'name': 'Original site',
                      'value': `${results.site} - ${results.url}`
                    }],
                    'color': `${ee.color}`,
                    'footer': {
                      'text': `${ee.footertext}`,
                      'icon_url': `${ee.footericon}`
                    }
                  }
                });
              } else {
                console.error('No sauce found! this bot works only with uncropped anime/2d art');
                message.channel.send('No sauce found! this bot works only with uncropped anime/2d art');
              }
            }).catch((error) => {
              console.error(error.message);
              error = error.toString();
              if (error.includes('You need an image') || error.includes('Supplied URL is not usable') || error.includes('Error: Got HTML response while expecting JSON')) {
                console.error('API Error!');
                message.channel.send('API Error!');
                return;
              }
            });
          };
          if (!message.attachments.array()[0] && !args[0]) {
            console.error('=======> Image attachment/URL not found!');
            message.channel.send('Please add an image, or image URL!');
          } else if (message.attachments.array()[0]) {
            console.log('=======> Image attachment found!');
            if (isImageUrl(message.attachments.array()[0].url) && !notSupportedExts.has(path.extname(message.attachments.array()[0].url).slice(1).toLowerCase())) {
              getSauce(message.attachments.array()[0].url);
            } else {
              console.error('=======> The file/extention is not an image!');
              message.channel.send('The file/extention is not an image!');
            }
          } else if (args[0]) {
            console.log('=======> Image URL found!');
            if (isImageUrl(args[0]) && !notSupportedExts.has(path.extname(args[0]).slice(1).toLowerCase())) {
              getSauce(args[0]);
            } else {
              console.error('=======> The file/extention is not an image!');
              message.channel.send('The file/extention is not an image!');
            }
          }

}
}