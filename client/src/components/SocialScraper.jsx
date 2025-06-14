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

const drawerWidth = 240;
const headerHeight = 64;
const username = "realDonaldTrump";

function SocialScraper() {
  const [scrapedPosts, setScrapedPosts] = useState([]);
  const [scrapeCount, setScrapeCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleScrapePosts = async () => {
    if (!scrapeCount || scrapeCount <= 0) {
      setError("Number of posts must be greater than 0.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://3.83.254.0:3000/api/scrape/scrape-posts", {
        username,
        maxPosts: scrapeCount,
      });
      setScrapedPosts(res.data.posts);
    } catch (err) {
      console.error("Scrape failed:", err);
      setError("Failed to scrape posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
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
            color: "#1565c0",
            mb: 2,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Extract Posts from <b>@{username}</b>
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <TextField
              label="No. of Posts"
              type="number"
              size="small"
              fullWidth
              value={scrapeCount}
              onChange={(e) => setScrapeCount(Number(e.target.value))}
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
              onClick={handleScrapePosts}
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                height: 46,
                fontWeight: 600,
                fontSize: 17,
                background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                boxShadow: "0 2px 8px 0 rgba(25,118,210,0.10)",
                borderRadius: 1,
                textTransform: "none",
                "&:hover": {
                  filter: "brightness(1.1)",
                  boxShadow: "0 4px 12px rgba(25,118,210,0.3)",
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Extract Posts"}
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
          height: "calc(100vh - 120px)", // Adjust based on your header + toolbar height
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
              backgroundColor: "#90a4ae",
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
                    backgroundColor: "#e3f2fd",
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
                    backgroundColor: "#e3f2fd",
                    fontWeight: "bold",
                    zIndex: 1,
                    textAlign: "center",
                  }}
                >
                  Post
                </TableCell>
                <TableCell
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#e3f2fd",
                    fontWeight: "bold",
                    zIndex: 1,
                    textAlign: "center",
                  }}
                >
                  URL
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scrapedPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 4, color: "#94a3b8", minWidth: 100 }}>
                    {loading ? (
                      <CircularProgress size={24} color="primary" />
                    ) : (
                      'No data yet. Click "Extract Posts".'
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                scrapedPosts.map((item, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell
                      sx={{
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        maxWidth: 1200,
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
                          color: "#1976d2",
                          fontWeight: 500,
                          textDecoration: "underline",
                          display: "inline-block",
                          wordBreak: "break-word",
                          maxWidth: 800,
                        }}
                        title={item.url}
                      >
                        {item.url}
                      </a>
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

export default SocialScraper;
