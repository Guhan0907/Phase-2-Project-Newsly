import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { NYTArticle } from "../types/article";

interface Props {
  articles: NYTArticle[];
}

const TrendingHighlightGrid = ({ articles }: Props) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    // <Box sx={{ mb: 4 }}>
    <Box
      sx={{
        boxShadow: "0 14px 80px rgba(0, 0, 0, 0.12)",
        borderRadius: 2,
        p: 2,
        // boxShadow: 3,
      }}
    >
      {/* <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: "primary.main",
          fontWeight: "bold",
        }}
      >
        Trending Now
      </Typography> */}
      <Grid container spacing={2}>
        {articles.map((article, index) => (
          <Grid key={index} item xs={12} sm={6}>
            <Card
              onClick={() =>
                navigate("/article/" + encodeURIComponent(article.url))
              }
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              {article.multimedia?.[0]?.url && (
                <CardMedia
                  component="img"
                  height="160"
                  image={article.multimedia[0].url}
                  alt={article.title}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.abstract.slice(0, 80)}...
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrendingHighlightGrid;
