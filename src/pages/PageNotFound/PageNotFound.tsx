import { Typography, Container, Box } from "@mui/material";
import pageNotFoundImg from "../../assets/Edited_404.png";
import { useEffect } from "react";

const PageNotFound = () => {
  useEffect(() => {
    window.scrollTo({ top: 20, behavior: "instant" });
  }, []);
  return (
    <Container
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box
        component="img"
        src={pageNotFoundImg}
        alt="404 - Page Not Found"
        sx={{
          width: {
            xs: "100%",
            sm: "80%",
            md: "60%",
            lg: "50%",
          },
          maxWidth: 500,
          mb: 3,
        }}
      />

      <Typography variant="h4" color="error" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        The page you're looking for doesn't exist.
      </Typography>
    </Container>
  );
};

export default PageNotFound;
