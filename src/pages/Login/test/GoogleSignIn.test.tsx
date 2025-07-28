import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import GoogleSignIn from "../GoogleSignIn";

const mockLogin = vi.fn();

vi.mock("../useAuth", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

// Mock google.accounts.id
const initializeMock = vi.fn();
const renderButtonMock = vi.fn();

beforeEach(() => {
  mockLogin.mockClear();
  initializeMock.mockClear();
  renderButtonMock.mockClear();

  window.google = {
    accounts: {
      id: {
        initialize: initializeMock,
        renderButton: renderButtonMock,
      },
    },
  };
});

afterEach(() => {
  delete window.google;
  document.body.innerHTML = ""; // Clean up DOM
});

describe("GoogleSignIn Component", () => {
  it("injects the Google script and initializes the button", async () => {
    render(<GoogleSignIn />);

    const script = document.querySelector(
      "script[src='https://accounts.google.com/gsi/client']",
    ) as HTMLScriptElement;

    // Simulate script loading
    script.onload?.({} as any);

    await waitFor(() => {
      expect(initializeMock).toHaveBeenCalled();
      expect(renderButtonMock).toHaveBeenCalled();
    });
  });

  it("calls login with parsed user when credential is received", async () => {
    render(<GoogleSignIn />);

    const script = document.querySelector(
      "script[src='https://accounts.google.com/gsi/client']",
    ) as HTMLScriptElement;
    script.onload?.({} as any);

    const sampleUser = {
      name: "Guhan",
      email: "guhan@example.com",
      picture: "https://example.com/pic.jpg",
    };

    const base64Payload = btoa(JSON.stringify(sampleUser));
    const fakeJWT = `header.${base64Payload}.signature`;

    const callback = initializeMock.mock.calls[0][0].callback;
    callback({ credential: fakeJWT });

    expect(mockLogin).toHaveBeenCalledWith(sampleUser);
  });

  it("renders the google-signin div", () => {
    render(<GoogleSignIn />);
    expect(document.getElementById("google-signin")).toBeInTheDocument();
  });
});
