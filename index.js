//Importing all needed Commands
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const fs = require("fs");
const BannedWords = require('./botconfig/badword.json'); // this is config of all indonesian badword i know
const db = require("quick.db")
require("discord-reply") //this package is for reading files and getting their inputs
//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user

// AUTO BAN SPAMMER
const usersMap = new Map();
const LIMIT = 4;
const TIME = 10000;
const DIFF = 2000;

client.on('message', message => {
  if(message.author.bot) return;
  if(usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;
    console.log(difference);
    if(difference > DIFF) {
      clearTimeout(timer);
      console.log('Cleared timeout');
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);
        console.log('Removed from RESET.');
      }, TIME);
      usersMap.set(message.author.id, userData);
    }
    else {
      ++msgCount;
      if(parseInt(msgCount) === LIMIT) {
        message.guild.members.resolve(message.author.id).ban({ reason : 'Raid attempt!'})
        message.channel.send({ embed: {'title': `Raid Detected!`,'description': `User <@${message.author.id}> got banned for raid attempt!`,'image': {'url': `https://raw.githubusercontent.com/Eilaluth/Ei/main/images/ban.png`}}})
      } else {
        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
      }
    }
  }
  else {
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
      console.log('Removed from map.');
    }, TIME);
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn
    });
  }
});

// anti badword and anti raid
client.on("message", message => {
  if (BannedWords.some(word => message.toString().toLowerCase().trim().match(/\w+|\s+|[^\s\w]+/g) !== null && message.toString().toLowerCase().trim().match(/\w+|\s+|[^\s\w]+/g).includes(word))) { message.delete().catch(e => console.error("Couldn't delete message.")); message.channel.send({ embed: {'title': `Badword Detected!`,'description': `User <@${message.author.id}> got warn for using badword!`,'image': {'url': `https://raw.githubusercontent.com/Eilaluth/Kotegawa/main/img/kotegawa-angry-dua.gif`}}}) };
  if (message.content.includes("@everyone")) { message.guild.members.get(message.author.id).ban() .catch(e => console.error("Couldn't ban him/her.")); message.channel.send({ embed: {'title': `Raid Detected!`,'description': `User <@${message.author.id}> got banned for raid attempt!`,'image': {'url': `https://raw.githubusercontent.com/Eilaluth/Kotegawa/main/img/kotegawa-angry.gif`}}}) };
  if (message.content.includes("@here")) { message.guild.members.get(message.author.id).ban() .catch(e => console.error("Couldn't ban him/her.")); message.channel.send({ embed: {'title': `Raid Detected!`,'description': `User <@${message.author.id}> got banned for raid attempt!`,'image': {'url': `https://raw.githubusercontent.com/Eilaluth/Kotegawa/main/img/kotegawa-angry.gif`}}}) };
});

//defining all files 2 be loaded in ./handlers
client.handlers = ["command", "events"];
//Loading files, with the client variable like Command Handler, Event Handler, ...
function handlers(){
  client.handlers.forEach(handler => {
      require(`./handlers/${handler}`)(client);
  });
}; handlers();
module.exports.handlers = handlers;
//the system for loading the cmds is needed for reloadbot
//login into the bot
client.login(require("./botconfig/config.json").token);
