import { render, screen } from "@testing-library/react";
import ArticleDetailHeading from "../ArticleDetailHeading";
import { vi } from "vitest";
import type { NYTArticle } from "../../../types/article";

vi.mock("@mui/material", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import("@mui/material");
  return {
    ...actual,
    useMediaQuery: () => false,
  };
});

describe("ArticleDetailHeading Component", () => {
  const mockArticle: NYTArticle = {
    title: "Sample Article Title",
    byline: "By John Doe",
    published_date: "2024-07-25T10:30:00Z",
    section: "Technology",
    subsection: "AI",
    abstract: "",
    url: "https://example.com",
    multimedia: [],
    isRead: false,
  };

  it("renders the title", () => {
    render(<ArticleDetailHeading article={mockArticle} />);
    expect(screen.getByText("Sample Article Title")).toBeInTheDocument();
  });

  it("renders the byline", () => {
    render(<ArticleDetailHeading article={mockArticle} />);
    expect(screen.getByText("By John Doe")).toBeInTheDocument();
  });

  it("renders the formatted date and time", () => {
    render(<ArticleDetailHeading article={mockArticle} />);
    expect(screen.getByText(/July 25, 2024 -/)).toBeInTheDocument();

  });

  it.skip("renders section and subsection chips", () => {
    render(<ArticleDetailHeading article={mockArticle} />);
    expect(screen.getByText("Technology")).toBeInTheDocument();
    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("does not render subsection if not present", () => {
    const articleWithoutSub = { ...mockArticle, subsection: "" };
    render(<ArticleDetailHeading article={articleWithoutSub} />);
    expect(screen.queryByText("AI")).not.toBeInTheDocument();
  });

  it("renders Divider", () => {
    render(<ArticleDetailHeading article={mockArticle} />);
    const divider = screen.getByRole("separator");
    expect(divider).toBeInTheDocument();
  });
});
