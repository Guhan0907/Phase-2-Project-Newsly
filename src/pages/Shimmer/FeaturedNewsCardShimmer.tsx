// import {
//   Card,
//   CardContent,
//   Skeleton,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";

// const FeaturedNewsCardShimmer = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <Card
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//       }}
//     >
//       <Skeleton
//         variant="rectangular"
//         height={isMobile ? 200 : 350}
//         animation="wave"
//       />
//       <CardContent>
//         <Skeleton
//           variant="text"
//           height={isMobile ? 32 : 40}
//           width="80%"
//           animation="wave"
//         />
//         <Skeleton
//           variant="text"
//           height={20}
//           width="95%"
//           animation="wave"
//           sx={{ mt: 1 }}
//         />
//         <Skeleton variant="text" height={20} width="90%" animation="wave" />
//       </CardContent>
//     </Card>
//   );
// };

// export default FeaturedNewsCardShimmer;

import {
  Card,
  CardContent,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const FeaturedNewsCardShimmer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      data-testid="featured-shimmer-card"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Skeleton
        data-testid="skeleton-featured-image"
        variant="rectangular"
        height={isMobile ? 200 : 350}
        animation="wave"
      />
      <CardContent>
        <Skeleton
          data-testid="skeleton-featured-title"
          variant="text"
          height={isMobile ? 32 : 40}
          width="80%"
          animation="wave"
        />
        <Skeleton
          data-testid="skeleton-featured-desc-1"
          variant="text"
          height={20}
          width="95%"
          animation="wave"
          sx={{ mt: 1 }}
        />
        <Skeleton
          data-testid="skeleton-featured-desc-2"
          variant="text"
          height={20}
          width="90%"
          animation="wave"
        />
      </CardContent>
    </Card>
  );
};

export default FeaturedNewsCardShimmer;
