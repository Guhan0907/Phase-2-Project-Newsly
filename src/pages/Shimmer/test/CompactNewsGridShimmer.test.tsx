import { render, screen } from "@testing-library/react";
import CompactNewsGridShimmer from "../CompactNewsGridShimmer";
import { describe, it, expect, vi } from "vitest";

// Optional: mock useMediaQuery if needed
vi.mock("@mui/material/useMediaQuery", () => ({
  __esModule: true,
  default: () => false, // Simulate desktop view
}));

describe("CompactNewsGridShimmer", () => {
  it("renders a shimmer grid with 6 cards", () => {
    render(<CompactNewsGridShimmer />);

    // Grid container
    expect(screen.getByTestId("shimmer-grid")).toBeInTheDocument();

    // 6 shimmer cards
    const cards = screen.getAllByTestId("shimmer-card");
    expect(cards).toHaveLength(6);

    // Image skeletons
    expect(screen.getByTestId("skeleton-image-0")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-image-5")).toBeInTheDocument();

    // Title skeletons
    expect(screen.getByTestId("skeleton-title-0")).toBeInTheDocument();

    // Subtitle skeletons
    expect(screen.getByTestId("skeleton-subtitle-0")).toBeInTheDocument();
  });
});
