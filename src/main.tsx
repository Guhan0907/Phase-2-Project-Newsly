// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// import App from './App';
// import PageNotFound from './pages/PageNotFound/PageNotFound'; // Add a fallback route
// import HomePage from './pages/HomePage/HomePage';

// // Create MUI Theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#BA487F',
//     },
//     secondary: {
//       main: '#a8a432',
//     },
//   },
// });

// // Define router config
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <HomePage />,
//   },
//   {
//     path: '*',
//     element: <PageNotFound />,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <RouterProvider router={router} />
//     </ThemeProvider>
//   </React.StrictMode>
// );

// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import App from "./App";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import HomePage from "./pages/HomePage/HomePage";

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

// Define router config
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout wrapper with Header
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
