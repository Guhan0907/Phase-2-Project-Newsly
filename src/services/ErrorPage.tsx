import { Typography, Container, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
      <Box sx={{ mb: 4 }}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />
      </Box>

      <Typography variant="h4" fontWeight="bold" gutterBottom color="error">
        Oops! Something went wrong.
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        We're currently unable to fetch the latest news. This could be due to
        server issues, rate limits, or connectivity problems.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate("/")}
        sx={{
          borderRadius: 999,
          px: 4,
          py: 1.5,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        ⬅ Back to Homepage
      </Button>
    </Container>
  );
};

export default ErrorPage;
