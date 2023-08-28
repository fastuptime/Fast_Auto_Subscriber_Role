module.exports = {
    name: "github",
    usage: "/github",
    category: "Bot",
    admin: false,
    description: "Yapımcının Github Profilini Gösterir.",
    run: async (client, interaction) => {
        const embed = new EmbedBuilder()
            .addFields(
                { name: "Github", value: "[Github](https://github.com/fastuptime)"},
                { name: "Unutmayın!", value: "Star Atarak ve Takip Ederek Bize Destek Olabilirsiniz!"}
            )
            .setThumbnail("https://i.hizliresim.com/tc4zeoj.png")
            .setColor(0x57F287)
            .setFooter({ text: "Github.com/fastuptime", iconURL: "https://i.hizliresim.com/tc4zeoj.png" });
        interaction.reply({ embeds: [embed] });
    },
};