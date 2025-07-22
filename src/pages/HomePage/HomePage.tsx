// import { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   CircularProgress,
//   Divider,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchTopStories,
//   fetchTrendingStories,
//   fetchArchivedStories,
//   fetchTopStoriesBySection,
// } from "../../services/apiCalls";
// import {
//   fetchArticlesRequest,
//   fetchArticlesSuccess,
//   fetchArticlesFailure,
//   fetchFeaturedSuccess,
// } from "../../redux/action/articlesAction";
// import { type AppDispatch, type RootState } from "../../redux/store";
// import FeaturedNewsCard from "../../components/FeaturedNewsCard";
// import CompactNewsGrid from "../../components/CompactNewsGrid";
// import NewsFilterBar from "../../components/NewsFilterBar";

// const HomePage = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { featured, filtered, loading, error } = useSelector(
//     (state: RootState) => state.articles,
//   );

//   const [storyType, setStoryType] = useState("top");
//   const [initialLoaded, setInitialLoaded] = useState(false);

//   useEffect(() => {
//     const loadInitialTopStories = async () => {
//       try {
//         dispatch(fetchArticlesRequest());
//         const topStories = await fetchTopStories();
//         dispatch(fetchFeaturedSuccess(topStories[0]));
//         dispatch(fetchArticlesSuccess(topStories)); // Use full list initially
//         setInitialLoaded(true);
//       } catch {
//         dispatch(fetchArticlesFailure("Failed to load Top Stories"));
//       }
//     };

//     loadInitialTopStories();
//   }, [dispatch]);

//   useEffect(() => {
//     // if (!initialLoaded || storyType === "top") return;

//     const loadOtherStories = async () => {
//       try {
//         dispatch(fetchArticlesRequest());
//         let data = [];

//         if (storyType === "trending") {
//           data = await fetchTrendingStories();
//         } else if (storyType === "top") {
//           data = await fetchTopStories();
//         } else if (storyType === "archived") {
//           const year = 2024;
//           const month = 7;
//           data = await fetchArchivedStories(year, month);
//         }

//         dispatch(fetchArticlesSuccess(data));
//       } catch {
//         dispatch(fetchArticlesFailure("Failed to load stories"));
//       }
//     };

//     loadOtherStories();
//   }, [dispatch, storyType, initialLoaded]);

//   return (
//     <Container maxWidth="lg" sx={{ py: 3 }}>
//       {loading && <CircularProgress sx={{ mt: 4 }} />}
//       {error && <Typography color="error">{error}</Typography>}

//       <NewsFilterBar storyType={storyType} onStoryTypeChange={setStoryType} />

//       {!loading && !error && featured && (
//         <>
//           <FeaturedNewsCard article={featured} index={0} />
//           <Divider sx={{ my: 4 }} />
//         </>
//       )}

//       {/* <NewsFilterBar
//         storyType={storyType}
//         onStoryTypeChange={setStoryType}
//       /> */}

//       <Typography variant="h6" gutterBottom>
//         {storyType === "top"
//           ? "Top Stories"
//           : storyType === "trending"
//             ? "Trending Stories"
//             : "Archived Stories (July 2024)"}
//       </Typography>

//       <CompactNewsGrid articles={filtered ?? []} />
//     </Container>
//   );
// };

// export default HomePage;

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTopStories,
} from "../../services/apiCalls";
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
import { useMemo } from "react";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { featured, filtered, loading, error } = useSelector(
    (state: RootState) => state.articles,
  );

  const [storyType, setStoryType] = useState("top");
  const [initialLoaded, setInitialLoaded] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    section: "",
    date: "",
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString(),
  });

  useEffect(() => {
    const loadInitialTopStories = async () => {
      try {
        dispatch(fetchArticlesRequest());
        const topStories = await fetchTopStories();
        dispatch(fetchFeaturedSuccess(topStories[0]));
        dispatch(fetchArticlesSuccess(topStories));
        setInitialLoaded(true);
      } catch {
        dispatch(fetchArticlesFailure("Failed to load Top Stories"));
      }
    };

    loadInitialTopStories();
  }, [dispatch]);

  useEffect(() => {
    if (storyType === "trending") {
      setFilters((prev) => ({
        ...prev,
        section: "",
        year: "",
        month: "",
      }));
    } else if (storyType === "archived") {
      setFilters((prev) => ({
        ...prev,
        section: "",
        year: prev.year || new Date().getFullYear().toString(),
        month: prev.month || (new Date().getMonth() + 1).toString(),
      }));
    } else if (storyType === "top") {
      setFilters((prev) => ({
        ...prev,
        year: "",
        month: "",
      }));
    }
  }, [storyType]);

  // Client-side filtering logic
  const filteredArticles = useMemo(() => {
    return (filtered ?? []).filter((article) => {
      const matchesSection = filters.section
        ? article.section?.toLowerCase().trim() ===
          filters.section.toLowerCase().trim()
        : true;

      return matchesSection;
    });
  }, [filtered, filters]);

  console.log(filteredArticles, "----- ");

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {loading && <CircularProgress sx={{ mt: 4 }} />}
      {error && <Typography color="error">{error}</Typography>}

      <NewsFilterBar
        storyType={storyType}
        onStoryTypeChange={setStoryType}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {!loading && !error && featured && (
        <>
          <FeaturedNewsCard article={featured} index={0} />
          <Divider sx={{ my: 4 }} />
        </>
      )}

      <Typography variant="h6" gutterBottom>
        {storyType === "top"
          ? "Top Stories"
          : storyType === "trending"
            ? "Trending Stories"
            : "Archived Stories (July 2024)"}
      </Typography>

      <CompactNewsGrid articles={filteredArticles} />
    </Container>
  );
};

export default HomePage;
