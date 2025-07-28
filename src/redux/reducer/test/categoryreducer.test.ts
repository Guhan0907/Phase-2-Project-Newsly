import { describe, it, expect } from "vitest";
import { categoryReducer } from "../categoryReducer"; // adjust path as needed
import { SET_CATEGORY_FROM_FOOTER } from "../../../redux/action/categoryAction";

describe("categoryReducer", () => {
  const initialState = {
    selectedCategory: "",
  };

  it("should return initial state by default", () => {
    const action = { type: "UNKNOWN_ACTION" };
    const newState = categoryReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  it("should handle SET_CATEGORY_FROM_FOOTER", () => {
    const action = {
      type: SET_CATEGORY_FROM_FOOTER,
      payload: "Technology",
    };
    const newState = categoryReducer(initialState, action);
    expect(newState.selectedCategory).toBe("Technology");
  });
});
