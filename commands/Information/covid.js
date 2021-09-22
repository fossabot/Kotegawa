const Discord = require("discord.js");
const { Client, Collection, MessageEmbed } = require(`discord.js`);
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const moment = require('moment');
const axios = require('axios');

module.exports = {
    name: "covid", //the command name for execution & for helpcmd [OPTIONAL]
    category: "Information", //the command category for helpcmd [OPTIONAL]
    aliases: ["covid19", "c19"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "covid", //the command usage for helpcmd [OPTIONAL]
    description: "Display all of covid-19 case in Indonesia.", //the command description for helpcmd [OPTIONAL]
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
        axios.all([
            axios.get(`https://apicovid19indonesia-v2.vercel.app/api/indonesia`),
            axios.get(`https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi`)
          ])
            .then(axios.spread((covidid, covidprov) => {
              console.log('=======> KAWALCORONA API RESULT');
              console.log('DATA INDONESIA');
              console.log(`POSITIF : ${covidid.data.positif} | SEMBUH : ${covidid.data.sembuh} | MENINGGAL : ${covidid.data.meninggal}`);
              console.log('=======> SENDING RESULT TO DISCORD');
              message.channel.send({
                embed: {
                  'title': `Data Covid-19 di Indonesia`,
                  description: '\u200b',
                  "footer": {
                    "text": 'Data diambil dari https://covid19.go.id, pada ' + moment().format('LLL')
                  },
                  "thumbnail": {
                    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/255px-Flag_of_Indonesia.svg.png"
                  },
                  'fields': [
                    {
                      name: 'Positif',
                      value: `${covidid.data.positif}`,
                      "inline": true
                    },
                    {
                      name: 'Sembuh',
                      value: `${covidid.data.sembuh}`,
                      "inline": true
                    },
                    {
                      name: 'Meninggal',
                      value: `${covidid.data.meninggal}`,
                      "inline": true
                    },
                    {
                      name: '\u200b',
                      value: '\u200b',
                      inline: false,
                    },
                    {
                      name: 'Data Covid-19 di setiap Provinsi',
                      value: '\u200b',
                      inline: false,
                    },
                    { // kenapa ga di looping? gimana caranya anjg
                      'name': `${covidprov.data[0].provinsi}`,
                      'value': `Positif: ${covidprov.data[0].kasus}\r\nSembuh: ${covidprov.data[0].sembuh}\r\nMeninggal: ${covidprov.data[0].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[1].provinsi}`,
                      'value': `Positif: ${covidprov.data[1].kasus}\r\nSembuh: ${covidprov.data[1].sembuh}\r\nMeninggal: ${covidprov.data[1].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[2].provinsi}`,
                      'value': `Positif: ${covidprov.data[2].kasus}\r\nSembuh: ${covidprov.data[2].sembuh}\r\nMeninggal: ${covidprov.data[2].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[3].provinsi}`,
                      'value': `Positif: ${covidprov.data[3].kasus}\r\nSembuh: ${covidprov.data[3].sembuh}\r\nMeninggal: ${covidprov.data[3].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[4].provinsi}`,
                      'value': `Positif: ${covidprov.data[4].kasus}\r\nSembuh: ${covidprov.data[4].sembuh}\r\nMeninggal: ${covidprov.data[4].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[5].provinsi}`,
                      'value': `Positif: ${covidprov.data[5].kasus}\r\nSembuh: ${covidprov.data[5].sembuh}\r\nMeninggal: ${covidprov.data[5].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[6].provinsi}`,
                      'value': `Positif: ${covidprov.data[6].kasus}\r\nSembuh: ${covidprov.data[6].sembuh}\r\nMeninggal: ${covidprov.data[6].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[7].provinsi}`,
                      'value': `Positif: ${covidprov.data[7].kasus}\r\nSembuh: ${covidprov.data[7].sembuh}\r\nMeninggal: ${covidprov.data[7].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[8].provinsi}`,
                      'value': `Positif: ${covidprov.data[8].kasus}\r\nSembuh: ${covidprov.data[8].sembuh}\r\nMeninggal: ${covidprov.data[8].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[9].provinsi}`,
                      'value': `Positif: ${covidprov.data[9].kasus}\r\nSembuh: ${covidprov.data[9].sembuh}\r\nMeninggal: ${covidprov.data[9].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[10].provinsi}`,
                      'value': `Positif: ${covidprov.data[10].kasus}\r\nSembuh: ${covidprov.data[10].sembuh}\r\nMeninggal: ${covidprov.data[10].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[11].provinsi}`,
                      'value': `Positif: ${covidprov.data[11].kasus}\r\nSembuh: ${covidprov.data[11].sembuh}\r\nMeninggal: ${covidprov.data[11].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[12].provinsi}`,
                      'value': `Positif: ${covidprov.data[12].kasus}\r\nSembuh: ${covidprov.data[12].sembuh}\r\nMeninggal: ${covidprov.data[12].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[13].provinsi}`,
                      'value': `Positif: ${covidprov.data[13].kasus}\r\nSembuh: ${covidprov.data[13].sembuh}\r\nMeninggal: ${covidprov.data[13].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[14].provinsi}`,
                      'value': `Positif: ${covidprov.data[14].kasus}\r\nSembuh: ${covidprov.data[14].sembuh}\r\nMeninggal: ${covidprov.data[14].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[15].provinsi}`,
                      'value': `Positif: ${covidprov.data[15].kasus}\r\nSembuh: ${covidprov.data[15].sembuh}\r\nMeninggal: ${covidprov.data[15].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[16].provinsi}`,
                      'value': `Positif: ${covidprov.data[16].kasus}\r\nSembuh: ${covidprov.data[16].sembuh}\r\nMeninggal: ${covidprov.data[16].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[17].provinsi}`,
                      'value': `Positif: ${covidprov.data[17].kasus}\r\nSembuh: ${covidprov.data[17].sembuh}\r\nMeninggal: ${covidprov.data[17].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[18].provinsi}`,
                      'value': `Positif: ${covidprov.data[18].kasus}\r\nSembuh: ${covidprov.data[18].sembuh}\r\nMeninggal: ${covidprov.data[18].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[19].provinsi}`,
                      'value': `Positif: ${covidprov.data[19].kasus}\r\nSembuh: ${covidprov.data[19].sembuh}\r\nMeninggal: ${covidprov.data[19].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[20].provinsi}`,
                      'value': `Positif: ${covidprov.data[20].kasus}\r\nSembuh: ${covidprov.data[20].sembuh}\r\nMeninggal: ${covidprov.data[20].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[21].provinsi}`,
                      'value': `Positif: ${covidprov.data[21].kasus}\r\nSembuh: ${covidprov.data[21].sembuh}\r\nMeninggal: ${covidprov.data[21].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[22].provinsi}`,
                      'value': `Positif: ${covidprov.data[22].kasus}\r\nSembuh: ${covidprov.data[22].sembuh}\r\nMeninggal: ${covidprov.data[22].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[23].provinsi}`,
                      'value': `Positif: ${covidprov.data[23].kasus}\r\nSembuh: ${covidprov.data[23].sembuh}\r\nMeninggal: ${covidprov.data[23].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[24].provinsi}`,
                      'value': `Positif: ${covidprov.data[25].kasus}\r\nSembuh: ${covidprov.data[25].sembuh}\r\nMeninggal: ${covidprov.data[25].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[25].provinsi}`,
                      'value': `Positif: ${covidprov.data[25].kasus}\r\nSembuh: ${covidprov.data[25].sembuh}\r\nMeninggal: ${covidprov.data[25].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[26].provinsi}`,
                      'value': `Positif: ${covidprov.data[26].kasus}\r\nSembuh: ${covidprov.data[26].sembuh}\r\nMeninggal: ${covidprov.data[26].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[27].provinsi}`,
                      'value': `Positif: ${covidprov.data[27].kasus}\r\nSembuh: ${covidprov.data[27].sembuh}\r\nMeninggal: ${covidprov.data[27].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[28].provinsi}`,
                      'value': `Positif: ${covidprov.data[28].kasus}\r\nSembuh: ${covidprov.data[28].sembuh}\r\nMeninggal: ${covidprov.data[28].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[29].provinsi}`,
                      'value': `Positif: ${covidprov.data[29].kasus}\r\nSembuh: ${covidprov.data[29].sembuh}\r\nMeninggal: ${covidprov.data[29].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[30].provinsi}`,
                      'value': `Positif: ${covidprov.data[30].kasus}\r\nSembuh: ${covidprov.data[30].sembuh}\r\nMeninggal: ${covidprov.data[30].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[31].provinsi}`,
                      'value': `Positif: ${covidprov.data[31].kasus}\r\nSembuh: ${covidprov.data[31].sembuh}\r\nMeninggal: ${covidprov.data[31].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[32].provinsi}`,
                      'value': `Positif: ${covidprov.data[32].kasus}\r\nSembuh: ${covidprov.data[32].sembuh}\r\nMeninggal: ${covidprov.data[32].meninggal}`,
                      "inline": true
                    },
                    {
                      'name': `${covidprov.data[33].provinsi}`,
                      'value': `Positif: ${covidprov.data[33].kasus}\r\nSembuh: ${covidprov.data[33].sembuh}\r\nMeninggal: ${covidprov.data[33].meninggal}`,
                      "inline": true
                    }
                  ],
                  'color': `${ee.color}`,
                }
              })
            }))
            .catch((err) => {
              console.log(err)
              message.reply("Something error")
            })
}
}