import Link from "next/link";

type Props = {
  title: string;
  updatedAt: Date;
  currentPage: "home" | "timeline";
};

/** 更新時刻の表示用フォーマット */
function formatUpdatedAt(d: Date): string {
  return d.toLocaleString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AppHeader({ title, updatedAt, currentPage }: Props) {
  return (
    <header className="mb-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
          {title}
        </h1>
        <nav className="flex items-center gap-3 text-sm">
          {currentPage === "home" ? (
            <Link
              href="/timeline"
              className="text-zinc-600 underline-offset-2 hover:underline dark:text-zinc-400"
            >
              今日のまとめ
            </Link>
          ) : (
            <Link
              href="/"
              className="text-zinc-600 underline-offset-2 hover:underline dark:text-zinc-400"
            >
              ホーム
            </Link>
          )}
        </nav>
      </div>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        このページのデータは {formatUpdatedAt(updatedAt)} 更新
      </p>
    </header>
  );
}
