import { fetchZennTopicFeed } from "@/lib/fetchZennTopic";
import { FeedList } from "@/components/FeedList";
import { fetchYouTubeFeed } from "@/lib/fetchYouTubeFeed";
import { fetchRss } from "@/lib/fetchRss";

export const dynamic = "force-dynamic";

/** 取得に失敗した場合は空配列を返す */
function safeFeed<T>(promise: Promise<T[]>): Promise<T[]> {
  return promise.catch(() => [] as T[]);
}

export default async function Home() {
  const results = await Promise.all([
    safeFeed(fetchRss("https://realtime.jser.info/feed.xml")),
    safeFeed(fetchZennTopicFeed("typescript")),
    safeFeed(fetchZennTopicFeed("react")),
    safeFeed(fetchZennTopicFeed("nextjs")),
    safeFeed(fetchYouTubeFeed()),
    safeFeed(fetchRss("https://coliss.com/feed/")),
    safeFeed(fetchRss("https://qiita.com/popular-items/feed.atom")),
    safeFeed(fetchRss("https://b.hatena.ne.jp/entrylist/it.rss")),
    safeFeed(fetchRss("https://blog.logrocket.com/feed/")),
    safeFeed(fetchRss("https://ics.media/feed/atom.xml")),
    safeFeed(fetchRss("https://codezine.jp/rss/new/20/index.xml")),
    safeFeed(
      fetchRss("https://yamadashy.github.io/tech-blog-rss-feed/feeds/rss.xml")
    ),
    safeFeed(
      fetchRss(
        "https://raw.githubusercontent.com/0xSMW/rss-feeds/main/feeds/feed_anthropic_news.xml"
      )
    ),
    safeFeed(
      fetchRss(
        "https://raw.githubusercontent.com/0xSMW/rss-feeds/main/feeds/feed_openai_alignment.xml"
      )
    ),
  ]);

  const [
    jserItems,
    zennTSItems,
    zennReactItems,
    nextjsItems,
    youtubeItems,
    colissItems,
    qiitaItems,
    hatenaItems,
    logRocketItems,
    icsItems,
    codeZineItems,
    companyItems,
    anthropicItems,
    openAiItems,
  ] = results;

  const sections = [
    { title: "JSer.info", items: jserItems },
    { title: "Zenn（TypeScript）", items: zennTSItems },
    { title: "Coliss（Web制作）", items: colissItems },
    { title: "Qiitaトレンド", items: qiitaItems },
    { title: "ハテナ新着", items: hatenaItems },
    { title: "ムーザルちゃんねる", items: youtubeItems },
    { title: "Zenn（React）", items: zennReactItems },
    { title: "Zenn（Next.js）", items: nextjsItems },
    { title: "logRocket", items: logRocketItems },
    { title: "ICS Media", items: icsItems },
    { title: "CodeZine", items: codeZineItems },
    { title: "社内ブログ", items: companyItems },
    { title: "Anthropic", items: anthropicItems },
    { title: "OpenAI", items: openAiItems },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 dark:bg-black">
      <main className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
            フロントエンドキャッチアップ
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {sections.map(({ title, items }) => (
            <section key={title}>
              <h2 className="mb-4 text-xl font-semibold">{title}</h2>
              <FeedList items={items} />
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
