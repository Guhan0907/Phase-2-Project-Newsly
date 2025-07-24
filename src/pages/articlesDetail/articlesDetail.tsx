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
// import { useEffect } from "react";

// const ArticleDetail = () => {
//   const { state } = useLocation();
//   const article: NYTArticle = state?.article;

//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   //typescript
//   const dispatch = useDispatch<AppDispatch>();
//   const favourites = useSelector((state: RootState) => state.favourites);
//   const isSaved = favourites.includes(article.url);

//   // to scroll to the top
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "instant" }); // or "smooth"
//   }, []);

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

//   const mainImage =
//     article.multimedia?.find((m) => m.format === "superJumbo") ??
//     article.multimedia?.[0];

//   // for maintaining the reading history of the Article
//   const readObserver = useReadObserver(() => {
//     dispatch(addToHistory(article.url));
//     console.log("History stored ======");
//   });

//   const handleShare = async () => {
//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: article.title,
//           text: article.abstract,
//         });
//       } else {
//         alert("Share not supported on this browser.");
//       }
//     } catch (err) {
//       console.error("Error sharing:", err);
//     }
//   };

//   const handleSave = () => {
//     console.log("Saved article:", article.title);
//     if (isSaved) {
//       dispatch(removeFromFavourites(article.url));
//     } else {
//       dispatch(addToFavourites(article.url));
//     }
//   };

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

//       {article.des_facet?.length > 0 && (
//         <>
//           <Typography variant="subtitle2" fontWeight={600} gutterBottom>
//             Related Topics:
//           </Typography>
//           <Stack direction="row" spacing={1} flexWrap="wrap" mb={3}>
//             {article.des_facet.map((tag: any, i) => (
//               <Chip key={i} label={tag} variant="outlined" />
//             ))}
//           </Stack>
//         </>
//       )}

//       <Box ref={readObserver}>
//         <ArticleDetailAction
//           isSaved={isSaved}
//           onSave={handleSave}
//           onShare={handleShare}
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
import { useEffect, useMemo, useCallback } from "react";
import type { NYTArticle } from "../../types/article";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../redux/action/favouritesAction";
import { addToHistory } from "../../redux/action/historyActions";
import ArticleDetailAction from "./ArticleDetailAction";
import ArticleDetailHeading from "./ArticleDetailHeading";
import { useReadObserver } from "../../hooks/readObserverHook";

const ArticleDetail = () => {
  const { state } = useLocation();
  const article: NYTArticle = state?.article;
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch<AppDispatch>();

  const favourites = useSelector((state: RootState) => state.favourites);

  // Memoize `isSaved` status
  const isSaved = useMemo(() => {
    return article?.url && favourites.includes(article.url);
  }, [favourites, article?.url]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Handle article not found
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

  // Memoize selected main image
  const mainImage = useMemo(() => {
    return (
      article.multimedia?.find((m) => m.format === "superJumbo") ??
      article.multimedia?.[0]
    );
  }, [article.multimedia]);

  // Reading observer (to track read history)
  const readObserver = useReadObserver(
    useCallback(() => {
      dispatch(addToHistory(article.url));
      console.log("History stored ======");
    }, [dispatch, article.url]),
  );

  // Memoized share handler
  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.abstract,
        });
      } else {
        alert("Share not supported on this browser.");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  }, [article.title, article.abstract]);

  // Memoized save/unsave handler
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

      {article.des_facet?.length > 0 && (
        <>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Related Topics:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={3}>
            {article.des_facet.map((tag, i) => (
              <Chip key={i} label={tag} variant="outlined" />
            ))}
          </Stack>
        </>
      )}

      <Box ref={readObserver}>
        <ArticleDetailAction
          isSaved={isSaved}
          onSave={handleSave}
          onShare={handleShare}
        />
      </Box>

      <Divider sx={{ my: 3 }} />
    </Box>
  );
};

export default ArticleDetail;
