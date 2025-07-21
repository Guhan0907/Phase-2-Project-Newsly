import type { NYTArticle } from "../../types/article";

export const FETCH_ARTICLES_REQUEST = "FETCH_ARTICLES_REQUEST";
export const FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS";
export const FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE";
export const FETCH_FEATURED_SUCCESS = "FETCH_FEATURED_SUCCESS";
export const SET_QUERY = "SET_QUERY";

// for the typescript
export interface fetchArticlesRequestAction {
  type: typeof FETCH_ARTICLES_REQUEST;
}
export interface fetchArticlesSuccessAction {
  type: typeof FETCH_ARTICLES_SUCCESS;
  payload: NYTArticle[];
}
export interface fetchArticlesFailureAction {
  type: typeof FETCH_ARTICLES_FAILURE;
  payload: string;
}
export interface fetchFeaturedSuccessAction {
  type: typeof FETCH_FEATURED_SUCCESS;
  payload: NYTArticle;
}
export interface setQueryAction {
  type: typeof SET_QUERY;
  payload: string;
}

export const fetchArticlesRequest = (): fetchArticlesRequestAction => ({
  type: "FETCH_ARTICLES_REQUEST",
});
export const fetchArticlesSuccess = (
  data: NYTArticle[],
): fetchArticlesSuccessAction => ({
  type: "FETCH_ARTICLES_SUCCESS",
  payload: data,
});
export const fetchArticlesFailure = (
  error: string,
): fetchArticlesFailureAction => ({
  type: "FETCH_ARTICLES_FAILURE",
  payload: error,
});

export const fetchFeaturedSuccess = (
  article: NYTArticle,
): fetchFeaturedSuccessAction => ({
  type: "FETCH_FEATURED_SUCCESS",
  payload: article,
});

export const setQuery = (query: string): setQueryAction => ({
  type: "SET_QUERY",
  payload: query,
});

// for the whole export
export type ArticlesAction =
  | fetchArticlesRequestAction
  | fetchArticlesSuccessAction
  | fetchArticlesFailureAction
  | fetchFeaturedSuccessAction
  | setQueryAction;
