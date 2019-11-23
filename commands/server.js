const client = require("../index");
const GuildId = "638718661091262464";
const list = client.guilds.get(GuildId);


const serverMsg = (message, guild, allmembers) => `
__**total user:**__\n
**${guild.length}**

`;

module.exports = {
  name: "server",
  description: "Server information",
  execute(message, args) {
    message.channel.send(
      serverMsg(
        message,
        [...client.guilds.get(GuildId).members],
      )
    );
  }
};



// _Check the bot logs_
// ${client.guilds
//   .get(GuildId)
//   .members.map((member,id,i) => console.log(id,i))}**