import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { token } from "../config.json";

const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.on("ready", () => {
    console.log("Bot is ready");
});


client.login(token);