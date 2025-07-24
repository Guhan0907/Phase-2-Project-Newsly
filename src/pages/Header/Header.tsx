// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Box,
//   Badge,
//   useMediaQuery,
//   useTheme,
//   Container,
// } from "@mui/material";
// import {  BookmarkBorderSharp } from "@mui/icons-material";
// import { useLocation } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchArticlesFailure,
//   fetchArticlesRequest,
//   fetchArticlesSuccess,
//   fetchFeaturedSuccess,
//   setSearchMode,
// } from "../../redux/action/articlesAction";
// import { persistor, type AppDispatch, type RootState } from "../../redux/store";
// import { searchArticles } from "../../redux/action/searchAction";
// import { fetchTimesWireNews, fetchTopStories } from "../../services/apiCalls";
// import { useNavigate } from "react-router-dom";
// import SearchBar from "./SearchBar";
// import UserMenu from "./UserMenu";
// import { logoutUser } from "../../redux/action/userAction";
// import newsly from "../../assets/no_background.png";
// import { googleLogout } from "@react-oauth/google";
// import useDebounce from "../../hooks/useDebounce";

// const Header = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [query, setQueryInput] = useState(""); // local input state
//   const debouncedQuery = useDebounce(query, 1000);

//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const favoutites = useSelector((state: RootState) => state.favourites);

//   const location = useLocation();
//   const showBackButton = location.pathname !== "/";

//   const rawUser = useSelector((state: RootState) => state.user.user); // Or from localStorage
//   const parsedUser =
//     typeof rawUser === "string" ? JSON.parse(rawUser).user : rawUser;
//   const isLogged = Boolean(rawUser?.email);

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

//   const handleLogout = () => {
//   //     googleLogout();
//   // window.google?.accounts.id.disableAutoSelect?.();
//     dispatch(logoutUser());
//     persistor.purge();
//     navigate("/auth");
//   };

//   useEffect(() => {
//   if (!isLogged) return;

//   const trimmedQuery = debouncedQuery.trim();

//   if (trimmedQuery === "") {
//     dispatch(setSearchMode(false));
//     dispatch(fetchArticlesRequest());

//     Promise.all([fetchTopStories(), fetchTimesWireNews()])
//       .then(([topStoriesData, timesWireData]) => {
//         dispatch(fetchArticlesSuccess(topStoriesData));
//         dispatch(fetchFeaturedSuccess(timesWireData[0]));
//       })
//       .catch(() => {
//         dispatch(fetchArticlesFailure("Failed to load articles."));
//       });

//     return;
//   }

//   dispatch(searchArticles(trimmedQuery));
// }, [debouncedQuery]);

//   return (
//     <AppBar position="sticky" color="default" elevation={1}>
//       {/* for the matching the herader with the body */}
//       <Container maxWidth="xl">
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             // px: 1,
//             // py: isMobile ? 0.5 : 1,
//           }}
//         >
//           {/* Left: Back Button + Logo */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             {showBackButton && (
//               <IconButton
//                 onClick={() => navigate(-1)}
//                 edge="start"
//                 color="inherit"
//                 aria-label="back"
//                 sx={{ mr: 1 }}
//               >
//                 <ArrowBackIcon fontSize={isMobile ? "small" : "medium"} />
//               </IconButton>
//             )}

//             <Box
//               component="img"
//               src={newsly}
//               alt="Newsly Logo"
//               onClick={() => navigate("/")}
//               sx={{
//                 width: 80,
//                 height: 70,
//                 borderRadius: "8px",
//                 mr: 1,
//                 cursor: "pointer",
//               }}
//             />
//           </Box>

//           {isLogged && (
//             <SearchBar
//               query={query}
//               onQueryChange={setQueryInput}
//               onSearch={handleSearch}
//             />
//           )}

//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: isMobile ? 0.5 : 1,
//             }}
//           >
//             <IconButton
//               color="primary"
//               onClick={handleWishList}
//               size={isMobile ? "small" : "medium"}
//             >
//               <Badge badgeContent={favoutites.length} color="secondary">
//                 <BookmarkBorderSharp fontSize={isMobile ? "medium" : "large"} />
//               </Badge>
//             </IconButton>

