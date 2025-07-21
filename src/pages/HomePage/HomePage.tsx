// import { useEffect, useState } from "react";
// import { Container, Typography, Divider } from "@mui/material";
// import FeaturedNewsCard from "../../components/FeaturedNewsCard";
// import CompactNewsGrid from "../../components/CompactNewsGrid";
// import { fetchTopStories, fetchTimesWireNews } from "../../services/apiCalls";
// import type { NYTArticle } from "../../types/article";

// const HomePage = () => {
//   const [featured, setFeatured] = useState<NYTArticle | null>(null);
//   const [topStories, setTopStories] = useState<NYTArticle[]>([]);

//   useEffect(() => {
//     const loadNews = async () => {
//       const timesWireData = await fetchTimesWireNews();
//       const topStoriesData = await fetchTopStories();

//       if (timesWireData.length) {
//         setFeatured(timesWireData[0]);
//       }
//       setTopStories(topStoriesData.slice(0, 9));
//     };
//     loadNews();
//   }, []);

//   return (
//     <Container maxWidth="lg" sx={{ py: 3 }}>
//       {featured && (
//         <>
//           <FeaturedNewsCard article={featured} />
//           <Divider sx={{ my: 4 }} />
//         </>
//       )}
//       <Typography variant="h6" gutterBottom>
//         Top Stories
//       </Typography>

//       {/* below is for the top stories */}
//       <CompactNewsGrid articles={topStories} />
//     </Container>
//   );
// };

// export default HomePage;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import FeaturedNewsCard from "../../components/FeaturedNewsCard";
import CompactNewsGrid from "../../components/CompactNewsGrid";
import { fetchTopStories, fetchTimesWireNews } from "../../services/apiCalls";
import {
  fetchArticlesRequest,
  fetchArticlesFailure,
  fetchArticlesSuccess,
  fetchFeaturedSuccess,
} from "../../redux/action/articlesAction";
import { type AppDispatch, type RootState } from "../../redux/store";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { featured, filtered, loading, error } = useSelector(
    (state: RootState) => state.articles,
  );

  useEffect(() => {
    const loadNews = async () => {
      try {
        dispatch(fetchArticlesRequest());

        const [topStoriesData, timesWireData] = await Promise.all([
          fetchTopStories(),
          fetchTimesWireNews(),
        ]);

        dispatch(fetchArticlesSuccess(topStoriesData));
        dispatch(fetchFeaturedSuccess(timesWireData[0]));
      } catch (err) {
        dispatch(fetchArticlesFailure("Failed to load articles."));
      }
    };

    loadNews();
  }, [dispatch]);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {featured && (
        <>
          <FeaturedNewsCard article={featured} />
          <Divider sx={{ my: 4 }} />
        </>
      )}

      <Typography variant="h6" gutterBottom>
        Top Stories
      </Typography>
      <CompactNewsGrid articles={filtered} />
    </Container>
  );
};

export default HomePage;
