"use client";

import { useState } from "react";
import { FeedCard } from "@/components/FeedCard";

type FeedItem = {
  title?: string;
  link?: string;
  pubDate?: string;
};

type Props = {
  items: FeedItem[];
  initialCount?: number;
};

export function FeedList({ items, initialCount = 5 }: Props) {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded ? items : items.slice(0, initialCount);

  return (
    <div>
      <ul className="space-y-4">
        {visibleItems.map((item, index) => (
          <li key={item.link ?? index}>
            <FeedCard item={item} />
          </li>
        ))}
      </ul>

      {items.length > initialCount && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="rounded-full border border-zinc-300 px-4 py-1 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {expanded
              ? "閉じる"
              : `もっと見る（+${items.length - initialCount}）`}
          </button>
        </div>
      )}
    </div>
  );
}
