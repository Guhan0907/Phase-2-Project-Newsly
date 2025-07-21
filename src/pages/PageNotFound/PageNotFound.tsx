import { Typography, Container } from "@mui/material";

const PageNotFound = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" color="error">
        404 - Page Not Found
      </Typography>
    </Container>
  );
};

export default PageNotFound;
