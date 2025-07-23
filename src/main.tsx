import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import App from "./App";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import HomePage from "./pages/HomePage/HomePage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ErrorBoundary from "./pages/ErrorBoundary/ErrorBoundary";
import ArticleDetail from "./pages/articlesDetail/articlesDetail";
import Favourites from "./pages/Favourites/Favourites";
import AuthPage from "./pages/Login/AuthPage";
import ProtectedRoutes from "./pages/ProtectedRoutes/ProtectedRoutes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#BA487F",
    },
    secondary: {
      main: "#a8a432",
    },
  },
  // typography: {
  //   fontFamily: 'Roboto, sans-serif',
  //   h1: {
  //     fontFamily: 'Playfair Display, serif',
  //     fontWeight: 700,
  //   },
  //   h2: {
  //     fontFamily: 'Playfair Display, serif',
  //     fontWeight: 700,
  //   },
  //   h3: {
  //     fontFamily: 'Playfair Display, serif',
  //     fontWeight: 700,
  //   },
  //   body1: {
  //     fontFamily: 'Roboto, sans-serif',
  //     fontWeight: 400,
  //   },
  //   body2: {
  //     fontFamily: 'Roboto, sans-serif',
  //   },
  // },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />, // Public
      },
      {
        path: "article/:id",
        element: (
          <ProtectedRoutes>
            <ArticleDetail />
          </ProtectedRoutes>
        ),
      },
      {
        path: "favourites",
        element: (
          <ProtectedRoutes>
            <Favourites />
          </ProtectedRoutes>
        ),
      },
      {
        path: "auth",
        element: <AuthPage />, // Public login page
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </LocalizationProvider>,
);
