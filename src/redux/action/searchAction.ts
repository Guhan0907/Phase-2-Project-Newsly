export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";

// for the typescript
export interface searchQueryAction {
  type: typeof SET_SEARCH_QUERY;
  payload: string;
}

export const setSearchQuery = (query: string): searchQueryAction => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});
