import { describe, it, expect } from "vitest";
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  CLEAR_FAVORITES,
} from "../../../redux/action/favouritesAction";
import { favouritesReducer } from "../favouritesReducer";

describe("favouritesReducer", () => {
  it("should return initial state by default", () => {
    const newState = favouritesReducer(undefined, { type: "UNKNOWN" } as any);
    expect(newState).toEqual([]);
  });

  it("should handle ADD_TO_FAVORITES", () => {
    const action: any = { type: ADD_TO_FAVORITES, payload: "123" };
    const newState = favouritesReducer([], action);
    expect(newState).toEqual(["123"]);
  });

  it("should handle REMOVE_FROM_FAVORITES", () => {
    const initialState = ["123", "456"];
    const action: any = { type: REMOVE_FROM_FAVORITES, payload: "123" };
    const newState = favouritesReducer(initialState, action);
    expect(newState).toEqual(["456"]);
  });

  it("should handle CLEAR_FAVORITES", () => {
    const initialState = ["123", "456"];
    const action: any = { type: CLEAR_FAVORITES };
    const newState = favouritesReducer(initialState, action);
    expect(newState).toEqual([]);
  });
});
