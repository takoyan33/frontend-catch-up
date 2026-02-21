const TZ = "Asia/Tokyo";

/** 指定日時を JST の日付文字列（YYYY/MM/DD）に変換 */
function toJstDateString(d: Date): string {
  return d.toLocaleDateString("ja-JP", { timeZone: TZ });
}

/** 今日の 00:00 JST の Date（UTC での瞬間） */
function getStartOfTodayJst(): Date {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const y = parts.find((p) => p.type === "year")!.value;
  const m = parts.find((p) => p.type === "month")!.value;
  const d = parts.find((p) => p.type === "day")!.value;
  return new Date(`${y}-${m}-${d}T00:00:00+09:00`);
}

/** 今週の月曜 00:00 JST の Date */
function getStartOfWeekJst(): Date {
  const startOfToday = getStartOfTodayJst();
  const msPerDay = 24 * 60 * 60 * 1000;
  const jstDay =
    (Math.floor(
      (startOfToday.getTime() + 9 * 60 * 60 * 1000) / msPerDay
    ) +
      4) %
    7;
  const daysSinceMonday = (jstDay - 4 + 7) % 7;
  return new Date(
    startOfToday.getTime() - daysSinceMonday * msPerDay
  );
}

/** フィルター種別 */
export type DateRange = "today" | "yesterday" | "week" | "all";

/** 指定範囲に該当するか（JST 基準） */
export function isInDateRange(
  pubDate: string | undefined,
  range: DateRange
): boolean {
  if (!pubDate) return false;
  const d = new Date(pubDate);
  const itemDateStr = toJstDateString(d);
  const now = new Date();
  const todayStr = toJstDateString(now);

  if (range === "all") return true;
  if (range === "today") return itemDateStr === todayStr;

  const startOfToday = getStartOfTodayJst();
  const msPerDay = 24 * 60 * 60 * 1000;

  if (range === "yesterday") {
    const yesterdayStart = new Date(
      startOfToday.getTime() - msPerDay
    );
    const yesterdayStr = toJstDateString(yesterdayStart);
    return itemDateStr === yesterdayStr;
  }

  if (range === "week") {
    const startOfWeek = getStartOfWeekJst();
    return d.getTime() >= startOfWeek.getTime();
  }

  return false;
}
