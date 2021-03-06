// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Deep Frying Memes`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Deep Frying Memes`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Deep Frying Memes`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "b") {
	  message.channel.send(':b::b::b::b::b::b::b::b:\n'
						+ ':b::b::b::b::b::b::b::b:\n'
						+ ':b::b::white_large_square::white_large_square::white_large_square::b::b::b:\n'
						+ ':b::b::white_large_square::b::white_large_square::white_large_square::b::b:\n'
						+ ':b::b::white_large_square::white_large_square::white_large_square::b::b::b:\n'
						+ ':b::b::white_large_square::b::b::white_large_square::b::b:\n'
						+ ':b::b::white_large_square::white_large_square::white_large_square::b::b::b:\n'
						+ ':b::b::b::b::b::b::b::b:\n'
						+ ':b::b::b::b::b::b::b::b:');
  }
  
  if(command === "come") {
	  message.channel.send({
		  files: [
			  'https://i.imgur.com/CE2McqH.mp4'
		  ]
	  })
  }
  
  if(command === "blutet") {
	  message.channel.send({
		  files: [
			  'https://i.imgur.com/dTJ7ojN.mp4'
		  ]
	  })
  }
  
  if(command === "mike") {
	  message.channel.send({
		  files: [
			'https://cdn.discordapp.com/attachments/283662927016493058/437743838300471296/Mike.png'
		  ]
	  })
  }
});

client.login(config.token);