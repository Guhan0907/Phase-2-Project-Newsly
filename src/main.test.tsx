import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App"; // Make sure this is the root component that includes routing
import { store } from "./redux/store";
import { MemoryRouter } from "react-router-dom";

vi.mock("@mui/x-date-pickers", () => ({
  LocalizationProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
vi.mock("@mui/x-date-pickers/AdapterDayjs", () => ({
  AdapterDayjs: class {},
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({
      pathname: "/article/123",
      state: {
        article: {
          title: "Test Article",
          url: "https://example.com",
          multimedia: [],
          abstract: "Short summary",
          section: "world",
          byline: "By Author",
          published_date: "2025-07-27",
        },
      },
    }),
  };
});

vi.mock("./pages/HomePage/HomePage", () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));
vi.mock("./pages/Login/AuthPage", () => ({
  default: () => <div data-testid="auth-page">Auth Page</div>,
}));
vi.mock("./pages/PageNotFound/PageNotFound", () => ({
  default: () => <div data-testid="not-found">404 Not Found</div>,
}));

vi.mock("./pages/articlesDetail/ArticleDetail", () => ({
  default: () => <div data-testid="article-detail">Article Detail</div>,
}));
vi.mock("./pages/Favourites/Favourites", () => ({
  default: () => <div data-testid="favourites">Favourites</div>,
}));
vi.mock("./pages/Footer/ContactUs", () => ({
  default: () => <div data-testid="contact-us">Contact Us</div>,
}));

const theme = createTheme();

const renderWithProviders = (route: string) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );
};

describe("App Routing", () => {
  it.skip("renders HomePage on /", () => {
    renderWithProviders("/");
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it.skip("renders AuthPage on /auth", () => {
    renderWithProviders("/auth");
    expect(screen.getByTestId("auth-page")).toBeInTheDocument();
  });

  it.skip("renders 404 Page on invalid route", () => {
    renderWithProviders("/some-invalid-route");
    expect(screen.getByTestId("not-found")).toBeInTheDocument();
  });

  it.skip("renders ArticleDetail on /article/:id", () => {
    renderWithProviders("/article/123");
    expect(screen.getByTestId("article-detail")).toBeInTheDocument();
  });

  it.skip("renders Favourites on /favourites", () => {
    renderWithProviders("/favourites");
    expect(screen.getByTestId("favourites")).toBeInTheDocument();
  });

  it("renders ContactUs on /contact", () => {
    renderWithProviders("/contact");
    expect(screen.getByTestId("contact-us")).toBeInTheDocument();
  });
});
