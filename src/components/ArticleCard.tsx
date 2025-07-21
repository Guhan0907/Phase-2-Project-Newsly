// import { Card, CardContent, Typography, CardMedia } from '@mui/material';
// import type { NYTArticle } from '../types/article';
// // import { NYTArticle } from '../types/article';

// interface Props {
//   article: NYTArticle;
// }

// const ArticleCard = ({ article }: Props) => {
//   const image = article.multimedia?.[0]?.url;

//   return (
//     <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//       {image && (
//         <CardMedia
//           component="img"
//           height="200"
//           image={image}
//           alt={article.title}
//           sx={{ objectFit: 'cover' }}
//         />
//       )}
//       <CardContent>
//         <Typography variant="h6" gutterBottom noWrap>
//           {article.title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {article.abstract}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default ArticleCard;
