// import {
//   Box,
//   Typography,
//   Button,
//   Stack,
//   Divider,
//   useMediaQuery,
//   useTheme,
//   Chip,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useMemo, useCallback } from "react";
// import type { NYTArticle } from "../../types/article";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../../redux/store";
// import {
//   addToFavourites,
//   removeFromFavourites,
// } from "../../redux/action/favouritesAction";
// import { addToHistory } from "../../redux/action/historyActions";
// import ArticleDetailAction from "./ArticleDetailAction";
// import ArticleDetailHeading from "./ArticleDetailHeading";
// import { useReadObserver } from "../../hooks/readObserverHook";

// const ArticleDetail = () => {
//   const { state } = useLocation();
//   const article: NYTArticle = state?.article;
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const dispatch = useDispatch<AppDispatch>();

//   const favourites = useSelector((state: RootState) => state.favourites);

//   const isSaved = useMemo(() => {
//     if (!article?.url) return false;
//     return favourites.includes(article.url);
//   }, [favourites, article?.url]);

//   // Scroll to top on mount
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "instant" });
//   }, []);

//   // Handle article not found
//   if (!article) {
//     return (
//       <Box p={3}>
//         <Typography variant="h6" color="error">
//           Article not found.
//         </Typography>
//         <Button
//           onClick={() => navigate(-1)}
//           startIcon={<ArrowBackIcon />}
//           sx={{ mt: 2 }}
//         >
//           Go Back
//         </Button>
//       </Box>
//     );
//   }

//   const mainImage = useMemo(() => {
//     return (
//       article.multimedia?.find((m) => m.format === "superJumbo") ??
//       article.multimedia?.[0]
//     );
//   }, [article.multimedia]);

//   // Reading observer (to track read history)
//   const readObserver = useReadObserver(
//     useCallback(() => {
//       dispatch(addToHistory(article.url));
//       console.log("History stored ======");
//     }, [dispatch, article.url]),
//   );

//   const handleSave = useCallback(() => {
//     if (isSaved) {
//       dispatch(removeFromFavourites(article.url));
//     } else {
//       dispatch(addToFavourites(article.url));
//     }
//   }, [dispatch, isSaved, article.url]);

//   return (
//     <Box
//       maxWidth="md"
//       mx="auto"
//       px={isMobile ? 2 : 4}
//       py={4}
//       sx={{
//         fontFamily: "'Georgia', serif",
//         lineHeight: 1.75,
//       }}
//     >
//       <ArticleDetailHeading article={article} />

//       {mainImage && (
//         <Box
//           component="img"
//           src={mainImage.url}
//           alt={mainImage.caption || article.title}
//           sx={{
//             width: "100%",
//             borderRadius: 2,
//             maxHeight: 500,
//             objectFit: "cover",
//             mb: 2,
//           }}
//         />
//       )}

//       {mainImage?.caption && (
//         <Typography
//           variant="caption"
//           color="text.secondary"
//           display="block"
//           gutterBottom
//         >
//           {mainImage.caption}
//         </Typography>
//       )}

//       <Typography variant="h6" fontWeight={500} mt={2} mb={2}>
//         {article.abstract}
//       </Typography>

//       {Array.isArray(article.des_facet) && article.des_facet.length > 0 && (
//         <>
//           <Typography variant="subtitle2" fontWeight={600} gutterBottom>
//             Related Topics:
//           </Typography>
//           <Stack direction="row" spacing={1} flexWrap="wrap" mb={3}>
//             {article.des_facet.map((tag, i) => (
//               <Chip key={i} label={tag} variant="outlined" />
//             ))}
//           </Stack>
//         </>
//       )}

//       <Box ref={readObserver}>
//         <ArticleDetailAction
//           isSaved={isSaved}
//           onSave={handleSave}
//           articleTitle={article.title}
//         />
//       </Box>

//       <Divider sx={{ my: 3 }} />
//     </Box>
//   );
// };

// export default ArticleDetail;

import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  useMediaQuery,
  useTheme,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useCallback, useState } from "react";
