import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  TextField,
  Paper,
  Box,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const username = "realDonaldTrump";

function AnalyzeScraper() {
  const [analyzedPosts, setAnalyzedPosts] = useState([]);
  const [analyzeCount, setAnalyzeCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleAnalyzePosts = async () => {
    if (!analyzeCount || analyzeCount <= 0) {
      setError("Number of posts must be greater than 0.");
      return;
    }
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const res = await axios.post("http://3.83.254.0:3000/api/truth/scrape-analyze", {
        username,
        maxPosts: analyzeCount,
      });
      if (res.data.success) {
        setAnalyzedPosts(res.data.analyzedPosts);
      } else {
        setError("Analysis failed: " + (res.data.message || "Unknown error."));
      }
    } catch (err) {
      console.error("Analyze failed:", err);
      setError("Failed to analyze posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Section */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          background: "#fff",
          boxShadow: "0 1px 8px 0 rgba(21, 101, 192, 0.1)",
          mb: 2,
        }}
      >
        <Typography
          variant={isSmUp ? "h5" : "h6"}
          sx={{
            fontWeight: 700,
            color: "#43a047",
            mb: 2,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Analyze Posts from <b>@{username}</b>
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <TextField
              label="No. of Posts"
              type="number"
              size="small"
              fullWidth
              value={analyzeCount}
              onChange={(e) => setAnalyzeCount(Number(e.target.value))}
              inputProps={{ min: 1 }}
              sx={{
                background: "#f3f7fc",
                borderRadius: 1,
                "& .MuiInputBase-input": { fontWeight: 600 },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Button
              variant="contained"
              onClick={handleAnalyzePosts}
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                height: 46,
                fontWeight: 600,
                fontSize: 17,
                background: "linear-gradient(90deg, #43a047, #81c784)",
                boxShadow: "0 2px 8px 0 rgba(67,160,71,0.10)",
                borderRadius: 1,
                textTransform: "none",
                "&:hover": {
                  filter: "brightness(1.1)",
                  boxShadow: "0 4px 12px rgba(67,160,71,0.3)",
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Analyze Posts"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Table Section */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          borderRadius: 2,
          boxShadow: "0 1px 8px 0 rgba(21, 101, 192, 0.1)",
          height: "calc(100vh - 120px)", // adjust height as needed
          overflow: "hidden",
        }}
      >
        <TableContainer
          sx={{
            flexGrow: 1,
            width: "100%",
            height: "100%",
            overflowX: "auto",
            overflowY: "auto",
            background: "#f5f9fd",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&:hover::-webkit-scrollbar": {
              height: "6px",
            },
            "&:hover::-webkit-scrollbar-thumb": {
              backgroundColor: "#a5d6a7",
              borderRadius: 3,
            },
          }}
        >
          <Table
                      stickyHeader
                      sx={{
                        width: "100%",
                        minWidth: "clamp(100px, 60vw, 1500px)", // ✅ Smoothly scales with viewport
                        maxWidth: "100%",
                        tableLayout: "auto",
                      }}
                    >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#e8f5e9",
                    fontWeight: "bold",
                    zIndex: 1,
                    maxWidth: 100,
                    textAlign: "center",
                  }}
                >
                  S.No.
                </TableCell>
                <TableCell
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#e8f5e9",
                    fontWeight: "bold",
                    zIndex: 1,
                    textAlign: "center",
                    maxWidth: 400,
                    wordBreak: "break-word",
                  }}
                >
                  Post
                </TableCell>
                <TableCell
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#e8f5e9",
                    fontWeight: "bold",
                    zIndex: 1,
                    textAlign: "center",
                    maxWidth: 180,
                    wordBreak: "break-word",
                  }}
                >
                  URL
                </TableCell>
                <TableCell
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#e8f5e9",
                    fontWeight: "bold",
                    zIndex: 1,
                    textAlign: "center",
                    maxWidth: 300,
                    wordBreak: "break-word",
                  }}
                >
                  GPT Analysis
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {analyzedPosts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                    sx={{ color: "#94a3b8", fontStyle: "italic", py: 4, minWidth: 100 }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="primary" />
                    ) : (
                      'No analysis yet. Click "Analyze Posts".'
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                analyzedPosts.map((item, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell sx={{ textAlign: "center" }}>{idx + 1}</TableCell>
                    <TableCell
                      sx={{
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        maxWidth: 600,
                      }}
                    >
                      {item.post}
                    </TableCell>
                    <TableCell>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#388e3c",
                          fontWeight: 500,
                          textDecoration: "underline",
                          display: "inline-block",
                          wordBreak: "break-word",
                          maxWidth: 200,
                        }}
                        title={item.url}
                      >
                        {item.url}
                      </a>
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 800,
                        overflowY: "auto",
                        whiteSpace: "pre-wrap",
                        fontSize: 14,
                        fontFamily: "inherit",
                      }}
                    >
                      {item.gptAnalysis}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setError("")} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AnalyzeScraper;
