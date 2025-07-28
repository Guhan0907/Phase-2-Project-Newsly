import { render, screen } from "@testing-library/react";
import AllItemsCardShimmer from "../AllItemCardShimmer";
import { describe, it, expect } from "vitest";

describe("AllItemsCardShimmer", () => {
  it("renders all shimmer skeletons and disabled favorite icon", () => {
    render(<AllItemsCardShimmer />);

    expect(screen.getByTestId("skeleton-image")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-title")).toBeInTheDocument();
    expect(
      screen.getByTestId("skeleton-description-line-1"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("skeleton-description-line-2"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-meta-line-1")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-meta-line-2")).toBeInTheDocument();
    expect(screen.getByTestId("disabled-fav-icon")).toBeDisabled();
  });
});
