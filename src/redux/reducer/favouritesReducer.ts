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
      return [];
    default:
      return state;
  }
};
