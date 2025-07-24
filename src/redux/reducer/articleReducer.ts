import type { ArticlesAction } from "../action/articlesAction";
import type { ArticlesState } from "../type";
const initialState: ArticlesState = {
  featured: null,
  topStories: [],
  filtered: [],
  query: "",
  loading: false,
  error: null,
  isSearchMode: false,
};

const articlesReducer = (
  state = initialState,
  action: ArticlesAction,
): ArticlesState => {
  switch (action.type) {
    case "FETCH_ARTICLES_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_ARTICLES_SUCCESS":
      return {
        ...state,
        loading: false,
        topStories: action.payload,
        filtered: action.payload,
      };

    case "FETCH_FEATURED_SUCCESS":
      return {
        ...state,
        featured: action.payload,
      };

    case "FETCH_ARTICLES_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "SET_QUERY":
      const query = action.payload.toLowerCase();
      const filtered = state.topStories.filter((article) =>
        article.title?.toLowerCase().includes(query),
      );
      return {
        ...state,
        query,
        filtered,
      };

    case "SET_SEARCH_MODE":
      return {
        ...state,
        isSearchMode: action.payload,
      };

    default:
      return state;
  }
};

export default articlesReducer;
