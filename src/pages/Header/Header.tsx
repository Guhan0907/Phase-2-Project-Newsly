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
import { useEffect, useState } from "react";
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
import { type AppDispatch, type RootState } from "../../redux/store";
import { fetchTopStories, fetchTimesWireNews } from "../../services/apiCalls";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import newsly from "../../assets/no_background.png";
import useDebounce from "../../hooks/useDebounce";
import LogoutConfirmDialog from "./LogoutConfirmDialog";
import { clearFavourites } from "../../redux/action/favouritesAction";
import { clearHistory } from "../../redux/action/historyActions";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

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
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
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
    dispatch(clearFavourites());
    dispatch(clearHistory());
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
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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

            {isLogged && (
              <SearchBar
                query={query}
                onQueryChange={setQueryInput}
                onSearch={handleSearch}
              />
            )}

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
                <UserMenu
                  user={{
                    name: parsedUser.name,
                    imageUrl: parsedUser.imageUrl,
                  }}
                  onLogout={() => setOpenLogoutConfirm(true)}
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

      <LogoutConfirmDialog
        open={openLogoutConfirm}
        onClose={() => setOpenLogoutConfirm(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Header;
