export const ADD_TO_HISTORY = "ADD_TO_HISTORY";
export const CLEAR_HISTORY = "CLEAR_HISTORY";

// typescript

// export interface HistoryEntry {
//     articleId: string;
//     source: "top" | "wire" | "trending";
// }

export interface AddToHistoryAction {
    type : typeof ADD_TO_HISTORY;
    payload: string;
}

export interface ClearHistoryAction {
    type: typeof CLEAR_HISTORY;
}

// functions

export const addToHistory = (articleId : string): AddToHistoryAction => ({
    type : ADD_TO_HISTORY,
    payload: articleId ,
})

export const clearHistory = (): ClearHistoryAction => ({
    type: CLEAR_HISTORY,
})
