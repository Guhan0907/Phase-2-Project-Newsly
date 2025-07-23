// import '@fontsource/playfair-display/700.css'; // For Headlines
// import '@fontsource/roboto/400.css'; // For Body Text
import { Outlet } from "react-router-dom";
import Header from "./pages/Header/Header";
import "./App.css";

const App = () => {

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
