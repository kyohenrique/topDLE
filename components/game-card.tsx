"use client";

import { useState } from "react";
import Image from "next/image";

import { t } from "@/lib/i18n";
import type { Game, Locale } from "@/types/game";

type GameCardProps = {
  game: Game;
  locale: Locale;
};

export function GameCard({ game, locale }: GameCardProps) {
  const categories = game.category.join(" • ");
  const faviconUrl = `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(game.url)}`;
  const [iconSrc, setIconSrc] = useState(faviconUrl);

  return (
    <a
      href={game.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-xl border p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_var(--hover-glow)]"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--panel-border)",
      }}
      aria-label={`${t({ pt: "Abrir", en: "Open" }, locale)} ${game.name[locale]}`}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-y-100"
        aria-hidden="true"
      />

      <div className="flex items-start gap-4">
        <div
          className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border bg-black/70 p-1 transition-all duration-300 group-hover:scale-105"
          style={{ borderColor: "var(--accent)" }}
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

        <div className="min-w-0">
          <h2 className="truncate text-3xl font-bold leading-tight">{game.name[locale]}</h2>
          <p className="text-xs uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            {categories}
          </p>

          <div className="mt-3 max-h-0 -translate-y-1 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:translate-y-0 group-hover:opacity-100 group-focus:max-h-16 group-focus:translate-y-0 group-focus:opacity-100">
            <p className="text-sm leading-snug" style={{ color: "var(--app-text)" }}>
              {game.description[locale]}
            </p>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "linear-gradient(112deg, var(--accent-soft), transparent 55%)" }}
        aria-hidden="true"
      />

      <div
        className="absolute right-3 top-3 translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        style={{ color: "var(--accent)" }}
        aria-hidden="true"
      >
        ↗
      </div>
    </a>
  );
}
