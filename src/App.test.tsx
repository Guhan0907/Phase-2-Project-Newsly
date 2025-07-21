import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App Component", () => {
  it("renders the Vite and React logos", () => {
    render(<App />);
    expect(screen.getByAltText("Vite logo")).toBeInTheDocument();
    expect(screen.getByAltText("React logo")).toBeInTheDocument();
  });

  it("renders initial count and increments on click", () => {
    render(<App />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("count is 0");

    fireEvent.click(button);
    expect(button).toHaveTextContent("count is 1");
  });

  it("renders instructional text", () => {
    render(<App />);

    // expect(screen.getByText('Edit src/App.tsx and save to test HMR')).toBeInTheDocument()q
    expect(
      screen.getByText(/Click on the Vite and React logos/),
    ).toBeInTheDocument();
  });
});
