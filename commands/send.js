const client = require("../index");
const { Attachment, RichEmbed } = require("discord.js");

module.exports = {
  name: "send",
  description: "Send messages as MadamNazar",
  execute(message, args) {
    if (message.channel.name === "nazar-bot-controller") {
      const chan = message.content.split(")")[0].replace("(", "");
      const corpus = message.content.split(")")[1];

      if (corpus.includes("|")) {
        const embed = new RichEmbed()
          .setTitle(`Information`)
          .setDescription(corpus.split("|")[1]);
        client.channels
          .find(x => x.name === chan.replace(`${process.env.PREFIX}send `, ""))
          .send(embed);
      } else {
        client.channels
          .find(x => x.name === chan.replace(`${process.env.PREFIX}send `, ""))
          .send(corpus);
      }
    }
  }
};

// test
