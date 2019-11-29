const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
require("dotenv").config();

const channelID = "650000044560351263";

const embed = {
  title: "‎",
  url: "https://madamnazar.io",
  color: 12134175,
  footer: {
    text: "The moderators & staff."
  },
  author: {
    name: "MadamNazar.io discord server code of conduct"
  },
  fields: [
    {
      name: "‎",
      value: "_Please, read this carefully_"
    },
    {
      name: "__**Expected Behavior**__",
      value:
        "We are an open community, we support every member and we prone respect and love.\n\nAs a community, we respect every person, no matter their religion, political beliefs, gender, sex or where they live.\n\nAs an open Community we do not tolerate harassment and/or *phobic behaviour against people based in their nationality, sexuality, religion, gender, or other defining attributes.\n\nOur Discord is based on friendliness and support.\nWe expect **every** member to respect those terms.\n\n"
    },
    {
      name: "__**Unacceptable behaviors includes:**__",
      value:
        "- Intimidating\n- Harassing\n- Abusive\n- Discriminatory\n- Derogatory\n- Hate speech or demeaning conduct by any member.\n\n"
    },
    {
      name: "__**Harassment includes any offensive comments related to:**__",
      value:
        "- Gender\n- Sexual orientation\n- Ethnicity\n- Religion\n- Disability\n- Inappropriate use of nudity and/or sexual images in public spaces\n- Deliberate intimidation\n- Stalking or following\n- Harassing photography or recording."
    },
    {
      name: "__**In addition:**__",
      value:
        "We'd like you to prevent from talking politics. This is not the place for it.\nWe don't ask you to agree with moderator & staff decisions, in case you don't agree with them, please don't argue about it."
    },
    {
      name: "__**Consequences of unacceptable Behaviour:**__",
      value:
        "If a member doesn't respect nor agree with the terms defined above, or break our trust by behaving in a total disrespect of our terms, we as community moderators, will ban the person from the Discord server **Permanently**.\n\nWe cannot & won't accept such behaviour.\nWe don’t want to deal with small minded people.\nWe don’t want to be a source of hate nor inflating the hate of each other."
    }
  ]
};

client.on("ready", () => {
  client.channels.get(channelID).send({ embed });
});


client.login(process.env.BOT_TOKEN);