import { Client } from "discord.js";
import { inputHandle } from "./src/input";
const client = new Client();
import CONFIG from "./config.js";
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});
client.on("message", async (msg) => {
    let message = msg.content.substring(0, 6);
    console.log(message);
    if (message == "!yasuo") {
        const embed = await inputHandle(msg.content);
        if (embed != null) msg.channel.send(embed);
    }

});
client.login(CONFIG.BOT_TOKEN);

