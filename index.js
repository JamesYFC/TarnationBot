const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();

const censoredPhrases = require("./data/censored-phrases.json")

const TarnationFixer = require('./tarnationFixer');
const fixer = new TarnationFixer.Fixer(censoredPhrases);

const config = require('./config.json');

let censoringMessages = true;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    
    if (censoringMessages && !msg.content.startsWith(config.prefix))
    {
      if (fixer.checkForBadPhrases(msg.content)) {
        //msg.reply(`bad phrases detected! fixed version:\n${fixer.replaceBadPhrases(msg.content)}`);
        let embedResponse = new Discord.RichEmbed()
          .setDescription(fixer.replaceBadPhrases(msg.content))
          .setColor(16333904)
          .setAuthor(msg.member.nickname || msg.member.displayName, msg.author.avatarURL)
        msg.channel.send(embedResponse);
        msg.delete();
      }
    }
    //TODO: toggle censoring bool commands
});

client.login(config.token)
  .catch((error) => console.error(`Error on login: ${error.message}`));
