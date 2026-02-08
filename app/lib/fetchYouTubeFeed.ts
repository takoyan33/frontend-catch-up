import Parser from "rss-parser";

const parser = new Parser();

export type FeedItem = {
  title: string;
  link: string;
  pubDate?: string;
};

export async function fetchYouTubeFeed(): Promise<FeedItem[]> {
  const rssURL =
    "https://www.youtube.com/feeds/videos.xml?channel_id=UCLPHXwLp90A5R69Eltxo-sg";
  const feed = await parser.parseURL(rssURL);

  return feed.items.map((item) => ({
    title: item.title ?? "",
    link: item.link ?? "",
    pubDate: item.pubDate,
  }));
}