//             {parsedUser ? (
//               <UserMenu
//                 user={{ name: parsedUser.name, imageUrl: parsedUser.imageUrl }}
//                 onLogout={handleLogout}
//               />
//             ) : (
//               <Box
//                 sx={{
//                   cursor: "pointer",
//                   color: "primary.main",
//                   fontWeight: 500,
//                   fontSize: isMobile ? "0.85rem" : "1rem",
//                 }}
//                 onClick={() => navigate("/auth")}
//               >
//                 Login
//               </Box>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default Header;

import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Badge,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import { BookmarkBorderSharp, ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArticlesFailure,
  fetchArticlesRequest,
  fetchArticlesSuccess,
  fetchFeaturedSuccess,
  setSearchMode,
} from "../../redux/action/articlesAction";
import { searchArticles } from "../../redux/action/searchAction";
import { logoutUser } from "../../redux/action/userAction";
import { persistor, type AppDispatch, type RootState } from "../../redux/store";
import { fetchTopStories, fetchTimesWireNews } from "../../services/apiCalls";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import newsly from "../../assets/no_background.png";
import useDebounce from "../../hooks/useDebounce";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const showBackButton = location.pathname !== "/";
  const favourites = useSelector((state: RootState) => state.favourites);

  const rawUser = useSelector((state: RootState) => state.user.user);
  const parsedUser =
    typeof rawUser === "string" ? JSON.parse(rawUser)?.user : rawUser;
  const isLogged = !!parsedUser?.email;

  const [query, setQueryInput] = useState("");
  const debouncedQuery = useDebounce(query, 1000);

  const fetchDefaultArticles = () => {
    dispatch(setSearchMode(false));
    dispatch(fetchArticlesRequest());

    Promise.all([fetchTopStories(), fetchTimesWireNews()])
      .then(([topStories, featured]) => {
        dispatch(fetchArticlesSuccess(topStories));
        dispatch(fetchFeaturedSuccess(featured[0]));
      })
      .catch(() => {
        dispatch(fetchArticlesFailure("Failed to load articles."));
      });
  };

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) {
      fetchDefaultArticles();
    } else {
      dispatch(searchArticles(trimmed));
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    persistor.purge();
    navigate("/auth");
  };

  useEffect(() => {
    if (!isLogged) return;
    const trimmed = debouncedQuery.trim();

    if (!trimmed) {
      fetchDefaultArticles();
    } else {
      dispatch(searchArticles(trimmed));
    }
  }, [debouncedQuery, isLogged]);

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left: Back + Logo */}
          <Box display="flex" alignItems="center">
            {showBackButton && (
              <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
                <ArrowBack fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            )}
            <Box
              component="img"
              src={newsly}
              alt="Newsly Logo"
              onClick={() => navigate("/")}
              sx={{
                width: 80,
                height: 70,
                borderRadius: 2,
                cursor: "pointer",
              }}
            />
          </Box>

          {/* Center: Search */}
          {isLogged && (
            <SearchBar
              query={query}
              onQueryChange={setQueryInput}
              onSearch={handleSearch}
            />
          )}

          {/* Right: Wishlist + User */}
          <Box display="flex" alignItems="center" gap={isMobile ? 0.5 : 1}>
            <IconButton onClick={() => navigate("/favourites")} color="primary">
              <Badge badgeContent={favourites.length} color="secondary">
                <BookmarkBorderSharp fontSize={isMobile ? "medium" : "large"} />
              </Badge>
            </IconButton>

            {parsedUser ? (
              <UserMenu
                user={{
                  name: parsedUser.name,
                  imageUrl: parsedUser.imageUrl,
                }}
                onLogout={handleLogout}
              />
            ) : (
              <Box
                onClick={() => navigate("/auth")}
                sx={{
                  cursor: "pointer",
                  color: "primary.main",
                  fontWeight: 500,
                  fontSize: isMobile ? "0.85rem" : "1rem",
                }}
              >
                Login
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
