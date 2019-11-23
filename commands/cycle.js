const fetch = require("node-fetch");
const { Attachment, RichEmbed } = require("discord.js");
const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const formatDateTweet = date => {
  let newDate = date.toDateString().slice(4);
  newDate.substring(0, date.length - 5);

  return newDate.substring(0, newDate.length - 5);
};

const getCycleDay = () => {
  let dayCycle;
  let weekDay = new Date().getUTCDay();
  switch (weekDay) {
    case 2: //tuesday
    case 4: //thursday
    case 6: //saturday
      dayCycle = 1;
      break;

    case 0: //sunday
    case 3: //wednesday
      dayCycle = 2;
      break;

    case 1: //monday
    case 5: //friday
      dayCycle = 3;
      break;
    default:
      dayCycle = undefined;
      break;
  }
  return dayCycle;
};

const getColor = day => {
  let color;
  switch (day) {
    case 1:
      color = 0x2e97d1;
      break;
    case 2:
      color = 0xe88024;
      break;
    case 3:
      color = 0xc536ab;
      break;
    default:
      return false;
  }
  return color;
};

module.exports = {
  name: "cycle",
  description: "Respond with Current cycle",
  execute(message, args) {
    // const embed = new RichEmbed()
    //   .setURL("https://madamnazar.io/")
    //   .addField("Cycle/Day", `**${getCycleDay()}**`, true)
    //   .setColor(getColor(getCycleDay()))
    //   .setTimestamp()
    //   .setFooter("Find more resources on MadamNazar.io");
    // message.channel.send(embed);
  }
};
