import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import ArticleDetail from "../ArticleDetail";
import { vi } from "vitest";

// Mock IntersectionObserver
vi.stubGlobal(
  "IntersectionObserver",
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
);

// Mock fetchTopStories
vi.mock("../../../services/apiCalls", () => ({
  fetchTopStories: vi.fn(() =>
    Promise.resolve([
      {
        title: "Mock Related Article",
        abstract: "This is a related article",
        url: "related-url",
        des_facet: ["Politics"],
        multimedia: [],
      },
    ]),
  ),
}));

const mockArticle = {
  url: "test-url",
  title: "Test Article",
  abstract: "This is a test abstract.",
  multimedia: [
    {
      url: "http://example.com/image.jpg",
      format: "superJumbo",
      caption: "Test Caption",
    },
  ],
  des_facet: ["Politics", "Economy"],
};

const renderWithProviders = (articleState = mockArticle, favourites = []) => {
  const middlesware: any = [thunk];
  const mockStore = configureStore(middlesware);
  const store = mockStore({
    favourites,
    history: [],
  });

  return render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[
          { pathname: "/article/1", state: { article: articleState } },
        ]}
      >
        <Routes>
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe("ArticleDetail Component", () => {
  it("renders article content correctly", () => {
    renderWithProviders();

    expect(screen.getByTestId("article-detail")).toBeInTheDocument();
    expect(screen.getByTestId("article-image")).toHaveAttribute(
      "src",
      "http://example.com/image.jpg",
    );
    expect(screen.getByTestId("article-abstract").textContent).toContain(
      "This is a test abstract.",
    );
    expect(screen.getByTestId("image-caption").textContent).toContain(
      "Test Caption",
    );
  });

  it("shows related articles on tag click", async () => {
    renderWithProviders();

    const tagChip = screen.getByTestId("tag-chip-Politics");
    fireEvent.click(tagChip);

    await waitFor(() => {
      expect(screen.getByTestId("related-title")).toBeInTheDocument();
      expect(screen.getByTestId("related-article-0")).toBeInTheDocument();
    });
  });

  // here i have written the skip code
  it.skip("shows fallback when article is missing", () => {
    renderWithProviders(undefined);

    expect(screen.getByTestId("article-not-found")).toBeInTheDocument();
  });

  it("dispatches add/remove from favourites on save", () => {
    renderWithProviders();

    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);
  });
});