import type { NYTArticle } from "../../types/article";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../redux/action/favouritesAction";
import { addToHistory } from "../../redux/action/historyActions";
import { fetchTopStories } from "../../services/apiCalls";
import ArticleDetailAction from "./ArticleDetailAction";
import ArticleDetailHeading from "./ArticleDetailHeading";
import { useReadObserver } from "../../hooks/readObserverHook";

const ArticleDetail = () => {
  const { state } = useLocation();
  const article: NYTArticle | undefined = state?.article;
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch<AppDispatch>();

  // Tag click logic
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NYTArticle[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [errorRelated, setErrorRelated] = useState<string | null>(null);

  const handleTagClick = useCallback(async (tag: string) => {
    setSelectedTag(tag);
    setLoadingRelated(true);
    setErrorRelated(null);

    try {
      const res = await fetchTopStories();
      console.log("res -> ", res);

      const articles: NYTArticle[] = Array.isArray(res)
        ? res
        : (res?.results ?? []);
      console.log("Total articles received:", articles.length);

      const filtered = articles
        .filter((a) =>
          a.des_facet?.some((facet) =>
            facet.toLowerCase().includes(tag.toLowerCase()),
          ),
        )
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);

      setRelatedArticles(filtered);
    } catch (err) {
      console.error(err);
      setErrorRelated("Failed to load related articles.");
    } finally {
      setLoadingRelated(false);
    }
  }, []);

  if (!article) {
    return (
      <Box p={3}>
        <Typography variant="h6" color="error">
          Article not found.
        </Typography>
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  const favourites = useSelector((state: RootState) => state.favourites);

  const isSaved = useMemo(() => {
    return favourites.includes(article.url);
  }, [favourites, article.url]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const mainImage = useMemo(() => {
    return (
      article.multimedia?.find((m) => m.format === "superJumbo") ??
      article.multimedia?.[0]
    );
  }, [article.multimedia]);

  // Track read history
  const readObserver = useReadObserver(
    useCallback(() => {
      dispatch(addToHistory(article.url));
    }, [dispatch, article.url]),
  );

  const handleSave = useCallback(() => {
    if (isSaved) {
      dispatch(removeFromFavourites(article.url));
    } else {
      dispatch(addToFavourites(article.url));
    }
  }, [dispatch, isSaved, article.url]);

  return (
    <Box
      maxWidth="md"
      mx="auto"
      px={isMobile ? 2 : 4}
      py={4}
      sx={{
        fontFamily: "'Georgia', serif",
        lineHeight: 1.75,
      }}
    >
      <ArticleDetailHeading article={article} />

      {mainImage && (
        <Box
          component="img"
          src={mainImage.url}
          alt={mainImage.caption || article.title}
          sx={{
            width: "100%",
            borderRadius: 2,
            maxHeight: 500,
            objectFit: "cover",
            mb: 2,
          }}
        />
      )}

      {mainImage?.caption && (
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          gutterBottom
        >
          {mainImage.caption}
        </Typography>
      )}

      <Typography variant="h6" fontWeight={500} mt={2} mb={2}>
        {article.abstract}
      </Typography>

      {Array.isArray(article.des_facet) && article.des_facet.length > 0 && (
        <>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Related Topics:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={3}>
            {article.des_facet.map((tag, i) => (
              <Chip
                key={i}
                label={tag}
                variant="outlined"
                onClick={() => handleTagClick(tag)}
                clickable
              />
            ))}
          </Stack>
        </>
      )}

      <Box ref={readObserver}>
        <ArticleDetailAction
          isSaved={isSaved}
          onSave={handleSave}
          articleTitle={article.title}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Related articles based on tag */}
      {selectedTag && (
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Articles related to "{selectedTag}"
          </Typography>

          {loadingRelated && (
            <Typography color="text.secondary">Loading...</Typography>
          )}
          {errorRelated && (
            <Typography color="error">{errorRelated}</Typography>
          )}

          {!loadingRelated && relatedArticles.length === 0 && (
            <Typography>No related articles found.</Typography>
          )}

          <Stack spacing={2} mt={2}>
            {relatedArticles.map((article, idx) => (
              <Box
                key={idx}
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.abstract}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default ArticleDetail;
