import Parser from "rss-parser";
const parser = new Parser();

export type FeedItem = {
  title: string;
  link: string;
  pubDate?: string;
};

export async function fetchHatenaTechFeed(): Promise<FeedItem[]> {
  const feed = await parser.parseURL("https://b.hatena.ne.jp/entrylist/it.rss");

  return feed.items.map((item) => ({
    title: item.title ?? "",
    link: item.link ?? "",
    pubDate: item.pubDate,
  }));
}
