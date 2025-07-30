import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import ContactUs from "../ContactUs";

vi.mock("../../assets/contactus.jpeg", () => ({
  default: "mocked-contact-img.jpg",
}));

// Mock scrollTo to prevent errors in test environment
window.scrollTo = vi.fn();

// Optional: Spy on navigate to test back button
vi.mock("react-router-dom", async () => {
  const actual: any = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("ContactUs Component", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as unknown as vi.Mock).mockReturnValue(navigateMock);
  });

  it("renders contact image, headings and paragraphs", () => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("img", { name: /contact newsly/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /we're still building this newsroom/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /thank you for your interest in reaching out/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(/sit tight — our editorial team/i)
    ).toBeInTheDocument();
  });

  it("calls navigate(-1) when 'Back to News' button is clicked", () => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>
    );

    const backButton = screen.getByRole("button", { name: /back to news/i });
    backButton.click();

    expect(navigateMock).toHaveBeenCalledWith(-1);
  });
});
