const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const newUsers = new Discord.Collection();
const SQLite = require("better-sqlite3");
const sql = new SQLite("./scores.sqlite");

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

  // Check if the table "points" exists.
  const table = sql
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';"
    )
    .get();
  if (!table["count(*)"]) {
    // If the table isn't there, create it and setup the database correctly.
    sql
      .prepare(
        "CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);"
      )
      .run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }

  // And then we have two prepared statements to get and set the score data.
  client.getScore = sql.prepare(
    "SELECT * FROM scores WHERE user = ? AND guild = ?"
  );
  client.setScore = sql.prepare(
    "INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);"
  );
});

// Commands
client.on("message", message => {
  let score;
  if (message.guild) {
    score = client.getScore.get(message.author.id, message.guild.id);
    if (!score) {
      score = {
        id: `${message.guild.id}-${message.author.id}`,
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 1
      };
    }
    score.points++;
    const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
    console.log(score.points);
    if (score.level < curLevel) {
      score.level++;
      message.reply(
        `You've leveled up to level **${curLevel}**! Ain't that dandy?`
      );
    }
    client.setScore.run(score);
  }
  const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Points system
  // 
  if (message.content === `${process.env.PREFIX}points`) {
    return message.channel.send(
      `You currently have **${score.points}** points and are level **${score.level}**!`
    );
  }

  // if (message.content === "/give") {
  //   // Limited to guild owner - adjust to your own preference!
  //   if (message.author.username !== "LukyVj") {
  //     return message.channel.send(
  //       "You're not the boss of me, you can't do that!"
  //     );
  //   }

  //   const user = message.mentions.users.first() || client.users.get(args[0]);

  //   if (!user)
  //     return message.channel.send("You must mention someone or give their ID!");

  //   const pointsToAdd = parseInt(args[1], 10);
  //   if (!pointsToAdd)
  //     return message.channel.send(
  //       "You didn't tell me how many points to give..."
  //     );

  //   // Get their current points.
  //   let userscore = client.getScore.get(user.id, message.guild.id);
  //   // It's possible to give points to a user we haven't seen, so we need to initiate defaults here too!
  //   if (!userscore) {
  //     userscore = {
  //       id: `${message.guild.id}-${user.id}`,
  //       user: user.id,
  //       guild: message.guild.id,
  //       points: 0,
  //       level: 1
  //     };
  //   }
  //   userscore.points += pointsToAdd;

  //   // We also want to update their level (but we won't notify them if it changes)
  //   let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
  //   userscore.level = userLevel;

  //   // And we save it!
  //   client.setScore.run(userscore);

  //   return message.channel.send(
  //     `${user.tag} has received ${pointsToAdd} points and now stands at ${userscore.points} points.`
  //   );
  // }

  if (message.content === `${process.env.PREFIX}leaderboard`) {
    const top10 = sql
      .prepare(
        "SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;"
      )
      .all(message.guild.id);

    // Now shake it and show it! (as a nice embed, too!)
    const embed = new Discord.RichEmbed()
      .setTitle("Leaderboard")
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription("Our top 10 points leaders!")
      .setColor(0x00ae86);

    for (const data of top10) {
      embed.addField(
        client.users.get(data.user).tag,
        `${data.points} points (level ${data.level})`
      );
    }
    return message.channel.send({ embed });
  }

  // Welcome message
  const newUsers = new Discord.Collection();
  client.on("guildMemberAdd", member => {
    const guild = member.guild;
    newUsers.set(member.id, member.user);

    if (newUsers.size > 2) {
      const defaultChannel = guild.channels.find(channel =>
        channel.permissionsFor(guild.me).has("SEND_MESSAGES")
      );
      const userlist = newUsers.map(u => u.toString()).join(" ");
      defaultChannel.send("Welcome our new users!\n" + userlist);
      newUsers.clear();
    }
  });

  // GET OTHER COMMANDS PER FILE
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
    return;
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
