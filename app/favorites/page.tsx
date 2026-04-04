import type { Metadata } from "next";
import { AppHeader } from "@/components/AppHeader";
import { FavoritesPageClient } from "@/components/FavoritesPageClient";
import { FAVORITES_MAX_ITEMS } from "@/lib/favorites";

export const metadata: Metadata = {
  title: "お気に入り | フロントエンドキャッチアップ",
  description: "ログイン不要で保存した記事を後から見返せます。",
};

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 dark:bg-black">
      <main className="mx-auto max-w-4xl">
        <AppHeader title="お気に入り" currentPage="favorites" />
        <p className="mb-4 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          保存期間: ブラウザのローカルデータを削除するまで。上限: {FAVORITES_MAX_ITEMS}
          記事。
        </p>
        <FavoritesPageClient />
      </main>
    </div>
  );
}
