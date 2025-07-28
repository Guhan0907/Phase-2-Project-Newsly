// src/components/ErrorBoundary/ErrorBoundary.test.tsx
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";
import { describe, it, vi, expect } from "vitest";

// A component that throws an error for testing
const ProblemChild = () => {
  throw new Error("Test error from child");
};

describe("ErrorBoundary", () => {
  it("renders children without error", () => {
    render(
      <ErrorBoundary>
        <div>Child component</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Child component")).toBeInTheDocument();
  });

  it("catches errors and displays fallback UI", () => {
    // Suppress expected error logs from showing in test output
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );

    // Assert fallback UI is shown
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    expect(screen.getByText(/Test error from child/i)).toBeInTheDocument();

    consoleError.mockRestore();
  });
});
