export const ADD_TO_HISTORY = "ADD_TO_HISTORY";
export const CLEAR_HISTORY = "CLEAR_HISTORY";

export interface AddToHistoryAction {
  type: typeof ADD_TO_HISTORY;
  payload: string; // URL of the article
}

export interface ClearHistoryAction {
  type: typeof CLEAR_HISTORY;
}

// ActionCreators

export const addToHistory = (url: string): AddToHistoryAction => ({
  type: ADD_TO_HISTORY,
  payload: url,
});

export const clearHistory = (): ClearHistoryAction => ({
  type: CLEAR_HISTORY,
});

export type HistoryAction = AddToHistoryAction | ClearHistoryAction;
