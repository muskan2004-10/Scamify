import React, { useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputBase,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEgLrQ5p_3Prv3jGt6ZqzwH1YBZ8RmnBE",
  authDomain: "login-page-6279e.firebaseapp.com",
  projectId: "login-page-6279e",
  storageBucket: "login-page-6279e.firebasestorage.app",
  messagingSenderId: "606652753377",
  appId: "1:606652753377:web:a4b38fe0d243d9baa5dea0",
  measurementId: "G-SL4S2ZQ405",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [open, setOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleAuth = async () => {
    if (isSignUp) {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!acceptTerms) {
        setError("You must accept the terms and conditions.");
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
      } catch (err) {
        setError(err.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
      } catch (err) {
        setError(err.message);
      }
    }
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setAcceptTerms(false);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        width="40%"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS AND LOGIN */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        <Button
          variant="contained"
          sx={{
            ml: 2,
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "20px",
          }}
          onClick={() => setOpen(true)}
        >
          Login
        </Button>
      </Box>

      {/* Authentication Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.8rem",
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            color: "#fff",
          }}
        >
          {isSignUp ? "Create Your Account" : "Welcome Back"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              mt: 2,
              p: 3,
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography variant="subtitle1" align="center" sx={{ mb: 3 }}>
              {isSignUp
                ? "Sign up to manage and detect phishing websites easily."
                : "Sign in to continue using Scamify."}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {isSignUp && (
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              {isSignUp && (
                <Grid item xs={12}>
                  <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
              )}
              {error && (
                <Grid item xs={12}>
                  <Typography
                    color="error"
                    variant="body2"
                    align="center"
                    sx={{ mt: 1 }}
                  >
                    {error}
                  </Typography>
                </Grid>
              )}
              {isSignUp && (
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I accept the <a href="#terms">Terms and Conditions</a>
                      </Typography>
                    }
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    textTransform: "none",
                    fontWeight: "bold",
                    padding: "12px",
                    background: "linear-gradient(to right, #34e89e, #0f3443)",
                  }}
                  onClick={handleAuth}
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  sx={{
                    mt: 2,
                    textTransform: "none",
                    color: "#2575fc",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    resetForm();
                  }}
                >
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Topbar;

