import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { NYTArticle } from "../types/article";
import React from "react";

interface Props {
  article: NYTArticle;
  index: number;
}

const FeaturedNewsCard = ({ article, index }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const image = article.multimedia?.[0]?.url;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${index}`, { state: { article } });
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.01)",
        },
      }}
    >
      {image && (
        <CardMedia
          component="img"
          height={isMobile ? "200" : "350"}
          image={image}
          alt={article.title}
        />
      )}
      <CardContent>
        <Typography variant={isMobile ? "h6" : "h5"} fontWeight={600}>
          {article.title}
        </Typography>
        <Typography variant="body2" mt={1}>
          {article.abstract}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default React.memo(FeaturedNewsCard);
