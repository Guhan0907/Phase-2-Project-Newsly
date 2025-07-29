

import {
  SET_SAVED_TOP_STORIES,
  SET_SAVED_TRENDING_NEWS,
  type SavedArticlesAction,
} from "../action/savedArticleAction";

import type { NYTArticle } from "../../types/article";

export interface SavedArticlesState {
  topStories: NYTArticle[];
  trending: NYTArticle[];
}

const initialState: SavedArticlesState = {
  topStories: [],
  trending: [],
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
    default:
      return state;
  }
};

export default savedArticlesReducer;
