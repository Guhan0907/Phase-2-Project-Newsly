import { render, screen, fireEvent } from "@testing-library/react";
import ContactUs from "../ContactUs";
import { vi } from "vitest";

// Mock scrollTo and history.back globally
beforeAll(() => {
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  vi.spyOn(window.history, "back").mockImplementation(() => {});
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("ContactUs Component", () => {
  it("renders heading and image", () => {
    render(<ContactUs />);

    expect(
      screen.getByRole("heading", {
        name: /we're still building this newsroom/i,
      }),
    ).toBeInTheDocument();

    const image = screen.getByAltText(/contact newsly/i) as HTMLImageElement;
    expect(image).toBeInTheDocument();

    // Check if the src ends with the actual filename used in the component
    expect(image.src).toContain("contactus.jpeg");
  });

  it("renders description texts", () => {
    render(<ContactUs />);

    expect(
      screen.getByText(/our contact desk is currently under development/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/sit tight — our editorial team will be in touch soon/i),
    ).toBeInTheDocument();
  });

  it("calls history.back when Back to News button is clicked", () => {
    render(<ContactUs />);

    const button = screen.getByRole("button", { name: /back to news/i });
    fireEvent.click(button);

    expect(window.history.back).toHaveBeenCalledTimes(1);
  });

  it("scrolls to top on mount", () => {
    render(<ContactUs />);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "instant",
    });
  });
});
