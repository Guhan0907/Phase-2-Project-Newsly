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
import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArticlesSuccess,
  fetchFeaturedSuccess,
} from "../../redux/action/articlesAction";
import { searchArticles } from "../../redux/action/searchAction";
import { logoutUser } from "../../redux/action/userAction";
import { type AppDispatch, type RootState } from "../../redux/store";
import { fetchTopStories, fetchTimesWireNews } from "../../services/apiCalls";
import useDebounce from "../../hooks/useDebounce";
import { clearFavourites } from "../../redux/action/favouritesAction";
import { clearHistory } from "../../redux/action/historyActions";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import newsly from "../../assets/no_background.png";

// Lazy-loaded components
const SearchBar = lazy(() => import("./SearchBar"));
const UserMenu = lazy(() => import("./UserMenu"));
const LogoutConfirmDialog = lazy(() => import("./LogoutConfirmDialog"));

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
  const isLogged = parsedUser?.email;

  const [query, setQueryInput] = useState("");
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
  const debouncedQuery = useDebounce(query, 1000);

  const fetchDefaultArticles = () => {

    Promise.all([fetchTopStories(), fetchTimesWireNews()])
      .then(([topStories, featured]) => {
        dispatch(fetchArticlesSuccess(topStories));
        dispatch(fetchFeaturedSuccess(featured[0]));
      })
      .catch((error) => {
        console.error("Error while fetching the details" , error)
      });
  };

  const handleSearch = () => {
    const trimmed = query.trim();
    console.log(" Trimmed ",trimmed)
    if (!trimmed) {
      // called when the user enter only blank
      fetchDefaultArticles();
    } else {
      dispatch(searchArticles(trimmed));
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearFavourites());
    dispatch(clearHistory());
    navigate("/auth");
  };

// this is in header part for the another one API call getting called there..............
  useEffect(() => {
    if (!isLogged) return;
    const trimmed = debouncedQuery.trim();

    if (!trimmed) {
      fetchDefaultArticles();
    } else {
      dispatch(searchArticles(trimmed));
    }
  }, [debouncedQuery]);

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Logo  Back Button */}
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

            {/* SearchBar */}
            {isLogged &&
              !location.pathname.startsWith("/article") &&
              location.pathname !== "/favourites" && (
                <Suspense fallback={<div style={{ width: 300 }} />}>
                  <SearchBar
                    query={query}
                    onQueryChange={setQueryInput}
                    onSearch={handleSearch}
                  />
                </Suspense>
              )}

            {/*  Favourites + User */}
            <Box display="flex" alignItems="center" gap={isMobile ? 0.5 : 1}>
              <IconButton
                onClick={() => navigate("/favourites")}
                color="primary"
              >
                <Badge badgeContent={favourites.length} color="success">
                  <BookmarkBorderOutlinedIcon
                    fontSize={isMobile ? "medium" : "large"}
                  />
                </Badge>
              </IconButton>

              {parsedUser ? (
                <Suspense fallback={<div>...</div>}>
                  <UserMenu
                    user={{
                      name: parsedUser.name,
                      imageUrl: parsedUser.imageUrl,
                    }}
                    onLogout={() => setOpenLogoutConfirm(true)}
                  />
                </Suspense>
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

      {/* Logout Dialog */}
      <Suspense fallback={null}>
        <LogoutConfirmDialog
          open={openLogoutConfirm}
          onClose={() => setOpenLogoutConfirm(false)}
          onConfirm={handleLogout}
        />
      </Suspense>
    </>
  );
};

export default Header;
