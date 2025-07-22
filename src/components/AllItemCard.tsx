import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { NYTArticle } from "../types/article";

interface AllItemsCardProps {
  article: NYTArticle;
  showFavoriteButton?: boolean;
  onFavoriteClick?: (id: string) => void;
  showMetadata?: boolean;
  showAbstract?: boolean;
}

const AllItemsCard = ({
  article,
  showFavoriteButton = false,
  onFavoriteClick,
  showMetadata = true,
  showAbstract = true,
}: AllItemsCardProps) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
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
            <IconButton onClick={() => onFavoriteClick?.(article.url)}>
              <FavoriteIcon color="error" />
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

// import { useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   Typography,
//   CardMedia,
//   IconButton,
//   Box,
//   Tooltip,
//   CardActionArea,
// } from "@mui/material";
// import { Favorite } from "@mui/icons-material";
// import type { NYTArticle } from "../types/article";

// interface AllItemsCardProps {
//   article: NYTArticle;
//   showFavoriteButton?: boolean;
//   onFavoriteClick?: (id: string) => void;
//   showMetadata?: boolean;
//   showAbstract?: boolean;
// }

// const AllItemsCard = ({
//   article,
//   showFavoriteButton = false,
//   onFavoriteClick,
//   showMetadata = true,
//   showAbstract = true,
// }: AllItemsCardProps) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/article?url=${encodeURIComponent(article.url)}`);
//   };

//   return (
//     <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
//       <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
//         {article?.multimedia?.[0]?.url && (
//           <CardMedia
//             component="img"
//             height="160"
//             image={article.multimedia[0].url}
//             alt={article.title}
//           />
//         )}

//         <CardContent>
//           <Typography
//             gutterBottom
//             variant="h6"
//             component="div"
//             sx={{
//               display: "-webkit-box",
//               WebkitBoxOrient: "vertical",
//               WebkitLineClamp: 2,
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               fontWeight: 600,
//             }}
//           >
//             {article.title}
//           </Typography>

//           {showAbstract && (
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               sx={{
//                 display: "-webkit-box",
//                 WebkitBoxOrient: "vertical",
//                 WebkitLineClamp: 2,
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//               }}
//             >
//               {article.abstract}
//             </Typography>
//           )}
//         </CardContent>
//       </CardActionArea>

//       {showFavoriteButton && (
//         <Box px={2} pb={1}>
//           <Tooltip title="Remove from favorites">
//             <IconButton onClick={() => onFavoriteClick?.(article.url)}>
//               <Favorite color="error" />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       )}
//     </Card>
//   );
// };

// export default AllItemsCard;
