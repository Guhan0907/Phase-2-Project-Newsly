// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import type { NYTArticle } from "../types/article";
// import { fallBackImage } from "../constants/image";
// // import {fallBac}

// interface Props {
//   articles: NYTArticle[];
// }

// const CompactNewsGrid = ({ articles }: Props) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <Grid container spacing={2}>
//       {articles.map((article, index) => {
//   const image =
//     article?.multimedia?.[0]?.url ||
//     article?.media?.[0]?.["media-metadata"]?.[2]?.url ||
//     fallBackImage;

//   return (
//     <Grid item xs={12} sm={6} md={4} key={index}>
//       <Card
//         sx={{
//           display: "flex",
//           flexDirection: isMobile ? "row" : "column",
//         }}
//       >
//         <CardMedia
//           component="img"
//           image={image}
//           alt={article.title}
//           sx={{
//             width: isMobile ? 100 : "100%",
//             height: isMobile ? 100 : 160,
//             objectFit: "cover",
//           }}
//         />
//         <CardContent sx={{ flex: 1 }}>
//           <Typography variant="subtitle1" fontWeight={600} noWrap>
//             {article.title}
//           </Typography>
//           {!isMobile && (
//             <Typography variant="body2" color="text.secondary">
//               {article.abstract}
//             </Typography>
//           )}
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// })}

//     </Grid>
//   );
// };

// export default CompactNewsGrid;

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { NYTArticle } from "../types/article";

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
            sx={{ cursor: "pointer", height: "100%" }}
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
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                noWrap
              >
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {article.abstract}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CompactNewsGrid;
