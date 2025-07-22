import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../redux/store";
import type { NYTArticle } from "../../types/article";
import { fetchArticleById } from "../../services/apiCalls";
import { removeFromFavourites } from "../../redux/action/favouritesAction";
import AllItemsCard from "../../components/AllItemCard";

const Favourites = () => {
  const favorites = useSelector((state: RootState) => state.favourites);
  const [articles, setArticles] = useState<NYTArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchSavedArticles = async () => {
      setLoading(true);
      try {
        const fetched = await Promise.all(
          favorites.map(async (id) => {
            try {
              const article = await fetchArticleById(id);
              return article;
            } catch (err) {
              console.error("Failed to fetch article ID:", id);
              return null;
            }
          }),
        );
        setArticles(fetched.filter(Boolean) as NYTArticle[]);
      } catch (error) {
        console.error("Error fetching saved articles", error);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchSavedArticles();
    } else {
      setArticles([]);
    }
  }, [favorites]);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <Typography mt={2}>Loading saved articles...</Typography>
      </Box>
    );
  }

  if (articles.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6">No articles saved yet.</Typography>
        <Typography variant="body2" color="text.secondary">
          Use the “Save” ❤️ button on any article to view it here later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box px={{ xs: 2, sm: 4 }} py={4}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Saved Articles
      </Typography>

      <Grid container spacing={3}>
        {articles.map((article) => {
          const image = article?.multimedia?.[0]?.url;

          return (
            <Grid item xs={12} sm={6} md={4} key={article.url}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                }}
              >
                {image && (
                  <CardMedia
                    component="img"
                    image={image}
                    alt={article.title}
                    sx={{
                      height: 180,
                      objectFit: "cover",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  />
                )}

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                    noWrap
                  >
                    {article.section.toUpperCase()} •{" "}
                    {new Date(article.published_date).toLocaleDateString()}
                  </Typography>

                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {article.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {article.abstract.length > 120
                      ? article.abstract.slice(0, 120) + "..."
                      : article.abstract}
                  </Typography>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="caption">{article.byline}</Typography>
                    <Tooltip title="Remove from Favorites">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() =>
                          dispatch(removeFromFavourites(article.url))
                        }
                      >
                        <Favorite />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
              {/* <AllItemsCard
                article={article}
                showFavoriteButton
                onFavoriteClick={(id) => dispatch(removeFromFavourites(id))}
              /> */}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Favourites;
