// src/redux/action/searchArticles.test.ts
import { searchArticles } from "../searchAction";
import {
  fetchArticlesRequest,
  fetchArticlesSuccess,
  fetchArticlesFailure,
  setSearchMode,
} from "../articlesAction";
import axios from "axios";
import { vi } from "vitest";
// import type { NYTArticle } from "../../types/article";
import type { NYTArticle } from "../../../types/article";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("searchArticles action", () => {
  const dispatch = vi.fn();
  const query = "election";

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("dispatches success actions when API call succeeds", async () => {
    const mockDocs = [
      {
        headline: { main: "Election Updates" },
        abstract: "Election summary",
        snippet: "Election snippet",
        web_url: "https://nytimes.com/election",
        byline: { original: "By Author" },
        pub_date: "2023-11-01",
        multimedia: [
          {
            url: "images/2023/11/01/election.jpg",
            subtype: "photo",
            height: 200,
            width: 300,
            type: "image",
          },
        ],
        section_name: "Politics",
        subsection_name: "Elections",
      },
    ];

    mockedAxios.get.mockResolvedValue({
      data: {
        response: {
          docs: mockDocs,
        },
      },
    });

    // @ts-ignore
    await searchArticles(query)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setSearchMode(true));
    expect(dispatch).toHaveBeenCalledWith(fetchArticlesRequest());
    expect(dispatch).toHaveBeenCalledWith(
      fetchArticlesSuccess(
        expect.arrayContaining([
          expect.objectContaining({
            title: "Election Updates",
            url: "https://nytimes.com/election",
          }),
        ]),
      ),
    );
  });

  it("dispatches failure action when API call fails", async () => {
    mockedAxios.get.mockRejectedValue(new Error("API error"));

    // @ts-ignore
    await searchArticles(query)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setSearchMode(true));
    expect(dispatch).toHaveBeenCalledWith(fetchArticlesRequest());
    expect(dispatch).toHaveBeenCalledWith(
      fetchArticlesFailure("Search failed. Please try again."),
    );
  });

  it("dispatches failure action on unexpected response", async () => {
    mockedAxios.get.mockResolvedValue({ data: { response: { docs: null } } });

    // @ts-ignore
    await searchArticles(query)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setSearchMode(true));
    expect(dispatch).toHaveBeenCalledWith(fetchArticlesRequest());
    expect(dispatch).toHaveBeenCalledWith(
      fetchArticlesFailure("Search failed. Please try again."),
    );
  });
});
