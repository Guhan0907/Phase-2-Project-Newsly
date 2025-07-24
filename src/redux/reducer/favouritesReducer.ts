// import {
//   ADD_TO_FAVORITES,
//   REMOVE_FROM_FAVORITES,
//   type AddToFavoritesAction,
//   type RemoveFromFavoritesAction,
// } from "../action/favouritesAction";

// type FavouritesAction = AddToFavoritesAction | RemoveFromFavoritesAction;

// export const favouritesReducer = (
//   state: string[] = [],
//   action: FavouritesAction,
// ): string[] => {
//   switch (action.type) {
//     case ADD_TO_FAVORITES:
//       return [...state, action.payload];
//     case REMOVE_FROM_FAVORITES:
//       return state.filter((id) => id !== action.payload);
//     default:
//       return state;
//   }
// };

// favouritesReducer.ts

import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  CLEAR_FAVORITES,
  type FavouritesAction,
} from "../action/favouritesAction";

export const favouritesReducer = (
  state: string[] = [],
  action: FavouritesAction,
): string[] => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return [...state, action.payload];
    case REMOVE_FROM_FAVORITES:
      return state.filter((id) => id !== action.payload);
    case CLEAR_FAVORITES:
      return []; // Clears the array
    default:
      return state;
  }
};
