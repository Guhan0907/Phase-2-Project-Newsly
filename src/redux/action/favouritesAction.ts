export const ADD_TO_FAVORITES = "FAVORITES_ADD";
export const REMOVE_FROM_FAVORITES = "FAVORITES_REMOVE";

// typescript
export interface AddToFavoritesAction {
  type: typeof ADD_TO_FAVORITES;
  payload: string;
}
export interface RemoveFromFavoritesAction {
  type: typeof REMOVE_FROM_FAVORITES;
  payload: string;
}

// actions
export const addToFavourites = (id: string): AddToFavoritesAction => ({
  type: ADD_TO_FAVORITES,
  payload: id,
});

export const removeFromFavourites = (
  id: string,
): RemoveFromFavoritesAction => ({
  type: REMOVE_FROM_FAVORITES,
  payload: id,
});
