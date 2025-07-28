import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  FETCH_FEATURED_SUCCESS,
  SET_QUERY,
  SET_SEARCH_MODE,
  fetchArticlesRequest,
  fetchArticlesSuccess,
  fetchArticlesFailure,
  fetchFeaturedSuccess,
  setQuery,
  setSearchMode,
} from "../../../redux/action/articlesAction";

import type { NYTArticle } from "../../../types/article";
import { describe, it, expect } from "vitest";

describe("articlesAction", () => {
  const mockArticle: NYTArticle = {
    title: "Test Title",
    abstract: "Test Abstract",
    url: "http://test.com",
    byline: "By Test Author",
    published_date: "2024-01-01",
    multimedia: [],
    section: "World",
    subsection: "Asia",
    isRead: false,
  };

  it("should create FETCH_ARTICLES_REQUEST action", () => {
    expect(fetchArticlesRequest()).toEqual({ type: FETCH_ARTICLES_REQUEST });
  });

  it("should create FETCH_ARTICLES_SUCCESS action", () => {
    const articles = [mockArticle];
    expect(fetchArticlesSuccess(articles)).toEqual({
      type: FETCH_ARTICLES_SUCCESS,
      payload: articles,
    });
  });

  it("should create FETCH_ARTICLES_FAILURE action", () => {
    const error = "Something went wrong";
    expect(fetchArticlesFailure(error)).toEqual({
      type: FETCH_ARTICLES_FAILURE,
      payload: error,
    });
  });

  it("should create FETCH_FEATURED_SUCCESS action", () => {
    expect(fetchFeaturedSuccess(mockArticle)).toEqual({
      type: FETCH_FEATURED_SUCCESS,
      payload: mockArticle,
    });
  });

  it("should create SET_QUERY action", () => {
    const query = "technology";
    expect(setQuery(query)).toEqual({
      type: SET_QUERY,
      payload: query,
    });
  });

  it("should create SET_SEARCH_MODE action", () => {
    expect(setSearchMode(true)).toEqual({
      type: SET_SEARCH_MODE,
      payload: true,
    });

    expect(setSearchMode(false)).toEqual({
      type: SET_SEARCH_MODE,
      payload: false,
    });
  });
});
