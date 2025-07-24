import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { NYTArticle } from "../types/article";
import React from "react";

interface CompactNewsGridProps {
  articles: NYTArticle[];
}

const CompactNewsGrid = ({ articles }: CompactNewsGridProps) => {
  const navigate = useNavigate();

  const handleClick = (article: NYTArticle, index: number) => {
    navigate(`/article/${index}`, { state: { article } });
  };

  return (
    <Grid container spacing={2}>
      {articles.map((article, index) => (
        <Grid item xs={12} sm={6} md={4} key={article.url}>
          <Card
            onClick={() => handleClick(article, index)}
            sx={{
              cursor: "pointer",
              height: "100%",
              backgroundColor: "background.paper",
              position: "relative",
              borderLeft: article.isRead ? "4px solid #FF9800" : "none",
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
                transform: "scale(1.01)",
              },
            }}
          >
            <CardMedia
              component="img"
              image={article.multimedia?.[0]?.url || "src/assets/No_image.jpeg"}
              height="160"
              alt={article.title}
            />

            <CardContent>
              {article.isRead && (
                <Chip
                  label="Read"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "#FFE0B2", // light orange
                    color: "#E65100", // deeper orange text
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
        </Grid>
      ))}
    </Grid>
  );
};

// export default CompactNewsGrid;
export default React.memo(CompactNewsGrid);
