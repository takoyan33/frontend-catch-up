"use client";

import { useSyncExternalStore } from "react";
import {
  getFavoritesServerSnapshot,
  isFavorited,
  readFavorites,
  subscribeFavorites,
  toggleFavorite,
  type FavoriteItem,
} from "@/lib/favorites";

type Props = {
  item: Omit<FavoriteItem, "savedAt">;
  onToggle?: (active: boolean) => void;
};

export function FavoriteButton({ item, onToggle }: Props) {
  const favorites = useSyncExternalStore(
    subscribeFavorites,
    readFavorites,
    getFavoritesServerSnapshot
  );
  const active = isFavorited(item.link, favorites);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "お気に入りから外す" : "お気に入りに追加"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const result = toggleFavorite(item);
        onToggle?.(result.active);
      }}
      className={`shrink-0 rounded-full border px-3 py-1 text-sm font-medium transition ${
        active
          ? "border-amber-300 bg-amber-100 text-amber-900 hover:bg-amber-200"
          : "border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800"
      }`}
    >
      {active ? "★ 保存済み" : "☆ お気に入り"}
    </button>
  );
}
