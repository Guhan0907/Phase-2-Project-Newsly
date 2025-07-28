// // PageNotFound.test.tsx
// import { render, screen } from "@testing-library/react";
// import PageNotFound from "./PageNotFound";
// import { describe, it, vi, expect } from "vitest";

// // Mock image
// vi.mock("../../assets/Edited_404.png", () => "mocked-image.png");

// describe("PageNotFound Component", () => {
//   it("renders 404 image and text correctly", () => {
//     render(<PageNotFound />);

//     // Assert image is shown with alt text
//     const image = screen.getByAltText("404 - Page Not Found") as HTMLImageElement;
//     expect(image).toBeInTheDocument();
//     expect(image.src).toContain("mocked-image.png");

//     // Assert heading and body text
//     expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
//     expect(
//       screen.getByText("The page you're looking for doesn't exist.")
//     ).toBeInTheDocument();
//   });

//   it("scrolls to top on mount", () => {
//     const scrollSpy = vi.spyOn(window, "scrollTo");
//     render(<PageNotFound />);

//     expect(scrollSpy).toHaveBeenCalledWith({ top: 20, behavior: "instant" });
//   });
// });

// src/pages/PageNotFound/PageNotFound.test.tsx

import { render, screen } from "@testing-library/react";
import PageNotFound from "./PageNotFound";
import { describe, it, vi, expect } from "vitest";

vi.mock("../../assets/Edited_404.png", () => ({
  default: "mocked-image.png",
}));

describe("PageNotFound Component", () => {
  it("renders 404 image and text correctly", () => {
    render(<PageNotFound />);

    // Assert image with alt text
    const image = screen.getByAltText(
      "404 - Page Not Found",
    ) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("mocked-image.png");

    // Assert heading and description
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
