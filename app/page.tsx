import { getAllSections } from "@/lib/feedConfig";
import { FeedList } from "@/components/FeedList";
import { AppHeader } from "@/components/AppHeader";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { sections, updatedAt } = await getAllSections();

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 dark:bg-black">
      <main className="mx-auto max-w-6xl">
        <AppHeader
          title="フロントエンドキャッチアップ"
          updatedAt={updatedAt}
          currentPage="home"
        />

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
