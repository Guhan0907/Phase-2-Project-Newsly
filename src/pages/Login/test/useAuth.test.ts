import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAuth } from "../useAuth";
import { setUser } from "../../../redux/action/userAction";

// 👇 Create a mock dispatch
const mockDispatch = vi.fn();

// ✅ Mock react-redux useDispatch to always return our mockDispatch
vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

describe("useAuth", () => {
  beforeEach(() => {
    // 👇 Clear previous mock call history before each test
    mockDispatch.mockClear();
  });

  it("dispatches setUser with full data", () => {
    const { result } = renderHook(() => useAuth());

    result.current.login({
      name: "Guhan",
      email: "guhan@example.com",
      picture: "https://example.com/image.jpg",
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setUser({
        name: "Guhan",
        email: "guhan@example.com",
        password: "",
        imageUrl: "https://example.com/image.jpg",
      }),
    );
  });

  it("uses fallback image when picture is not provided", () => {
    const { result } = renderHook(() => useAuth());

    result.current.login({
      name: "Guhan",
      email: "guhan@example.com",
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setUser({
        name: "Guhan",
        email: "guhan@example.com",
        password: "",
        imageUrl: "/assets/default-user.png",
      }),
    );
  });
});
