// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When bot is up and running run this code once
client.once(Events.ClientReady, bot => {
    console.log("Tian Bot is ready!");
})

// Login bot in discord
client.login(token);