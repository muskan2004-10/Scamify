import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import { motion } from "framer-motion";
import { useState } from "react";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State to manage URL input and response
  const [url, setUrl] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckUrl = async () => {
    if (!url.trim()) {
      setErrorMessage("Please enter a valid URL.");
      return;
    }

    try {
      // Send POST request to backend API
      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction. Please try again.");
      }

      const data = await response.json();
      setResponseMessage(data.message || "Prediction received!");
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      setErrorMessage(error.message);
      setResponseMessage(""); // Clear any previous response message
    }
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            ":hover": {
              backgroundColor: colors.blueAccent[600],
            },
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Download Reports
        </Button>
      </Box>

      {/* SCAMIFY INTRO */}
      <Box textAlign="center" mb="30px">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Typography
            variant="h1"
            fontWeight="bold"
            color={colors.blueAccent[500]}
            sx={{
              textShadow: "2px 2px 10px rgba(0, 0, 255, 0.5)",
              fontSize: { xs: "2.5rem", sm: "4rem", md: "5rem" },
            }}
          >
            SCAMIFY
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <Typography
            variant="subtitle1"
            color={colors.grey[200]}
            mt="7px"
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem" },
              textShadow: "1px 1px 5px rgba(255, 255, 255, 0.3)",
            }}
          >
            A powerful tool to detect phishing websites and protect your data.
          </Typography>
        </motion.div>
      </Box>

      {/* URL Input Box */}
      <Box
        mt="20px"
        p="30px"
        borderRadius="12px"
        bgcolor={colors.grey[800]}
        boxShadow="0px 6px 18px rgba(0, 0, 0, 0.2)"
        textAlign="center"
      >
        <Typography
          variant="h6"
          color={colors.grey[100]}
          mb="15px"
          fontWeight="bold"
        >
          Insert a website URL below to detect if it's a phishing site.
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" mb="15px">
          <TextField
            variant="outlined"
            placeholder="Enter website URL here"
            aria-label="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{
              input: { color: colors.grey[100] },
              backgroundColor: colors.grey[700],
              borderRadius: "6px",
              width: "75%",
              marginRight: "12px",
            }}
          />
          <Button
            variant="contained"
            onClick={handleCheckUrl}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              padding: "12px 24px",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "16px",
              ":hover": {
                backgroundColor: colors.blueAccent[600],
              },
            }}
          >
            Check
          </Button>
        </Box>

        {/* Display Response or Error Message */}
        {responseMessage && (
          <Typography variant="body1" color={colors.greenAccent[400]}>
            {responseMessage}
          </Typography>
        )}
        {errorMessage && (
          <Typography variant="body1" color={colors.redAccent[400]}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
