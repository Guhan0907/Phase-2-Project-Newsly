import { Box, Typography, Container, Button } from "@mui/material";
import contactImg from "../../assets/contactus.jpeg"; // optional image
import { useEffect } from "react";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return (
    <Container sx={{ py: 6, textAlign: "center" }}>
      <Box
        component="img"
        src={contactImg}
        alt="Contact Newsly"
        sx={{
          width: { xs: "80%", sm: "50%", md: "30%" },
          mx: "auto",
          mb: 4,
        }}
      />

      <Typography variant="h4" fontWeight={700} gutterBottom>
        We're still building this newsroom.
      </Typography>

      <Typography variant="body1" color="text.secondary" gutterBottom>
        Thank you for your interest in reaching out. Our contact desk is
        currently under development.
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ maxWidth: 600, mx: "auto", mt: 2 }}
      >
        Just like any responsible newsroom, we're ensuring everything is in
        order before going live. Sit tight — our editorial team will be in touch
        soon. In the meantime, continue exploring Newsly and enjoy the headlines
        that matter.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={() => window.history.back()}
      >
        Back to News
      </Button>
    </Container>
  );
};

export default ContactUs;
