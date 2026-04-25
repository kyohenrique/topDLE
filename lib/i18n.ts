import type { Locale, SortMode } from "@/types/game";

export const uiText = {
  title: {
    pt: "topDLE",
    en: "topDLE",
  },
  subtitle: {
    pt: "Jogos diários de adivinhação em um só lugar.",
    en: "Daily guessing games in one place.",
  },
  searchPlaceholder: {
    pt: "Buscar jogo...",
    en: "Search game...",
  },
  sortLabel: {
    pt: "Ordenar por",
    en: "Sort by",
  },
  sort: {
    manual: {
      pt: "Manual",
      en: "Manual",
    },
    name: {
      pt: "Nome",
      en: "Name",
    },
    newest: {
      pt: "Mais novo",
      en: "Newest",
    },
    oldest: {
      pt: "Mais antigo",
      en: "Oldest",
    },
  },
  noResults: {
    pt: "Nenhum jogo encontrado.",
    en: "No games found.",
  },
  categories: {
    pt: "Categorias",
    en: "Categories",
  },
  language: {
    pt: "Idioma",
    en: "Language",
  },
  theme: {
    pt: "Tema",
    en: "Theme",
  },
  dark: {
    pt: "Escuro",
    en: "Dark",
  },
  light: {
    pt: "Claro",
    en: "Light",
  },
  byHenrique: {
    pt: "Desenvolvido por Henrique",
    en: "Built by Henrique",
  },
  github: {
    pt: "GitHub",
    en: "GitHub",
  },
  openGame: {
    pt: "Abrir jogo",
    en: "Open game",
  },
} as const;

export const sortModes: SortMode[] = ["manual", "name", "newest", "oldest"];

export function t<T extends Record<Locale, string>>(value: T, locale: Locale): string {
  return value[locale];
}
