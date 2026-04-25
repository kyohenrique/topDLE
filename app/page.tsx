import type { Metadata } from "next";

import { GamesExplorer } from "@/components/games-explorer";

export const metadata: Metadata = {
  title: "Daily Guessing Games",
  description: "Catalogo enxuto de jogos diarios de adivinhacao com busca e filtros.",
};

export default function Home() {
  return <GamesExplorer />;
}
