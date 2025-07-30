
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  API,
  fetchTopStories,
  fetchTrendingStories,
  fetchTimesWireNews,
  fetchTopStoriesBySection,
  searchArticlesByQuery,
  fetchArticleById,
} from "../apiCalls";

// Mock axios and API
vi.mock("../apiCalls", async () => {
  const actual = await vi.importActual("../apiCalls");

  return {
    ...actual,
    API: {
      get: vi.fn(),
    },

    // below for mocking the API calls
    fetchTopStories: async (section = "home") => {
      const res = await API.get(`/svc/topstories/v2/${section}.json`);
      return res.data.results;
    },

  fetchTrendingStories :async () => {
  const res = await API.get(`/svc/mostpopular/v2/viewed/7.json`);
  return res.data.results;
},

fetchTimesWireNews : async () => {
  const res = await API.get(`/svc/news/v3/content/all/all.json`);
  return res.data.results;
},

fetchArticleById : async (id: string) => {
  const topStories = await fetchTopStories();
  const topMatch = topStories.find((article: any) => article.url === id);
  if (topMatch) return topMatch;

  const trendingStories = await fetchTrendingStories();
  const trendingMatch = trendingStories.find(
    (article: any) => article.url === id,
  );
  if (trendingMatch) return trendingMatch;

  throw new Error("Article not found in Top or Trending stories");
},

fetchTopStoriesBySection : async (section: string) => {
  const res = await API.get(`/svc/topstories/v2/${section}.json`);
  return res.data.results;
},

searchArticlesByQuery : async (query: string) => {
  const res = await API.get(`/svc/search/v2/articlesearch.json?q=${query}`);

  const docs = res.data?.response?.docs;

  if (!Array.isArray(docs)) {
    throw new Error("Unexpected API response structure");
  }

  return docs;
},

  };
});



describe("apiCalls", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("fetches top stories (default section: home)", async () => {
    (API.get as vi.Mock).mockResolvedValueOnce({
      data: { results: [{ title: "Testing Stories this" }] },
    });

    const res = await fetchTopStories();
    expect(API.get).toHaveBeenCalledWith("/svc/topstories/v2/home.json");
    expect(res).toEqual([{ title: "Testing Stories this" }]);
  });

  it("fetches trending stories", async () => {
    (API.get as vi.Mock).mockResolvedValueOnce({
      data: { results: [{ title: "Trending News" }] },
    });

    const res = await fetchTrendingStories();
    expect(API.get).toHaveBeenCalledWith("/svc/mostpopular/v2/viewed/7.json");
    expect(res).toEqual([{ title: "Trending News" }]);
  });

  it("fetches Times Wire news", async () => {
    (API.get as vi.Mock).mockResolvedValueOnce({
      data: { results: [{ title: "Wire News" }] },
    });

    const res = await fetchTimesWireNews();
    expect(API.get).toHaveBeenCalledWith("/svc/news/v3/content/all/all.json");
    expect(res).toEqual([{ title: "Wire News" }]);
  });

  it("fetches top stories by section", async () => {
    (API.get as vi.Mock).mockResolvedValueOnce({
      data: { results: [{ title: "Science Story" }] },
    });

    const res = await fetchTopStoriesBySection("science");
    expect(API.get).toHaveBeenCalledWith("/svc/topstories/v2/science.json");
    expect(res).toEqual([{ title: "Science Story" }]);
  });

  it("searches articles by query", async () => {
    (API.get as vi.Mock).mockResolvedValueOnce({
      data: { response: { docs: [{ headline: "Search Result" }] } },
    });

    const res = await searchArticlesByQuery("climate");
    expect(API.get).toHaveBeenCalledWith(
      "/svc/search/v2/articlesearch.json?q=climate"
    );
    expect(res).toEqual([{ headline: "Search Result" }]);
  });

  it("fetches article by ID from top stories", async () => {
    const article = { url: "test-id", title: "Top Story Match" };

    // Top story match
    (API.get as vi.Mock)
      .mockResolvedValueOnce({ data: { results: [article] } }) // fetchTopStories
      .mockResolvedValueOnce({ data: { results: [] } }); // fetchTrendingStories fallback

    const res = await fetchArticleById("test-id");
    expect(res).toEqual(article);
  });

  it("fetches article by ID from trending if not in top stories", async () => {
    const article = { url: "test-id", title: "Trending Match" };

    // Top story no match
    (API.get as vi.Mock)
      .mockResolvedValueOnce({ data: { results: [] } }) // fetchTopStories
      .mockResolvedValueOnce({ data: { results: [article] } }); // fetchTrendingStories

    const res = await fetchArticleById("test-id");
    expect(res).toEqual(article);
  });

  it("throws if article not found", async () => {
    (API.get as vi.Mock)
      .mockResolvedValueOnce({ data: { results: [] } }) // fetchTopStories
      .mockResolvedValueOnce({ data: { results: [] } }); // fetchTrendingStories

    await expect(fetchArticleById("not-found")).rejects.toThrow(
      "Article not found in Top or Trending stories"
    );
  });
});
