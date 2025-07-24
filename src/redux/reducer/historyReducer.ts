import {
  ADD_TO_HISTORY,
  CLEAR_HISTORY,
  type HistoryAction,
} from "../action/historyActions";

const initialState: string[] = [];

const historyReducer = (
  state = initialState,
  action: HistoryAction, // accept both actions
): string[] => {
  switch (action.type) {
    case ADD_TO_HISTORY:
      if (state.includes(action.payload)) return state;
      return [action.payload, ...state.slice(0, 19)];

    case CLEAR_HISTORY:
      return [];

    default:
      return state;
  }
};

export default historyReducer;
