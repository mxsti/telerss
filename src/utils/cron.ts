import {Bot} from "grammy";
import {getAllUsers, type UsersWithFeeds} from "../services/user.js";
import {parseFeed} from "./parser.js";
import {updatePubDate} from "../services/feed.js";
import {logger} from "./logger.js";


export async function postFeeds(bot: Bot) {
    const users: UsersWithFeeds = await getAllUsers();

    users.map((user) => {
        user.feeds.map(async (feed) => {
            const parsedFeed = await parseFeed(feed.url);
            if (parsedFeed.latestPubDate > feed.latestPubDate) {
                await updatePubDate(parsedFeed.latestPubDate, feed.id);

                await bot.api.sendMessage(user.id, `Neuer Artikel!`);
                await bot.api.sendMessage(user.id, `${parsedFeed.items[0]?.contentSnippet}`);
                await bot.api.sendMessage(user.id, `${parsedFeed.items[0]?.link}`);

                logger.info(`posted update for ${user.id} - ${feed.url}`)
            }
        })
    })
}
