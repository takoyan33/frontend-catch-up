import Parser from "rss-parser";

const parser = new Parser();

export type FeedItem = {
  title: string;
  link: string;
  pubDate?: string;
};

export async function fetchCompanyBlog(): Promise<FeedItem[]> {
  const feed = await parser.parseURL(
    "https://yamadashy.github.io/tech-blog-rss-feed/feeds/rss.xml"
  );

  return feed.items.map((item) => ({
    title: item.title ?? "",
    link: item.link ?? "",
    pubDate: item.pubDate,
  }));
}
