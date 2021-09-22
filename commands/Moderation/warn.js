const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "warn", //the Command Name
    category: "Moderation", //the Command Category [OPTIONAL]
    aliases: [], //the command aliases [OPTIONAL]
    cooldown: 2, //the Command Cooldown (Default in /botconfig/settings.json) [OPTIONAL]
    usage: "warn <@user>", //the Command usage [OPTIONAL]
    description: "Warning member discord server", //the command description [OPTIONAL]
    memberpermissions: ["ADMINISTRATION"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "You are missing the text you wanna add to the message!", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "You are having too many arguments for this Command!", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
            const user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
            if (!user) return message.channel.send('Please specify a user, via mention or ID');
            let reason = args.slice(2).join(" ");
            if (!reason) reason = 'None';
            let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);
            if (warnings === null) {
                db.set(`warnings_${message.guild.id}_${user.id}`, 1);
                const uembed = new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle(`**You were warned in ${message.guild.name}**`)
                    .setDescription(`for reason: ${reason} by ${message.author.username}`)
                    .setTimestamp()
                    .setFooter(ee.footertext, ee.footericon);
                user.send(uembed)
                const sembed = new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle("*Succesfully warned")
                    .addField("**User**", `${user.username}`)
                await message.channel.send(sembed)
            }
            if (warnings !== null) {
                db.add(`warnings_${message.guild.id}_${user.id}`, 1)
                user.send(`You were warned in ${message.guild.name} for reason:${reason} by ${message.author.username}`)
                await message.channel.send(`Succesfully warned **${user.username}** `)
            }
        }
    }

