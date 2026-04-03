"use client";

import { useSyncExternalStore } from "react";
import { FeedCard } from "@/components/FeedCard";
import {
  getFavoritesServerSnapshot,
  readFavorites,
  subscribeFavorites,
} from "@/lib/favorites";

export function FavoritesPageClient() {
  const items = useSyncExternalStore(
    subscribeFavorites,
    readFavorites,
    getFavoritesServerSnapshot
  );

  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-zinc-200 bg-white p-8 text-center text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        まだお気に入りはありません。各記事の「お気に入り」から保存できます。
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.link}>
          <FeedCard
            item={item}
            source={item.source}
            dateFormat="datetime"
            onUnfavorite={() => undefined}
          />
        </li>
      ))}
    </ul>
  );
}
