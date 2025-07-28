import { render, screen, fireEvent } from "@testing-library/react";
import FeaturedNewsCard from "../FeaturedNewsCard";
import type { NYTArticle } from "../../types/article";
import { vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual: any = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockNavigate = vi.fn();
(useNavigate as any).mockImplementation(() => mockNavigate);

const sampleArticle: NYTArticle = {
  title: "Test Featured Article",
  byline: "By Author",
  published_date: new Date().toISOString(),
  section: "Tech",
  subsection: "",
  abstract: "This is a featured article for testing.",
  url: "https://example.com/featured",
  multimedia: [
    {
      url: "https://example.com/image.jpg",
      format: "Standard Thumbnail",
      height: 75,
      width: 75,
      type: "image",
      subtype: "photo",
      caption: "Image caption",
      //   copyright: "Copyright Info",
    },
  ],
  des_facet: [],
  isRead: false,
};

describe("FeaturedNewsCard", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders title and abstract correctly", () => {
    render(
      <MemoryRouter>
        <FeaturedNewsCard article={sampleArticle} index={3} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Featured Article")).toBeInTheDocument();
    expect(
      screen.getByText("This is a featured article for testing."),
    ).toBeInTheDocument();
  });

  it("renders the image when provided", () => {
    render(
      <MemoryRouter>
        <FeaturedNewsCard article={sampleArticle} index={0} />
      </MemoryRouter>,
    );

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(image).toHaveAttribute("alt", "Test Featured Article");
  });

  it("navigates to article detail page when clicked", () => {
    render(
      <MemoryRouter>
        <FeaturedNewsCard article={sampleArticle} index={2} />
      </MemoryRouter>,
    );

    const card = screen.getByText("Test Featured Article");
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith("/article/2", {
      state: { article: sampleArticle },
    });
  });
});
