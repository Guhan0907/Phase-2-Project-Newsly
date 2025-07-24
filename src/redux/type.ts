import type { NYTArticle } from "../types/article";

export interface SearchState {
  query: string;
}

// History state
export interface HistoryEntry {
  articleId: string;
  source: "top" | "wire" | "trending";
}

export interface historyState {
  history: HistoryEntry[];
}

export interface ArticlesState {
  featured: NYTArticle | null;
  topStories: NYTArticle[];
  filtered: NYTArticle[];
  query: string;
  loading: boolean;
  error: string | null;
  isSearchMode: boolean;
}
