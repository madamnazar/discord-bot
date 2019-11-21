const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", message => {
  if (message.content === "ping") {
    if (process.env.NODE_ENV === "development") {
      message.reply("pong from localhost");
    } else {
      message.reply("pong from Heroku");
    }
  }
});

client.login(process.env.BOT_TOKEN);
