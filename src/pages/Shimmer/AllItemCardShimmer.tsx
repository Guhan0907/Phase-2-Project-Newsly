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
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia>
        <Skeleton variant="rectangular" height={180} />
      </CardMedia>

      <CardContent sx={{ flex: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Skeleton variant="text" width="80%" height={28} />
          <IconButton disabled>
            <FavoriteIcon color="disabled" />
          </IconButton>
        </Box>

        <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1 }} />
        <Skeleton variant="text" width="90%" height={20} />

        <Box mt={1}>
          <Skeleton variant="text" width="50%" height={16} />
          <Skeleton variant="text" width="40%" height={16} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AllItemsCardShimmer;
