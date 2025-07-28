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
import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArticlesRequest,
  fetchArticlesSuccess,
  fetchArticlesFailure,
  fetchFeaturedSuccess,
} from "../../redux/action/articlesAction";
import { fetchTopStories, fetchTrendingStories } from "../../services/apiCalls";
import type { AppDispatch, RootState } from "../../redux/store";

// Lazy-loaded components
const FeaturedNewsCard = lazy(
  () => import("../../components/FeaturedNewsCard"),
);
const CompactNewsGrid = lazy(() => import("../../components/CompactNewsGrid"));
const NewsFilterBar = lazy(() => import("../../components/NewsFilterBar"));
const CompactNewsGridShimmer = lazy(
  () => import("../Shimmer/CompactNewsGridShimmer"),
);
const FeaturedNewsCardShimmer = lazy(
  () => import("../Shimmer/FeaturedNewsCardShimmer"),
);

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { featured, filtered, loading, error } = useSelector(
    (state: RootState) => state.articles,
  );

  const readHistory = useSelector((state: RootState) => state.history);
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

  const filteredArticles = useMemo(() => {
    return (filtered ?? []).filter((article) => {
      const matchesSection = filters.section
        ? article.section?.toLowerCase().trim() ===
          filters.section.toLowerCase().trim()
        : true;
      return matchesSection;
    });
  }, [filtered, filters]);

  const isReadMemo = useCallback(
    (url: string) => readHistory.includes(url),
    [readHistory],
  );

  const articlesWithReadStatus = useMemo(() => {
    return filteredArticles.map((article) => ({
      ...article,
      isRead: isReadMemo(article.url),
    }));
  }, [filteredArticles, isReadMemo]);

  const selectedCategory = useSelector(
    (state: RootState) => state.ui.selectedCategory,
  );

  useEffect(() => {
    if (storyType === "top" && selectedCategory) {
      setFilters((prev) => ({
        ...prev,
        section: selectedCategory,
        category: selectedCategory,
      }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedCategory]);

  const visibleArticles = useMemo(() => {
    return articlesWithReadStatus.slice(0, page * 10);
  }, [articlesWithReadStatus, page]);

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

  const handleStoryTypeChange = useCallback((type: string) => {
    setStoryType(type);
  }, []);

  const handleFiltersChange = useCallback((newFilters: any) => {
    setFilters(newFilters);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {error && <Typography color="error">{error}</Typography>}

      {/* Featured Article */}
      {loading && !featured && (
        <Suspense fallback={<div>Loading...</div>}>
          <FeaturedNewsCardShimmer />
        </Suspense>
      )}
      {!loading && featured && (
        <Suspense fallback={<FeaturedNewsCardShimmer />}>
          <>
            <FeaturedNewsCard article={featured} index={0} />
            <Divider sx={{ my: 4 }} />
          </>
        </Suspense>
      )}

      {/* Filters */}
      <Suspense fallback={<div>Loading filters...</div>}>
        <NewsFilterBar
          storyType={storyType}
          onStoryTypeChange={handleStoryTypeChange}
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
      </Suspense>

      {/* Title */}
      <Typography variant="h6" gutterBottom>
        {storyType === "top"
          ? "Top Stories"
          : storyType === "trending"
            ? "Trending Stories"
            : "Archived Stories (July 2024)"}
      </Typography>

      {/* Articles Grid */}
      <Suspense fallback={<CompactNewsGridShimmer />}>
        {loading ? (
          <CompactNewsGridShimmer />
        ) : (
          <CompactNewsGrid articles={visibleArticles} />
        )}
      </Suspense>

      {/* Scroll to Top */}
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
