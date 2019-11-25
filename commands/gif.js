const imgur = require("imgur");
module.exports = {
  name: "gif",
  description: "gif",
  execute(message, args) {
    var query = "red dead";
    var optionalParams = {};
    imgur
      .search(query, optionalParams)
      .then(function(json) {
        let rand = Math.floor(Math.random() * json.data.length) + 0;
        json.data.forEach((imgur, index) => {
          if (index === rand) {
            message.channel.send(imgur.link);
          }
        });
      })
      .catch(function(err) {
        console.error(err);
      });
  }
};
