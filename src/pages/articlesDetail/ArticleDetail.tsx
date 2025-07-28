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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { NYTArticle } from "../../types/article";
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
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch<AppDispatch>();

  const topStories = useSelector(
    (state: RootState) => state.articles.topStories,
  );

  const [article, setArticle] = useState<NYTArticle | null>(
    state?.article || null,
  );
  const [loadingArticle, setLoadingArticle] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NYTArticle[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [errorRelated, setErrorRelated] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticleById = async () => {
      if (state?.article) return;

      setLoadingArticle(true);
      setFetchError(null);

      try {
        let stories = topStories;

        if (!stories || stories.length === 0) {
          stories = await fetchTopStories();
        }

        let foundArticle: NYTArticle | null = null;

        // Try numeric index first
        if (/^\d+$/.test(id ?? "")) {
          const index = parseInt(id ?? "", 10);
          foundArticle = stories[index] ?? null;
        }

        if (!foundArticle && id) {
          foundArticle =
            stories.find((a) => a.url === decodeURIComponent(id ?? "")) ?? null;
        }

        if (!foundArticle) {
          setFetchError("Article not found.");
        } else {
          setArticle(foundArticle);
        }
      } catch (err) {
        console.error(err);
        setFetchError("Failed to load article.");
      } finally {
        setLoadingArticle(false);
      }
    };

    fetchArticleById();
  }, [id, state, topStories]);

  const favourites = useSelector((state: RootState) => state.favourites);

  const isSaved = useMemo(() => {
    return article ? favourites.includes(article.url) : false;
  }, [favourites, article]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const mainImage = useMemo(() => {
    return (
      article?.multimedia?.find((m) => m.format === "superJumbo") ??
      article?.multimedia?.[0]
    );
  }, [article]);

  const readObserver = useReadObserver(
    useCallback(() => {
      if (article) dispatch(addToHistory(article.url));
    }, [dispatch, article]),
  );

  const handleSave = useCallback(() => {
    if (!article) return;
    if (isSaved) {
      dispatch(removeFromFavourites(article.url));
    } else {
      dispatch(addToFavourites(article.url));
    }
  }, [dispatch, isSaved, article]);

  const handleTagClick = useCallback(async (tag: string) => {
    setSelectedTag(tag);
    setLoadingRelated(true);
    setErrorRelated(null);

    try {
      const res = await fetchTopStories();
      const articles: NYTArticle[] = Array.isArray(res)
        ? res
        : (res?.results ?? []);

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

  if (loadingArticle) {
    return (
      <Box p={3}>
        <Typography>Loading article...</Typography>
      </Box>
    );
  }

  if (!article || fetchError) {
    return (
      <Box p={3} data-testid="article-not-found">
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
        <Typography variant="h6" color="error">
          {fetchError ?? "Article not found."}
        </Typography>
      </Box>
    );
  }

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
      data-testid="article-detail"
    >
      <ArticleDetailHeading article={article} />

      {mainImage && (
        <Box
          component="img"
          data-testid="article-image"
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
          data-testid="image-caption"
          variant="caption"
          color="text.secondary"
          display="block"
          gutterBottom
        >
          {mainImage.caption}
        </Typography>
      )}

      <Typography
        variant="h6"
        fontWeight={500}
        mt={2}
        mb={2}
        data-testid="article-abstract"
      >
        {article.abstract}
      </Typography>

      {Array.isArray(article.des_facet) && article.des_facet.length > 0 && (
        <>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            gutterBottom
            data-testid="related-topics-title"
          >
            Related Topics:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={3}>
            {article.des_facet.map((tag, i) => (
              <Chip
                key={i}
                label={tag}
                data-testid={`tag-chip-${tag}`}
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

      {selectedTag && (
        <Box mt={3}>
          <Typography variant="h6" gutterBottom data-testid="related-title">
            Articles related to "{selectedTag}"
          </Typography>

          {loadingRelated && (
            <Typography color="text.secondary" data-testid="loading-message">
              Loading...
            </Typography>
          )}
          {errorRelated && (
            <Typography color="error" data-testid="error-message">
              {errorRelated}
            </Typography>
          )}

          {!loadingRelated && relatedArticles.length === 0 && (
            <Typography data-testid="no-related">
              No related articles found.
            </Typography>
          )}

          <Stack spacing={2} mt={2}>
            {relatedArticles.map((related, idx) => {
              const encodedUrl = encodeURIComponent(related.url);

              return (
                <Box
                  key={idx}
                  component="a"
                  href={`/article/${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`related-article-${idx}`}
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    p: 2,
                    backgroundColor: theme.palette.background.paper,
                    cursor: "pointer",
                    transition: "transform 0.2s, boxShadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[3],
                    },
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {related.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {related.abstract}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default ArticleDetail;
