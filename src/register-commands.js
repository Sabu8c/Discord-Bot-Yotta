require("dotenv").config();
const {
  REST,
  Routes,
  ApplicationCommandOptionType,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

const commands = [
  //Ticket-State
  /*{
    name: "ticket-state",
    description: "Change channel name according to his state",
    permissions: PermissionFlagsBits.Administrator,
    options: [
      {
        name: "state",
        description: "current ticket state",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "in process",
            value: "🔴",
          },
          {
            name: "closed",
            value: "🟢",
          },
          {
            name: "waiting",
            value: "🟡",
          },
        ],
        required: true,
      },
      {
        name: "type",
        description: "service type",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "montage",
            value: "m",
          },
          {
            name: "upgrade",
            value: "a",
          },
          {
            name: "repair",
            value: "r",
          },
        ],
        required: true,
      },
      {
        name: "name",
        description: "ticket name",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },*/
  new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Manage server tickets")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(
      (subcommand) =>
        subcommand
          .setName("state")
          .setDescription("change channel name according to the ticket state")
          .addStringOption((option) =>
            option
              .setName("state")
              .setDescription("ticket current state")
              .setRequired(true)
              .addChoices(
                { name: "In Progress", value: "🔴" },
                { name: "Done", value: "🟢" },
                { name: "Pending", value: "🟡" }
              )
          )
          .addStringOption((option) =>
            option
              .setName("type")
              .setDescription("ticket type")
              .setRequired(false)
              .addChoices(
                { name: "Montage", value: "m" },
                { name: "Réparation", value: "r" },
                { name: "Amélioration", value: "a" }
              )
          )
          .addStringOption((option) =>
            option
              .setName("name")
              .setDescription("ticket name")
              .setRequired(false)
          ),
      new SlashCommandBuilder()
    ),

  //Embed
  new SlashCommandBuilder()
    .setName("embed")
    .setDescription("custom embed message")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("create")
        .setDescription("Create a new custom embed message")
        .addStringOption((option) =>
          option
            .setName("title")
            .setDescription("embed title")
            .setRequired(false)
        )
        .addStringOption((option) =>
          option.setName("description").setDescription("embed description")
        )
        .addStringOption((option) =>
          option.setName("name1").setDescription("field 1 name")
        )
        .addStringOption((option) =>
          option.setName("value1").setDescription("field 1 value")
        )
        .addStringOption((option) =>
          option.setName("name2").setDescription("field 2 name")
        )
        .addStringOption((option) =>
          option.setName("value2").setDescription("field 2 value")
        )
        .addStringOption((option) =>
          option.setName("name3").setDescription("field 3 name")
        )
        .addStringOption((option) =>
          option.setName("value3").setDescription("field 3 value")
        )
        .addStringOption((option) =>
          option.setName("footer").setDescription("embed footer")
        )
    ),
  //Infos
  new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get all infos about Yotta"),
  //Clear
  new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear a certain amount of message")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addIntegerOption((option) =>
      option
        .setName("count")
        .setDescription("amount of message to be deleted")
        .setRequired(true)
    ),
  //Message
  new SlashCommandBuilder()
    .setName("message")
    .setDescription("Send configs messages")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("config message name")
        .setRequired(true)
    ),
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commands ...");

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log("✅ done ");
  } catch (error) {
    console.log(`${error}`);
  }
})();
