import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { vi } from "vitest";

// Mock useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(), // <-- create a mock function
  };
});

describe("ErrorPage", () => {
  const mockedNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as vi.Mock).mockReturnValue(mockedNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders error message and icon", () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /oops! something went wrong/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/we're currently unable to fetch the latest news/i),
    ).toBeInTheDocument();

    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("navigates back to homepage on button click", () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", { name: /back to homepage/i });
    fireEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });
});
