const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const path = require("path"); // Path
const fs = require("fs"); 
const { Collection, Discord } = require("discord.js");

module.exports = function (client) {
  client.discord = Discord;
  client.commands = new Collection();
  client.slashCommands = new Collection();

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
      const command = client.slashCommands.get(interaction.commandName);
      if (!command) return interaction.followUp({ content: "an Erorr" });

      const args = [];

      for (let option of interaction.options.data) {
        if (option.type === "SUB_COMMAND") {
          if (option.name) args.push(option.name);
          option.options?.forEach((x) => {
            if (x.value) args.push(x.value);
          });
        } else if (option.value) args.push(option.value);
      }
      try {
        if (command.admin) {
          if (!config.ownerID.includes(interaction.user.id)) return interaction.reply({ content: "Bu komutu kullanmak için gerekli yetkiye sahip değilsin.", ephemeral: true }).catch(console.error);
            command.run(client, interaction);
        } else {
            command.run(client, interaction);
        }
      } catch (e) {
        interaction.followUp({ content: e.message });
      }
    }
  });

  handler(client);
  async function handler(client) {
    const slashCommands = await globPromise(`${process.cwd()}/commands/*.js`);

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
      const file = require(value);
      if (!file.name) return;
      client.slashCommands.set(file.name, file);
      arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
      await client.application.commands.set(arrayOfSlashCommands).then(console.log(`${arrayOfSlashCommands.length} adet slash komut yüklendi.`)).catch(console.error);
    });
  }
};