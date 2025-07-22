// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import type { NYTArticle } from "../types/article";

// interface CompactNewsGridProps {
//   articles: NYTArticle[];
// }

// const CompactNewsGrid = ({ articles }: CompactNewsGridProps) => {
//   const navigate = useNavigate();

//   const handleClick = (article: NYTArticle, index: number) => {
//     navigate(`/article/${index}`, { state: { article } });
//   };

//   return (
//     <Grid container spacing={2}>
//       {articles.map((article, index) => (
//         <Grid item xs={12} sm={6} md={4} key={article.url}>
//           <Card
//             onClick={() => handleClick(article, index)}
//             sx={{ cursor: "pointer", height: "100%" }}
//           >
//             {article.multimedia?.[0]?.url && (
//               <CardMedia
//                 component="img"
//                 image={article.multimedia[0].url}
//                 height="160"
//                 alt={article.title}
//               />
//             )}
//             <CardContent>
//               <Typography
//                 variant="subtitle1"
//                 fontWeight="bold"
//                 gutterBottom
//                 noWrap
//               >
//                 {article.title}
//               </Typography>
//               <Typography variant="body2" color="text.secondary" noWrap>
//                 {article.abstract}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
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
  Chip,
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
            sx={{
              cursor: "pointer",
              height: "100%",
              backgroundColor: "background.paper",
              position: "relative",
              borderLeft: article.isRead ? "4px solid #FF9800" : "none",
            }}
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
                    fontWeight: 500,
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

export default CompactNewsGrid;
