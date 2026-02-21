import type { Metadata } from "next";
import { getAllSections } from "@/lib/feedConfig";
import {
  isInDateRange,
  type DateRange,
} from "@/lib/dateUtils";
import { AppHeader } from "@/components/AppHeader";
import { TimelineTabs } from "@/components/TimelineTabs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "今日のまとめ | フロントエンドキャッチアップ",
  description: "全フィードを時系列で一覧。今日・昨日・今週で絞り込み可能。",
};

export type TimelineItem = {
  title: string;
  link: string;
  pubDate?: string;
  source: string;
};

type PageProps = {
  searchParams: Promise<{ range?: string }>;
};

function parseRange(range: string | undefined): DateRange {
  if (
    range === "today" ||
    range === "yesterday" ||
    range === "week" ||
    range === "all"
  ) {
    return range;
  }
  return "all";
}

export default async function TimelinePage({ searchParams }: PageProps) {
  const { sections, updatedAt } = await getAllSections();
  const params = await searchParams;
  const range = parseRange(params.range);

  const merged: TimelineItem[] = sections.flatMap((section) =>
    section.items.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      source: section.title,
    }))
  );

  const sorted = [...merged].sort((a, b) => {
    const timeA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const timeB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return timeB - timeA;
  });

  const filtered = sorted.filter((item) =>
    isInDateRange(item.pubDate, range)
  );

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 dark:bg-black">
      <main className="mx-auto max-w-4xl">
        <AppHeader
          title="今日のまとめ"
          updatedAt={updatedAt}
          currentPage="timeline"
        />

        <TimelineTabs currentRange={range} />

        {filtered.length === 0 ? (
          <p className="rounded-lg border border-zinc-200 bg-white p-8 text-center text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            該当する記事はありません
          </p>
        ) : (
          <ul className="space-y-3">
            {filtered.map((item, index) => (
              <li
                key={`${item.link}-${index}`}
                className="rounded-lg border border-zinc-200 bg-white p-4 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <span className="mb-1 inline-block rounded bg-zinc-200 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                    {item.source}
                  </span>
                  <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
                    {item.title}
                  </h3>
                  {item.pubDate && (
                    <p className="mt-1 text-sm text-zinc-500">
                      {new Date(item.pubDate).toLocaleString("ja-JP", {
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
