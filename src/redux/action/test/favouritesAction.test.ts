import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  CLEAR_FAVORITES,
  addToFavourites,
  removeFromFavourites,
  clearFavourites,
} from "../../../redux/action/favouritesAction"; // Adjust path as necessary

import { describe, it, expect } from "vitest";

describe("favouritesAction", () => {
  it("should create an action to add to favourites", () => {
    const id = "123";
    const expectedAction = {
      type: ADD_TO_FAVORITES,
      payload: id,
    };
    expect(addToFavourites(id)).toEqual(expectedAction);
  });

  it("should create an action to remove from favourites", () => {
    const id = "123";
    const expectedAction = {
      type: REMOVE_FROM_FAVORITES,
      payload: id,
    };
    expect(removeFromFavourites(id)).toEqual(expectedAction);
  });

  it("should create an action to clear favourites", () => {
    const expectedAction = {
      type: CLEAR_FAVORITES,
    };
    expect(clearFavourites()).toEqual(expectedAction);
  });
});
