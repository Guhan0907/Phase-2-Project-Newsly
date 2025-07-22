import type { NYTArticle } from "../types/article";

export interface SearchState {
  query: string;
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

// export interface RootState {
//     searchReducer : SearchState
//     articlesReducer : ArticlesState
// }
