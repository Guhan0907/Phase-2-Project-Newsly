import {
  ADD_TO_HISTORY,
  CLEAR_HISTORY,
  addToHistory,
  clearHistory,
} from "../historyActions";

import { describe, it, expect } from "vitest";

describe("historyAction", () => {
  it("should create an action to add a URL to history", () => {
    const url = "https://www.example.com/article123";

    const expectedAction = {
      type: ADD_TO_HISTORY,
      payload: url,
    };

    expect(addToHistory(url)).toEqual(expectedAction);
  });

  it("should create an action to clear the history", () => {
    const expectedAction = {
      type: CLEAR_HISTORY,
    };

    expect(clearHistory()).toEqual(expectedAction);
  });
});
