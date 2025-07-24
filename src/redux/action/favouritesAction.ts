// export const ADD_TO_FAVORITES = "FAVORITES_ADD";
// export const REMOVE_FROM_FAVORITES = "FAVORITES_REMOVE";

// // typescript
// export interface AddToFavoritesAction {
//   type: typeof ADD_TO_FAVORITES;
//   payload: string;
// }
// export interface RemoveFromFavoritesAction {
//   type: typeof REMOVE_FROM_FAVORITES;
//   payload: string;
// }

// // actions
// export const addToFavourites = (id: string): AddToFavoritesAction => ({
//   type: ADD_TO_FAVORITES,
//   payload: id,
// });

// export const removeFromFavourites = (
//   id: string,
// ): RemoveFromFavoritesAction => ({
//   type: REMOVE_FROM_FAVORITES,
//   payload: id,
// });
// export type FavouritesAction = AddToFavoritesAction | RemoveFromFavoritesAction;

// favouritesAction.ts

export const ADD_TO_FAVORITES = "FAVORITES_ADD";
export const REMOVE_FROM_FAVORITES = "FAVORITES_REMOVE";
export const CLEAR_FAVORITES = "FAVORITES_CLEAR";

export interface AddToFavoritesAction {
  type: typeof ADD_TO_FAVORITES;
  payload: string;
}

export interface RemoveFromFavoritesAction {
  type: typeof REMOVE_FROM_FAVORITES;
  payload: string;
}

export interface ClearFavoritesAction {
  type: typeof CLEAR_FAVORITES;
}

export type FavouritesAction =
  | AddToFavoritesAction
  | RemoveFromFavoritesAction
  | ClearFavoritesAction;

//  Action creators
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

export const clearFavourites = (): ClearFavoritesAction => ({
  type: CLEAR_FAVORITES,
});
