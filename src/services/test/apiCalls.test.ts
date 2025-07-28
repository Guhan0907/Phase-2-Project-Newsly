import {
  fetchTopStories,
  fetchTrendingStories,
  fetchArchivedStories,
  fetchTimesWireNews,
  fetchArticleById,
  fetchTopStoriesBySection,
} from "../apiCalls";

import AxiosMockAdapter from "axios-mock-adapter";
import API from "../axiosInstance";
import { describe, it, expect, beforeEach } from "vitest";

// Mock instance
const mock = new AxiosMockAdapter(API);

beforeEach(() => {
  mock.reset(); // reset before each test
});

describe("apiCalls", () => {
  it("fetches top stories", async () => {
    mock.onGet("/svc/topstories/v2/home.json").reply(200, {
      results: [{ title: "Story A" }],
    });

    const data = await fetchTopStories();
    expect(data).toEqual([{ title: "Story A" }]);
  });

  it("fetches trending stories", async () => {
    mock.onGet("/svc/mostpopular/v2/viewed/7.json").reply(200, {
      results: [{ title: "Trending Story" }],
    });

    const data = await fetchTrendingStories();
    expect(data).toEqual([{ title: "Trending Story" }]);
  });

  it("fetches archived stories", async () => {
    mock.onGet("/svc/archive/v1/2023/6.json").reply(200, {
      response: { docs: [{ title: "Archived Story" }] },
    });

    const data = await fetchArchivedStories(2023, 6);
    expect(data).toEqual([{ title: "Archived Story" }]);
  });

  it("fetches Times Wire news", async () => {
    mock.onGet("/svc/news/v3/content/all/all.json").reply(200, {
      results: [{ title: "Wire Story" }],
    });

    const data = await fetchTimesWireNews();
    expect(data).toEqual([{ title: "Wire Story" }]);
  });

  it("finds article by ID in top stories", async () => {
    const article = { url: "https://nytimes.com/article123", title: "Top" };

    mock.onGet("/svc/topstories/v2/home.json").reply(200, {
      results: [article],
    });
    mock.onGet("/svc/mostpopular/v2/viewed/7.json").reply(200, {
      results: [],
    });

    const found = await fetchArticleById(article.url);
    expect(found).toEqual(article);
  });

  it("throws error if article not found in top or trending", async () => {
    mock.onGet("/svc/topstories/v2/home.json").reply(200, {
      results: [],
    });
    mock.onGet("/svc/mostpopular/v2/viewed/7.json").reply(200, {
      results: [],
    });

    await expect(fetchArticleById("https://nytimes.com/fake")).rejects.toThrow(
      "Article not found in Top or Trending stories",
    );
  });

  it("fetches top stories by section", async () => {
    mock.onGet("/svc/topstories/v2/world.json").reply(200, {
      results: [{ title: "World News" }],
    });

    const data = await fetchTopStoriesBySection("world");
    expect(data).toEqual([{ title: "World News" }]);
  });
});
