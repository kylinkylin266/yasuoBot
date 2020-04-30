import { Client, MessageEmbed } from "discord.js";
const client = new Client();
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
          .setAuthor(
            "League of Legends Wiki",
            "https://i.imgur.com/1nCIAUG.png"
          )
          .setThumbnail(
            "http://ddragon.leagueoflegends.com/cdn/10.9.1/img/champion/" +
              value +
              ".png"
          )
          .setColor(0xff0000)
          .setTitle(name + " - " + description)
          .setDescription(info.tags.toString())
          .addFields(
            {
              name: "Ally Tips",
              value: info.allytips.length > 0 ? info.allytips : "",
            },
            {
              name: "Enemy Tips",
              value: info.enemytips.length > 0 ? info.enemytips : "",
            },
            {
              name: "Partype",
              value: info.partype,
            },
            { name: "\u200B", value: "\u200B" },
            {
              name: "Passive - " + info.passive.name,
              value: info.passive.description,
            },
            {
              name: "Q - " + info.spells[0].name,
              value: info.spells[0].description.replace(/(<([^>]+)>)/gi, ""),
            },
            {
              name: "W -" + info.spells[1].name,
              value: info.spells[1].description.replace(/(<([^>]+)>)/gi, ""),
            },
            {
              name: "E - " + info.spells[2].name,
              value: info.spells[2].description.replace(/(<([^>]+)>)/gi, ""),
            },
            {
              name: "R - " + info.spells[3].name,
              value: info.spells[3].description.replace(/(<([^>]+)>)/gi, ""),
            }
          )

          .setImage(
            "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
              value +
              "_0.jpg"
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
