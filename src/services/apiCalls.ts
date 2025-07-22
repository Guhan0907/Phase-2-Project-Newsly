// import axios from "axios";

// const BASE_URL = "https://api.nytimes.com/svc/topstories/v2";
// // const BASE_URL = "https://api.nytimes.com/svc/topstories/v";
// const API_KEY = import.meta.env.VITE_NYT_API_KEY;

// export const fetchTopStories = async () => {
//   const response = await axios.get(`${BASE_URL}/home.json`, {
//     params: { "api-key": API_KEY },
//   });
//   return response.data.results;
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

import axios from "axios";

const API_KEY = import.meta.env.VITE_NYT_API_KEY;

export const fetchTopStories = async (section = "home") => {
  const res = await axios.get(
    `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${API_KEY}`,
  );
  return res.data.results;
};

export const fetchTrendingStories = async () => {
  const res = await axios.get(
    `https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${API_KEY}`,
  );
  return res.data.results;
};

export const fetchArchivedStories = async (year: number, month: number) => {
  const res = await axios.get(
    `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${API_KEY}`,
  );
  return res.data.response.docs;
};

export const fetchTimesWireNews = async () => {
  const res = await axios.get(
    `https://api.nytimes.com/svc/news/v3/content/all/all.json`,
    {
      params: { "api-key": API_KEY },
    },
  );
  return res.data.results;
};

export const fetchArticleById = async (id: string) => {
  // This is fake — you'd need to search all articles and filter by ID
  const res = await fetchTopStories(); // or call your current top/search API
  return res.find((article: any) => article.url === id); // if you're using URL as ID
};
