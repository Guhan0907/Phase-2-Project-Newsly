import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchArticles } from "../searchAction";
import { fetchArticlesSuccess } from "../articlesAction";
import { searchArticlesByQuery } from "../../../services/apiCalls";
import type { NYTArticle } from "../../../types/article";

import type { Dispatch } from "redux";

// Mock the full module first
vi.mock("../../../services/apiCalls", () => ({
  searchArticlesByQuery: vi.fn(), // important: mock it as a function!
}));

// Import the mock after mocking
import { searchArticlesByQuery } from "../../../services/apiCalls";

// Mock data
const mockDocs = [
  {
    headline: { main: "Test Article" },
    abstract: "Test abstract",
    snippet: "Test snippet",
    web_url: "http://test.com",
    byline: { original: "By Test Author" },
    pub_date: "2025-07-30T00:00:00Z",
    multimedia: [
      {
        url: "images/test.jpg",
        subtype: "photo",
        height: 100,
        width: 100,
        type: "image",
      },
    ],
    section_name: "Technology",
    subsection_name: "AI",
  },
];

describe("searchArticles async action", () => {
  const mockDispatch = vi.fn<ReturnType<Dispatch>, Parameters<Dispatch>>();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("dispatches fetchArticlesSuccess with formatted articles", async () => {
    // @ts-ignore
    searchArticlesByQuery.mockResolvedValue(mockDocs);

    await searchArticles("Test Query")(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(
      fetchArticlesSuccess(
        expect.arrayContaining([
          expect.objectContaining({
            title: "Test Article",
            abstract: "Test abstract",
            url: "http://test.com",
            byline: "By Test Author",
            published_date: "2025-07-30T00:00:00Z",
            section: "Technology",
            isRead: false,
          }),
        ]),
      ),
    );
  });

  it("logs error when API fails", async () => {
    const error = new Error("API failure");
    // @ts-ignore
    searchArticlesByQuery.mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await searchArticles("Bad Query")(mockDispatch);

    expect(consoleSpy).toHaveBeenCalledWith("Error details:", error);
    expect(consoleSpy).toHaveBeenCalledWith("Full response:", "API failure");
  });
});
