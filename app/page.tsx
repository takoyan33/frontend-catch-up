import { fetchZennTopicFeed } from "@/lib/fetchZennTopic";
import { FeedList } from "@/components/FeedList";
import { fetchYouTubeFeed } from "@/lib/fetchYouTubeFeed";
import { fetchRss } from "@/lib/fetchRss";

export const dynamic = "force-dynamic";

export default async function Home() {
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
  ] = await Promise.all([
    fetchRss("https://realtime.jser.info/feed.xml"),
    fetchZennTopicFeed("typescript"),
    fetchZennTopicFeed("react"),
    fetchZennTopicFeed("nextjs"),
    fetchYouTubeFeed(),
    fetchRss("https://coliss.com/feed/"),
    fetchRss("https://qiita.com/popular-items/feed.atom"),
    fetchRss("https://b.hatena.ne.jp/entrylist/it.rss"),
    fetchRss("https://blog.logrocket.com/feed/"),
    fetchRss("https://ics.media/feed/atom.xml"),
    fetchRss("https://codezine.jp/rss/new/20/index.xml"),
    fetchRss("https://yamadashy.github.io/tech-blog-rss-feed/feeds/rss.xml"),
    fetchRss(
      "https://raw.githubusercontent.com/0xSMW/rss-feeds/main/feeds/feed_anthropic_news.xml"
    ),
    fetchRss(
      "https://raw.githubusercontent.com/0xSMW/rss-feeds/main/feeds/feed_openai_alignment.xml"
    ),
  ]);

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
