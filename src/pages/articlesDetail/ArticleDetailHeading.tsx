import {
  Typography,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
  Box,
  Divider,
} from "@mui/material";
import type { NYTArticle } from "../../types/article";

const ArticleDetailHeading = ({ article }: { article: NYTArticle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const publicationDate = new Date(article.published_date).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const publicationTime = new Date(article.published_date).toLocaleTimeString(
    "en-US",
    { hour: "2-digit", minute: "2-digit" },
  );

  return (
    <Box mb={2}>
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
            <Chip label={article.subsection} color="primary" />
          )}
        </Stack>
      )}

      <Divider sx={{ my: 2 }} />
    </Box>
  );
};

export default ArticleDetailHeading;
