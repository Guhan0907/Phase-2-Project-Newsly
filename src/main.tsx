import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import App from "./App";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import HomePage from "./pages/HomePage/HomePage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ErrorBoundary from "./pages/ErrorBoundary/ErrorBoundary";
import ArticleDetail from "./pages/articlesDetail/ArticleDetail";
import Favourites from "./pages/Favourites/Favourites";
import AuthPage from "./pages/Login/AuthPage";
import ProtectedRoutes from "./pages/ProtectedRoutes/ProtectedRoutes";
import ContactUs from "./pages/Footer/ContactUs";
// import ErrorPage from "./services/ErrorPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#BA487F",
    },
    secondary: {
      main: "#a8a432",
    },
    error: {
      main: "#cb4335",
    },
    success: {
      main: "#28b463",
    },
  },
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
        path: "/contact",
        element: (
          <ProtectedRoutes>
            <ContactUs />
          </ProtectedRoutes>
        ),
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  // {
  //   path: "/error",
  //   element: <ErrorPage />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeProvider>
  </Provider>,
);
