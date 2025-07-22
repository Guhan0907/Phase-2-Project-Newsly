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

const theme = createTheme({
  palette: {
    primary: {
      main: "#BA487F",
    },
    secondary: {
      main: "#a8a432",
    },
  },
});

const router = createBrowserRouter([
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
        element: <ArticleDetail />,
      },
      {
        path: "/favourites",
        element: <Favourites />,
      },
      {
        path: "/auth",
        element : <AuthPage />
      }
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
    ,
  </LocalizationProvider>,
);
