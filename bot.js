const discord = require("discord.js");
const { token, prefix, clash_token } = require('./config.json');
const client = new discord.Client();
const axios = require("axios")
client.login(token);
client.on("ready", () => {
  axios.get('https://api.clashofclans.com/v1/clans/%232QP0YPRUL/currentwar',{headers:{Authorization: 'Bearer ' + clash_token }})
        .then(function (response) {
          console.log('bot on !!');
          response.data.clan.members.forEach(members => {
            if (members.attacks == undefined) {
              members.name
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        })
        return;
});
client.on("message", message => {
  if (!message.guild) return;
  if(message.channel.type == "dm") return
  if(message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const commandBody = message.content.slice(prefix.length).trim();
  const args  = commandBody.split(' ');
  if (args[0] === "cla"){
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
      console.log(error);
    })
    return;
  }
  if (args[0] === "war"){
        axios.get('https://api.clashofclans.com/v1/clans/%232QP0YPRUL/currentwar',{headers:{Authorization: 'Bearer ' + clash_token }})
        .then(function (response) {
          console.log(response.data);
          if(response.data.state =='warEnded'){
            message.channel.send(`Essa guerra acabou, confira os resultados\n\n${response.data.clan.name}  🆚  ${response.data.opponent.name}\n
            ${response.data.clan.stars}      ⭐     ${response.data.opponent.stars}
            ${response.data.clan.destructionPercentage}   %     ${response.data.opponent.destructionPercentage}
            `)
            if(response.data.clan.stars>=response.data.opponent.stars && response.data.clan.destructionPercentage > response.data.opponent.destructionPercentage ){
              message.channel.send(`https://tenor.com/view/clash-of-clans-gif-23752619`)
            }
          }
          if(response.data.state =='notInWar'){
            message.channel.send(`Ainda reina a paz, não estamos em guerra no momento\n`)
            message.channel.send(`https://tenor.com/view/love-peace-friendship-amigos-bake-gif-25010735`)
          }
          if(response.data.state =='inWar') {
            message.channel.send(`Essa guerra esta em andamento\n\n${response.data.clan.name}  🆚  ${response.data.opponent.name}\n
            ${response.data.clan.stars}      ⭐     ${response.data.opponent.stars}
            ${response.data.clan.destructionPercentage}    %     ${response.data.opponent.destructionPercentage}
            `)
            message.channel.send(`Esses cornos ainda nao atacaram:`)
            
            response.data.clan.members.forEach(members => {
              if (members.attacks == undefined) {
                message.channel.send(`:ox: ${members.name} :ox:`)
              }
            }); 
          }
          if(response.data.state =='preparation') {
            message.channel.send(`Estamos em preparção, é melhor treinar suas tropas, e arrumar o layout de guerra\n\n${response.data.clan.name}  🆚  ${response.data.opponent.name}`)
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
      const array = response.data['items'];
      message.channel.send(
        array.forEach(element => {
          const texto = `${element.name}\nCargo: ${element.role}\nXP: ${element.expLevel}\nTrofeus: ${element.trophies}\nVila construtor:${element.versusTrophies}\n###############################`
        })
      )
    })  
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  else{
    message.channel.send("Comando Invalido");
    message.channel.send("https://tenor.com/view/barbarian-clash-of-clan-gif-19248916");
    return
  }
     
})
