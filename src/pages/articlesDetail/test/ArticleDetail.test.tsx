import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createStore, combineReducers } from "redux";
import ArticleDetail from "../ArticleDetail";
import { fetchTopStories } from "../../../services/apiCalls";
import type { NYTArticle } from "../../../types/article";

vi.mock("../../../services/apiCalls", () => ({
  fetchTopStories: vi.fn(),
  // mocking the fetchTopStories
}));

const mockUseMediaQuery = vi.fn();

vi.mock("@mui/material", async () => {
  // mocking the entire mui package
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    useMediaQuery: () => mockUseMediaQuery(),
  };
});

vi.mock("../../../hooks/readObserverHook", () => ({
  useReadObserver: vi.fn(() => ({ current: null })),
}));

vi.mock("../ArticleDetailAction", () => ({
  default: ({ isSaved, onSave, articleTitle }: any) => (
    <div data-testid="article-detail-action">
      <button onClick={onSave} data-testid="save-button">
        {isSaved ? "Unsave" : "Save"}
      </button>
      <span data-testid="article-title">{articleTitle}</span>
    </div>
  ),
}));

vi.mock("../ArticleDetailHeading", () => ({
  default: ({ article }: any) => (
    <div data-testid="article-detail-heading">
      <h1>{article.title}</h1>
    </div>
  ),
}));

const mockNavigate = vi.fn();
const mockUseLocation = vi.fn();
const mockUseParams = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockUseLocation(),
    useParams: () => mockUseParams(),
  };
});

const mockArticle: NYTArticle = {
  url: "https://example.com/article1",
  title: "Test Article Title",
  abstract: "This is a test article abstract",
  published_date: "2024-01-01",
  byline: "By Test Author",
  section: "Technology",
  subsection: "AI",
  des_facet: ["Technology", "Artificial Intelligence", "Innovation"],
  isRead: false,
  multimedia: [
    {
      url: "https://example.com/image1.jpg",
      format: "superJumbo",
      height: 1000,
      width: 1500,
      type: "image",
      subtype: "photo",
      caption: "Test image caption",
    },
    {
      url: "https://example.com/image2.jpg",
      format: "standard",
      height: 500,
      width: 750,
      type: "image",
      subtype: "photo",
      caption: "Another test image",
    },
  ],
};

const mockTopStories: NYTArticle[] = [
  mockArticle,
  {
    url: "https://example.com/article2",
    title: "Related Article",
    abstract: "Related article abstract",
    published_date: "2024-01-02",
    byline: "By Another Author",
    section: "Technology",
    subsection: "AI",
    des_facet: ["Technology", "Machine Learning"],
    isRead: false,
    multimedia: [],
  },
];

const mockAddToFavourites = vi.fn();
const mockRemoveFromFavourites = vi.fn();
const mockAddToHistory = vi.fn();

vi.mock("../../redux/action/favouritesAction", () => ({
  addToFavourites: (url: string) => {
    mockAddToFavourites(url);
    return { type: "ADD_TO_FAVOURITES", payload: url };
  },
  removeFromFavourites: (url: string) => {
    mockRemoveFromFavourites(url);
    return { type: "REMOVE_FROM_FAVOURITES", payload: url };
  },
}));

vi.mock("../../redux/action/historyActions", () => ({
  addToHistory: (url: string) => {
    mockAddToHistory(url);
    return { type: "ADD_TO_HISTORY", payload: url };
  },
}));

const articlesReducer = (
  state = { topStories: mockTopStories },
  action: any,
) => {
  switch (action.type) {
    default:
      return state;
  }
};

const favouritesReducer = (state: string[] = [], action: any) => {
  switch (action.type) {
    case "ADD_TO_FAVOURITES":
      return [...state, action.payload];
    case "REMOVE_FROM_FAVOURITES":
      return state.filter((url: string) => url !== action.payload);
    default:
      return state;
  }
};

const historyReducer = (state: string[] = [], action: any) => {
  switch (action.type) {
    case "ADD_TO_HISTORY":
      return [...state, action.payload];
    default:
      return state;
  }
};

const createMockStore = (initialState = {}) => {
  const defaultState = {
    articles: {
      topStories: mockTopStories,
    },
    favourites: [],
    history: [],
    ...initialState,
  };

  const rootReducer = combineReducers({
    articles: articlesReducer,
    favourites: favouritesReducer,
    history: historyReducer,
  });

  return createStore(rootReducer, defaultState);
};

const theme = createTheme();

const renderWithProviders = (
  component: React.ReactElement,
  {
    store = createMockStore(),
    route = "/article/0",
    locationState = null,
  } = {},
) => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[route]}>{component}</MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );
};

