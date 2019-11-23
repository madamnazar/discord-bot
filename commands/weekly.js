const fetch = require("node-fetch");
const Discord = require("discord.js");
const { Attachment, RichEmbed } = require("discord.js");
const client = require("../index");

const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const defineEmoji = name => {
    switch(name) {
        case 'bowmans':
            return "arrowhead";
            break
        default: 
            return false;
    }
}

module.exports = {
  name: "weekly",
  description: "Respond with the current weekly collection",
  execute(message, args) {
    fetch(
      "https://madam-nazar-location-api.herokuapp.com/weekly/current"
    ).then(function(response) {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response
          .json()
          .then(function(json) {
            const emoji = client.emojis.find(
              emoji => emoji.name === defineEmoji(json.data.name)
            );

            const botAnswer = `${json.data.content.map(
              item =>
                console.log(item) ||
                `${emoji} ${capitalize(
                  item.item.replace("_", " ").split(" ")[0]
                )} ${capitalize(item.item.replace("_", " ").split(" ")[1])}\n`
            )}`.replace(/,/g, "");

            const embed = new RichEmbed()
              .setTitle(
                `The weekly collection is the ${capitalize(json.data.name)} set`
              )
              .setURL("https://madamnazar.io/")
              .setDescription(botAnswer)
              .setTimestamp()
              .setFooter(
                "🔮 Yσυ'ɾҽ ɳσƚ ყҽƚ ƚσσ ɱყʂƚҽɾισυʂ ϝσɾ ɱყ ԋυɱႦʅҽ ƈσɱραɳყ"
              );

            console.log(json.data.name);
            message.channel.send(embed);

          })
          .catch(err => {
            console.log(err);
            message.channel.send(`⚠️ Problem occured: **${err}**`);
          });
      } else {
        message.channel.send(
          "No JSON found! Please contact @iamfabriceg#6920 or @LukyVj#1181"
        );
      }
    });
  }
};
