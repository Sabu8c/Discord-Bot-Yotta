require("dotenv").config();
const {
  Client,
  IntentsBitField,
  PermissionsBitField,
  EmbedBuilder,
  Embed,
  ActionRow,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  {
    id: "1229114188123869274",
    label: "red",
  },
  {
    id: "1229114241446052030",
    label: "blue",
  },
  {
    id: "1229114273062453419",
    label: "yellow",
  },
];

client.on("ready", async (c) => {
  try {
    const channel = await client.channels.cache.get("634411218907693080");
    if (!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Success)
      );
    });

    await channel.send({
      content: "Accept Rules",
      components: [row],
    });
    console.log("done");
    process.exit;
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);
