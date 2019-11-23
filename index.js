const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const newUsers = new Discord.Collection();

module.exports = client;

require("dotenv").config();

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!\nI am ready !`);
  client.user.setActivity("madamnazario-bot");
});

// Commands
client.on("message", message => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
    return;
  const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

// Reactions
// 647830821872336926
const XBOXID = "647803189252587530";
const PlayStationID = "647803317161951242";
const PCID = "647802965079621658";

client.on("messageReactionAdd", (reaction, user, channel) => {
  if (
    reaction.message.channel.name === "rules-and-info" ||
    reaction.message.author.id === "647052026521452584"
  ) {
    if (reaction.emoji.name === "playstation") {
      const guildMember = reaction.message.guild.members.get(user.id);
      const role = reaction.message.guild.roles.get(PlayStationID);
      guildMember.addRole(role);
    }
    if (reaction.emoji.name === "xbox") {
      const guildMember = reaction.message.guild.members.get(user.id);
      const role = reaction.message.guild.roles.get(XBOXID);
      guildMember.addRole(role);
    }
    if (reaction.emoji.name === "pc") {
      const guildMember = reaction.message.guild.members.get(user.id);
      const role = reaction.message.guild.roles.get(PCID);
      guildMember.addRole(role);
    }
  }
});

client.on("messageReactionRemove", (reaction, user, channel) => {
  if (
    reaction.message.channel.name === "rules-and-info" ||
    reaction.message.author.id === "647052026521452584"
  ) {
    if (reaction.emoji.name === "playstation") {
      const guildMember = reaction.message.guild.members.get(user.id);
      const role = reaction.message.guild.roles.get(PlayStationID);
      guildMember.removeRole(role);
    }
    if (reaction.emoji.name === "xbox") {
      const guildMember = reaction.message.guild.members.get(user.id);
      const role = reaction.message.guild.roles.get(XBOXID);
      guildMember.removeRole(role);
    }
    if (reaction.emoji.name === "pc") {
      const guildMember = reaction.message.guild.members.get(user.id);
      const role = reaction.message.guild.roles.get(PCID);
      guildMember.removeRole(role);
    }
  }
});

client.login(process.env.BOT_TOKEN);
