import type { historyState } from "../type";
import { ADD_TO_HISTORY, CLEAR_HISTORY } from "../action/historyActions";

const initialState: historyState = {
  history: [],
};

const historyReducer = (state = initialState, action: any): historyState => {
  switch (action.type) {
    case ADD_TO_HISTORY:
      const filtered = state.history.filter((id) => id !== action.payload);
      return {
        ...state,
        // history: [action.payload, ...filtered].slice(0,20) // limited for the last 20 views
        history: [action.payload, ...filtered],
      };

    case CLEAR_HISTORY:
      return {
        history: [],
      };

    default:
      return state;
  }
};

export default historyReducer;

// import type { HistoryEntry, historyState} from "../type";
// import { ADD_TO_HISTORY, CLEAR_HISTORY } from "../action/historyActions";

// const initialState: historyState = {
//   history: [],
// };

// const historyReducer = (
//   state = initialState,
//   action: { type: string; payload: HistoryEntry }
// ): historyState => {
//   switch (action.type) {
//     case ADD_TO_HISTORY:
//       const filtered = state.history.filter(
//         (entry) => entry.articleId !== action.payload.articleId
//       );
//       return {
//         ...state,
//         history: [action.payload, ...filtered].slice(0, 20),
//       };

//     case CLEAR_HISTORY:
//       return {
//         history: [],
//       };

//     default:
//       return state;
//   }
// };

// export default historyReducer;
