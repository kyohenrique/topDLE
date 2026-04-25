"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { GameCard } from "@/components/game-card";
import { Footer } from "@/components/footer";
import { games } from "@/data/games";
import { PAGE_SIZE, STORAGE_KEYS } from "@/lib/constants";
import { filterAndSortGames } from "@/lib/games";
import { sortModes, t, uiText } from "@/lib/i18n";
import type { Locale, SortMode } from "@/types/game";

export function GamesExplorer() {
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
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    if (!window.location.search) {
      return;
    }

    const cleanUrl = `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(window.history.state, "", cleanUrl);
  }, []);

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

  const visibleGames = processedGames.slice(0, visibleCount);

  return (
    <div className="relative isolate min-h-screen text-[var(--app-text)]">
      <div className="page-animated-bg" aria-hidden="true" />
      <div className="page-static-overlay" aria-hidden="true" />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <header
          className="kraken-header mb-8 rounded-2xl border p-0 shadow-[0_18px_38px_-24px_rgba(0,0,0,0.55)] backdrop-blur-md"
          style={{
            backgroundColor: "var(--panel-bg)",
            borderColor: "var(--panel-border)",
          }}
        >
          <div className="space-y-6 p-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-3">
                <span
                  className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]"
                  style={{
                    borderColor: "rgba(133, 91, 251, 0.45)",
                    backgroundColor: "rgba(133, 91, 251, 0.14)",
                    color: "var(--accent-strong)",
                  }}
                >
                  {t(uiText.headerEyebrow, locale)}
                </span>

                <h1
                  className="text-4xl font-bold leading-tight"
                  style={{
                    fontFamily: "Kraken-Brand, IBM Plex Sans, Helvetica, Arial, sans-serif",
                    letterSpacing: "-0.5px",
                    textShadow: "0 0 20px rgba(113, 50, 245, 0.2)",
                  }}
                >
                  {t(uiText.title, locale)}
                </h1>

                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {t(uiText.subtitle, locale)} {t(uiText.headerDescription, locale)}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 md:min-w-[300px]">
                <div
                  className="rounded-xl border px-3 py-2"
                  style={{
                    borderColor: "var(--panel-border)",
                    backgroundColor: "var(--field-bg)",
                  }}
                >
                  <p className="text-lg font-bold" style={{ color: "var(--accent-strong)" }}>
                    {games.length}
                  </p>
                  <p className="text-[11px]" style={{ color: "var(--text-soft)" }}>
                    {t(uiText.statActiveGames, locale)}
                  </p>
                </div>

                <div
                  className="rounded-xl border px-3 py-2"
                  style={{
                    borderColor: "var(--panel-border)",
                    backgroundColor: "var(--field-bg)",
                  }}
                >
                  <p className="text-lg font-bold" style={{ color: "var(--accent-strong)" }}>
                    {visibleGames.length}
                  </p>
                  <p className="text-[11px]" style={{ color: "var(--text-soft)" }}>
                    {t(uiText.statVisibleNow, locale)}
                  </p>
                </div>

                <div
                  className="rounded-xl border px-3 py-2"
                  style={{
                    borderColor: "var(--panel-border)",
                    backgroundColor: "var(--field-bg)",
                  }}
                >
                  <p className="text-lg font-bold" style={{ color: "var(--accent-strong)" }}>
                    PT/EN
                  </p>
                  <p className="text-[11px]" style={{ color: "var(--text-soft)" }}>
                    {t(uiText.statBilingual, locale)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                placeholder={t(uiText.searchPlaceholder, locale)}
                className="ui-control rounded-xl border px-3 py-2 text-sm outline-none transition focus:ring-2"
                style={{
                  borderColor: "var(--panel-border)",
                  backgroundColor: "var(--field-bg)",
                  color: "var(--app-text)",
                  boxShadow: "inset 0 0 0 1px transparent",
                  caretColor: "var(--accent)",
                }}
                aria-label={t(uiText.searchPlaceholder, locale)}
              />

              <label
                className="ui-control flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"
                style={{
                  borderColor: "var(--panel-border)",
                  backgroundColor: "var(--field-bg)",
                }}
              >
                <span className="shrink-0" style={{ color: "var(--text-muted)" }}>
                  {t(uiText.sortLabel, locale)}
                </span>
                <select
                  value={sortMode}
                  onChange={(event) => {
                    setSortMode(event.target.value as SortMode);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className="w-full bg-transparent font-semibold outline-none"
                  style={{ color: "var(--app-text)" }}
                  aria-label={t(uiText.sortLabel, locale)}
                >
                  {sortModes.map((mode) => (
                    <option key={mode} value={mode} style={{ backgroundColor: "var(--select-bg)", color: "var(--select-text)" }}>
                      {t(uiText.sort[mode], locale)}
                    </option>
                  ))}
                </select>
              </label>

              <label
                className="ui-control flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"
                style={{
                  borderColor: "var(--panel-border)",
                  backgroundColor: "var(--field-bg)",
                }}
              >
                <span className="shrink-0" style={{ color: "var(--text-muted)" }}>
                  {t(uiText.language, locale)}
                </span>
                <select
                  value={locale}
                  onChange={(event) => setLocale(event.target.value as Locale)}
                  className="w-full bg-transparent font-semibold outline-none"
                  style={{ color: "var(--app-text)" }}
                  aria-label={t(uiText.language, locale)}
                >
                  <option value="pt" style={{ backgroundColor: "var(--select-bg)", color: "var(--select-text)" }}>
                    PT
                  </option>
                  <option value="en" style={{ backgroundColor: "var(--select-bg)", color: "var(--select-text)" }}>
                    EN
                  </option>
                </select>
              </label>

              <button
                type="button"
                onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
                className="ui-control kraken-button rounded-xl border px-3 py-2 text-sm font-bold"
                style={{
                  borderColor: "var(--accent)",
                  background:
                    theme === "dark"
                      ? "linear-gradient(90deg, rgba(133,91,251,0.26), rgba(113,50,245,0.1))"
                      : "linear-gradient(90deg, rgba(133,91,251,0.2), rgba(113,50,245,0.08))",
                  color: "var(--app-text)",
                }}
              >
                {theme === "dark" ? "☾" : "☀"} {t(uiText.theme, locale)}: {theme === "dark" ? t(uiText.dark, locale) : t(uiText.light, locale)}
              </button>
            </div>
          </div>
        </header>

        {visibleGames.length ? (
          <section className="grid grid-cols-1 gap-4 lg:grid-cols-2" aria-label={t(uiText.categories, locale)}>
            {visibleGames.map((game, index) => (
              <GameCard key={game.id} game={game} locale={locale} position={index + 1} />
            ))}
          </section>
        ) : (
          <p
            className="rounded-xl border p-4 text-sm"
            style={{
              borderColor: "var(--panel-border)",
              backgroundColor: "var(--card-bg)",
              color: "var(--text-muted)",
            }}
          >
            {t(uiText.noResults, locale)}
          </p>
        )}

        <div ref={sentinelRef} className="h-10" />

        <Footer />
      </main>
    </div>
  );
}
