// import { Outlet } from 'react-router-dom';
// import Header from './pages/Header/Header';
// // import Header from './components/Header';

// const App = () => {
//   const isLoggedIn = true; // Replace with Redux state or auth check
//   const user = isLoggedIn
//     ? { name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=3' }
//     : null;

//   const handleSearch = (query: string) => {
//     console.log('Search:', query);
//     // TODO: Trigger search logic or Redux dispatch
//   };

//   const handleLogout = () => {
//     console.log('User logged out');
//     // TODO: Clear auth from Redux
//   };

//   return (
//     <>
//       <Header user={user} onSearch={handleSearch} onLogout={handleLogout} />
//       <Outlet />
//     </>
//   );
// };

// export default App;

// src/App.tsx
import { Outlet } from "react-router-dom";
import Header from "./pages/Header/Header";
import "./App.css";

const App = () => {
  const user = {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=8",
  };

  const handleSearch = (query: string) => {
    console.log("Search:", query);
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <>
      <Header user={user} onSearch={handleSearch} onLogout={handleLogout} />
      <Outlet />
    </>
  );
};

export default App;
