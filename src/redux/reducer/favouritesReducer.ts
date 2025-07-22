// // redux/reducers/favoritesReducer.ts
// import { type AnyAction } from "redux";

// const initialState: string[] = [];

// export const favoritesReducer = (state = initialState, action: AnyAction) => {
//   switch (action.type) {
//     case "FAVORITES/ADD":
//       return [...new Set([...state, action.payload])]; // avoid duplicates
//     case "FAVORITES/REMOVE":
//       return state.filter(id => id !== action.payload);
//     default:
//       return state;
//   }
// };

import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  type AddToFavoritesAction,
  type RemoveFromFavoritesAction,
} from "../action/favouritesAction";

type FavouritesAction = AddToFavoritesAction | RemoveFromFavoritesAction;

export const favouritesReducer = (
  state: string[] = [],
  action: FavouritesAction,
): string[] => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return [...state, action.payload];
    case REMOVE_FROM_FAVORITES:
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
};

// export default favouritesReducer;
