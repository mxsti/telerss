import type {CommandContext, Context} from "grammy";
import {removeSubscription} from "../services/feed.js";
import {FeedNotFoundError} from "../utils/errors.js";

export const unsubCommand = async (ctx: CommandContext<Context>) => {
    const params = ctx.match;

    if (!params) {
        return ctx.reply("Nutzung: /unsub <RSS Feed Url>");
    }

    const userId = ctx.from?.id;

    if (!userId) {
        return ctx.reply("Fehler beim Abrufen der Benutzerinformationen.");
    }

    try {
        const deletedFeed = await removeSubscription(params, userId);
        return ctx.reply(`Du hast den Feed ${deletedFeed.url} erfolgreich abgemeldet.`);
    } catch (error: unknown) {
        if (error instanceof FeedNotFoundError) {
            return ctx.reply("RSS Feed wurde nicht gefunden.");
        }
        throw error;
    }
}
