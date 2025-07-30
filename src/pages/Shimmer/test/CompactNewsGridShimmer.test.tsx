import { render, screen } from "@testing-library/react";
import CompactNewsGridShimmer from "../CompactNewsGridShimmer";
import { describe, it, expect, vi } from "vitest";

vi.mock("@mui/material/useMediaQuery", () => ({
  __esModule: true,
  default: () => false,
}));

describe("CompactNewsGridShimmer", () => {
  it("renders a shimmer grid with 6 cards", () => {
    render(<CompactNewsGridShimmer />);

    expect(screen.getByTestId("shimmer-grid")).toBeInTheDocument();

    const cards = screen.getAllByTestId("shimmer-card");
    expect(cards).toHaveLength(6);

    expect(screen.getByTestId("skeleton-image-0")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-image-5")).toBeInTheDocument();

    expect(screen.getByTestId("skeleton-title-0")).toBeInTheDocument();

    expect(screen.getByTestId("skeleton-subtitle-0")).toBeInTheDocument();
  });
});
