import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { NYTArticle } from "../types/article";

interface Props {
  article: NYTArticle;
}

const FeaturedNewsCard = ({ article }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const image = article.multimedia?.[0]?.url;

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
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

export default FeaturedNewsCard;
