import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Typography,
  Divider,
  Fab,
  Zoom,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { KeyboardArrowUp as ArrowUpwardIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopStories, fetchTrendingStories } from "../../services/apiCalls";
import {
  fetchArticlesRequest,
  fetchArticlesSuccess,
  fetchArticlesFailure,
  fetchFeaturedSuccess,
} from "../../redux/action/articlesAction";
import { type AppDispatch, type RootState } from "../../redux/store";
import FeaturedNewsCard from "../../components/FeaturedNewsCard";
import CompactNewsGrid from "../../components/CompactNewsGrid";
import NewsFilterBar from "../../components/NewsFilterBar";
import CompactNewsGridShimmer from "../Shimmer/CompactNewsGridShimmer";
import FeaturedNewsCardShimmer from "../Shimmer/FeaturedNewsCardShimmer";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { featured, filtered, loading, error } = useSelector(
    (state: RootState) => state.articles,
  );

  const readHistory = useSelector((state: RootState) => state.history);
  const isRead = (articleUrl: string) => readHistory.includes(articleUrl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [storyType, setStoryType] = useState("top");
  const [filters, setFilters] = useState({
    category: "",
    section: "",
    date: "",
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString(),
  });

  const [page, setPage] = useState(1); // For infinite scroll
  const [showScroll, setShowScroll] = useState(false); // For Scroll to Top button

  useEffect(() => {
    const loadArticlesByType = async () => {
      try {
        dispatch(fetchArticlesRequest());

        if (storyType === "top") {
          const topStories = await fetchTopStories(filters.section || "home");
          dispatch(fetchFeaturedSuccess(topStories[0]));
          dispatch(fetchArticlesSuccess(topStories));
        } else if (storyType === "trending") {
          const trendingStories = await fetchTrendingStories();
          dispatch(fetchFeaturedSuccess(trendingStories[0]));
          dispatch(fetchArticlesSuccess(trendingStories));
        }

        setPage(1);
      } catch (error) {
        dispatch(fetchArticlesFailure("Failed to load articles"));
      }
    };

    loadArticlesByType();
  }, [storyType, filters.section, filters.year, filters.month, dispatch]);

  useEffect(() => {
    if (storyType === "trending") {
      setFilters((prev) => ({ ...prev, section: "", year: "", month: "" }));
    } else if (storyType === "archived") {
      setFilters((prev) => ({
        ...prev,
        section: "",
        year: prev.year || new Date().getFullYear().toString(),
        month: prev.month || (new Date().getMonth() + 1).toString(),
      }));
    } else if (storyType === "top") {
      setFilters((prev) => ({ ...prev, year: "", month: "" }));
    }
  }, [storyType]);

  // Filter + add read status
  const filteredArticles = useMemo(() => {
    return (filtered ?? []).filter((article) => {
      const matchesSection = filters.section
        ? article.section?.toLowerCase().trim() ===
          filters.section.toLowerCase().trim()
        : true;

      return matchesSection;
    });
  }, [filtered, filters]);

  const articlesWithReadStatus = filteredArticles.map((article) => ({
    ...article,
    isRead: isRead(article.url),
  }));

  // Simulate infinite scroll
  const visibleArticles = useMemo(() => {
    return articlesWithReadStatus.slice(0, page * 10); // 10 items per scroll
  }, [articlesWithReadStatus, page]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      const atTop = window.scrollY > 300;

      if (bottom && page * 10 < articlesWithReadStatus.length) {
        setPage((prev) => prev + 1);
      }

      setShowScroll(atTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, articlesWithReadStatus.length]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {error && <Typography color="error">{error}</Typography>}

      {loading && !featured && <FeaturedNewsCardShimmer />}

      {!loading && featured && (
        <>
          <FeaturedNewsCard article={featured} index={0} />
          <Divider sx={{ my: 4 }} />
        </>
      )}

      <NewsFilterBar
        storyType={storyType}
        onStoryTypeChange={setStoryType}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <Typography variant="h6" gutterBottom>
        {storyType === "top"
          ? "Top Stories"
          : storyType === "trending"
          ? "Trending Stories"
          : "Archived Stories (July 2024)"}
      </Typography>

      {loading ? (
        <CompactNewsGridShimmer />
      ) : (
        <CompactNewsGrid articles={visibleArticles} />
      )}

      {/* Scroll to Top Button */}
      <Zoom in={showScroll}>
        <Box
          onClick={scrollToTop}
          role="presentation"
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            zIndex: 2000,
            cursor: "pointer",
          }}
        >
          <Fab color="primary" size={isMobile ? "small" : "medium"}>
            <ArrowUpwardIcon />
          </Fab>
        </Box>
      </Zoom>
    </Container>
  );
};

export default HomePage;
