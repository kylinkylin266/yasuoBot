const Discord = require("discord.js");
const client = new Discord.Client();
const axios = require("axios");
import { getInfo, standardlize } from "./function";
import { MessageAttachment, BufferResolvable } from "discord.js";
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", async (msg) => {
  let message = msg.content;
  if (message.substring(0, 1) == "*") {
    var args = message.substring(1).split(" ");
    var cmd = args[0];
    var champion = args[1];
    console.log(champion);
    if (cmd === "info") {
      let info = getInfo(champion).then((res) => {
        return res;
      });
      const icon =
        "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
        champion +
        "_0.jpg";
      let photo = new Discord.MessageAttachment(icon);
      msg.reply("Here is " + champion, photo);

      // Discord.MessageAttachment(Stream,)
    }
    if (cmd === "gay") {
    }
  }
});
client.login("NzA0OTgwOTA5MDQwMDc0Nzky.XqlH8g.Bsdr9fU67Rxag22PopsxVf7DvmI");

export default client;
