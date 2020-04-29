import axios from "axios";
/**
 * @param {String} champion
 */
export const getInfo = async (champion) => {
  var uri =
    "http://ddragon.leagueoflegends.com/cdn/10.9.1/data/en_US/champion/" +
    champion +
    ".json";
  let finalResult = await axios.get(uri).then((res) => {
    return res.data;
  });
  return finalResult;
};
/**
 *
 * @param {String} name
 */
export const standardlize = (name) => {
  let _name = name.toLowerCase();
  _name[0].toUpperCase;
  console.log(_name);
  return _name;
};