describe("ArticleDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAddToFavourites.mockClear();
    mockRemoveFromFavourites.mockClear();
    mockAddToHistory.mockClear();
    mockUseParams.mockReturnValue({ id: "0" });
    mockUseLocation.mockReturnValue({ state: null });
    mockUseMediaQuery.mockReturnValue(false); // Default to desktop
    Object.defineProperty(window, "scrollTo", {
      value: vi.fn(),
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Loading States", () => {
    it("should show loading state when fetching article", () => {
      mockUseParams.mockReturnValue({ id: "999" });
      const store = createMockStore({ articles: { topStories: [] } });
      vi.mocked(fetchTopStories).mockImplementation(
        () => new Promise(() => {}), // Never resolves
      );

      renderWithProviders(<ArticleDetail />, { store });

      expect(screen.getByText("Loading article...")).toBeInTheDocument();
    });
  });

  describe("Article Display", () => {
    it("should display main image with superJumbo format", () => {
      mockUseLocation.mockReturnValue({
        state: { article: mockArticle },
      });

      renderWithProviders(<ArticleDetail />);

      const image = screen.getByTestId("article-image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "https://example.com/image1.jpg");
      expect(image).toHaveAttribute("alt", "Test image caption");
    });

    it("should display image caption when available", () => {
      mockUseLocation.mockReturnValue({
        state: { article: mockArticle },
      });

      renderWithProviders(<ArticleDetail />);

      expect(screen.getByTestId("image-caption")).toHaveTextContent(
        "Test image caption",
      );
    });

    it("should render tags when des_facet is available", () => {
      mockUseLocation.mockReturnValue({
        state: { article: mockArticle },
      });

      renderWithProviders(<ArticleDetail />);

      expect(screen.getByTestId("related-topics-title")).toBeInTheDocument();
      expect(screen.getByTestId("tag-chip-Technology")).toBeInTheDocument();
      expect(
        screen.getByTestId("tag-chip-Artificial Intelligence"),
      ).toBeInTheDocument();
      expect(screen.getByTestId("tag-chip-Innovation")).toBeInTheDocument();
    });
  });

  describe("Error States", () => {
    it("should show error when article is not found", async () => {
      mockUseParams.mockReturnValue({ id: "999" });
      const store = createMockStore({ articles: { topStories: [] } });
      vi.mocked(fetchTopStories).mockResolvedValue([]);

      renderWithProviders(<ArticleDetail />, { store });

      await waitFor(() => {
        expect(screen.getByTestId("article-not-found")).toBeInTheDocument();
      });

      expect(screen.getByText("Article not found.")).toBeInTheDocument();
      expect(screen.getByText("Go Back")).toBeInTheDocument();
    });

    it("should show error when API call fails", async () => {
      mockUseParams.mockReturnValue({ id: "0" });
      const store = createMockStore({ articles: { topStories: [] } });
      vi.mocked(fetchTopStories).mockRejectedValue(new Error("API Error"));

      renderWithProviders(<ArticleDetail />, { store });

      await waitFor(() => {
        expect(screen.getByText("Failed to load article.")).toBeInTheDocument();
      });
    });

    it("should handle go back button click", async () => {
      mockUseParams.mockReturnValue({ id: "999" });
      const store = createMockStore({ articles: { topStories: [] } });
      vi.mocked(fetchTopStories).mockResolvedValue([]);

      renderWithProviders(<ArticleDetail />, { store });

      await waitFor(() => {
        expect(screen.getByText("Go Back")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Go Back"));
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });

  describe("Favorites Functionality", () => {
    it("should show unsaved state initially", () => {
      mockUseLocation.mockReturnValue({
        state: { article: mockArticle },
      });

      renderWithProviders(<ArticleDetail />);

      expect(screen.getByTestId("save-button")).toHaveTextContent("Save");
    });

    it("should show saved state when article is in favorites", () => {
      mockUseLocation.mockReturnValue({
        state: { article: mockArticle },
      });
      const store = createMockStore({
        favourites: [mockArticle.url],
      });

      renderWithProviders(<ArticleDetail />, { store });

      expect(screen.getByTestId("save-button")).toHaveTextContent("Unsave");
    });
  });

  describe("Related Articles", () => {
    it("should show related articles when tag is clicked", async () => {
      mockUseLocation.mockReturnValue({
        state: { article: mockArticle },
      });
      vi.mocked(fetchTopStories).mockResolvedValue(mockTopStories);

      renderWithProviders(<ArticleDetail />);

      const technologyTag = screen.getByTestId("tag-chip-Technology");
      fireEvent.click(technologyTag);

      await waitFor(() => {
        expect(screen.getByTestId("related-title")).toBeInTheDocument();
      });

      expect(
        screen.getByText('Articles related to "Technology"'),
      ).toBeInTheDocument();
    });

    it("should show loading state when fetching related articles", async () => {
      mockUseLocation.mockReturnValue({
        state: { article: mockArticle },
      });
      vi.mocked(fetchTopStories).mockImplementation(
        () => new Promise(() => {}), // Never resolves
      );

      renderWithProviders(<ArticleDetail />);

      const technologyTag = screen.getByTestId("tag-chip-Technology");
      fireEvent.click(technologyTag);

      await waitFor(() => {
        expect(screen.getByTestId("loading-message")).toBeInTheDocument();
      });
    });

    it("should show error when related articles fetch fails", async () => {
      mockUseLocation.mockReturnValue({
        state: { article: mockArticle },
      });
      vi.mocked(fetchTopStories).mockRejectedValue(new Error("API Error"));

      renderWithProviders(<ArticleDetail />);

      const technologyTag = screen.getByTestId("tag-chip-Technology");
      fireEvent.click(technologyTag);

      await waitFor(() => {
        expect(screen.getByTestId("error-message")).toBeInTheDocument();
      });

      expect(
        screen.getByText("Failed to load related articles."),
      ).toBeInTheDocument();
    });

    it("should show no related articles message when none found", async () => {
      mockUseLocation.mockReturnValue({
        state: { article: mockArticle },
      });
      vi.mocked(fetchTopStories).mockResolvedValue([]);

      renderWithProviders(<ArticleDetail />);

      const technologyTag = screen.getByTestId("tag-chip-Technology");
      fireEvent.click(technologyTag);

      await waitFor(() => {
        expect(screen.getByTestId("no-related")).toBeInTheDocument();
      });

      expect(
        screen.getByText("No related articles found."),
      ).toBeInTheDocument();
    });

    it("should render related article links correctly", async () => {
      mockUseLocation.mockReturnValue({
        state: { article: mockArticle },
      });
      const relatedArticle = {
        ...mockTopStories[1],
        des_facet: ["Technology"],
      };
      vi.mocked(fetchTopStories).mockResolvedValue([relatedArticle]);

      renderWithProviders(<ArticleDetail />);

      const technologyTag = screen.getByTestId("tag-chip-Technology");
      fireEvent.click(technologyTag);

      await waitFor(() => {
        expect(screen.getByTestId("related-article-0")).toBeInTheDocument();
      });

      const relatedLink = screen.getByTestId("related-article-0");
      const expectedHref = `/article/${encodeURIComponent(relatedArticle.url)}`;
      expect(relatedLink).toHaveAttribute("href", expectedHref);
    });
  });

  describe("Responsive Design", () => {
    it("should apply mobile padding on small screens", () => {
      mockUseMediaQuery.mockReturnValue(true);

      mockUseLocation.mockReturnValue({
        state: { article: mockArticle },
      });

      renderWithProviders(<ArticleDetail />);

      const container = screen.getByTestId("article-detail");

      expect(container).toBeInTheDocument();

      expect(mockUseMediaQuery).toHaveBeenCalled();
    });

    it("should apply desktop padding on large screens", () => {
      mockUseMediaQuery.mockReturnValue(false);

      mockUseLocation.mockReturnValue({
        state: { article: mockArticle },
      });

      renderWithProviders(<ArticleDetail />);

      const container = screen.getByTestId("article-detail");
      expect(container).toBeInTheDocument();
      expect(mockUseMediaQuery).toHaveBeenCalled();
    });
  });

  describe("Side Effects", () => {
    it("should scroll to top on component mount", () => {
      mockUseLocation.mockReturnValue({
        state: { article: mockArticle },
      });

      renderWithProviders(<ArticleDetail />);

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "instant",
      });
    });

    it("should fetch top stories when not available in store", async () => {
      mockUseParams.mockReturnValue({ id: "0" });
      const store = createMockStore({ articles: { topStories: [] } });
      vi.mocked(fetchTopStories).mockResolvedValue(mockTopStories);

      renderWithProviders(<ArticleDetail />, { store });

      await waitFor(() => {
        expect(fetchTopStories).toHaveBeenCalled();
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle article without multimedia", () => {
      const articleWithoutMedia = {
        ...mockArticle,
        multimedia: [],
        isRead: false,
      };
      mockUseLocation.mockReturnValue({
        state: { article: articleWithoutMedia },
      });

      renderWithProviders(<ArticleDetail />);

      expect(screen.queryByTestId("article-image")).not.toBeInTheDocument();
      expect(screen.queryByTestId("image-caption")).not.toBeInTheDocument();
    });

    it("should handle article without des_facet", () => {
      const articleWithoutTags = {
        ...mockArticle,
        des_facet: [],
        isRead: false,
      };
      mockUseLocation.mockReturnValue({
        state: { article: articleWithoutTags },
      });

      renderWithProviders(<ArticleDetail />);

      expect(
        screen.queryByTestId("related-topics-title"),
      ).not.toBeInTheDocument();
    });

    it("should use first multimedia item when superJumbo not available", () => {
      const articleWithStandardMedia = {
        ...mockArticle,
        isRead: false,
        multimedia: [
          {
            url: "https://example.com/standard.jpg",
            format: "standard",
            height: 500,
            width: 750,
            type: "image",
            subtype: "photo",
            caption: "Standard image",
            copyright: "Test Copyright",
          },
        ],
      };
      mockUseLocation.mockReturnValue({
        state: { article: articleWithStandardMedia },
      });

      renderWithProviders(<ArticleDetail />);

      const image = screen.getByTestId("article-image");
      expect(image).toHaveAttribute("src", "https://example.com/standard.jpg");
    });
  });
});
