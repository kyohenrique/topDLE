import type { Metadata } from "next";

import { GamesExplorer } from "@/components/games-explorer";

type HomeProps = {
  searchParams: Promise<{ page?: string }>;
};

export const metadata: Metadata = {
  title: "Daily Guessing Games",
  description: "Catalogo enxuto de jogos diarios de adivinhacao com busca e filtros.",
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const rawPage = Number.parseInt(params.page ?? "1", 10);
  const initialPage = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  return <GamesExplorer initialPage={initialPage} />;
}
