import axios from "axios";
import CONFIG from "../config";
import { MessageEmbed } from "discord.js";
/**
 * @param {String} champion
 * @param {String} type
 */
export const getInfo = async (champion, type) => {
  let lang = CONFIG.vn;
  if (type == "en") lang = CONFIG.en;
  var uri =
    `https://ddragon.leagueoflegends.com/cdn/${CONFIG.PATCH}/data/${lang}/champion/` +
    champion +
    ".json";
  let finalResult = await axios.get(uri).then((res) => {
    return res.data.data[champion];
  }).catch(err => {
    return null;
  });
  return finalResult;
};
/**
 *
 * @param {String} name
 */
export const standardlize = (name) => {
  let _name = name.toLowerCase();
  let final = _name.charAt(0).toUpperCase() + _name.slice(1);
  return final;
};


export const sendChampionInfo = async (info) => {
  const name = info.name;
  const description = info.title;
  console.log(name, description);
  const embed = new MessageEmbed()
    .setAuthor(
      "League of Legends Wiki",
      "https://i.imgur.com/1nCIAUG.png"
    )
    .setThumbnail(
      `https://ddragon.leagueoflegends.com/cdn/${CONFIG.PATCH}/img/champion/` +
      name +
      ".png"
    )
    .setColor(0xff0000)
    .setTitle(name + " - " + description)
    .setDescription(info.tags ? info.tags.toString() : "")
    .addFields(
      {
        name: "Ally Tips",
        value: info.allytips && info.allytips.length > 0 ? info.allytips : "blank",
      },
      {
        name: "Enemy Tips",
        value: info.enemytips && info.enemytips.length > 0 ? info.enemytips : "blank",
      },
      {
        name: "Partype",
        value: info.partype && info.partype.length > 0 ? info.partype : "blank",
      },
      { name: "\u200B", value: "\u200B" },
      {
        name: "Passive - " + info.passive.name,
        value: info.passive.description ? info.passive.description : "blank",
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
      name +
      "_0.jpg"
    )
    .setFooter(
      "Brought to you by Yasuo Bot @ToTuan",
      `http://ddragon.leagueoflegends.com/cdn/${CONFIG.PATCH}/img/champion/Yasuo.png`
    );
  return embed;
}