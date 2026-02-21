"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DateRange } from "@/lib/dateUtils";

const TABS: { value: DateRange; label: string }[] = [
  { value: "today", label: "今日" },
  { value: "yesterday", label: "昨日" },
  { value: "week", label: "今週" },
  { value: "all", label: "すべて" },
];

type Props = {
  currentRange: DateRange;
};

export function TimelineTabs({ currentRange }: Props) {
  const pathname = usePathname();

  return (
    <nav className="mb-6 flex flex-wrap gap-2" aria-label="表示期間">
      {TABS.map(({ value, label }) => {
        const isActive = currentRange === value;
        const href = value === "all" ? pathname : `${pathname}?range=${value}`;

        return (
          <Link
            key={value}
            href={href}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
