import { fetchJserFeed } from "../lib/fetchJser";
import { fetchZennTopicFeed } from "../lib/fetchZennTopic";
import { FeedList } from "../components/FeedList";
import { fetchColissFeed } from "../lib/fetchColissFeed";
import { fetchQiitaTrendFeed } from "../lib/fetchQiitaTrend";
import { fetchHatenaTechFeed } from "../lib/fetchHatenaTechFeed";
import { fetchYouTubeFeed } from "../lib/fetchYouTubeFeed";
import { fetchLogRocket } from "../lib/fetchLogRocket";

export const dynamic = "force-dynamic";

export default async function Home() {
  const jserItems = await fetchJserFeed();
  const zennTSItems = await fetchZennTopicFeed("typescript");
  const zennReactItems = await fetchZennTopicFeed("react");
  const colissItems = await fetchColissFeed();
  const qiitaItems = await fetchQiitaTrendFeed();
  const hatenaItems = await fetchHatenaTechFeed();
  const nextjsItems = await fetchZennTopicFeed("nextjs");
  const youtubeItems = await fetchYouTubeFeed();
  const logRocketItems = await fetchLogRocket();

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 dark:bg-black">
      <main className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
            フロントエンドキャッチアップ
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <section>
            <h2 className="mb-4 text-xl font-semibold">JSer.info</h2>
            <FeedList items={jserItems} />
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Zenn（TypeScript）</h2>
            <FeedList items={zennTSItems} />
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Coliss（Web制作）</h2>
            <FeedList items={colissItems} />
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Qiitaトレンド</h2>
            <FeedList items={qiitaItems} />
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">ハテナ新着</h2>
            <FeedList items={hatenaItems} />
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">ムーザルちゃんねる</h2>
            <FeedList items={youtubeItems} />
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Zenn（React）</h2>
            <FeedList items={zennReactItems} />
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Zenn(NextJs)</h2>
            <FeedList items={nextjsItems} />
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">logRocket</h2>
            <FeedList items={logRocketItems} />
          </section>
        </div>
      </main>
    </div>
  );
}
