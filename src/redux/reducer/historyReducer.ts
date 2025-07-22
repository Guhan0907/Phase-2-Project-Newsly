import type { AnyAction } from "redux";
import { ADD_TO_HISTORY, type AddToHistoryAction } from "../action/historyActions";

const initialState: string[] = [];

const historyReducer = (state = initialState, action: AddToHistoryAction): string[] => {
  switch (action.type) {
    case ADD_TO_HISTORY:
      if (state.includes(action.payload)) return state;
      return [action.payload, ...state.slice(0, 19)]; // Keep only last 20
    default:
      return state;
  }
};

export default historyReducer;
