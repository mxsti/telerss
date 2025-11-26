import type {CommandContext, Context} from "grammy";
import {addSubscription} from '../services/feed.js';
import {type ParsedFeed, parseFeed} from "../utils/parser.js";
import {logger} from "../utils/logger.js";
import {DuplicateSubscriptionError} from "../utils/errors.js";

export const subCommand = async (ctx: CommandContext<Context>) => {
    const params = ctx.match;

    if (!params) {
        return ctx.reply("Nutzung: /sub <RSS Feed Url>");
    }

    const name = ctx.from?.first_name;
    const chatId = ctx.chat?.id;

    if (!chatId || !name) {
        return ctx.reply("Fehler beim Abrufen der Benutzerinformationen.");
    }

    try {
        const feed: ParsedFeed = await parseFeed(params);
        const newFeed = await addSubscription(feed.url, feed.latestPubDate, {chatId, name});
        await ctx.reply(`Du hast den Feed ${newFeed.url} erfolgreich abonniert.`);
        return ctx.reply(`${feed.items[0]?.contentSnippet}`)
    } catch (error: unknown) {
        if (error instanceof DuplicateSubscriptionError) {
            logger.info(`${name} already subscribed to ${params}`)
            return ctx.reply("Du hast diesen Feed bereits abonniert.");
        }
        logger.error(error);
        return ctx.reply("Fehler beim Abrufen des Feeds.");
    }
};
