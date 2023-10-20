require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

const commands = [
    {
        name: 'ping',
        description: 'pong!',
    },
    {
        name: 'math',
        description: 'basic math operators',
        options: [
            {
                name: 'operator',
                description: 'choose an operator',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'addition',
                        value: '+'
                    },
                    {
                        name: 'subtraction',
                        value: '-'
                    },
                    {
                        name: 'multiplication',
                        value: '*'
                    },
                    {
                        name: 'exponentiation',
                        value: '**'
                    },
                    {
                        name: 'division',
                        value: '/'
                    },
                    {
                        name: 'modulus',
                        value: '%'
                    },
                ],
                required: true,
            },
            {
                name: 'first-number',
                description: 'first number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second-number',
                description: 'second number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering commands');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID, 
                process.env.GUILD_ID),
            { body: commands }
        )
        console.log('Commands registered');
    } catch (err) {
        console.log(`There was an error ${err}`);
    }
})();