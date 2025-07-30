import { render, screen } from "@testing-library/react";
import PageNotFound from "./PageNotFound";
import { describe, it, vi, expect } from "vitest";

vi.mock("../../assets/Edited_404.png", () => ({
  default: "mocked-image.png",
}));

describe("PageNotFound Component", () => {
  it("renders 404 image and text correctly", () => {
    render(<PageNotFound />);

    const image = screen.getByAltText(
      "404 - Page Not Found",
    ) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("mocked-image.png");

    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText("The page you're looking for doesn't exist."),
    ).toBeInTheDocument();
  });

  it("scrolls to top on mount", () => {
    const scrollSpy = vi.spyOn(window, "scrollTo");
    render(<PageNotFound />);

    expect(scrollSpy).toHaveBeenCalledWith({ top: 20, behavior: "instant" });
  });
});
