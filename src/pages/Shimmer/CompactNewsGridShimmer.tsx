import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { NYTArticle } from "../../types/article";


interface CompactNewsGridProps {
  articles: NYTArticle[];
}

const CompactNewsGrid = ({ articles }: CompactNewsGridProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (article: NYTArticle, index: number) => {
    navigate(`/article/${index}`, { state: { article } });
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: "1fr",         // 1 column on mobile
        sm: "1fr 1fr",     // 2 columns on tablets
        md: "1fr 1fr 1fr", // 3 columns on desktop
      }}
      gap={2}
    >
      {articles.map((article, index) => (
        <Card
          key={article.url}
          onClick={() => handleClick(article, index)}
          sx={{
            cursor: "pointer",
            height: "100%",
            backgroundColor: "background.paper",
            position: "relative",
            borderLeft: article.isRead ? "4px solid #FF9800" : "none",
          }}
        >
          {article.multimedia?.[0]?.url && (
            <CardMedia
              component="img"
              image={article.multimedia[0].url}
              height="160"
              alt={article.title}
            />
          )}
          <CardContent>
            {article.isRead && (
              <Chip
                label="Read"
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "#FFE0B2",
                  color: "#E65100",
                  fontWeight: 900,
                }}
              />
            )}
            <Typography
              variant="subtitle1"
              noWrap
              gutterBottom
              sx={{
                color: article.isRead ? "#FF9800" : "text.primary",
                fontStyle: article.isRead ? "italic" : "normal",
                fontWeight: article.isRead ? 500 : "bold",
              }}
            >
              {article.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{
                fontStyle: article.isRead ? "italic" : "normal",
              }}
            >
              {article.abstract}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CompactNewsGrid;
