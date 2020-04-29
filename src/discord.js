import { Client, MessageEmbed } from "discord.js";
const client = new Client();
const axios = require("axios");
import { getInfo, standardlize } from "./function";
import { MessageAttachment, BufferResolvable } from "discord.js";
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", async (msg) => {
  let message = msg.content;
  if (message.substring(0, 1) == "*") {
    message = message.replace(/[^a-zA-Z ]/g, "");
    var args = message.substring(0).split(" ");
    let cmd = args[0];
    args.shift();
    switch (cmd) {
      case "info":
        let value = args[0].toString();
        let info = await getInfo(value).then((res) => {
          return res.data[value];
        });
        console.log(info.name);
        const name = info.name;
        const description = info.title;

        const embed = new MessageEmbed()
          .setAuthor("League of Legends", "https://i.imgur.com/1nCIAUG.png")
          .setThumbnail(
            "http://ddragon.leagueoflegends.com/cdn/10.9.1/img/champion/" +
              value +
              ".png"
          )
          .setTitle(name + " - " + description)
          .setColor(0xff0000)
          .setDescription(info.tags.toString())
          .addFields(
            { name: "Ally Tips", value: info.allytips },
            { name: "Enemy Tips", value: info.enemytips },
            {
              name: "Abilitys",
              value: "gi do",
            }
          )
          .setFooter(
            "Brought to you by Yasuo Bot",
            "http://ddragon.leagueoflegends.com/cdn/10.9.1/img/champion/Yasuo.png"
          );
        msg.channel.send(embed);
        break;
    }
  }
});
client.login("NzA0OTgwOTA5MDQwMDc0Nzky.XqlH8g.Bsdr9fU67Rxag22PopsxVf7DvmI");

export default client;
