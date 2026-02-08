"use client";

import { useState } from "react";

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
          <li
            key={index}
            className="rounded-lg border border-zinc-200 bg-white p-4 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
                {item.title}
              </h3>
              {item.pubDate && (
                <p className="mt-1 text-sm text-zinc-500">
                  {new Date(item.pubDate).toLocaleDateString("ja-JP")}
                </p>
              )}
            </a>
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
