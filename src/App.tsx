// import '@fontsource/playfair-display/700.css'; // For Headlines
// import '@fontsource/roboto/400.css'; // For Body Text
// import { Outlet } from "react-router-dom";
// import Header from "./pages/Header/Header";
// import "./App.css";

// const App = () => {
//   return (
//     <>
//       <Header />
//       <Outlet />
//     </>
//   );
// };

// export default App;



import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./pages/Header/Header";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fab, Zoom, Box } from "@mui/material";
import "./App.css";
import Footer from "./pages/Footer/Footer";

const App = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Header />

        <Box flexGrow={1}>
          <Outlet />
        </Box>

        <Footer />
      </Box>

      {/* <Zoom in={showScrollTop}>
        <Fab
          size="small"
          color="primary"
          onClick={scrollToTop}
          aria-label="scroll to top"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom> */}
    </>
  );
};

export default App;
