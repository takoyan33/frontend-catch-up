export const FAVORITES_STORAGE_KEY = "catchup:favorites";
export const FAVORITES_MAX_ITEMS = 500;
const FAVORITES_EVENT = "favorites:changed";
const EMPTY_FAVORITES: FavoriteItem[] = [];
let favoritesCacheRaw: string | null = null;
let favoritesCacheValue: FavoriteItem[] = EMPTY_FAVORITES;

export type FavoriteItem = {
  title: string;
  link: string;
  pubDate?: string;
  source?: string;
  savedAt: string;
};

function isFavoriteItem(value: unknown): value is FavoriteItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Record<string, unknown>;
  return (
    typeof item.title === "string" &&
    typeof item.link === "string" &&
    typeof item.savedAt === "string" &&
    (item.pubDate === undefined || typeof item.pubDate === "string") &&
    (item.source === undefined || typeof item.source === "string")
  );
}

export function readFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) {
      favoritesCacheRaw = null;
      favoritesCacheValue = EMPTY_FAVORITES;
      return favoritesCacheValue;
    }

    if (raw === favoritesCacheRaw) {
      return favoritesCacheValue;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      favoritesCacheRaw = null;
      favoritesCacheValue = EMPTY_FAVORITES;
      return favoritesCacheValue;
    }

    favoritesCacheRaw = raw;
    favoritesCacheValue = parsed.filter(isFavoriteItem);
    return favoritesCacheValue;
  } catch {
    favoritesCacheRaw = null;
    favoritesCacheValue = EMPTY_FAVORITES;
    return favoritesCacheValue;
  }
}

export function writeFavorites(items: FavoriteItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  const raw = JSON.stringify(items);
  favoritesCacheRaw = raw;
  favoritesCacheValue = items;
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, raw);
  window.dispatchEvent(new Event(FAVORITES_EVENT));
}

export function isFavorited(link: string, items: FavoriteItem[]) {
  return items.some((item) => item.link === link);
}

export function toggleFavorite(item: Omit<FavoriteItem, "savedAt">) {
  const current = readFavorites();

  if (isFavorited(item.link, current)) {
    const next = current.filter((entry) => entry.link !== item.link);
    writeFavorites(next);
    return { items: next, active: false };
  }

  const next = [{ ...item, savedAt: new Date().toISOString() }, ...current].slice(
    0,
    FAVORITES_MAX_ITEMS
  );
  writeFavorites(next);
  return { items: next, active: true };
}

export function subscribeFavorites(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === FAVORITES_STORAGE_KEY) {
      onChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(FAVORITES_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(FAVORITES_EVENT, onChange);
  };
}

export function getFavoritesServerSnapshot() {
  return EMPTY_FAVORITES;
}
