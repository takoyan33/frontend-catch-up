import Parser from "rss-parser";

const parser = new Parser();

export type FeedItem = {
  title: string;
  link: string;
  pubDate?: string;
};

export async function fetchQiitaTrendFeed(): Promise<FeedItem[]> {
  const feed = await parser.parseURL(
    "https://qiita.com/popular-items/feed.atom"
  );

  return feed.items.map((item) => ({
    title: item.title ?? "",
    link: item.link ?? "",
    pubDate: item.pubDate,
  }));
}
