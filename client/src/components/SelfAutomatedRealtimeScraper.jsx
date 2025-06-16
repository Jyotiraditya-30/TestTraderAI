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
  Collapse,
  Divider
} from "@mui/material";

const POLL_INTERVAL = 10000;
const BACKEND_URL = "http://localhost:3000/api/manual/posts";

function SelfAutomatedRealtimeScraper() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openRowId, setOpenRowId] = useState(null);


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
    fetchPosts();

    const intervalId = setInterval(fetchPosts, POLL_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  const toggleRow = (id) => {
    setOpenRowId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Box sx={{ height: "85vh", maxWidth: "90vw", overflowX: "hidden", display: "flex", flexDirection: "column", px: { xs: 1, sm: 2, md: 3 }, pt: 1 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2, background: "#fff", boxShadow: "0 1px 8px rgba(21, 101, 192, 0.1)", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1565c0", textAlign: { xs: "center", sm: "left" } }}>
          Live Posts (Updates every {POLL_INTERVAL / 1000}s)
        </Typography>
      </Paper>

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", background: "#fff", borderRadius: 2, boxShadow: "0 1px 8px rgba(21, 101, 192, 0.1)", overflow: "hidden" }}>
        <TableContainer
          sx={{
            flexGrow: 1,
            overflow: "auto",
            background: "#f5f9fd",
            "&::-webkit-scrollbar": { display: "none" },
            "&:hover::-webkit-scrollbar": { height: "6px" },
            "&:hover::-webkit-scrollbar-thumb": { backgroundColor: "#90a4ae", borderRadius: 3 },
          }}
        >
          <Table stickyHeader sx={{ minWidth: 1100, tableLayout: "auto", maxWidth: "90vw" }}>
            <TableHead>
              <TableRow>
                {["S.No", "Post", "URL", "Posted At", "Fetched At", "GPT Analysis", "GPT Answered At"].map((label, i) => (
                  <TableCell
                    key={i}
                    sx={{ position: "sticky", top: 0, backgroundColor: "#e3f2fd", fontWeight: "bold", zIndex: 1, textAlign: "center", whiteSpace: "nowrap", px: 1.5 }}
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
                posts.map((post, idx) => {
                  const isOpen = openRowId === post._id;


                  return (
                    <React.Fragment key={post._id}>
                      <TableRow
                        hover
                        onClick={() => toggleRow(post._id)}
                        sx={{
                          cursor: "pointer",
                          height: 100,
                          borderBottom: isOpen ? "none" : "1px solid rgba(224, 224, 224, 1)", // ✨ Dynamic border
                          backgroundColor: "#f5f9fd",
                        }}
                      >



                        <TableCell align="center">{idx + 1}</TableCell>

                        <TableCell
                          sx={{
                            minWidth: 150,
                            height: "100px", // match TableRow height
                            px: 2,
                            py: 0,
                            fontSize: "0.875rem",
                            lineHeight: 1.5,
                          }}
                          title={post.content}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",           // vertical centering
                              height: "100%",                 // force full height
                              width: "100%",                  // occupy full width
                            }}
                          >
                            <Box
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {post.content || "-"}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ textAlign: "center", px: 1 }}>
                          <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#1976d2",
                              fontWeight: 500,
                              textDecoration: "underline",
                              wordBreak: "break-word",
                              display: "inline-block",
                              minWidth: 150,
                            }}
                            title={post.url}
                          >
                            LINK
                          </a>
                        </TableCell>

                        <TableCell sx={{ whiteSpace: "nowrap", minWidth: 225, px: 1, textAlign: "center" }}>
                          {post.createdAt ? new Date(post.createdAt).toLocaleString() : "-"}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap", minWidth: 225, px: 1, textAlign: "center" }}>
                          {post.fetchedAt ? new Date(post.fetchedAt).toLocaleString() : "-"}
                        </TableCell>

                        <TableCell
                          sx={{
                            minWidth: 150,
                            height: "100px", // match TableRow height
                            px: 2,
                            py: 0,
                            fontSize: "0.875rem",
                            lineHeight: 1.5,
                            display: "flex", // 💡 Use flexbox
                            alignItems: "center", // ✨ Center vertically
                          }}
                          title={post.gptResponse}
                        >
                          <Box
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {post.gptResponse || "-"}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap", minWidth: 225, px: 1, textAlign: "center" }}>
                          {post.gptAnsweredAt ? new Date(post.gptAnsweredAt).toLocaleString() : "-"}
                        </TableCell>
                      </TableRow>

                      {/* Collapsible row */}
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          sx={{
                            p: 0,
                            border: 0, // remove border from this expansion cell
                          }}
                        >
                          <Collapse in={isOpen} timeout="auto" unmountOnExit>
                            <Box
                              sx={{
                                px: 3,
                                py: 4,
                                backgroundColor: "#f5f9fd",
                                borderTop: "none",
                                borderBottom: "1px solid #e0e0e0",
                                height: "300px",
                                display: "flex",
                                gap: 4,
                                overflow: "auto",
                              }}
                            >
                              {/* Full Post Content Section */}
                              <Box
                                sx={{
                                  flex: 1,
                                  border: "1px solid #ccc",
                                  borderRadius: 2,
                                  padding: 2,
                                  backgroundColor: "#ffffff",
                                }}
                              >
                                <Typography
                                  variant="subtitle2"
                                  sx={{ fontWeight: "bold", color: "primary.main", mb: 1 }}
                                >
                                  Full Post Content:
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {post.content || "-"}
                                </Typography>
                              </Box>

                              {/* GPT Analysis Section */}
                              <Box
                                sx={{
                                  flex: 1,
                                  border: "1px solid #ccc",
                                  borderRadius: 2,
                                  padding: 2,
                                  backgroundColor: "#ffffff",
                                }}
                              >
                                <Typography
                                  variant="subtitle2"
                                  sx={{ fontWeight: "bold", color: "primary.main", mb: 1 }}
                                >
                                  GPT Analysis:
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {post.gptResponse || "-"}
                                </Typography>
                              </Box>
                            </Box>
                          </Collapse>


                        </TableCell>
                      </TableRow>


                    </React.Fragment>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default SelfAutomatedRealtimeScraper;



// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// function createData(name, calories, fat, carbs, protein, price) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       {
//         date: '2020-01-05',
//         customerId: '11091700',
//         amount: 3,
//       },
//       {
//         date: '2020-01-02',
//         customerId: 'Anonymous',
//         amount: 1,
//       },
//     ],
//   };
// }

// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);

//   return (
//     <React.Fragment>
//       <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//         <TableCell>
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell component="th" scope="row">
//           {row.name}
//         </TableCell>
//         <TableCell align="right">{row.calories}</TableCell>
//         <TableCell align="right">{row.fat}</TableCell>
//         <TableCell align="right">{row.carbs}</TableCell>
//         <TableCell align="right">{row.protein}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Typography variant="h6" gutterBottom component="div">
//                 History
//               </Typography>
//               <Table size="small" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Customer</TableCell>
//                     <TableCell align="right">Amount</TableCell>
//                     <TableCell align="right">Total price ($)</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.history.map((historyRow) => (
//                     <TableRow key={historyRow.date}>
//                       <TableCell component="th" scope="row">
//                         {historyRow.date}
//                       </TableCell>
//                       <TableCell>{historyRow.customerId}</TableCell>
//                       <TableCell align="right">{historyRow.amount}</TableCell>
//                       <TableCell align="right">
//                         {Math.round(historyRow.amount * row.price * 100) / 100}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

// // Row.propTypes = {
// //   row: PropTypes.shape({
// //     calories: PropTypes.number.isRequired,
// //     carbs: PropTypes.number.isRequired,
// //     fat: PropTypes.number.isRequired,
// //     history: PropTypes.arrayOf(
// //       PropTypes.shape({
// //         amount: PropTypes.number.isRequired,
// //         customerId: PropTypes.string.isRequired,
// //         date: PropTypes.string.isRequired,
// //       }),
// //     ).isRequired,
// //     name: PropTypes.string.isRequired,
// //     price: PropTypes.number.isRequired,
// //     protein: PropTypes.number.isRequired,
// //   }).isRequired,
// // };

// // const rows = [
// //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
// //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
// //   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
// //   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
// //   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// // ];

// // export default function CollapsibleTable() {
// //   return (
// //     <Box
// //       sx={{
// //         width: '100%',
// //         maxWidth: '100vw',
// //         overflowX: 'hidden',
// //         px: 1, // optional padding
// //       }}
// //     >
// //       <Paper
// //         sx={{
// //           width: '100%',
// //           overflowX: 'auto',
// //         }}
// //       >
// //         <Box sx={{ minWidth: 800 }}>
// //           <Table aria-label="collapsible table">
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell />
// //                 <TableCell>Dessert (100g serving)</TableCell>
// //                 <TableCell align="right">Calories</TableCell>
// //                 <TableCell align="right">Fat&nbsp;(g)</TableCell>
// //                 <TableCell align="right">Carbs&nbsp;(g)</TableCell>
// //                 <TableCell align="right">Protein&nbsp;(g)</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {rows.map((row) => (
// //                 <Row key={row.name} row={row} />
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </Box>
// //       </Paper>
// //     </Box>
// //   );
// // }


