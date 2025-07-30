import axios from "axios";

export const API = axios.create({
  baseURL: "https://api.nytimes.com",
  timeout: 8000,
  params: {
    "api-key": import.meta.env.VITE_NYT_API_KEY,
  },
});

export const fetchTopStories = async (section = "home") => {
  const res = await API.get(`/svc/topstories/v2/${section}.json`);
  // normally the api s called with the home in the section as default
  return res.data.results;
};

export const fetchTrendingStories = async () => {
  const res = await API.get(`/svc/mostpopular/v2/viewed/7.json`);
  return res.data.results;
};



export const fetchTimesWireNews = async () => {
  const res = await API.get(`/svc/news/v3/content/all/all.json`);
  return res.data.results;
};

export const fetchArticleById = async (id: string) => {
  const topStories = await fetchTopStories();
  const topMatch = topStories.find((article: any) => article.url === id);
  if (topMatch) return topMatch;

  const trendingStories = await fetchTrendingStories();
  const trendingMatch = trendingStories.find(
    (article: any) => article.url === id,
  );
  if (trendingMatch) return trendingMatch;

  throw new Error("Article not found in Top or Trending stories");
};

export const fetchTopStoriesBySection = async (section: string) => {
  const res = await API.get(`/svc/topstories/v2/${section}.json`);
  return res.data.results;
};


// for searching
export const searchArticlesByQuery = async (query: string) => {
  const res = await API.get(`/svc/search/v2/articlesearch.json?q=${query}`);

  const docs = res.data?.response?.docs;

  if (!Array.isArray(docs)) {
    throw new Error("Unexpected API response structure");
  }

  return docs;
};
