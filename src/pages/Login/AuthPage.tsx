import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import GoogleSignIn from "./GoogleSignIn";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/action/userAction";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/store";

const fallbackImage = "/assets/default-user.png";

const AuthPage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  // for not re-accessing
   const navigate = useNavigate();
  const rawUser = useSelector((state: RootState) => state.user?.user);
  const parsedUser = typeof rawUser === "string" ? JSON.parse(rawUser).user : rawUser;

  useEffect(() => {
    if (parsedUser?.email) {
      navigate("/"); // or another page
    }
  }, [parsedUser]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const validatePassword = (value: string): boolean => {
    return value.length >= 6;
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value === "" || !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value === "" || !validatePassword(value)) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isNameValid = name.trim() !== "";

    if (!isEmailValid) setEmailError("Please enter a valid email address");
    if (!isPasswordValid) setPasswordError("Password must be at least 6 characters");
    if (!isNameValid) alert("Please enter your name");

    if (isEmailValid && isPasswordValid && isNameValid) {
      dispatch(
        setUser({
          name,
          email,
          password,
          imageUrl: fallbackImage,
        })
      );

      // Optional: Clear fields
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={2}
    >
      <Box
        width={isMobile ? "100%" : 400}
        p={4}
        borderRadius={2}
        boxShadow={4}
        bgcolor={theme.palette.background.paper}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Sign In / Sign Up
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Sign In / Sign Up
            </Button>
          </Stack>
        </form>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <GoogleSignIn />
      </Box>
    </Box>
  );
};

export default AuthPage;
