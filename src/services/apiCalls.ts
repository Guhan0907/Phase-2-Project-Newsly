import axios from "axios";

// const BASE_URL = "https://api.nytimes.com/svc/topstories/v2";
const BASE_URL = 'https://api.nytimes.com/svc/topstories/v';
const API_KEY = import.meta.env.VITE_NYT_API_KEY;

export const fetchTopStories = async () => {
  const response = await axios.get(`${BASE_URL}/home.json`, {
    params: { "api-key": API_KEY },
  });
  return response.data.results;
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
