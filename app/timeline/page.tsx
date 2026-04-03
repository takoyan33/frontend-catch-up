import type { Metadata } from "next";
import { getAllSections } from "@/lib/feedConfig";
import {
  isInDateRange,
  type DateRange,
} from "@/lib/dateUtils";
import { AppHeader } from "@/components/AppHeader";
import { TimelineTabs } from "@/components/TimelineTabs";
import { TimelineList } from "@/components/TimelineList";

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
          <TimelineList items={filtered} />
        )}
      </main>
    </div>
  );
}
