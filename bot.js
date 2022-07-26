const { Client,GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.GuildMessages] });
client.once('ready', () => {
	console.log('Ready!');
    console.log(GatewayIntentBits.GuildMessages);
});
client.once("message", (message) =>{ 
    if(message.author.bot == true) return
    // if(message.channel.type == "dm") return

    if(message.content){
        message.channel.send("Pong!")
    }
    if(message.content == "avatar"){
    message.channel.send(`https://cdn.discordapp.com/avatars/518900443569717252/${message.author.avatar}.webp`)
    }
})
// Login to Discord with your client's token
client.login(token);