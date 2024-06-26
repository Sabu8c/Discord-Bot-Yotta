require("dotenv").config();

const keep_alive = require("./keep_alive.js");

const {
  Client,
  IntentsBitField,
  PermissionsBitField,
  EmbedBuilder,
  Embed,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandSubcommandBuilder,
  ActivityType,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

let status = [
  {
    name: "comment monter un PC 🛠️",
    type: ActivityType.Watching,
  },
  {
    name: "a faire /info 🟠",
    type: ActivityType.Playing,
  },
];

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.on("guildMemberAdd", async (member) => {
  var memberFetch = await member.guild.members?.fetch();
  var memberCount = memberFetch.filter((member) => !member.user.bot).size;
  var memberCountChannel = member.guild.channels.cache.get(
    "1090731382843650088"
  );

  memberCountChannel.setName(`Membres: ${memberCount}`);

  const embed = new EmbedBuilder()
    .setColor(0xff5829)
    .setTitle(`Bienvenue chez YOTTA ${member.user.username}`)
    .setDescription(`<@${member.id}> a rejoint le serveur !`)
    .setFooter({
      text: `Pour toute information, fait /info`,
      iconURL: `https://i.imgur.com/7KDAenY.png`,
    });

  member.guild.channels.cache
    .get("1076162794451390536")
    .send({ embeds: [embed] });
});

client.on("guildMemberRemove", async (member) => {
  var memberFetch = await member.guild.members?.fetch();
  var memberCount = memberFetch.filter((member) => !member.user.bot).size;
  var memberCountChannel = member.guild.channels.cache.get(
    "1090731382843650088"
  );

  memberCountChannel.setName(`Membres: ${memberCount}`);
});

client.on("interactionCreate", async (interaction) => {
  //if (!interaction.isChatInputCommand()) return;
  //Message
  if (interaction.isButton()) {
    //Accept
    if (interaction.message.id === "1234241507335340164") {
      await interaction.deferReply({ ephemeral: true });
      const role = interaction.guild.roles.cache.get("1076163142687662110");
      const hasRole = interaction.member.roles.cache.has(role.id);
      if (hasRole) {
        await interaction.editReply(`Tu a déjà accepté les régles`);
        return;
      }
      await interaction.member.roles.add(role);
      await interaction.editReply(
        `✅ Merci d'avoir accpeter les règles, tu à maintenant accès à l'entiérté du serveur `
      );
    }
  }
  //State
  if (interaction.commandName === "ticket") {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "state") {
      const state = interaction.options.get("state").value;
      const type = interaction.options.get("type")?.value;
      const name = interaction.options.get("name")?.value;
      const channel_name = interaction.channel.name;
      const new_channel_name = channel_name.substring(1);

      if (type && name) {
        interaction.channel.setName(`${state}│${type}│${name}`);
      } else {
        interaction.channel.setName(`${state}${new_channel_name}`);
      }
      interaction.reply({
        content: "✅ Channel succefully renamed",
        ephemeral: true,
      });
    }
  }
  //Embed
  if (interaction.commandName === "embed") {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "create") {
      const title = interaction.options.get("title")?.value;
      const description = interaction.options.get("description")?.value;
      const name1 = interaction.options.get("name1")?.value;
      const value1 = interaction.options.get("value1")?.value;
      const name2 = interaction.options.get("name2")?.value;
      const value2 = interaction.options.get("value2")?.value;
      const name3 = interaction.options.get("name3")?.value;
      const value3 = interaction.options.get("value3")?.value;
      const footer = interaction.options.get("footer")?.value;

      const embed = new EmbedBuilder().setColor(0xff5829);
      if (title) {
        embed.setTitle(`${title}`);
      }
      if (description) {
        embed.setDescription(`${description}`);
      }
      if (name1 && value1) {
        embed.addFields({ name: `${name1}`, value: `${value1}` });
      }
      if (name2 && value2) {
        embed.addFields({ name: `${name2}`, value: `${value2}` });
      }
      if (name3 && value3) {
        embed.addFields({ name: `${name3}`, value: `${value3}` });
      }
      if (footer) {
        embed.setFooter({
          text: `${footer}`,
          iconURL: `https://i.imgur.com/7KDAenY.png`,
        });
      }
      interaction.channel.send({ embeds: [embed] });
      interaction.reply({ content: "✅ done", ephemeral: true });
      return;
    }
    /*if (subcommand === "edit") {
      const id = interaction.options.get("id").value;
      message = await interaction.channel.messages.fetch(id);
      //console.log(interaction.channel.messages);
      const title = interaction.options.get("title")?.value;
      const description = interaction.options.get("description")?.value;
      const name1 = interaction.options.get("name1")?.value;
      const value1 = interaction.options.get("value1")?.value;
      const name2 = interaction.options.get("name2")?.value;
      const value2 = interaction.options.get("value2")?.value;
      const name3 = interaction.options.get("name3")?.value;
      const value3 = interaction.options.get("value3")?.value;
      const footer = interaction.options.get("footer")?.value;

      const embed = new EmbedBuilder().setColor(0xff5829);
      if (title) {
        embed.setTitle(`${title}`);
      }
      if (description) {
        embed.setDescription(`${description}`);
      }
      if (name1 && value1) {
        embed.addFields({ name: `${name1}`, value: `${value1}` });
      }
      if (name2 && value2) {
        embed.addFields({ name: `${name2}`, value: `${value2}` });
      }
      if (name3 && value3) {
        embed.addFields({ name: `${name3}`, value: `${value3}` });
      }
      if (footer) {
        embed.setFooter({
          text: `${footer}`,
          iconURL: `https://i.imgur.com/7KDAenY.png`,
        });
      }
      message.edit("this is the new content");
      interaction.reply({ content: "✅ done", ephemeral: true });
      return;
    }*/
  }
  //Info
  if (interaction.commandName === "info") {
    console.log("info");
    const embed = {
      title: "Bienvenue sur notre serveur Discord !",
      description:
        "Tu trouvera des informations encore plus complète dans le salon <#1089167443622113362>",
      color: 16734249,
      fields: [
        {
          name: "Information",
          value:
            "Yotta est une entreprise de **montage, réparation et amélioration de PC** basé en Suisse.\nCeci est nôtre serveur communautaire.",
        },
        {
          name: "Services",
          value:
            "Pour monter, réparer ou améliorer un pc, **ouvre un ticket** dans <#1082388572788764714>",
        },
        {
          name: "Support",
          value:
            "Pour le support Discord et le support client, **ouvre un ticket** dans <#1076192037541511318>.",
        },
      ],
      footer: {
        text: "Pour plus d'aide contacte nous",
        icon_url: "https://i.imgur.com/7KDAenY.png",
      },
    };

    interaction.reply({ embeds: [embed], ephemeral: true });
  }
  //Clear
  if (interaction.commandName === "clear") {
    const count = interaction.options.get("count").value;
    async function clear() {
      const fetched = await interaction.channel.messages.fetch({
        limit: count,
      });
      try {
        interaction.channel.bulkDelete(fetched, true);
      } catch {
        interaction.reply({
          content:
            "❌ Impossible de supprimer des messages datant de plus de **14 jours**",
          ephemeral: true,
        });
        return;
      }
      interaction.reply({
        content: `✅ Succefully deleted last messages`,
        ephemeral: true,
      });
    }
    clear();
  }
  //Message
  if (interaction.commandName === "message") {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "create") {
      const content = interaction.options.get("content").value;

      interaction.channel.send({ content: content });
      interaction.reply({ content: "✅ done", ephemeral: true });
      return;
    }
    if (subcommand === "edit") {
      const id = interaction.options.get("id").value;
      const content = interaction.options.get("content").value;

      const message = await interaction.channel.messages.fetch(id);
      message.edit(content);
      interaction.reply({ content: "✅ done", ephemeral: true });
      return;
    }
  }
  //Sendmessages
  if (interaction.commandName === "sendmessage") {
    const name = interaction.options.get("name").value;
    if (name === "accept") {
      try {
        const button = new ButtonBuilder()
          .setCustomId("1229112953765101749")
          .setLabel("✅")
          .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.channel.send({
          content:
            "Pour profiter de toutes les fonctionnalités du serveur, il est nécessaire d'accepter les règles en cliquant sur le bouton ci-dessous.",
          components: [row],
        });
        process.exit;
      } catch (error) {
        console.log(error);
      }
    }
    /*if (name === "role") {
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

      try {
        const row = new ActionRowBuilder();

        roles.forEach((role) => {
          row.components.push(
            new ButtonBuilder()
              .setCustomId(role.id)
              .setLabel(role.label)
              .setStyle(ButtonStyle.Success)
          );
        });

        await interaction.channel.send({
          content: "Accept Rules",
          components: [row],
        });
        process.exit;
      } catch (error) {
        console.log(error);
      }*/
  }
});

client.login(process.env.TOKEN);
