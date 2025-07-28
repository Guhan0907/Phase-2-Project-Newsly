import { describe, it, expect } from "vitest";
import articlesReducer from "../articleReducer";
import {
  fetchArticlesRequest,
  fetchArticlesSuccess,
  fetchArticlesFailure,
  fetchFeaturedSuccess,
  setQuery,
  setSearchMode,
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
  it("handles FETCH_ARTICLES_REQUEST", () => {
    const newState = articlesReducer(initialState, fetchArticlesRequest());
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it("handles FETCH_ARTICLES_SUCCESS", () => {
    const newState = articlesReducer(
      initialState,
      fetchArticlesSuccess(mockArticles),
    );
    expect(newState.loading).toBe(false);
    expect(newState.topStories).toEqual(mockArticles);
    expect(newState.filtered).toEqual(mockArticles);
  });

  it("handles FETCH_ARTICLES_FAILURE", () => {
    const errorMsg = "Failed to fetch";
    const newState = articlesReducer(
      initialState,
      fetchArticlesFailure(errorMsg),
    );
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(errorMsg);
  });

  it("handles FETCH_FEATURED_SUCCESS", () => {
    const featured = mockArticles[0];
    const newState = articlesReducer(
      initialState,
      fetchFeaturedSuccess(featured),
    );
    expect(newState.featured).toEqual(featured);
  });

  it("handles SET_QUERY", () => {
    const stateWithArticles = {
      ...initialState,
      topStories: mockArticles,
    };

    const newState = articlesReducer(stateWithArticles, setQuery("breaking"));
    expect(newState.query).toBe("breaking");
    expect(newState.filtered.length).toBe(1);
  });

  it("handles SET_SEARCH_MODE", () => {
    const newState = articlesReducer(initialState, setSearchMode(true));
    expect(newState.isSearchMode).toBe(true);
  });

  it("returns current state by default", () => {
    const unknownAction = { type: "UNKNOWN_ACTION" } as any;
    const newState = articlesReducer(initialState, unknownAction);
    expect(newState).toEqual(initialState);
  });
});
