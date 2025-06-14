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

function RealTimeScraper() {
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

    const intervalId = setInterval(() => {
      fetchPosts();
    }, POLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
          Live Posts (Updates every {POLL_INTERVAL / 1000}s)
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
              minWidth: "clamp(100px, 60vw, 1500px)",
              maxWidth: "100%",
              tableLayout: "auto",
            }}
          >
            <TableHead>
              <TableRow>
                {["S.No", "Post", "URL", "Posted At", "Fetched At"].map((label, i) => (
                  <TableCell
                    key={i}
                    sx={{
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#e3f2fd",
                      fontWeight: "bold",
                      zIndex: 1,
                      textAlign: "center",
                      maxWidth: label === "S.No" ? 100 : undefined,
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
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <CircularProgress size={24} color="primary" />
                  </TableCell>
                </TableRow>
              ) : posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4, color: "#94a3b8" }}>
                    No posts found.
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post, idx) => (
                  <TableRow key={post._id} hover>
                    <TableCell align="center">{idx + 1}</TableCell>
                    <TableCell
                      sx={{
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        maxWidth: 750,
                      }}
                    >
                      {post.content}
                    </TableCell>
                    <TableCell>
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
                          maxWidth: 300,
                        }}
                        title={post.url}
                      >
                        LINK
                      </a>
                    </TableCell>
                    <TableCell style={{
                          fontWeight: 500,                          
                          maxWidth: 300,
                        }}>
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell style={{
                          fontWeight: 500,                          
                          maxWidth: 300,
                        }}>
                      {post.fetchedAt
                        ? new Date(post.fetchedAt).toLocaleString()
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

export default RealTimeScraper;



// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function CustomizedTables() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>Dessert (100g serving)</StyledTableCell>
//             <StyledTableCell align="right">Calories</StyledTableCell>
//             <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
//             <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
//             <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <StyledTableRow key={row.name}>
//               <StyledTableCell component="th" scope="row">
//                 {row.name}
//               </StyledTableCell>
//               <StyledTableCell align="right">{row.calories}</StyledTableCell>
//               <StyledTableCell align="right">{row.fat}</StyledTableCell>
//               <StyledTableCell align="right">{row.carbs}</StyledTableCell>
//               <StyledTableCell align="right">{row.protein}</StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }