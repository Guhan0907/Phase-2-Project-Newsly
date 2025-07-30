
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
  fetchArticlesSuccess,
  fetchFeaturedSuccess,
} from "../../redux/action/articlesAction";
import { fetchTimesWireNews, fetchTopStories, fetchTrendingStories } from "../../services/apiCalls";
import type { AppDispatch, RootState } from "../../redux/store";

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
  });

  const [page, setPage] = useState(1); // For infinite scroll
  const [showScroll, setShowScroll] = useState(false); // For Scroll to Top button

  useEffect(() => {
    const loadArticlesByType = async () => {
      try {
        // dispatch(fetchArticlesRequest());

        if (storyType === "top") {
          const topStories = await fetchTopStories(filters.section || "home"); // for the section part data is send here
          const timeWireNews = await fetchTimesWireNews();
          dispatch(fetchFeaturedSuccess(timeWireNews[0])); 
          dispatch(fetchArticlesSuccess(topStories));
        } else if (storyType === "trending") {

          const trendingStories = await fetchTrendingStories();
          const timeWireNews = await fetchTimesWireNews();
          dispatch(fetchFeaturedSuccess(timeWireNews[0])); 
          dispatch(fetchArticlesSuccess(trendingStories));
        }

        setPage(1); // for the pagination part
      } catch (error) {
        console.error("Error occured" , error)
        // dispatch(fetchArticlesFailure("Failed to load articles"));
      }
    };

    loadArticlesByType(); // inside the useEffect i cannot use the await or pass the async so it is called in a manner of function
  }, [storyType, filters.section,  dispatch]);



  // Get only the articles that match the selected section
const filteredArticles = useMemo(() => {
  const allArticles = filtered || [];

  return allArticles.filter((article) => {
    // If section is selected, only show matching articles
    if (filters.section) {
      const articleSection = article.section?.toLowerCase().trim();
      const selectedSection = filters.section.toLowerCase().trim();
      return articleSection === selectedSection;
    }
    // If no section selected, include all
    return true;
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
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100; // this is used to fetch when the users came near lastArticle
      const atTop = window.scrollY > 300;
      // console.log("pages - ",page);
      

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
      <Typography variant="h6" marginBottom={2}>
        {storyType === "top"
          ? "Top Stories" :
             "Trending Stories"}
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