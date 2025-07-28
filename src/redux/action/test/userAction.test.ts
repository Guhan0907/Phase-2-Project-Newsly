import {
  SET_USER,
  LOGOUT_USER,
  setUser,
  logoutUser,
  type User,
} from "../../../redux/action/userAction"; // Adjust path if needed

import { describe, it, expect } from "vitest";

describe("userAction", () => {
  it("should create an action to set user", () => {
    const mockUser: User = {
      name: "John Doe",
      email: "john@example.com",
      imageUrl: "http://example.com/image.jpg",
    };

    const expectedAction = {
      type: SET_USER,
      payload: mockUser,
    };

    expect(setUser(mockUser)).toEqual(expectedAction);
  });

  it("should create an action to logout user", () => {
    const expectedAction = {
      type: LOGOUT_USER,
    };

    expect(logoutUser()).toEqual(expectedAction);
  });
});
