"use client";

import { useState } from "react";
import Image from "next/image";

import { t, uiText } from "@/lib/i18n";
import type { Game, Locale } from "@/types/game";

type GameCardProps = {
  game: Game;
  locale: Locale;
  position: number;
};

export function GameCard({ game, locale, position }: GameCardProps) {
  const categories = game.category.slice(0, 3);
  const faviconUrl = `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(game.url)}`;
  const [iconSrc, setIconSrc] = useState(faviconUrl);
  const rank = position.toString().padStart(2, "0");

  return (
    <a
      href={game.url}
      target="_blank"
      rel="noopener noreferrer"
      className="kraken-card group relative block overflow-hidden rounded-xl border p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_var(--hover-glow)]"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--panel-border)",
      }}
      aria-label={`${t(uiText.openGame, locale)} ${game.name[locale]}`}
    >
      <div
        className="absolute right-3 top-3 z-10 rounded-full border px-2 py-1 text-[11px] font-bold tracking-[0.16em] shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_16px_rgba(133,91,251,0.35)]"
        style={{
          borderColor: "var(--accent)",
          background: "linear-gradient(120deg, var(--accent-soft), rgba(255,255,255,0.08))",
          color: "var(--app-text)",
        }}
        aria-label={`position ${position}`}
      >
        #{rank}
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-y-100"
        aria-hidden="true"
      />

      <div className="flex min-h-[138px] flex-col gap-4 pr-12">
        <div className="flex items-start gap-4">
          <div
            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border p-1 transition-all duration-300 group-hover:scale-105"
            style={{
              borderColor: "var(--accent)",
              backgroundColor: "var(--field-bg)",
            }}
          >
            <Image
              src={iconSrc}
              alt={game.name[locale]}
              width={40}
              height={40}
              className="h-full w-full object-contain"
              unoptimized
              onError={() => {
                if (iconSrc !== game.image) {
                  setIconSrc(game.image);
                }
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-[2rem] font-bold leading-tight transition-all duration-300 group-hover:translate-x-0.5 group-hover:[text-shadow:0_0_16px_rgba(113,50,245,0.35)]">
              {game.name[locale]}
            </h2>

            <p
              className="mt-1 text-sm leading-relaxed"
              style={{
                color: "var(--text-muted)",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {game.description[locale]}
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <span
                key={`${game.id}-${category}`}
                className="rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                style={{
                  borderColor: "var(--panel-border)",
                  backgroundColor: "rgba(133, 91, 251, 0.1)",
                  color: "var(--accent-strong)",
                }}
              >
                {category}
              </span>
            ))}
          </div>

          <span className="text-xs font-semibold" style={{ color: "var(--accent-strong)" }}>
            {t(uiText.openGame, locale)} ↗
          </span>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "linear-gradient(112deg, var(--accent-soft), transparent 55%)" }}
        aria-hidden="true"
      />
    </a>
  );
}
