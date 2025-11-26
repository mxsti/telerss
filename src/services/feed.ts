import {prisma} from "../utils/prisma.js";
import type {Feed} from "../../generated/prisma/client.js";
import {DuplicateSubscriptionError, FeedNotFoundError} from "../utils/errors.js";
import {logger} from "../utils/logger.js";

export async function addSubscription(feedUrl: string, latestPubDate: Date, userData: {
    chatId: number,
    name: string
}): Promise<Feed> {
    const user = await prisma.user.findUnique({
        where: {
            id: userData.chatId
        }
    });

    if (!user) {
        await prisma.user.create({
            data: {
                id: userData.chatId,
                name: userData.name
            }
        });
    }

    return prisma.feed.create({
        data: {
            url: feedUrl,
            userId: userData.chatId,
            latestPubDate: latestPubDate
        }
    }).catch((error: unknown) => {
        if (error && typeof error === 'object' && 'code' in error && error.code === "P2002") {
            logger.error(error);
            throw new DuplicateSubscriptionError();
        }
        throw error;
    });
}

export async function removeSubscription(feedUrl: string, userId: number) {
    const feedToDelete = await prisma.feed.findUnique({
        where: {
            url_userId: {
                url: feedUrl,
                userId: userId
            }
        }
    });

    if (!feedToDelete) {
        throw new FeedNotFoundError();
    }

    return prisma.feed.delete({
        where: {
            id: feedToDelete.id
        }
    });
}


export async function updatePubDate(newPubDate: Date, feedId: bigint) {
    return prisma.feed.update({
        where: {
            id: feedId
        },
        data: {
            latestPubDate: newPubDate
        }
    })
}

