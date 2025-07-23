// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   InputBase,
//   IconButton,
//   Box,
//   Menu,
//   MenuItem,
//   Avatar,
//   Badge,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import { Search, Favorite, Logout } from "@mui/icons-material";
// import { useLocation } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchArticlesFailure,
//   fetchArticlesRequest,
//   fetchArticlesSuccess,
//   fetchFeaturedSuccess,
//   setSearchMode,
// } from "../../redux/action/articlesAction";
// import { type AppDispatch, type RootState } from "../../redux/store";
// import { searchArticles } from "../../redux/action/searchAction";
// import { fetchTimesWireNews, fetchTopStories } from "../../services/apiCalls";
// import { useNavigate } from "react-router-dom";
// import SearchBar from "./SearchBar";

// interface HeaderProps {
//   onLogout: () => void;
//   user: { name: string; avatar: string } | null;
// }

// const Header = ({ onLogout, user }: HeaderProps) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [query, setQueryInput] = useState(""); // local input state
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const favoutites = useSelector((state: RootState) => state.favourites);

//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const location = useLocation();
//   const showBackButton = location.pathname !== "/";

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleSearch = () => {
//     const trimmedQuery = query.trim();

//     if (!trimmedQuery) {
//       // If input is empty, revert to default top stories
//       dispatch(setSearchMode(false));
//       dispatch(fetchArticlesRequest());

//       Promise.all([fetchTopStories(), fetchTimesWireNews()])
//         .then(([topStoriesData, timesWireData]) => {
//           dispatch(fetchArticlesSuccess(topStoriesData));
//           dispatch(fetchFeaturedSuccess(timesWireData[0]));
//         })
//         .catch(() => {
//           dispatch(fetchArticlesFailure("Failed to load articles."));
//         });

//       return;
//     }

//     // If there's a valid search term
//     dispatch(searchArticles(trimmedQuery));
//   };

//   const handleWishList = () => {
//     console.log("Wishlist clicked");
//     navigate("/favourites");
//   };

//   return (
//     <AppBar position="sticky" color="default" elevation={1}>
//       <Toolbar
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           px: 1,
//           py: isMobile ? 0.5 : 1,
//         }}
//       >
//         {/* Left: Back Button + Logo */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           {showBackButton && (
//             <IconButton
//               onClick={() => navigate(-1)}
//               edge="start"
//               color="inherit"
//               aria-label="back"
//               sx={{ mr: 1 }}
//             >
//               <ArrowBackIcon fontSize={isMobile ? "small" : "medium"} />
//             </IconButton>
//           )}
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: 600,
//               fontSize: isMobile ? "1rem" : "1.25rem",
//               whiteSpace: "nowrap",
//             }}
//           >
//             Newsly
//           </Typography>
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             border: "1px solid",
//             borderColor: "divider",
//             borderRadius: 2,
//             px: 1,
//             py: isMobile ? 0.25 : 0.5,
//             width: isMobile ? "40%" : "50%",
//           }}
//         >
//           <InputBase
//             placeholder="Search"
//             value={query}
//             onChange={(e) => setQueryInput(e.target.value)} // local update
//             sx={{
//               flex: 1,
//               fontSize: isMobile ? "0.8rem" : "1rem",
//               pl: 0.5,
//             }}
//             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//           />
//           <IconButton size="small" onClick={handleSearch}>
//             <Search fontSize={isMobile ? "small" : "medium"} />
//           </IconButton>
//         </Box>

//         {/* <SearchBar query={query} onQueryChange={setQueryInput} onSearch={handleSearch} /> */}

//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: isMobile ? 0.5 : 1,
//           }}
//         >
//           <IconButton
//             color="primary"
//             onClick={handleWishList}
//             size={isMobile ? "small" : "medium"}
//           >
//             <Badge badgeContent={favoutites.length} color="secondary">
//               <Favorite fontSize={isMobile ? "small" : "medium"} />
//             </Badge>
//           </IconButton>

//           {user && (
//             <>
//               <IconButton
//                 onClick={handleMenuOpen}
//                 size={isMobile ? "small" : "medium"}
//               >
//                 <Avatar
//                   src={user.avatar}
//                   alt={user.name}
//                   sx={{ width: isMobile ? 30 : 36, height: isMobile ? 30 : 36 }}
//                 />
//               </IconButton>
//               <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                 transformOrigin={{ vertical: "top", horizontal: "right" }}
//               >
//                 <MenuItem
//                   onClick={() => {
//                     handleMenuClose();
//                     onLogout();
//                   }}
//                 >
//                   <Logout fontSize="small" sx={{ mr: 1 }} /> Logout
//                 </MenuItem>
//               </Menu>
//             </>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;



import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Search, Favorite, Logout } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArticlesFailure,
  fetchArticlesRequest,
  fetchArticlesSuccess,
  fetchFeaturedSuccess,
  setSearchMode,
} from "../../redux/action/articlesAction";
import { type AppDispatch, type RootState } from "../../redux/store";
import { searchArticles } from "../../redux/action/searchAction";
import { fetchTimesWireNews, fetchTopStories } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import { logoutUser } from "../../redux/action/userAction";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [query, setQueryInput] = useState(""); // local input state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const favoutites = useSelector((state: RootState) => state.favourites);

  const location = useLocation();
  const showBackButton = location.pathname !== "/";

  const rawUser = useSelector((state: RootState) => state.user.user); // Or from localStorage
  const parsedUser = typeof rawUser === "string" ? JSON.parse(rawUser).user : rawUser;
  const isLogged = Boolean(rawUser?. email)


  const handleSearch = () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      // If input is empty, revert to default top stories
      dispatch(setSearchMode(false));
      dispatch(fetchArticlesRequest());

      Promise.all([fetchTopStories(), fetchTimesWireNews()])
        .then(([topStoriesData, timesWireData]) => {
          dispatch(fetchArticlesSuccess(topStoriesData));
          dispatch(fetchFeaturedSuccess(timesWireData[0]));
        })
        .catch(() => {
          dispatch(fetchArticlesFailure("Failed to load articles."));
        });

      return;
    }

    // If there's a valid search term
    dispatch(searchArticles(trimmedQuery));
  };

  const handleWishList = () => {
    console.log("Wishlist clicked");
    navigate("/favourites");
  };
  
  const handleLogout = () => {
  dispatch(logoutUser());
  navigate("/auth");
};


  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 1,
          py: isMobile ? 0.5 : 1,
        }}
      >
        {/* Left: Back Button + Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {showBackButton && (
            <IconButton
              onClick={() => navigate(-1)}
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mr: 1 }}
            >
              <ArrowBackIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: isMobile ? "1rem" : "1.25rem",
              whiteSpace: "nowrap",
            }}
          >
            Newsly
          </Typography>
        </Box>


        {isLogged && <SearchBar query={query} onQueryChange={setQueryInput} onSearch={handleSearch} />}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 0.5 : 1,
          }}
        >
          <IconButton
            color="primary"
            onClick={handleWishList}
            size={isMobile ? "small" : "medium"}
          >
            <Badge badgeContent={favoutites.length} color="secondary">
              <Favorite fontSize={isMobile ? "small" : "medium"} />
            </Badge>
          </IconButton>

  {parsedUser ? (
  <UserMenu
    user={{ name: parsedUser.name, imageUrl: parsedUser.imageUrl }}
    onLogout={handleLogout}
  />
) : (
  <Box
    sx={{
      cursor: "pointer",
      color: "primary.main",
      fontWeight: 500,
      fontSize: isMobile ? "0.85rem" : "1rem",
    }}
    onClick={() => navigate("/auth")}
  >
    Login
  </Box>
)}

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
