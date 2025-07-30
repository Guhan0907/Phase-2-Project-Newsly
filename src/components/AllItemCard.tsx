import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import type { NYTArticle } from "../types/article";

interface AllItemsCardProps {
  article: NYTArticle;
  showFavoriteButton?: boolean;
  onFavoriteClick?: (id: string) => void;
  onClick?: () => void;
  showMetadata?: boolean;
  showAbstract?: boolean;
}

const AllItemsCard = ({
  article,
  showFavoriteButton = false,
  onFavoriteClick,
  onClick,
  showMetadata = true,
  showAbstract = true,
}: AllItemsCardProps) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      {article.multimedia?.[0]?.url && (
        <CardMedia
          component="img"
          image={article.multimedia[0].url}
          alt={article.title}
          height="180"
        />
      )}
      <CardContent sx={{ flex: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            {article.title}
          </Typography>
          {showFavoriteButton && (
            <IconButton
              data-testid="favorite-button"
              onClick={(e) => {
                (e.stopPropagation(), onFavoriteClick?.(article.url));
              }}
            >
              <BookmarkRemoveIcon color="error" />
            </IconButton>
          )}
        </Box>

        {showAbstract && (
          <Typography variant="body2" mt={1}>
            {article.abstract}
          </Typography>
        )}

        {showMetadata && (
          <Box mt={1}>
            <Typography variant="caption" color="text.secondary">
              {article.byline}
            </Typography>
            <br />
            <Typography variant="caption" color="text.secondary">
              {new Date(article.published_date).toLocaleDateString()}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AllItemsCard;
