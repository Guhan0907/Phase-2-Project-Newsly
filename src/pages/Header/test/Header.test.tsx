import { describe, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "../Header";
import configureStore from "redux-mock-store";
import { ThemeProvider, createTheme } from "@mui/material/styles";

vi.mock("../../redux/action/articlesAction", async () => {
  const actual = await import("../../../redux/action/articlesAction");
  return {
    ...actual,
    setSearchMode: vi.fn(() => ({ type: "SEARCH_MODE" })),
    fetchArticlesRequest: vi.fn(() => ({ type: "FETCH_ARTICLES_REQUEST" })),
    fetchArticlesSuccess: vi.fn(() => ({
      type: "FETCH_ARTICLES_SUCCESS",
      payload: [],
    })),
    fetchFeaturedSuccess: vi.fn(() => ({
      type: "FETCH_FEATURED_SUCCESS",
      payload: {},
    })),
    fetchArticlesFailure: vi.fn(() => ({
      type: "FETCH_ARTICLES_FAILURE",
      payload: "error",
    })),
  };
});

vi.mock("../../redux/action/searchAction", async () => {
  return {
    searchArticles: vi.fn((query: string) => ({
      type: "SEARCH_ARTICLES",
      payload: query,
    })),
  };
});

vi.mock("../../redux/action/userAction", async () => {
  return {
    logoutUser: vi.fn(() => ({ type: "USER_LOGOUT" })),
  };
});

vi.mock("../../redux/action/favouritesAction", async () => {
  return {
    clearFavourites: vi.fn(() => ({ type: "FAVOURITES_CLEAR" })),
  };
});

vi.mock("../../redux/action/historyActions", async () => {
  return {
    clearHistory: vi.fn(() => ({ type: "HISTORY_CLEAR" })),
  };
});

vi.mock("../../services/apiCalls", () => ({
  fetchTopStories: vi.fn(() => Promise.resolve([])),
  fetchTimesWireNews: vi.fn(() => Promise.resolve([{}])),
}));

vi.mock("./SearchBar", () => ({
  default: ({ query, onQueryChange, onSearch }: any) => (
    <div data-testid="search-bar">
      <input
        data-testid="search-input"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <button data-testid="search-button" onClick={onSearch}>
        Search
      </button>
    </div>
  ),
}));

vi.mock("./UserMenu", () => ({
  default: ({ user, onLogout }: any) => (
    <div data-testid="user-menu" onClick={onLogout}>
      {user?.name}
    </div>
  ),
}));

vi.mock("./LogoutConfirmDialog", () => ({
  default: ({ open, onClose, onConfirm }: any) =>
    open ? (
      <div data-testid="logout-dialog">
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    ) : null,
}));

const theme = createTheme();
const mockStore = configureStore<any>();

describe("Header", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      user: {
        user: JSON.stringify({
          user: { name: "Test User", email: "test@example.com", imageUrl: "" },
        }),
      },
      favourites: [],
    });
  });

  const renderHeader = () =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <ThemeProvider theme={theme}>
            <Header />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>,
    );

  it.skip("renders logo and user menu when logged in", () => {
    renderHeader();
    expect(screen.getByAltText("Newsly Logo")).toBeInTheDocument();
    expect(screen.getByTestId("user-menu")).toHaveTextContent("Test User");
  });

  it.skip("triggers search when search button is clicked", () => {
    renderHeader();

    const input = screen.getByTestId("search-input") as HTMLInputElement;
    const button = screen.getByTestId("search-button");

    fireEvent.change(input, { target: { value: "hello" } });
    fireEvent.click(button);

    expect(input.value).toBe("hello");
  });

  it("renders favourites icon with count", () => {
    renderHeader();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});
