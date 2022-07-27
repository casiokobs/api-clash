const discord = require("discord.js");
const { token, prefix, clash_token } = require('./config.json');
const client = new discord.Client();
const axios = require("axios")
client.login(token);
client.on("ready", () => {
  axios.get('https://api.clashofclans.com/v1/clans/%232QP0YPRUL/members?limit=50',{headers:{Authorization: 'Bearer ' + clash_token }})
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        return;
  console.log('bot on !!');
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
  if (args[0] === "cla"){
//   message.channel.send('tem q v ainda essa bosta👍 :flag_br:');
    axios.get('https://api.clashofclans.com/v1/clans?name=zuccheti',{headers:{Authorization: 'Bearer ' + clash_token }})
    .then(function (response) {
      message.channel.send(response.data.items[0].badgeUrls.medium)
      message.channel.send(`
      ㅤㅤㅤﾠ${response.data.items[0].name}
      ㅤㅤNivel: ${response.data.items[0].clanLevel}
      ㅤㅤPontos: ${response.data.items[0].clanPoints}
      ㅤㅤMembros: ${response.data.items[0].members}
      `);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    return;
  }
  if (args[0] === "war"){
    //   message.channel.send('tem q v ainda essa bosta👍 :flag_br:');
        axios.get('https://api.clashofclans.com/v1/clans/%232QP0YPRUL/currentwar',{headers:{Authorization: 'Bearer ' + clash_token }})
        .then(function (response) {
          console.log(response.data);
          if(response.data.state =='warEnded'){
            message.channel.send(`Essa guerra acabou, confira os resultados\n\n${response.data.clan.name}  🆚  ${response.data.opponent.name}\n
            ${response.data.clan.stars}      ⭐     ${response.data.opponent.stars}
            ${response.data.clan.destructionPercentage}   %     ${response.data.opponent.destructionPercentage}
            `)
            if(response.data.clan.stars>=response.data.opponent.stars && response.data.clan.destructionPercentage > response.data.opponent.destructionPercentage ){
              message.channel.send(`COMEMOS O CU DELES :sunglasses: :sunglasses: :sunglasses: `)
            }
          } 
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    return;
  }
  if (args[0] === "membros"){
    axios.get('https://api.clashofclans.com/v1/clans/%232QP0YPRUL/members?limit=50',{headers:{Authorization: 'Bearer ' + clash_token }})
    .then(function (response) {
      console.log(response);  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
      
})


