import {prisma} from "../utils/prisma.js";


export async function getAllUsers() {
    return prisma.user.findMany({
        include: {feeds: true}
    });
}

export type UsersWithFeeds = Awaited<ReturnType<typeof getAllUsers>>;

