const Discord = require("discord.js");
const weather = require('weather-js');
const { Client, Collection, MessageEmbed } = require(`discord.js`);
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");

module.exports = {
    name: "weather", //the command name for execution & for helpcmd [OPTIONAL]
    category: "fun", //the command category for helpcmd [OPTIONAL]
    aliases: ["cuaca"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "weather [C/F] Location", //the command usage for helpcmd [OPTIONAL]
    description: "Show statistic weather for country or city search", //the command description for helpcmd [OPTIONAL]
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
       let degree;
      //check if the user entered a first arg
      if(args[0]){
        //check if the first argument was a valid degree type
        if(args[0] === "C" || args[0] === "c" || args[0] === "F" || args[0] === "f"){
            degree = args[0].toUpperCase();
        } else{
            return message.channel.send("Enter a valid degree type (C | F).");
        }
      } else{
        return message.channel.send(`Wrong Format try: \`${prefix}weather <C/F> <Location>\``);
      }

      //check if there was a second arg
      if(!args[1]) return message.channel.send("Enter a location to search for.");

      //search for the location and specify degree type
      weather.find({search: args[1], degreeType: degree}, function(err, result) {
        try{
          //TODO: add a 5 day forecast

          //create a new embed with the weather data
          let embed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`Weather`)
            .setThumbnail(result[0].current.imageUrl)
            .setDescription(`Showing weather data for ${result[0].location.name}`)
            .addField("**Temp:**", `${result[0].current.temperature}°${result[0].location.degreetype}`, true)
            .addField("**Weather:**", `${result[0].current.skytext}`, true)
            .addField("**Day:**", `${result[0].current.shortday}`, true)
            .addField("**Feels like:**", `${result[0].current.feelslike}°${result[0].location.degreetype}`, true)
            .addField("**Humidity:**", `${result[0].current.humidity}%`, true)
            .addField("**Wind:**", `${result[0].current.winddisplay}`, true)
            .setFooter(ee.footertext, ee.footericon)

          message.channel.send(embed); 
        } catch(err){
          console.log(err); //log an error to the console if one occurs

          return message.channel.send(":x: **This Country Or City Not Found**"); //return message to channel
        }
      });
  }
}