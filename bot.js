const discord = require("discord.js");
const { token, prefix, clash_token } = require('./config.json');
const client = new discord.Client();
const axios = require("axios")
client.login(token);
client.on("ready", () => {
  axios.get('https://api.clashofclans.com/v1/clans?name=zuccheti',{headers:{Authorization: 'Bearer ' + clash_token }})
    .then(function (response) {
      // handle success
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
});
client.on("message", message => {
  if (!message.guild) return;
  if(message.channel.type == "dm") return
  if(message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const commandBody = message.content.slice(prefix.length).trim();
  const args  = commandBody.split(' ');
  console.log(args);
  if (args.length == 0) {
    message.channel.send("Manoooooooooooooooooo, tu não deu nenhum comando filho da puta 👍 :flag_br:");
    return
  }
  if (args[0] === "help"){
//   message.channel.send('tem q v ainda essa bosta👍 :flag_br:');
    axios.get('https://api.clashofclans.com/v1/clans?name=zuccheti',{headers:{Authorization: 'Bearer ' + clash_token }})
    .then(function (response) {
      // handle success
      message.channel.send(response.data.items[0].name);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    return;
  }
})


