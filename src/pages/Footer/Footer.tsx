// import {
//   Box,
//   Grid,
//   Typography,
//   Link,
//   TextField,
//   Button,
//   useTheme,
//   useMediaQuery,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import newsly from "../../assets/no_background.png";
// import { useDispatch } from "react-redux";
// import { setCategoryFromFooter } from "../../redux/action/categoryAction";

// const categories = ["world", "us", "business", "health", "science", "arts"];

// const Footer = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [showSnackbar, setShowSnackbar] = useState(false);
//   const [isSubscribed, setIsSubscribed] = useState(false);

//   const dispatch = useDispatch();

// const handleCategoryClick = (category: string) => {
//   dispatch(setCategoryFromFooter(category));
// };

//   const handleContactUs = () => {
//     navigate("/contact");
//   };

//   const handleSubscribe = () => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (emailRegex.test(email)) {
//     setShowSnackbar(true);
//     setEmail("");
//     setIsSubscribed(true);
//     // Optionally: send email to backend
//   }
// };

//   return (
//     <Box
//       component="footer"
//       sx={{
//         mt: 4,
//         px: isMobile ? 2 : 6,
//         py: 4,
//         backgroundColor: "#f9f9f9",
//         borderTop: "1px solid #ddd",
//       }}
//     >
//       <Grid container spacing={4}>
//         {/* Logo + Description */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Box display="flex" alignItems="center" mb={2}>
//             <Box
//               component="img"
//               src={newsly}
//               alt="Newsly Logo"
//               sx={{
//                 width: 100,
//                 height: 90,
//                 borderRadius: "8px",
//                 mr: 1,
//               }}
//             />
//           </Box>
//           <Typography variant="body2" color="text.secondary">
//             Your personalized New York Times powered internal news platform.
//           </Typography>
//         </Grid>

//         {/* Categories (hidden on mobile) */}
//         <Grid
//           item
//           xs={12}
//           sm={6}
//           md={4}
//           sx={{ display: { xs: "none", sm: "block" } }}
//         >
//           <Typography variant="h6" gutterBottom>
//             Categories
//           </Typography>
//           {categories.map((cat) => (
//             <Typography
//               key={cat}
//               variant="body2"
//               sx={{
//                 cursor: "pointer",
//                 textTransform: "capitalize",
//                 mb: 0.5,
//                 "&:hover": { textDecoration: "underline" },
//               }}
//               onClick={() => handleCategoryClick(cat)}
//             >
//               {cat}
//             </Typography>
//           ))}
//         </Grid>

//         {/* Subscribe */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Typography variant="h6" gutterBottom>
//             Subscribe
//           </Typography>

// {isSubscribed ? (
//   <Typography
//     variant="body2"
//     color="success.main"
//     sx={{ fontWeight: "bold", mt: 1 }}
//   >
//     🎉 You are subscribed!
//   </Typography>
// ) : (
//   <>
//     <TextField
//       size="small"
//       variant="outlined"
//       placeholder="Your email"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//       sx={{ mb: 1 }}
//       fullWidth
//     />
//     <Button variant="contained" size="small" onClick={handleSubscribe}>
//       Subscribe
//     </Button>
//   </>
// )}

//           {/* Notification */}
//           <Snackbar
//             open={showSnackbar}
//             autoHideDuration={3000}
//             onClose={() => setShowSnackbar(false)}
//             anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//           >
//             <Alert
//               severity="success"
//               variant="filled"
//               onClose={() => setShowSnackbar(false)}
//             >
//               Thanks for subscribing to Newsly!
//             </Alert>
//           </Snackbar>
//         </Grid>
//       </Grid>

//       {/* Bottom Info */}
//       <Box
//         mt={4}
//         pt={2}
//         borderTop="1px solid #ccc"
//         display="flex"
//         justifyContent="space-evenly"
//         flexDirection={isMobile ? "column" : "row"}
//         alignItems={isMobile ? "flex-start" : "center"}
//         gap={2}
//       >
//         <Typography
//           variant="body2"
//           sx={{ cursor: "pointer" }}
//           // onClick={handleContactUs}
//         >
//           Contact Us
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Developed by{" "}
//           <Link
//             href="https://rently.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             underline="hover"
//           >
//             Guhan @ Rently India
//           </Link>
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default Footer;

