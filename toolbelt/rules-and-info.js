const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
require("dotenv").config();

const channelID = "645825954236596275";

const message = `:wave: Welcome to the Discord server of https://madamnazar.io/ :nazar_amulet:

We've setup this server in order to give a safe place & space to the Red Dead Online gaming community.

__**Discord channels**__:
- Make sure to read the <#650000044560351263>
- Please introduce yourself in <#640859824568926220> :wave:
- Post your best photos in <#644885590894051328> :camera_with_flash:
- Find the daily challenges on <#644844411796062208> :fire:
- Find players on the same plateform as yours on <#647096440577064962> <#647096471421845505> or <#647096491869208576>

__**Website related**__:
- Send feature ideas in <#639113667648159776> :bulb:
- Feedbacks in <#639113693275226113> :bug:
- Website announcements <#640858669260472321> :loudspeaker:

__**Team**__:

This Discord server exists because of these lovely people, if you have a question, do not hesitate
to reach out to:
- :man_technologist: <@311848701356146689>
- :man_technologist: <@94214432300748800>
- :man_technologist: <@209388963897671681>
- :man_technologist: <@308619259418771456>

__**Bot commands**__:

Get current location of Madam Nazar ➡️ \`!nazar\`
Get the current cycle/day ➡️ \`!cycle\`
Get weekly collection ➡️ \`!weekly\`
Get a random RDR2 gif ➡️ \`!gif\`

__**Important notes**__:
If you'd like to have a specific console/platform role, please contact one of the moderators.

Also, there is a point system in place, the more you contribute, the more you level up. We're working to find a good usage of these points. Meanwhile, keep on contributing.

__**Regarding Madam Nazar location:**__
Keep in mind that the location of madam nazar is updated as soon as we can update it, which can lead to some delay between the real location, and the one we display on madamnazar.io / on twitter / or on this discord.

**If it happen that the location is wrong. Simply ask in the #madam-nazar-location  channel for the correct location, and one of the lovely member will help you out**

Thank you, and enjoy the server :two_hearts:`;

client.on("ready", () => {
  client.channels.get(channelID).send(message);
});

client.login(process.env.BOT_TOKEN);
