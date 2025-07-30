import axios from "axios";
import {
  fetchArticlesSuccess,
} from "./articlesAction";
import type { ArticlesAction } from "./articlesAction";
import type { NYTArticle } from "../../types/article";
import type { Dispatch } from "redux";
import { searchArticlesByQuery } from "../../services/apiCalls";

const API_KEY = import.meta.env.VITE_NYT_API_KEY;

export const searchArticles = (query: string) => {
  return async (dispatch: Dispatch<ArticlesAction>) => {
    try {
   
      const docs = await searchArticlesByQuery(query);

      const formattedArticles: NYTArticle[] = docs.map((doc: any) => ({
        title: doc.headline?.main || "",
        abstract: doc.abstract || doc.snippet || "",
        url: doc.web_url,
        byline: doc.byline?.original || "",
        published_date: doc.pub_date || "",
        multimedia: Array.isArray(doc.multimedia)
          ? doc.multimedia.map((m: any) => ({
              url: m.url.startsWith("http")
                ? m.url
                : `https://www.nytimes.com/${m.url}`,
              format: m.subtype || "",
              height: m.height,
              width: m.width,
              type: m.type,
              subtype: m.subtype,
              caption: doc.snippet || "",
            }))
          : [],
        section: doc.section_name || "",
        subsection: doc.subsection_name || "",
        isRead: false,
      }));

      dispatch(fetchArticlesSuccess(formattedArticles));
      console.log("Dispatching articles to reducer:", formattedArticles);
    } catch (error: any) {
      console.error("Error details:", error);
      console.error("Full response:", error?.response?.data || error.message);

      // dispatch(fetchArticlesFailure("Search failed. Please try again."));
    }
  };
};
