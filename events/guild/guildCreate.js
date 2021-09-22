/**
 * @INFO
 * Loading all needed File Information Parameters
 */
const Discord = require("discord.js");
const { Client } = require("discord.js");
const config = require("../../botconfig/config.json"); //loading config file with token and prefix
const settings = require("../../botconfig/settings.json"); //loading settings file with the settings
const ee = require("../../botconfig/embed.json"); //Loading all embed settings like color footertext and icon ...//this is the official discord.js wrapper for the Discord Api, which we use!
//here the event starts
module.exports = (guild, client) => {
  console.log(`New guild added ${guild.name} + ${guild.id}`)
}

