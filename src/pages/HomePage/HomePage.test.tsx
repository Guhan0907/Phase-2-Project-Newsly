// HomePage.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
import { vi, describe, it, expect, beforeEach } from "vitest";
import * as api from "../../services/apiCalls";
import { store } from "../../redux/store";
import { setCategoryFromFooter } from "../../redux/action/categoryAction";

// Mock components
vi.mock("../../components/FeaturedNewsCard", () => ({
  default: () => <div data-testid="featured-card">Featured Card</div>,
}));

vi.mock("../../components/NewsFilterBar", () => ({
  default: ({ storyType, onStoryTypeChange }: any) => (
    <div>
      <button onClick={() => onStoryTypeChange("trending")}>
        Set Trending
      </button>
      <span data-testid="story-type">{storyType}</span>
    </div>
  ),
}));

vi.mock("../../components/CompactNewsGrid", () => ({
  default: ({ articles }: any) => (
    <div data-testid="compact-grid">
      {articles.map((a: any, i: number) => (
        <div key={i}>{a.title}</div>
      ))}
    </div>
  ),
}));

vi.mock("../../components/FeaturedNewsCardShimmer", () => ({
  default: () => <div data-testid="shimmer-featured" />,
}));

vi.mock("../../components/CompactNewsGridShimmer", () => ({
  default: () => <div data-testid="shimmer-grid" />,
}));

const mockTopArticles = [
  { url: "1", title: "Top Article 1", section: "home" },
  { url: "2", title: "Top Article 2", section: "home" },
];

const mockTrendingArticles = [
  { url: "3", title: "Trending Article 1", section: "world" },
];

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders top stories on load", async () => {
    vi.spyOn(api, "fetchTopStories").mockResolvedValue(mockTopArticles);
    vi.spyOn(api, "fetchTrendingStories").mockResolvedValue(
      mockTrendingArticles,
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );

    // Wait for featured card and article list
    expect(await screen.findByTestId("featured-card")).toBeInTheDocument();
    expect(await screen.findByTestId("compact-grid")).toBeInTheDocument();

    // Articles displayed
    expect(screen.getByText("Top Article 1")).toBeInTheDocument();
    expect(screen.getByText("Top Article 2")).toBeInTheDocument();
  });

  it("switches to trending stories", async () => {
    vi.spyOn(api, "fetchTopStories").mockResolvedValue(mockTopArticles);
    vi.spyOn(api, "fetchTrendingStories").mockResolvedValue(
      mockTrendingArticles,
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );

    // Switch to trending
    fireEvent.click(await screen.findByText("Set Trending"));

    await waitFor(() => {
      expect(screen.getByText("Trending Article 1")).toBeInTheDocument();
    });
  });

  //   it.skip("shows shimmer while loading", () => {
  //     const loadingStore = {
  //       ...store,
  //       getState: () => ({ ...store.getState(), articles: { ...store.getState().articles, loading: true } }),
  //     };

  //     render(
  //       <Provider store={loadingStore}>
  //         <MemoryRouter>
  //           <HomePage />
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     expect(screen.getByTestId("shimmer-featured")).toBeInTheDocument();
  //     expect(screen.getByTestId("shimmer-grid")).toBeInTheDocument();
  //   });

  it("applies selectedCategory from Redux and scrolls to top", async () => {
    const scrollToMock = vi
      .spyOn(window, "scrollTo")
      .mockImplementation(() => {});

    vi.spyOn(api, "fetchTopStories").mockResolvedValue(mockTopArticles);
    vi.spyOn(api, "fetchTrendingStories").mockResolvedValue(
      mockTrendingArticles,
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );

    // Dispatch Redux action to simulate category selection
    store.dispatch(setCategoryFromFooter("world"));

    await waitFor(() => {
      expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    });

    scrollToMock.mockRestore();
  });

  it.only("loads more articles on scroll and shows scroll-to-top button", async () => {
    const mockArticles = Array.from({ length: 20 }, (_, i) => ({
      url: `${i + 1}`,
      title: `Article ${i + 1}`,
      section: "home",
    }));

    vi.spyOn(api, "fetchTopStories").mockResolvedValue(mockArticles);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );

    // Wait for articles to render
    expect(await screen.findByText("Article 1")).toBeInTheDocument();

    // Mock scroll dimensions
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      value: 1000,
    });
    Object.defineProperty(window, "scrollY", { writable: true, value: 350 });
    Object.defineProperty(document.body, "offsetHeight", {
      writable: true,
      value: 1300,
    });

    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.getByText("Article 11")).toBeInTheDocument(); // paginated
      expect(screen.getByRole("presentation")).toBeInTheDocument(); // FAB
    });
  });
});