import {
  Box,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import newsly from "../../assets/no_background.png";
import { setCategoryFromFooter } from "../../redux/action/categoryAction";

const categories = ["world", "us", "business", "health", "science", "arts"];

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  //  Callback for setting category from footer
  const handleCategoryClick = useCallback(
    (category: string) => {
      dispatch(setCategoryFromFooter(category));
    },
    [dispatch],
  );

  //  Contact Us navigation
  const handleContactUs = useCallback(() => {
    navigate("/contact");
  }, [navigate]);

  //  Subscribe handler with validation
  const handleSubscribe = useCallback(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setShowSnackbar(true);
      setEmail("");
      setIsSubscribed(true);
      // You can send this to your backend here if needed
    }
  }, [email]);

  // Optional: memoized category list (if it's large or from props)
  const categoryList = useMemo(() => categories, []);

  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        px: isMobile ? 2 : 6,
        py: 4,
        backgroundColor: "#f9f9f9",
        borderTop: "1px solid #ddd",
      }}
    >
      <Grid container spacing={4}>
        {/* Logo + Description */}
        {/* <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" alignItems="center" mb={2}>
            <Box
              component="img"
              src={newsly}
              alt="Newsly Logo"
              sx={{
                width: 100,
                height: 90,
                borderRadius: "8px",
                mr: 1,
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Your personalized New York Times powered internal news platform.
          </Typography>
        </Grid> */}

        <Grid item xs={12} sm={6} md={4}>
  <Box display="flex" alignItems="center" mb={2}>
    <Box
      component="img"
      src={newsly}
      alt="Newsly Logo"
      sx={{
        width: 100,
        height: 90,
        borderRadius: "8px",
        mr: 2,
      }}
    />
    <Typography variant="h6" fontWeight={600}>
      Newsly
    </Typography>
  </Box>

  <Typography variant="body2" color="text.secondary" gutterBottom>
    <strong>Newsly</strong> is your personalized, intelligent internal news aggregator powered by <strong>The New York Times</strong>. 
  </Typography>

  <Typography variant="body2" color="text.secondary" gutterBottom>
    Stay ahead with curated top stories, trending insights, and real-time updates—all tailored to your interests and organization.
  </Typography>

  <Typography variant="body2" color="text.secondary">
    Designed for teams who want news that matters, without the noise.
  </Typography>
</Grid>


        {/* Categories */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <Typography variant="h6" gutterBottom>
            Categories
          </Typography>
          {categoryList.map((cat) => (
            <Typography
              key={cat}
              variant="body2"
              onClick={() => handleCategoryClick(cat)}
              sx={{
                cursor: "pointer",
                textTransform: "capitalize",
                mb: 0.5,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {cat}
            </Typography>
          ))}
        </Grid>

        {/* Subscribe */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>
            Subscribe
          </Typography>

          {isSubscribed ? (
            <Typography
              variant="body2"
              color="success"
              sx={{ fontWeight: "bold", mt: 1 }}
            >
              🎉 You have subscribed!
            </Typography>
          ) : (
            <>
              <TextField
                size="small"
                variant="outlined"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 1 }}
                fullWidth
              />
              <Button
                variant="contained"
                size="small"
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
            </>
          )}

          {/* Snackbar */}
          <Snackbar
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={() => setShowSnackbar(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              severity="success"
              variant="filled"
              onClose={() => setShowSnackbar(false)}
            >
              Thanks for subscribing to Newsly!
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>

      {/* Bottom Info */}
      <Box
        mt={4}
        pt={2}
        borderTop="1px solid #ccc"
        display="flex"
        justifyContent="space-evenly"
        flexDirection={isMobile ? "column" : "row"}
        alignItems={isMobile ? "flex-start" : "center"}
        gap={2}
      >
        <Typography
          variant="body2"
          sx={{ cursor: "pointer" }}
          onClick={handleContactUs}
        >
          Contact Us
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Developed by{" "}
          <Link
            href="https://rently.com"
            target="_blank"
            // rel="noopener noreferrer"
            underline="hover"
          >
            Guhan @ Rently India
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
