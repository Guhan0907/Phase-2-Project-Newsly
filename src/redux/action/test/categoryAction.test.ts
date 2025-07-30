import { describe, it, expect } from "vitest";
import {
  SET_CATEGORY_FROM_FOOTER,
  setCategoryFromFooter,
} from "../../../redux/action/categoryAction";

describe("categoryAction", () => {
  it("should create SET_CATEGORY_FROM_FOOTER action", () => {
    const category = "technology";
    const expectedAction = {
      type: SET_CATEGORY_FROM_FOOTER,
      payload: category,
    };

    expect(setCategoryFromFooter(category)).toEqual(expectedAction);
  });
});
