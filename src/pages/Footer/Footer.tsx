import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 2,
        textAlign: "center",
        backgroundColor: "red",
        color: "text.secondary",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Newsly — All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
