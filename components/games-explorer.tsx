"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { GameCard } from "@/components/game-card";
import { Footer } from "@/components/footer";
import { games } from "@/data/games";
import { PAGE_SIZE, STORAGE_KEYS } from "@/lib/constants";
import { filterAndSortGames } from "@/lib/games";
import { sortModes, t, uiText } from "@/lib/i18n";
import type { Locale, SortMode } from "@/types/game";

type GamesExplorerProps = {
  initialPage: number;
};

export function GamesExplorer({ initialPage }: GamesExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return "pt";
    }

    const savedLocale = localStorage.getItem(STORAGE_KEYS.locale);
    return savedLocale === "en" ? "en" : "pt";
  });
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
    return savedTheme === "light" ? "light" : "dark";
  });
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("manual");
  const [visibleCount, setVisibleCount] = useState(initialPage * PAGE_SIZE);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.locale, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const processedGames = useMemo(
    () =>
      filterAndSortGames({
        games,
        locale,
        sortMode,
        search,
      }),
    [locale, search, sortMode],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          return;
        }

        setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, processedGames.length));
      },
      { rootMargin: "280px" },
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, [processedGames.length]);

  useEffect(() => {
    const nextPage = Math.max(1, Math.ceil(visibleCount / PAGE_SIZE));
    router.replace(`${pathname}?page=${nextPage}`, { scroll: false });
  }, [visibleCount, pathname, router]);

  const visibleGames = processedGames.slice(0, visibleCount);

  return (
    <div className="relative min-h-screen bg-nv-bg text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(118,185,0,0.2),_transparent_45%),linear-gradient(180deg,_#000_0%,_#101010_65%,_#000_100%)]" />

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <header className="mb-8 space-y-5 rounded-[2px] border border-nv-gray-border bg-black/70 p-4 shadow-nv backdrop-blur-sm">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-nv-green">NVIDIA inspired</p>
            <h1 className="text-4xl font-bold leading-tight">{t(uiText.title, locale)}</h1>
            <p className="text-sm text-nv-gray-300">{t(uiText.subtitle, locale)}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setVisibleCount(Math.max(initialPage * PAGE_SIZE, PAGE_SIZE));
              }}
              placeholder={t(uiText.searchPlaceholder, locale)}
              className="rounded-[2px] border border-nv-gray-border bg-nv-surface px-3 py-2 text-sm text-white outline-none ring-nv-green transition focus:ring-2"
              aria-label={t(uiText.searchPlaceholder, locale)}
            />

            <label className="flex items-center gap-2 rounded-[2px] border border-nv-gray-border bg-nv-surface px-3 py-2 text-sm">
              <span className="shrink-0 text-nv-gray-300">{t(uiText.sortLabel, locale)}</span>
              <select
                value={sortMode}
                onChange={(event) => {
                  setSortMode(event.target.value as SortMode);
                  setVisibleCount(Math.max(initialPage * PAGE_SIZE, PAGE_SIZE));
                }}
                className="w-full bg-transparent font-semibold text-white outline-none"
                aria-label={t(uiText.sortLabel, locale)}
              >
                {sortModes.map((mode) => (
                  <option key={mode} value={mode} className="bg-black text-white">
                    {t(uiText.sort[mode], locale)}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-2 rounded-[2px] border border-nv-gray-border bg-nv-surface px-3 py-2 text-sm">
              <span className="shrink-0 text-nv-gray-300">{t(uiText.language, locale)}</span>
              <select
                value={locale}
                onChange={(event) => setLocale(event.target.value as Locale)}
                className="w-full bg-transparent font-semibold text-white outline-none"
                aria-label={t(uiText.language, locale)}
              >
                <option value="pt" className="bg-black text-white">
                  PT
                </option>
                <option value="en" className="bg-black text-white">
                  EN
                </option>
              </select>
            </label>

            <button
              type="button"
              onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
              className="rounded-[2px] border-2 border-nv-green px-3 py-2 text-sm font-bold text-white transition hover:bg-nv-button-hover"
            >
              {t(uiText.theme, locale)}: {theme === "dark" ? t(uiText.dark, locale) : t(uiText.light, locale)}
            </button>
          </div>
        </header>

        {visibleGames.length ? (
          <section className="grid grid-cols-1 gap-4 lg:grid-cols-2" aria-label={t(uiText.categories, locale)}>
            {visibleGames.map((game) => (
              <GameCard key={game.id} game={game} locale={locale} />
            ))}
          </section>
        ) : (
          <p className="rounded-[2px] border border-nv-gray-border bg-nv-surface p-4 text-sm text-nv-gray-300">
            {t(uiText.noResults, locale)}
          </p>
        )}

        <div ref={sentinelRef} className="h-10" />

        <Footer />
      </main>
    </div>
  );
}
