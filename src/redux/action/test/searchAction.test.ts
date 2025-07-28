import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import {
  fetchArticlesRequest,
  fetchArticlesSuccess,
  fetchArticlesFailure,
  setSearchMode,
} from "../articlesAction";
import type { NYTArticle } from "../../../types/article";
import { searchArticles } from "../searchAction";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

vi.mock("../articlesAction", () => ({
  fetchArticlesRequest: vi.fn(),
  fetchArticlesSuccess: vi.fn(),
  fetchArticlesFailure: vi.fn(),
  setSearchMode: vi.fn(),
}));

const mockDispatch = vi.fn();

describe("searchArticles", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (setSearchMode as any).mockReturnValue({
      type: "SET_SEARCH_MODE",
      payload: true,
    });
    (fetchArticlesRequest as any).mockReturnValue({
      type: "FETCH_ARTICLES_REQUEST",
    });
    (fetchArticlesSuccess as any).mockReturnValue({
      type: "FETCH_ARTICLES_SUCCESS",
      payload: [],
    });
    (fetchArticlesFailure as any).mockReturnValue({
      type: "FETCH_ARTICLES_FAILURE",
      payload: "error",
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("successful API call", () => {
    it("should dispatch correct actions and format articles correctly", async () => {
      const mockResponse = {
        data: {
          response: {
            docs: [
              {
                headline: { main: "Test Article Title" },
                abstract: "Test abstract",
                snippet: "Test snippet",
                web_url: "https://nytimes.com/test-article",
                byline: { original: "By Test Author" },
                pub_date: "2024-01-15T10:00:00Z",
                section_name: "Technology",
                subsection_name: "AI",
                multimedia: [
                  {
                    url: "images/test-image.jpg",
                    subtype: "xlarge",
                    height: 400,
                    width: 600,
                    type: "image",
                  },
                ],
              },
              {
                headline: { main: "Second Article" },
                abstract: "",
                snippet: "Second snippet",
                web_url: "https://nytimes.com/second-article",
                byline: { original: "By Second Author" },
                pub_date: "2024-01-16T12:00:00Z",
                section_name: "Sports",
                subsection_name: "",
                multimedia: [],
              },
            ],
          },
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const thunk = searchArticles("test query");
      await thunk(mockDispatch);

      // Verify API call
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        {
          params: {
            q: "test query",
            "api-key": expect.any(String),
          },
        },
      );

      expect(mockDispatch).toHaveBeenCalledTimes(3);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: "SET_SEARCH_MODE",
        payload: true,
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        type: "FETCH_ARTICLES_REQUEST",
      });

      const expectedArticles: NYTArticle[] = [
        {
          title: "Test Article Title",
          abstract: "Test abstract",
          url: "https://nytimes.com/test-article",
          byline: "By Test Author",
          published_date: "2024-01-15T10:00:00Z",
          multimedia: [
            {
              url: "https://www.nytimes.com/images/test-image.jpg",
              format: "xlarge",
              height: 400,
              width: 600,
              type: "image",
              subtype: "xlarge",
              caption: "Test snippet",
            },
          ],
          section: "Technology",
          subsection: "AI",
          isRead: false,
        },
        {
          title: "Second Article",
          abstract: "Second snippet",
          url: "https://nytimes.com/second-article",
          byline: "By Second Author",
          published_date: "2024-01-16T12:00:00Z",
          multimedia: [],
          section: "Sports",
          subsection: "",
          isRead: false,
        },
      ];

      expect(fetchArticlesSuccess).toHaveBeenCalledWith(expectedArticles);
      expect(mockDispatch).toHaveBeenNthCalledWith(3, {
        type: "FETCH_ARTICLES_SUCCESS",
        payload: [],
      });
    });

    it("should handle multimedia with full HTTP URLs correctly", async () => {
      const mockResponse = {
        data: {
          response: {
            docs: [
              {
                headline: { main: "Test Article" },
                abstract: "Test abstract",
                snippet: "Test snippet",
                web_url: "https://nytimes.com/test",
                byline: { original: "By Test" },
                pub_date: "2024-01-15T10:00:00Z",
                section_name: "Tech",
                subsection_name: "",
                multimedia: [
                  {
                    url: "https://static01.nyt.com/images/test.jpg",
                    subtype: "large",
                    height: 300,
                    width: 500,
                    type: "image",
                  },
                ],
              },
            ],
          },
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const thunk = searchArticles("test");
      await thunk(mockDispatch);

      const expectedMultimedia = [
        {
          url: "https://static01.nyt.com/images/test.jpg",
          format: "large",
          height: 300,
          width: 500,
          type: "image",
          subtype: "large",
          caption: "Test snippet",
        },
      ];

      expect(fetchArticlesSuccess).toHaveBeenCalledWith([
        expect.objectContaining({
          multimedia: expectedMultimedia,
        }),
      ]);
    });

    it("should handle missing optional fields gracefully", async () => {
      const mockResponse = {
        data: {
          response: {
            docs: [
              {
                web_url: "https://nytimes.com/minimal-article",
                pub_date: "2024-01-15T10:00:00Z",
                multimedia: null,
              },
            ],
          },
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const thunk = searchArticles("test");
      await thunk(mockDispatch);

      const expectedArticle: NYTArticle = {
        title: "",
        abstract: "",
        url: "https://nytimes.com/minimal-article",
        byline: "",
        published_date: "2024-01-15T10:00:00Z",
        multimedia: [],
        section: "",
        subsection: "",
        isRead: false,
      };

      expect(fetchArticlesSuccess).toHaveBeenCalledWith([expectedArticle]);
    });
  });

  describe("error handling", () => {
    it("should dispatch failure action when API call fails", async () => {
      const mockError = new Error("Network error");
      mockedAxios.get.mockRejectedValueOnce(mockError);

      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const thunk = searchArticles("test query");
      await thunk(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledTimes(3);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: "SET_SEARCH_MODE",
        payload: true,
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        type: "FETCH_ARTICLES_REQUEST",
      });
      expect(fetchArticlesFailure).toHaveBeenCalledWith(
        "Search failed. Please try again.",
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(3, {
        type: "FETCH_ARTICLES_FAILURE",
        payload: "error",
      });

      expect(consoleSpy).toHaveBeenCalledWith("Error details:", mockError);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Full response:",
        "Network error",
      );

      consoleSpy.mockRestore();
    });

    it("should dispatch failure action when response structure is unexpected", async () => {
      const mockResponse = {
        data: {
          response: {
            docs: "not an array",
          },
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const thunk = searchArticles("test query");
      await thunk(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledTimes(3);
      expect(fetchArticlesFailure).toHaveBeenCalledWith(
        "Search failed. Please try again.",
      );

      consoleSpy.mockRestore();
    });

    it("should handle axios error with response data", async () => {
      const mockAxiosError = {
        response: {
          data: {
            fault: {
              faultstring: "API key is invalid",
            },
          },
        },
        message: "Request failed with status code 401",
      };

      mockedAxios.get.mockRejectedValueOnce(mockAxiosError);

      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const thunk = searchArticles("test query");
      await thunk(mockDispatch);

      expect(consoleSpy).toHaveBeenCalledWith("Error details:", mockAxiosError);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Full response:",
        mockAxiosError.response.data,
      );
      expect(fetchArticlesFailure).toHaveBeenCalledWith(
        "Search failed. Please try again.",
      );

      consoleSpy.mockRestore();
    });

    it("should handle missing response.docs", async () => {
      const mockResponse = {
        data: {
          response: {}, // Missing docs
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const thunk = searchArticles("test query");
      await thunk(mockDispatch);

      expect(fetchArticlesFailure).toHaveBeenCalledWith(
        "Search failed. Please try again.",
      );
    });
  });

  describe("console logging", () => {
    it("should log formatted articles on success", async () => {
      const mockResponse = {
        data: {
          response: {
            docs: [
              {
                headline: { main: "Test Article" },
                abstract: "Test abstract",
                web_url: "https://nytimes.com/test",
                byline: { original: "By Test" },
                pub_date: "2024-01-15T10:00:00Z",
                section_name: "Tech",
                subsection_name: "",
                multimedia: [],
              },
            ],
          },
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      const thunk = searchArticles("test");
      await thunk(mockDispatch);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Dispatching articles to reducer:",
        expect.arrayContaining([
          expect.objectContaining({
            title: "Test Article",
            abstract: "Test abstract",
          }),
        ]),
      );

      consoleSpy.mockRestore();
    });
  });

  describe("action creator calls", () => {
    it("should call action creators with correct parameters", async () => {
      const mockResponse = {
        data: {
          response: {
            docs: [],
          },
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const thunk = searchArticles("test query");
      await thunk(mockDispatch);

      expect(setSearchMode).toHaveBeenCalledWith(true);
      expect(fetchArticlesRequest).toHaveBeenCalledWith();
      expect(fetchArticlesSuccess).toHaveBeenCalledWith([]);
    });
  });
});
