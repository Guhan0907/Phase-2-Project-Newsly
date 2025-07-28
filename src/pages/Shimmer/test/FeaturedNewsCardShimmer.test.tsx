import { render, screen } from "@testing-library/react";
import FeaturedNewsCardShimmer from "../FeaturedNewsCardShimmer";
import { describe, it, expect, vi } from "vitest";

// Optional: mock useMediaQuery
vi.mock("@mui/material/useMediaQuery", () => ({
  __esModule: true,
  default: () => false, // Desktop by default
}));

describe("FeaturedNewsCardShimmer", () => {
  it("renders shimmer skeletons for featured card", () => {
    render(<FeaturedNewsCardShimmer />);

    expect(screen.getByTestId("featured-shimmer-card")).toBeInTheDocument();

    expect(screen.getByTestId("skeleton-featured-image")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-featured-title")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-featured-desc-1")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-featured-desc-2")).toBeInTheDocument();
  });
});
