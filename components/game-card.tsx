import Image from "next/image";

import { t } from "@/lib/i18n";
import type { Game, Locale } from "@/types/game";

type GameCardProps = {
  game: Game;
  locale: Locale;
};

export function GameCard({ game, locale }: GameCardProps) {
  const categories = game.category.join(" • ");

  return (
    <a
      href={game.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-[2px] border border-nv-gray-border bg-nv-surface p-4 shadow-nv transition-all duration-200 hover:border-nv-green"
      aria-label={`${t({ pt: "Abrir", en: "Open" }, locale)} ${game.name[locale]}`}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[2px] border border-nv-gray-border bg-black">
          <Image src={game.image} alt={game.name[locale]} fill sizes="48px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold leading-tight text-white">{game.name[locale]}</h2>
          <p className="text-xs uppercase tracking-wide text-nv-gray-300">{categories}</p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus:opacity-100">
        <p className="text-sm text-white">{game.description[locale]}</p>
      </div>
    </a>
  );
}
