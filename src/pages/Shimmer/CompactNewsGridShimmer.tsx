// import {
//   Box,
//   Card,
//   CardMedia,
//   CardContent,
//   Skeleton,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";

// const CompactNewsGridShimmer = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <Box
//       display="grid"
//       gridTemplateColumns={{
//         xs: "1fr",
//         sm: "1fr 1fr",
//         md: "1fr 1fr 1fr",
//       }}
//       gap={2}
//     >
//       {Array.from({ length: 6 }).map((_, index) => (
//         <Card key={index}>
//           <CardMedia>
//             <Skeleton variant="rectangular" height={160} />
//           </CardMedia>
//           <CardContent>
//             <Skeleton variant="text" height={28} width="80%" />
//             <Skeleton variant="text" height={20} width="60%" />
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// export default CompactNewsGridShimmer;

import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const CompactNewsGridShimmer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      data-testid="shimmer-grid"
      display="grid"
      gridTemplateColumns={{
        xs: "1fr",
        sm: "1fr 1fr",
        md: "1fr 1fr 1fr",
      }}
      gap={2}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} data-testid="shimmer-card">
          <CardMedia>
            <Skeleton
              data-testid={`skeleton-image-${index}`}
              variant="rectangular"
              height={160}
            />
          </CardMedia>
          <CardContent>
            <Skeleton
              data-testid={`skeleton-title-${index}`}
              variant="text"
              height={28}
              width="80%"
            />
            <Skeleton
              data-testid={`skeleton-subtitle-${index}`}
              variant="text"
              height={20}
              width="60%"
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CompactNewsGridShimmer;
