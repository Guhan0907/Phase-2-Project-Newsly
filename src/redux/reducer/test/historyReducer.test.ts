import { describe, it, expect } from "vitest";
import {
  ADD_TO_HISTORY,
  CLEAR_HISTORY,
} from "../../../redux/action/historyActions";
import historyReducer from "../historyReducer";

describe("historyReducer", () => {
  it("should return initial state by default", () => {
    const newState = historyReducer(undefined, { type: "UNKNOWN" } as any);
    expect(newState).toEqual([]);
  });

  it("should handle ADD_TO_HISTORY (new item)", () => {
    const action: any = {
      type: ADD_TO_HISTORY,
      payload: "https://nytimes.com/article-1",
    };
    const newState = historyReducer([], action);
    expect(newState).toEqual(["https://nytimes.com/article-1"]);
  });

  it("should not add duplicates", () => {
    const state = ["https://nytimes.com/article-1"];
    const action: any = {
      type: ADD_TO_HISTORY,
      payload: "https://nytimes.com/article-1",
    };
    const newState = historyReducer(state, action);
    expect(newState).toEqual(state);
  });

  it("should maintain max 20 items", () => {
    const longState = Array.from({ length: 20 }, (_, i) => `item-${i}`);
    const action: any = { type: ADD_TO_HISTORY, payload: "new-item" };
    const newState = historyReducer(longState, action);
    expect(newState.length).toBe(20);
    expect(newState).toContain("new-item");
    expect(newState).not.toContain("item-19"); // last item dropped
  });

  it("should handle CLEAR_HISTORY", () => {
    const initialState = ["item-1", "item-2"];
    const action: any = { type: CLEAR_HISTORY };
    const newState = historyReducer(initialState, action);
    expect(newState).toEqual([]);
  });
});
