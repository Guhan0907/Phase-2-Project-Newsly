import { useEffect, useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { type RootState, type AppDispatch } from "../../redux/store";
import { fetchSavedArticlesOnce } from "../../redux/action/savedArticleAction";
import { removeFromFavourites } from "../../redux/action/favouritesAction";

import AllItemsCard from "../../components/AllItemCard";
import AllItemsCardShimmer from "../Shimmer/AllItemCardShimmer";

import no_article_image from "../../assets/No_Article.png";
import type { NYTArticle } from "../../types/article";

const Favourites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const favourites = useSelector((state: RootState) => state.favourites);

  const [loading, setLoading] = useState(false);

  // feetching the topStories and Trending into the Redux for once
  useEffect(() => {
    if (!favourites.length) return;

    const loadArticles = async () => {
      setLoading(true);
      await dispatch(fetchSavedArticlesOnce());
      setLoading(false);
    };

    loadArticles();
  }, [dispatch, favourites]);

  const topStories = useSelector(
    (state: RootState) => state.savedArticles.topStories,
  );
  const trending = useSelector(
    (state: RootState) => state.savedArticles.trending,
  );
  const timesWire = useSelector(
    (state: RootState) => state.savedArticles.timesWire,
  );
  // console.log("topStories => ",topStories,"   ---   ");

  // below is for cheking wheter the favourite data is in topstories or trending
  const savedArticles: NYTArticle[] = [];
  const concatArticles = topStories.concat(trending); // combine both arrays
  const allArticles = concatArticles.concat(timesWire);

  for (let i = 0; i < allArticles.length; i++) {
    const article = allArticles[i];

    // Check if the article URL is saved in favourites
    if (favourites.includes(article.url)) {
      savedArticles.push(article);
    }
  }

  const handleRemove = (url: string) => {
    dispatch(removeFromFavourites(url));
  };

  const handleClick = (article: NYTArticle, index: number) => {
    navigate(`/article/${index}`, { state: { article } });
  };

  // used to load the shimmer
  if (loading) {
    return (
      <Box px={{ xs: 2, sm: 4 }} py={4}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Saved Articles
        </Typography>
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <AllItemsCardShimmer />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  // this is i am using if the data are null or no saved data is there
  if (!loading && savedArticles.length === 0) {
    return (
      <Box
        textAlign="center"
        mt={8}
        px={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          component="img"
          src={no_article_image}
          alt="No articles"
          sx={{
            width: { xs: "90%", sm: 320 },
            maxWidth: 400,
            objectFit: "contain",
            mb: 3,
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
          }}
        />
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          You haven’t saved anything yet
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ borderRadius: 999, textTransform: "none", px: 4, py: 1.2 }}
        >
          Discover News
        </Button>
      </Box>
    );
  }

  //  Render saved articles
  return (
    <Box px={{ xs: 2, sm: 4 }} py={4}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Saved Articles
      </Typography>
      <Grid container spacing={3}>
        {savedArticles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={article.url}>
            <AllItemsCard
              article={article}
              showFavoriteButton
              onFavoriteClick={() => handleRemove(article.url)}
              onClick={() => handleClick(article, index)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Favourites;
