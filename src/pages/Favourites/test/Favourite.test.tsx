import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import {thunk} from "redux-thunk";

import Favourites from "../Favourites"; 
import * as savedArticleActions from "../../../redux/action/savedArticleAction";
import { REMOVE_FROM_FAVORITES } from "../../../redux/action/favouritesAction";
import type { NYTArticle } from "../../../types/article";

const middlewares:any = [thunk];
const mockStore = configureStore(middlewares);

const mockArticle: NYTArticle = {
  url: "https://example.com/article",
  title: "Sample Article",
  abstract: "This is a sample article.",
  published_date: "2025-07-30",
  section: "World",
  byline: "By Author",
  multimedia: [
    { url: "image-url", format: "mediumThreeByTwo210" },
  ],
};

describe("Favourites Page", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      favourites: [mockArticle.url],
      savedArticles: {
        topStories: [mockArticle],
        trending: [],
      },
    });

    // Mock fetchSavedArticlesOnce (async)
    vi.spyOn(savedArticleActions, "fetchSavedArticlesOnce").mockImplementation(() => {
      return () => Promise.resolve();
    });
  });

  it("renders saved article and dispatches REMOVE_FROM_FAVORITES on click", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Favourites />
      </MemoryRouter>
    </Provider>
  );

  expect(await screen.findByText("Sample Article")).toBeInTheDocument();

  const favButton = await screen.findByTestId("favorite-button");
  fireEvent.click(favButton);

  await waitFor(() => {
    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: REMOVE_FROM_FAVORITES,
      payload: mockArticle.url,
    });
  });
});


  it("shows empty state when no favourites", async () => {
    store = mockStore({
      favourites: [],
      savedArticles: {
        topStories: [],
        trending: [],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favourites />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/You haven’t saved anything yet/i)).toBeInTheDocument();
  });
});
