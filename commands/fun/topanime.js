const Discord = require("discord.js");
const { Client, Collection, MessageEmbed } = require(`discord.js`);
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const cheerio = require('cheerio');
const axios = require('axios');
const currentWeekNumber = require('current-week-number');

module.exports = {
    name: "topanime", //the command name for execution & for helpcmd [OPTIONAL]
    category: "fun", //the command category for helpcmd [OPTIONAL]
    aliases: ["top", "animeweek", "anitrenz"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "topanime", //the command usage for helpcmd [OPTIONAL]
    description: "Display list of top 10 anime this week, from AniTrenz", //the command description for helpcmd [OPTIONAL]
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
        res = await axios.get(`https://anitrendz.net/`)
    const body = await res.data;
    const $ = cheerio.load(body)

    $('div.at-m-top-anime').each((index, element) => {
        $elements = $(element)
        img = $elements.find('a').find('img').attr('src')
        console.log(img)
    })

    message.channel.send({
        embed: {
          'title': 'TOP 10 ANIME OF THE WEEK',
          'fields': [{
              'name':'\u200b',
              'value': `Here is your TOP 10 ANIME of the Week #${currentWeekNumber()}!\r\nVote for next week's Top 10 via the link [right here](https://anitrendz.net/polls/top-anime)\r\nand remember to follow us for weekly updates!⁠`
          }],
          "thumbnail": {
            "url": "https://anitrendz.net/regular/main/images/logos/logo_6.png"
          },
          'image': {
            'url': `${img}`
          },
          'color': `${ee.color}`,
          'footer': {
            'text': `${ee.footertext}`,
            'icon_url': `${ee.footericon}`
        }
        }
        }
    )
}
}