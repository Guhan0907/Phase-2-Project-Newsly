import { Outlet } from "react-router-dom";
import Header from "./pages/Header/Header";
import { Box } from "@mui/material";
import "./App.css";
import Footer from "./pages/Footer/Footer";

const App = () => {
  return (
    <>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Header />

        <Box flexGrow={1}>
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </>
  );
};

export default App;
