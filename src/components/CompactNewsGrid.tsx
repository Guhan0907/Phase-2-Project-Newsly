import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { NYTArticle } from "../types/article";

interface Props {
  articles: NYTArticle[];
}

const CompactNewsGrid = ({ articles }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container spacing={2}>
      {articles.map((article, index) => {
        const image = article.multimedia?.[0]?.url;
        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: isMobile ? "row" : "column",
              }}
            >
              {image && (
                <CardMedia
                  component="img"
                  image={image}
                  alt={article.title}
                  sx={{
                    width: isMobile ? 100 : "100%",
                    height: isMobile ? 100 : 160,
                    objectFit: "cover",
                  }}
                />
              )}
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight={600} noWrap>
                  {article.title}
                </Typography>
                {!isMobile && (
                  <Typography variant="body2" color="text.secondary">
                    {article.abstract}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CompactNewsGrid;
