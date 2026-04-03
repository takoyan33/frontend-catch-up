"use client";

import { FavoriteButton } from "@/components/FavoriteButton";

type Props = {
  item: {
    title?: string;
    link?: string;
    pubDate?: string;
  };
  source?: string;
  dateFormat?: "date" | "datetime";
  onUnfavorite?: () => void;
};

export function FeedCard({
  item,
  source,
  dateFormat = "date",
  onUnfavorite,
}: Props) {
  if (!item.title || !item.link) {
    return null;
  }

  const formattedDate = item.pubDate
    ? dateFormat === "datetime"
      ? new Date(item.pubDate).toLocaleString("ja-JP", {
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : new Date(item.pubDate).toLocaleDateString("ja-JP")
    : null;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800">
      <div className="mb-3 flex items-start justify-between gap-3">
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1"
        >
          {source ? (
            <span className="mb-1 inline-block rounded bg-zinc-200 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
              {source}
            </span>
          ) : null}
          <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
            {item.title}
          </h3>
          {formattedDate ? (
            <p className="mt-1 text-sm text-zinc-500">{formattedDate}</p>
          ) : null}
        </a>
        <FavoriteButton
          item={{
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            source,
          }}
          onToggle={(active) => {
            if (!active) {
              onUnfavorite?.();
            }
          }}
        />
      </div>
    </div>
  );
}
