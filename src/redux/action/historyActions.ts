// actions/historyAction.ts

export const ADD_TO_HISTORY = "ADD_TO_HISTORY";

export interface AddToHistoryAction {
  type: typeof ADD_TO_HISTORY;
  payload: string; // URL of the article
}

export const addToHistory = (url: string): AddToHistoryAction => ({
  type: ADD_TO_HISTORY,
  payload: url,
});
