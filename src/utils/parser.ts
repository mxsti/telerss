import Parser from "rss-parser";

interface ParsedItem {
    title: string;
    link: string;
    pubDate: Date;
    contentSnippet: string;
}

export interface ParsedFeed {
    latestPubDate: Date;
    url: string;
    items: ParsedItem[];
}

const parser = new Parser();

export async function parseFeed(url: string): Promise<ParsedFeed> {
    const feed = await parser.parseURL(url);

    const latestItem = feed.items[0];
    if (!latestItem) {
        throw new Error("RSS Feed konnte nicht geparst werden.");
    }

    return {
        latestPubDate: new Date(latestItem.pubDate ?? ""),
        url: url,
        items: feed.items.map((item) => ({
            title: item.title ?? "",
            link: item.link ?? "",
            pubDate: new Date(item.pubDate ?? ""),
            contentSnippet: item.contentSnippet ?? ""
        }))
    };
}
