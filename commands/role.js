const axios = require("axios");
const Tesseract = require('tesseract.js');
module.exports = {
    name: "rol",
    usage: "/rol <resim>",
    category: "Bot",
    options: [
        {
            name: "image",
            description: "Abone Olduğunuz'a Dair Bir Resim Yükleyin! (PNG Formatında Olmalıdır!)",
            type: 11,
            contentType: "image/png",
            required: true,
        }
    ],
    admin: false,
    description: "Abone Rolü Verir. Abone olduğunuz halde rol vermiyorsa %90 uzaklaştırıp SS alın ve tekrar deneyin.",
    run: async (client, interaction) => {
        await interaction.deferReply();
        await interaction.editReply({
            embeds: [{
                description: "Resim İşleniyor...",
                footer: {
                    text: "Github.com/fastuptime",
                    iconURL: "https://i.hizliresim.com/tc4zeoj.png"
                },
                color: 0xF2C758
            }]
        });
        let image = interaction.options.getAttachment("image");
        if (image.contentType !== "image/png") return interaction.editReply({
            embeds: [{
                description: "Lütfen PNG Formatında Bir Resim Yükleyin!",
                footer: {
                    text: "Github.com/fastuptime",
                    iconURL: "https://i.hizliresim.com/tc4zeoj.png"
                },
                color: 0xEB2F49
            }],
            ephemeral: true
        });
        if (image.size > 1024 * 1024 * 5) return interaction.editReply({
            embeds: [{
                description: "Lütfen 5MB'dan Küçük Bir Resim Yükleyin!",
                footer: {
                    text: "Github.com/fastuptime",
                    iconURL: "https://i.hizliresim.com/tc4zeoj.png"
                },
                color: 0xEB2F49
            }],
            ephemeral: true
        });
        let id = `img_${Math.floor(Math.random() * 1000000)}`;
        let res = await axios.get(image.url, {
            responseType: "arraybuffer"
        });
        fs.writeFileSync(`./cache/${id}.png`, Buffer.from(res.data, "utf-8"));

        const userName = interaction.user.username;
        Tesseract.recognize(`./cache/${id}.png`)
            .then(({
                data: {
                    text
                }
            }) => {
                fs.unlinkSync(`./cache/${id}.png`);
                if (!text.toLowerCase().includes(config.channelName.toLowerCase())) return interaction.editReply({
                    embeds: [{
                        description: "Lütfen Resimdeki Kanal Bu Sunucuya Ait Değil!",
                        footer: {
                            text: "Github.com/fastuptime",
                            iconURL: "https://i.hizliresim.com/tc4zeoj.png"
                        },
                        color: 0xEB2F49
                    }]
                });
                if (!text.toLowerCase().includes(userName.toLowerCase())) return interaction.editReply({
                    embeds: [{
                        description: "Kullanıcı Adınız Resimde Yer Almıyor!",
                        footer: {
                            text: "Github.com/fastuptime",
                            iconURL: "https://i.hizliresim.com/tc4zeoj.png"
                        },
                        color: 0xEB2F49
                    }]
                });
                if (!text.toLowerCase().includes("abone olundu")) return interaction.editReply({
                    embeds: [{
                        description: "Abone Olmamışsınız!\nMobil den Abone Olduysanız Bu Şekilde Doğrulayamayız!",
                        footer: {
                            text: "Github.com/fastuptime",
                            iconURL: "https://i.hizliresim.com/tc4zeoj.png"
                        },
                        color: 0xEB2F49
                    }]
                });
                if (!text.toLowerCase().includes("video")) return interaction.editReply({
                    embeds: [{
                        description: "Burada Bir Terslik Var! Lütfen Tekrar Deneyin!",
                        footer: {
                            text: "Github.com/fastuptime",
                            iconURL: "https://i.hizliresim.com/tc4zeoj.png"
                        },
                        color: 0xEB2F49
                    }]
                });
                let role = interaction.guild.roles.cache.get(config.subscriberRole);
                if (!role) return interaction.editReply({
                    embeds: [{
                        description: "Abone Rolü Bulunamadı!",
                        footer: {
                            text: "Github.com/fastuptime",
                            iconURL: "https://i.hizliresim.com/tc4zeoj.png"
                        },
                        color: 0xEB2F49
                    }]
                });
                interaction.member.roles.add(role).then(() => {
                    interaction.editReply({
                        embeds: [{
                            description: "Abone Rolü Başarıyla Verildi!",
                            footer: {
                                text: "Github.com/fastuptime",
                                iconURL: "https://i.hizliresim.com/tc4zeoj.png"
                            },
                            color: 0x57F287
                        }]
                    });
                }).catch((err) => {
                    console.log(err);
                    interaction.editReply({
                        embeds: [{
                            description: "Rol Verilirken Bir Hata Oluştu!",
                            footer: {
                                text: "Github.com/fastuptime",
                                iconURL: "https://i.hizliresim.com/tc4zeoj.png"
                            },
                            color: 0xEB2F49
                        }]
                    });
                });
            }).catch((err) => {
                console.log(err);
                interaction.followUp({
                    embeds: [{
                        description: "Bir Hata Oluştu!",
                        footer: {
                            text: "Github.com/fastuptime",
                            iconURL: "https://i.hizliresim.com/tc4zeoj.png"
                        },
                        color: 0xEB2F49
                    }]
                });
            });
    },
};
