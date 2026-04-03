import type { Metadata } from "next";
import { AppHeader } from "@/components/AppHeader";
import { FavoritesPageClient } from "@/components/FavoritesPageClient";

export const metadata: Metadata = {
  title: "お気に入り | フロントエンドキャッチアップ",
  description: "ログイン不要で保存した記事を後から見返せます。",
};

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 dark:bg-black">
      <main className="mx-auto max-w-4xl">
        <AppHeader title="お気に入り" currentPage="favorites" />
        <FavoritesPageClient />
      </main>
    </div>
  );
}
