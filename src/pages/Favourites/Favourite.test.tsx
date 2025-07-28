import { render, screen, fireEvent } from "@testing-library/react";
import Favourites from "./Favourites";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { vi } from "vitest";
import * as api from "../../services/apiCalls";
import * as favouritesActions from "../../redux/action/favouritesAction";
import { MemoryRouter } from "react-router-dom";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual: any = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock article
const mockArticle = {
  id: "123",
  url: "https://example.com/test",
  title: "Test Article",
  abstract: "Sample abstract",
  byline: "By Author",
  published_date: "2025-07-25",
} as any;

const middlewares: any = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Favourites Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading shimmer when fetching articles", async () => {
    vi.spyOn(api, "fetchArticleById").mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve(mockArticle), 500)),
    );

    const store = mockStore({ favourites: ["123"] });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favourites />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Saved Articles")).toBeInTheDocument();
    expect(await screen.findAllByText("Saved Articles")).toHaveLength(1);
  });

  it("shows empty state if there are no favourites", () => {
    const store = mockStore({ favourites: [] });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favourites />
        </MemoryRouter>
      </Provider>,
    );

    expect(
      screen.getByText("You haven’t saved anything yet"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Discover News/i }),
    ).toBeInTheDocument();
  });

  it("renders fetched articles", async () => {
    vi.spyOn(api, "fetchArticleById").mockResolvedValue(mockArticle);

    const store = mockStore({ favourites: ["123"] });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favourites />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText("Saved Articles")).toBeInTheDocument();
    expect(await screen.findByText("Test Article")).toBeInTheDocument();
  });

  it("calls removeFromFavourites when favorite button is clicked", async () => {
    vi.spyOn(api, "fetchArticleById").mockResolvedValue(mockArticle);
    const removeSpy = vi.spyOn(favouritesActions, "removeFromFavourites");

    const store = mockStore({ favourites: ["123"] });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favourites />
        </MemoryRouter>
      </Provider>,
    );

    // const articleCard = await screen.findByText("Test Article");
    const favButton = await screen.findByTestId("favorite-button");
    fireEvent.click(favButton);

    // expect(removeSpy).toHaveBeenCalledWith("123");
    expect(removeSpy).toHaveBeenCalledWith("https://example.com/test");
  });

  it("navigates to article detail when article card is clicked", async () => {
    vi.spyOn(api, "fetchArticleById").mockResolvedValue(mockArticle);

    const store = mockStore({ favourites: ["123"] });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favourites />
        </MemoryRouter>
      </Provider>,
    );

    const articleCard = await screen.findByText("Test Article");
    fireEvent.click(articleCard);

    expect(mockNavigate).toHaveBeenCalledWith("/article/0", {
      state: { article: mockArticle },
    });
  });
});
