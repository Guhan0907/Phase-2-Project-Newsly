// // import { useSelector } from "react-redux";
// // import { useEffect, useState } from "react";
// // import type { RootState } from "../../redux/store";
// // import { fetchArticleById } from "../../services/apiCalls";
// // import { Box, CircularProgress, Grid, Typography } from "@mui/material";
// // import AllItemsCard from "../../components/AllItemCard";

// // const HistoryPage = () => {
// //   const history = useSelector((state: RootState) => state.history.history); // array of article URLs
// //   const [articles, setArticles] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const loadHistoryArticles = async () => {
// //       try {
// //         const results = await Promise.all(
// //           history.map(url => fetchArticleByUrl(url)) // You’ll implement this
// //         );
// //         setArticles(results.filter(Boolean));
// //       } catch (err) {
// //         console.error("Error loading history:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (history.length > 0) {
// //       loadHistoryArticles();
// //     } else {
// //       setLoading(false);
// //     }
// //   }, [history]);

// //   if (loading) {
// //     return (
// //       <Box display="flex" justifyContent="center" mt={4}>
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box p={2}>
// //       <Typography variant="h5" gutterBottom>
// //         Reading History
// //       </Typography>
// //       {articles.length === 0 ? (
// //         <Typography>No articles read yet.</Typography>
// //       ) : (
// //         <Grid container spacing={2}>
// //           {articles.map((article) => (
// //             <Grid item xs={12} sm={6} md={4} key={article.url}>
// //               <AllItemsCard article={article} />
// //             </Grid>
// //           ))}
// //         </Grid>
// //       )}
// //     </Box>
// //   );
// // };

// // export default HistoryPage;


// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import type { RootState } from "../../redux/store";
// import { fetchArticleById } from "../../services/apiCalls";
// import AllItemsCard from "../../components/AllItemCard";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Grid,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const HistoryPage = () => {
//   const navigate = useNavigate();
//   const historyUrls = useSelector((state: RootState) => state.history.history);
//   const [articles, setArticles] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadHistoryArticles = async () => {
//       try {
//         const allArticles = await fetchAllTopStories(); // You may also try Times Wire etc.
//         const matched = allArticles.filter(article =>
//           historyUrls.includes(article.url)
//         );
//         setArticles(matched);
//       } catch (error) {
//         console.error("Error fetching history articles", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadHistoryArticles();
//   }, [historyUrls]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box p={2}>
//       <Typography variant="h5" gutterBottom>
//         Reading History
//       </Typography>

//       {articles.length === 0 ? (
//         <Typography>No articles found in history.</Typography>
//       ) : (
//         <Grid container spacing={2}>
//           {articles.map((article) => (
//             <Grid item xs={12} sm={6} md={4} key={article.url}>
//               <Box onClick={() => navigate(`/article/${encodeURIComponent(article.url)}`)} sx={{ cursor: "pointer" }}>
//                 <AllItemsCard article={article} />
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default HistoryPage;


// // import {
// //   fetchTopStories,
// //   fetchTrendingStories,
// //   fetchTimesWireNews,
// // } from "../services/nytService";

// // useEffect(() => {
// //   const load = async () => {
// //     try {
// //       const [top, trending, wire] = await Promise.all([
// //         fetchTopStories(),
// //         fetchTrendingStories(),
// //         fetchTimesWireNews(),
// //       ]);

// //       const lookup = {
// //         top,
// //         trending,
// //         wire,
// //       };

// //       const resolved = history.map(({ url, source }) => {
// //         const article = lookup[source]?.find((a) => a.url === url);
// //         return article || null;
// //       });

// //       setArticles(resolved.filter(Boolean));
// //     } catch (e) {
// //       console.error("Failed to load history articles", e);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   load();
// // }, [history]);
