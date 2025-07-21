export interface ArticlesState {
  list: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  list: [],
  loading: false,
  error: null,
};

const articlesReducer = (state = initialState, action: any): ArticlesState => {
  switch (action.type) {
    case "FETCH_ARTICLES_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_ARTICLES_SUCCESS":
      return { ...state, loading: false, list: action.payload };
    case "FETCH_ARTICLES_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default articlesReducer;
