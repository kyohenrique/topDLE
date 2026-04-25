import type { Game, Locale, SortMode } from "@/types/game";

export function filterAndSortGames(params: {
  games: Game[];
  locale: Locale;
  sortMode: SortMode;
  search: string;
}): Game[] {
  const { games, locale, sortMode, search } = params;
  const normalizedSearch = search.trim().toLowerCase();

  const filtered = normalizedSearch
    ? games.filter((game) => game.name[locale].toLowerCase().includes(normalizedSearch))
    : games;

  const sorted = [...filtered];

  sorted.sort((a, b) => {
    if (sortMode === "manual") {
      return a.order - b.order;
    }

    if (sortMode === "name") {
      return a.name[locale].localeCompare(b.name[locale]);
    }

    if (sortMode === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return sorted;
}
