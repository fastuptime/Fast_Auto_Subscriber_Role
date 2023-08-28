const {
    Client,
    Collection,
    Discord,
    Attachment,
    ActivityType
} = require('discord.js');
const client = new Client({
    intents: 32767
});
const colors = require('colors');
global.EmbedBuilder = require('discord.js').EmbedBuilder;
global.fs = require('fs');
global.moment = require('moment');
global.config = require('./config.js');

if (!fs.existsSync('./cache')) {
    fs.mkdirSync('./cache');
} else {
    fs.readdirSync('./cache').forEach(file => {
        fs.unlinkSync(`./cache/${file}`);
    });
}

require("./load.js")(client);

client.on('ready', () => {
    console.log(`${colors.bgCyan('[BOT]').black} --> ${colors.green('Bot Başarıyla Aktif Edildi!')} Botun Adı: ${colors.green(client.user.username)} | Botun ID'si: ${colors.green(client.user.id)}`.green);
    client.user.setPresence({
        activities: [{
            name: 'Fast Auto Subscriber Role | FASR - FastUptime.Com',
            type: 0
        }],
        status: 'online'
    });
});

client.login(config.token).catch(() => console.log(`${colors.bgRed('[HATA]').black} --> ${colors.red('Botun Tokeni Geçersiz! Lütfen Tokeni Kontrol Ediniz!')}`.red));