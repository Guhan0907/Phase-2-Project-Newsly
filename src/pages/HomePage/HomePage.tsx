// import { useState, useEffect, useCallback } from 'react';
// import { Container, Typography, CircularProgress, Box } from '@mui/material';
// import ArticleCard from '../../components/ArticleCard';
// import type { NYTArticle } from '../../types/article';
// import { fetchTopStories } from '../../services/apiCalls';

// const HomePage = () => {
//   const [articles, setArticles] = useState<NYTArticle[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const loadArticles = useCallback(async () => {
//     try {
//       setLoading(true);
//       const data = await fetchTopStories();
//       console.log("Fetched Data => " , data);
//       setArticles(data);
//     } catch (e) {
//       setError('Failed to load articles');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadArticles();
//   }, [loadArticles]);

//   if (loading) {
//     return (
//       <Container sx={{ textAlign: 'center', mt: 4 }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container sx={{ mt: 4 }}>
//         <Typography color="error">{error}</Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Top Stories
//       </Typography>

//       <Box
//         display="grid"
//         gridTemplateColumns={{
//           xs: '1fr',
//           sm: '1fr 1fr',
//           md: '1fr 1fr 1fr',
//         }}
//         gap={3}
//       >
//         {articles.map((article) => (
//           <ArticleCard key={article.url} article={article} />
//         ))}
//       </Box>
//     </Container>
//   );
// };

// export default HomePage;

import { useEffect, useState } from "react";
import { Container, Typography, Divider } from "@mui/material";
import FeaturedNewsCard from "../../components/FeaturedNewsCard";
import CompactNewsGrid from "../../components/CompactNewsGrid";
import { fetchTopStories, fetchTimesWireNews } from "../../services/apiCalls";
import type { NYTArticle } from "../../types/article";

const HomePage = () => {
  const [featured, setFeatured] = useState<NYTArticle | null>(null);
  const [topStories, setTopStories] = useState<NYTArticle[]>([]);

  useEffect(() => {
    const loadNews = async () => {
      const timesWireData = await fetchTimesWireNews();
      const topStoriesData = await fetchTopStories();

      if (timesWireData.length) {
        setFeatured(timesWireData[0]);
      }
      setTopStories(topStoriesData.slice(0, 9));
    };
    loadNews();
  }, []);

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

      {/* below is for the top stories */}
      <CompactNewsGrid articles={topStories} />
    </Container>
  );
};

export default HomePage;
