import { describe, it, expect } from "vitest";
import userReducer, { type UserState } from "../userReducer";
import {
  SET_USER,
  LOGOUT_USER,
  type User,
} from "../../../redux/action/userAction";

describe("userReducer", () => {
  const mockUser: User = {
    name: "Guhan",
    email: "guhan@example.com",
    imageUrl: "https://example.com/image.jpg",
  };

  it("should return initial state by default", () => {
    const newState = userReducer(undefined, { type: "UNKNOWN" } as any);
    expect(newState).toEqual({ user: null });
  });

  it("should handle SET_USER", () => {
    const action = { type: SET_USER, payload: mockUser };
    const newState = userReducer(undefined, action);
    expect(newState).toEqual({ user: mockUser });
  });

  it("should handle LOGOUT_USER", () => {
    const loggedInState: UserState = { user: mockUser };
    const action = { type: LOGOUT_USER };
    const newState = userReducer(loggedInState, action);
    expect(newState).toEqual({ user: null });
  });
});
