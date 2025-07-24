import type { Theme } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Chip,
  Paper,
  useTheme,
} from "@mui/material";

interface Plan {
  label?: string;
  duration: string;
  originalPrice: number;
  discountedPrice: number;
  billedAmount: number;
  extraDiscount: string;
  highlightColor: string; // e.g., "warning.main"
}

const plans: Plan[] = [
  {
    label: "Best Value Plan",
    duration: "3-Year",
    originalPrice: 222,
    discountedPrice: 133,
    billedAmount: 4799,
    extraDiscount: "₹500 Additional Discount on Credit Cards",
    highlightColor: "warning.main",
  },
  {
    label: "Special Plan",
    duration: "2-Year",
    originalPrice: 271,
    discountedPrice: 162,
    billedAmount: 3899,
    extraDiscount: "₹300 Additional Discount on Credit Cards",
    highlightColor: "primary.main",
  },
  {
    duration: "1-Year",
    originalPrice: 389,
    discountedPrice: 233,
    billedAmount: 2799,
    extraDiscount: "₹200 Additional Discount on Credit Cards",
    highlightColor: "grey.300",
  },
];

const getColorFromTheme = (theme: Theme, path: string): string => {
  const [color, shade] = path.split(".");
  const base = theme.palette[color as keyof typeof theme.palette];

  // Check if the base is an object and has the shade property
  if (typeof base === "object" && base !== null && shade in base) {
    return (base as any)[shade];
  }

  // fallback
  return theme.palette.primary.main;
};

const Subscription = () => {
  const theme = useTheme();

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        Be an Informed Indian with{" "}
        <span style={{ color: theme.palette.primary.main }}>Newsly+</span>,
        Choose Clarity Over Noise!
      </Typography>

      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        mb={3}
      >
        This Monsoon, read beyond the headlines with stories that decode
        politics, policy, climate & more.
      </Typography>

      <Box
        sx={{
          backgroundColor: theme.palette.success.light,
          p: 1.5,
          px: 3,
          textAlign: "center",
          borderRadius: 3,
          maxWidth: 400,
          mx: "auto",
          mb: 5,
          fontWeight: 600,
          fontSize: "1rem",
        }}
      >
        🎉 Few Hours Left: Grab Up to 40% off now!
      </Box>

      <Grid container spacing={3}>
        {plans.map((plan, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 4,
                p: 3,
                textAlign: "center",
                borderTop: `6px solid ${getColorFromTheme(theme, plan.highlightColor)}`,
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              {plan.label && (
                <Chip
                  label={plan.label}
                  size="small"
                  color="primary"
                  sx={{ mb: 1, fontWeight: "bold" }}
                />
              )}

              <Typography variant="h6" gutterBottom>
                {plan.duration}
              </Typography>

              <Chip label="Save 40%" color="success" sx={{ mb: 1 }} />

              <Typography
                variant="body2"
                sx={{ textDecoration: "line-through", color: "gray" }}
              >
                ₹{plan.originalPrice}
              </Typography>

              <Typography variant="h4" color="primary">
                ₹{plan.discountedPrice}
                <Typography variant="body2" component="span">
                  /month
                </Typography>
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                Billed Amount: ₹{plan.billedAmount}
              </Typography>

              <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{
                  borderRadius: 999,
                  px: 4,
                  py: 1.2,
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                Continue
              </Button>

              <Typography variant="caption" color="text.secondary">
                {plan.extraDiscount}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Subscription;
