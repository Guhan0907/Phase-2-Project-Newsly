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
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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

  const navigate = useNavigate();
  const rawUser = useSelector((state: RootState) => state.user?.user);
  const parsedUser =
    typeof rawUser === "string" ? JSON.parse(rawUser).user : rawUser;

  useEffect(() => {
    if (parsedUser?.email) {
      navigate("/");
    }
  }, [parsedUser]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const validateEmail = (value: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const validatePasswordWithFeedback = (value: string): string => {
    if (value.length < 8) return "At least 8 characters required";
    if (!/[A-Z]/.test(value)) return "Must contain an uppercase letter";
    if (!/[a-z]/.test(value)) return "Must contain a lowercase letter";
    if (!/\d/.test(value)) return "Must contain a number";
    if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(value))
      return "Must contain a special character";
    return "";
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
    const error = validatePasswordWithFeedback(value);
    setPasswordError(error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const passwordFeedback = validatePasswordWithFeedback(password);
    const isNameValid = name.trim() !== "";

    if (!isEmailValid) setEmailError("Please enter a valid email address");
    if (passwordFeedback) setPasswordError(passwordFeedback);
    if (!isNameValid) alert("Please enter your name");

    if (isEmailValid && !passwordFeedback && isNameValid) {
      dispatch(
        setUser({
          name,
          email,
          password,
          imageUrl: fallbackImage,
        }),
      );
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
          {/* Sign In */}
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
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button variant="contained" color="primary" type="submit" fullWidth>
              Sign In / Sign Up
              {/* Sign In */}
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
