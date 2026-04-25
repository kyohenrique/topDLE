export type Locale = "pt" | "en";

export type SortMode = "manual" | "name" | "newest" | "oldest";

export type LocalizedText = {
  pt: string;
  en: string;
};

export type Game = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  url: string;
  category: string[];
  order: number;
  createdAt: string;
  image: string;
};
