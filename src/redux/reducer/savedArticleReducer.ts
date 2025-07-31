import {
  SET_SAVED_TIMES_WIRE_NEWS,
  SET_SAVED_TOP_STORIES,
  SET_SAVED_TRENDING_NEWS,
  type SavedArticlesAction,
} from "../action/savedArticleAction";

import type { NYTArticle } from "../../types/article";

export interface SavedArticlesState {
  topStories: NYTArticle[];
  trending: NYTArticle[];
  timesWire: NYTArticle[];
}

const initialState: SavedArticlesState = {
  topStories: [],
  trending: [],
  timesWire: [],
};

const savedArticlesReducer = (
  state = initialState,
  action: SavedArticlesAction,
): SavedArticlesState => {
  switch (action.type) {
    case SET_SAVED_TOP_STORIES:
      return { ...state, topStories: action.payload };
    case SET_SAVED_TRENDING_NEWS:
      return { ...state, trending: action.payload };
    case SET_SAVED_TIMES_WIRE_NEWS:
      return { ...state, timesWire: action.payload };
    default:
      return state;
  }
};

export default savedArticlesReducer;
