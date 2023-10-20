require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const { token } = require('../config.json');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on('ready', (bot) => {
    console.log(`VROOM! ${bot.user.username} is ONLINE!`)
});

const mathFunctions = {
    '+': function (x, y) {return x + y},
    '-': function (x, y) {return x - y},
    '*': function (x, y) {return x * y},
    '**': function (x, y) {return x ** y},
    '/': function (x, y) {return x / y},
    '%': function (x, y) {return x % y},
}

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        interaction.reply('pong!');
    }
    if (interaction.commandName === 'math') {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;
        const operator = interaction.options.get('operator').value;

        interaction.reply(`${num1} ${operator} ${num2} = ${mathFunctions[operator](num1, num2)}`);
    }
})

client.login(process.env.TOKEN);