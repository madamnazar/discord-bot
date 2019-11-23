const command = `plateform`;

const everyoneID = "638718661091262464";
const XBOXID = "647803189252587530";
const PlayStationID = "647803317161951242";
const PCID = "647802965079621658";



const checkMessage = (plateform, message) => {
  const guildMember = message.member;
  const memberName = message.member.user.username;
  const memberRoles = message.member.roles;
  let currentRoles = [];
  memberRoles.forEach(role=>currentRoles.push(role.id))

  switch (plateform) {
    case "xbox":
      !currentRoles.includes(XBOXID)
        ? guildMember
            .addRoles([everyoneID, XBOXID])
            .then(() => {
              message.channel.send(
                `${memberName} You now have a **XBOX player** role!`
              );
            })
            .catch(console.error)
        : message.channel.send(
            `${memberName} You already had **XBOX player** role!`
          );
      break;
    case "playstation":
      !currentRoles.includes(PlaystationID)
        ? guildMember
            .addRoles([everyoneID, PlayStationID])
            .then(() => {
              message.channel.send(
                `${memberName} You now have a **PlayStation player** role!`
              );
            })
            .catch(console.error)
        : message.channel.send(
            `${memberName} You already had **Playstation player** role!`
          );

      break;
    case "pc":
      !currentRoles.includes(PCID)
        ? guildMember
            .addRoles([everyoneID, PCID])
            .then(() => {
              message.channel.send(
                `${memberName} You now have a **PC player** role!`
              );
            })
            .catch(console.error)
        : message.channel.send(
            `${memberName} You already had **PC player** role!`
          );
      break;
    default:
      message.channel.send("Role doesn't exists");
      break;
  }
};
module.exports = {
  name: command,
  description: "Command to set roles",
  execute(message, args) {
    checkMessage(
      message.content.split(`${command}`)[1].replace(" ", ""),
      message
    );
  }
};
