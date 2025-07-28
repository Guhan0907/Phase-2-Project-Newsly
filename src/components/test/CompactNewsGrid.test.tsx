import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import CompactNewsGrid from "../CompactNewsGrid";
import type { NYTArticle } from "../../types/article";
import { vi } from "vitest";

vi.mock("react-router-dom", async () => {
  const actual: any = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockNavigate = vi.fn();
(useNavigate as any).mockImplementation(() => mockNavigate);

const sampleArticles: NYTArticle[] = [
  {
    title: "Breaking News 1",
    byline: "By A",
    published_date: new Date().toISOString(),
    section: "World",
    subsection: "",
    abstract: "Summary 1",
    url: "https://example.com/news1",
    multimedia: [
      {
        url: "https://image1.jpg",
        format: "Standard Thumbnail",
        height: 75,
        width: 75,
        type: "image",
        subtype: "photo",
        caption: "Image 1",
        // copyright: "NYT",
      },
    ],
    des_facet: [],
    isRead: false,
  },
  {
    title: "Breaking News 2",
    byline: "By B",
    published_date: new Date().toISOString(),
    section: "Politics",
    subsection: "",
    abstract: "Summary 2",
    url: "https://example.com/news2",
    multimedia: [],
    des_facet: [],
    isRead: true,
  },
];

describe("CompactNewsGrid", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders all articles", () => {
    render(
      <MemoryRouter>
        <CompactNewsGrid articles={sampleArticles} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Breaking News 1")).toBeInTheDocument();
    expect(screen.getByText("Breaking News 2")).toBeInTheDocument();
    expect(screen.getByText("Summary 1")).toBeInTheDocument();
    expect(screen.getByText("Summary 2")).toBeInTheDocument();
  });

  it("displays 'Read' chip for read articles", () => {
    render(
      <MemoryRouter>
        <CompactNewsGrid articles={sampleArticles} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Read")).toBeInTheDocument();
  });

  it("navigates to article detail on card click", () => {
    render(
      <MemoryRouter>
        <CompactNewsGrid articles={sampleArticles} />
      </MemoryRouter>,
    );

    const firstCard = screen.getByText("Breaking News 1");
    fireEvent.click(firstCard);

    expect(mockNavigate).toHaveBeenCalledWith("/article/0", {
      state: { article: sampleArticles[0] },
    });
  });
});
