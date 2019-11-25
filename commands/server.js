const client = require("../index");
const GuildId = "638718661091262464";


const serverMsg = (message, guild, allmembers) => `
__**total user:**__\n
**${guild.length}**

`;

module.exports = {
  name: "server",
  description: "Server information",
  execute(message, args) {
    message.channel.send(serverMsg(message, message.guild.members));
  }
};



// _Check the bot logs_
// ${client.guilds
//   .get(GuildId)
//   .members.map((member,id,i) => console.log(id,i))}**