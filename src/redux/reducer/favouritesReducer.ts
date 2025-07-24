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

// import {
//   ADD_TO_FAVORITES,
//   REMOVE_FROM_FAVORITES,
//   SET_FAVORITES,
//   CLEAR_FAVORITES,
//   type FavouritesAction,
// } from "../action/favouritesAction";

// const initialState: string[] = [];

// export const favouritesReducer = (
//   state = initialState,
//   action: FavouritesAction
// ): string[] => {
//   switch (action.type) {
//     case ADD_TO_FAVORITES:
//       return state.includes(action.payload)
//         ? state
//         : [...state, action.payload];
//     case REMOVE_FROM_FAVORITES:
//       return state.filter((id) => id !== action.payload);
//     case SET_FAVORITES:
//       return action.payload;
//     case CLEAR_FAVORITES:
//       return [];
//     default:
//       return state;
//   }
// };
