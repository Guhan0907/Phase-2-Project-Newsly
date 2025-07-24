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

  const handleCategoryClick = useCallback(
    (category: string) => {
      dispatch(setCategoryFromFooter(category));
    },
    [dispatch],
  );

  const handleContactUs = useCallback(() => {
    navigate("/contact");
  }, [navigate]);

  const handleSubscribe = useCallback(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setShowSnackbar(true);
      setEmail("");
      setIsSubscribed(true);
    }
  }, [email]);

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
            {/* <Typography variant="h6" fontWeight={600}>
              Newsly
            </Typography> */}
          </Box>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Newsly</strong> is your personalized, intelligent internal
            news aggregator powered by <strong>The New York Times</strong>.
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Stay ahead with curated top stories, trending insights, and
            real-time updates—all tailored to your interests and organization.
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
          <Link href="https://rently.com" target="_blank" underline="hover">
            Guhan @ Rently India
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
