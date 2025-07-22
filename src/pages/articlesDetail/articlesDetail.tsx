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
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import type { NYTArticle } from "../../types/article";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../redux/action/favouritesAction";

// recently added
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

const ArticleDetail = () => {
  const { state } = useLocation();
  //   const article: NYTArticle | undefined = state?.article;
  const article: NYTArticle = state?.article;

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  //typescript
  const dispatch = useDispatch<AppDispatch>();
  const favourites = useSelector((state: RootState) => state.favourites);
  const isSaved = favourites.includes(article.url);

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

  const mainImage =
    article.multimedia?.find((m) => m.format === "superJumbo") ??
    article.multimedia?.[0];

  const publicationDate = new Date(article.published_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const publicationTime = new Date(article.published_date).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const handleShare = async () => {
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
  };

  const handleSave = () => {
    console.log("Saved article:", article.title);
    if (isSaved) {
      dispatch(removeFromFavourites(article.url));
    } else {
      dispatch(addToFavourites(article.url));
    }
  };

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
      {/* <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button> */}

      <Typography
        variant={isMobile ? "h5" : "h3"}
        fontWeight="bold"
        gutterBottom
      >
        {article.title}
      </Typography>

      {article.byline && (
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {article.byline}
        </Typography>
      )}

      <Typography variant="body2" color="text.secondary" gutterBottom>
        {publicationDate} • {publicationTime}
      </Typography>

      {(article.section || article.subsection) && (
        <Stack direction="row" spacing={1} mt={1} mb={2} flexWrap="wrap">
          {article.section && <Chip label={article.section} color="primary" />}
          {article.subsection && (
            <Chip label={article.subsection} color="secondary" />
          )}
        </Stack>
      )}

      <Divider sx={{ my: 2 }} />

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
            {article.des_facet.map((tag: any, i) => (
              <Chip key={i} label={tag} variant="outlined" />
            ))}
          </Stack>
        </>
      )}

      <Stack direction="row" spacing={2} my={3}>
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          onClick={handleShare}
        >
          Share
        </Button>
        {/* <Button variant="contained" startIcon={<BookmarkAddIcon />} onClick={handleSave}>
          Save
        </Button> */}
        <Button
          variant={isSaved ? "contained" : "outlined"}
          color={isSaved ? "success" : "primary"}
          startIcon={
            isSaved ? <BookmarkAddedIcon /> : <BookmarkAddOutlinedIcon />
          }
          onClick={handleSave}
        >
          {isSaved ? "Saved" : "Save"}
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }} />
    </Box>
  );
};

export default ArticleDetail;
