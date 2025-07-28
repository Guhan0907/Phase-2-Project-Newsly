import {
  Card,
  CardMedia,
  CardContent,
  Skeleton,
  Box,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AllItemsCardShimmer = () => {
  return (
    <Card
      data-testid="shimmer-card"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <CardMedia>
        <Skeleton
          data-testid="skeleton-image"
          variant="rectangular"
          height={180}
        />
      </CardMedia>

      <CardContent sx={{ flex: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Skeleton
            data-testid="skeleton-title"
            variant="text"
            width="80%"
            height={28}
          />
          <IconButton disabled data-testid="disabled-fav-icon">
            <FavoriteIcon color="disabled" />
          </IconButton>
        </Box>

        <Skeleton
          data-testid="skeleton-description-line-1"
          variant="text"
          width="100%"
          height={20}
          sx={{ mt: 1 }}
        />
        <Skeleton
          data-testid="skeleton-description-line-2"
          variant="text"
          width="90%"
          height={20}
        />

        <Box mt={1}>
          <Skeleton
            data-testid="skeleton-meta-line-1"
            variant="text"
            width="50%"
            height={16}
          />
          <Skeleton
            data-testid="skeleton-meta-line-2"
            variant="text"
            width="40%"
            height={16}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AllItemsCardShimmer;
