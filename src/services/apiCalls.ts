// import axios from "axios";

// const API_KEY = import.meta.env.VITE_NYT_API_KEY;

// export const fetchTopStories = async (section = "home") => {
//   const res = await axios.get(
//     `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${API_KEY}`,
//   );
//   return res.data.results;
// };

// export const fetchTrendingStories = async () => {
//   const res = await axios.get(
//     `https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${API_KEY}`,
//   );
//   return res.data.results;
// };

// export const fetchArchivedStories = async (year: number, month: number) => {
//   const res = await axios.get(
//     `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${API_KEY}`,
//   );
//   return res.data.response.docs;
// };

// export const fetchTimesWireNews = async () => {
//   const res = await axios.get(
//     `https://api.nytimes.com/svc/news/v3/content/all/all.json`,
//     {
//       params: { "api-key": API_KEY },
//     },
//   );
//   return res.data.results;
// };

// export const fetchArticleById = async (id: string) => {
//   // First: check in Top Stories
//   const topStories = await fetchTopStories();
//   const topMatch = topStories.find((article: any) => article.url === id);

//   if (topMatch) return topMatch;

//   // Fallback: check in Trending
//   const trendingStories = await fetchTrendingStories();
//   const trendingMatch = trendingStories.find(
//     (article: any) => article.url === id,
//   );

//   if (trendingMatch) return trendingMatch;

//   throw new Error("Article not found in Top or Trending stories");
// };

// // for section
// export const fetchTopStoriesBySection = async (section: string) => {
//   const response = await axios.get(
//     `https://api.nytimes.com/svc/topstories/v2/${section}.json`,
//     { params: { "api-key": API_KEY } },
//   );
//   return response.data.results;
// };

import API from "./axiosInstance";

export const fetchTopStories = async (section = "home") => {
  const res = await API.get(`/svc/topstories/v2/${section}.json`);
  return res.data.results;
};

export const fetchTrendingStories = async () => {
  const res = await API.get(`/svc/mostpopular/v2/viewed/7.json`);
  return res.data.results;
};

export const fetchArchivedStories = async (year: number, month: number) => {
  const res = await API.get(`/svc/archive/v1/${year}/${month}.json`);
  return res.data.response.docs;
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
