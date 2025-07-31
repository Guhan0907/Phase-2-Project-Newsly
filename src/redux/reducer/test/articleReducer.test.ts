import { describe, it, expect } from "vitest";
import articlesReducer from "../articleReducer";
import {
  fetchArticlesSuccess,
  fetchFeaturedSuccess,
} from "../../../redux/action/articlesAction";
import type { NYTArticle } from "../../../types/article";
import type { ArticlesState } from "../../type";

const mockArticles: NYTArticle[] = [
  {
    title: "Breaking News",
    abstract: "Some abstract",
    url: "https://news.com/article",
    byline: "By Author",
    published_date: "2023-01-01",
    multimedia: [],
    section: "World",
    subsection: "",
    isRead: false,
  },
];

const initialState: ArticlesState = {
  featured: null,
  topStories: [],
  filtered: [],
  query: "",
  loading: false,
  error: null,
  isSearchMode: false,
};

describe("articlesReducer", () => {
  it("handles FETCH_ARTICLES_SUCCESS", () => {
    const newState = articlesReducer(
      initialState,
      fetchArticlesSuccess(mockArticles),
    );
    expect(newState.loading).toBe(false);
    expect(newState.topStories).toEqual(mockArticles);
    expect(newState.filtered).toEqual(mockArticles);
  });

  it("handles FETCH_FEATURED_SUCCESS", () => {
    const featured = mockArticles[0];
    const newState = articlesReducer(
      initialState,
      fetchFeaturedSuccess(featured),
    );
    expect(newState.featured).toEqual(featured);
  });

  it("returns current state by default", () => {
    const unknownAction = { type: "UNKNOWN_ACTION" } as any;
    const newState = articlesReducer(initialState, unknownAction);
    expect(newState).toEqual(initialState);
  });
});
