import {
  fetchTimesWireNews,
  fetchTopStories,
  fetchTrendingStories,
} from "../../services/apiCalls";
import type { NYTArticle } from "../../types/article";
import type { Dispatch } from "redux";

// Action Types
export const SET_SAVED_TOP_STORIES = "SET_SAVED_TOP_STORIES";
export const SET_SAVED_TRENDING_NEWS = "SET_SAVED_TRENDING_NEWS";
export const SET_SAVED_TIMES_WIRE_NEWS = "SET_SAVED_TIMES_WIRE_NEWS";

interface SetSavedTopStoriesAction {
  type: typeof SET_SAVED_TOP_STORIES;
  payload: NYTArticle[];
}

interface SetSavedTrendingNewsAction {
  type: typeof SET_SAVED_TRENDING_NEWS;
  payload: NYTArticle[];
}

interface SetSavedTimesWireNewsAction {
  type: typeof SET_SAVED_TIMES_WIRE_NEWS;
  payload: NYTArticle[];
}

export type SavedArticlesAction =
  | SetSavedTopStoriesAction
  | SetSavedTrendingNewsAction;

// this is main were the actions are defined
export const setSavedTopStories = (
  articles: NYTArticle[],
): SetSavedTopStoriesAction => ({
  type: SET_SAVED_TOP_STORIES,
  payload: articles,
});

export const setSavedTrendingNews = (
  articles: NYTArticle[],
): SetSavedTrendingNewsAction => ({
  type: SET_SAVED_TRENDING_NEWS,
  payload: articles,
});

export const SetSavedTimesWireNews = (
  aritcles: NYTArticle[],
): SetSavedTimesWireNewsAction => ({
  type: SET_SAVED_TIMES_WIRE_NEWS,
  payload: aritcles,
});

// here we are using the thunk to fetch the data ffrom the dispatch itself
export const fetchSavedArticlesOnce = () => {
  return async (dispatch: Dispatch, getState: () => any) => {
    const state = getState();
    const {
      savedArticles: { topStories, trending, timesWire },
    } = state;
    if (topStories.length > 0 && trending.length > 0 && timesWire.length > 0) {
      // console.log("Saved articles already loaded, skipping fetch.===========================================");
      return; // Already loaded, so we need to skip this time
    }

    try {
      const top = await fetchTopStories();
      const trendingNews = await fetchTrendingStories();
      const timesWire = await fetchTimesWireNews();
      // console.log("TimesWire news =>>" , timesWire);
      // console.log("Fetched saved articles...---------------", topStories, trending)
      if (top) {
        dispatch(setSavedTopStories(top));
      }
      if (trendingNews) {
        dispatch(setSavedTrendingNews(trendingNews));
      }
      if (timesWire) {
        dispatch(SetSavedTimesWireNews(timesWire));
      }
      // console.log("Fetching saved articles...---------------", topStories, trending)
    } catch (error) {
      console.error(
        "Failed to fetch saved top/trending/timesWire articles:",
        error,
      );
    }
  };
};
