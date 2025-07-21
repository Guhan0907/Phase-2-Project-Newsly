export interface SearchState {
    query : string
};

export interface RootState {
    searchReducer : SearchState
}