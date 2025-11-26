import {Bot} from "grammy";
import 'dotenv/config';
import {subCommand} from "./commands/sub.js";
import {unsubCommand} from "./commands/unsub.js";
import nodeCron from "node-cron";
import {postFeeds} from "./utils/cron.js";

const token = process.env.TOKEN || null;
if (!token) throw new Error("TOKEN is required to run bot");

export const registerCommands = (bot: Bot) => {
    bot.command("sub", subCommand)
    bot.command("unsub", unsubCommand)
}

// Start the bot.
const bot = new Bot(token)
registerCommands(bot);
nodeCron.schedule("* * * * *", () => postFeeds(bot));
bot.start();
