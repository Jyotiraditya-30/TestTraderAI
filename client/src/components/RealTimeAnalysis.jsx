import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  CircularProgress,
} from "@mui/material";

const POLL_INTERVAL = 10000; // every 10 seconds
const BACKEND_URL = "http://3.83.254.0:3000/api/realtime/posts";

function RealTimeAnalysis() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(BACKEND_URL);
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // initial fetch
    const intervalId = setInterval(fetchPosts, POLL_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box sx={{ height: "85vh", maxWidth: "90vw", overflowX: "hidden", display: "flex", flexDirection: "column", px: { xs: 1, sm: 2, md: 3 }, pt: 1 }}>
      {/* Header */}
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
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#1565c0",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Live GPT Analysis (Updates every {POLL_INTERVAL / 1000}s)
        </Typography>
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
          height: "calc(100vh - 120px)",
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
              minWidth: 1100,
              tableLayout: "auto",
            }}
          >
            <TableHead>
              <TableRow>
                {[
                  "S.No",
                  "Post",
                  "URL",
                  "Posted At",
                  "Fetched At",
                  "GPT Analysis",
                  "GPT Answered At",
                ].map((label, i) => (
                  <TableCell
                    key={i}
                    sx={{
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#e3f2fd",
                      fontWeight: "bold",
                      zIndex: 1,
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      minWidth: label === "S.No" ? 60 : 150,
                    }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <CircularProgress size={24} color="primary" />
                  </TableCell>
                </TableRow>
              ) : posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4, color: "#94a3b8" }}>
                    No posts found.
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post, idx) => (
                  <TableRow key={post._id} hover>
                    <TableCell align="center">{idx + 1}</TableCell>
                    <TableCell sx={{ wordBreak: "break-word", maxWidth: 600 }}>
                      {post.content}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#1976d2",
                          fontWeight: 500,
                          textDecoration: "underline",
                          display: "inline-block",
                          wordBreak: "break-word",
                          textAlign: "center",
                          maxWidth: 100,
                        }}
                        title={post.url}
                      >
                        LINK
                      </a>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap", minWidth: 180 }}>
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap", minWidth: 180 }}>
                      {post.fetchedAt
                        ? new Date(post.fetchedAt).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell sx={{ wordBreak: "break-word", maxWidth: 600 }}>
                      {post.gptResponse || "-"}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap", minWidth: 180 }}>
                      {post.gptAnsweredAt
                        ? new Date(post.gptAnsweredAt).toLocaleString()
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default RealTimeAnalysis;
