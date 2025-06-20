// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableContainer,
//   CircularProgress,
//   Collapse,
//   Divider
// } from "@mui/material";

// const POLL_INTERVAL = 10000;
// const BACKEND_URL = "http://localhost:3000/api/manual/posts";

// function SelfAutomatedRealtimeScraper() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openRowId, setOpenRowId] = useState(null);


//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get(BACKEND_URL);
//       setPosts(res.data.posts || []);
//     } catch (err) {
//       console.error("Error fetching posts:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();

//     const intervalId = setInterval(fetchPosts, POLL_INTERVAL);
//     return () => clearInterval(intervalId);
//   }, []);

//   const toggleRow = (id) => {
//     setOpenRowId((prevId) => (prevId === id ? null : id));
//   };

//   return (
//     <Box sx={{ height: "85vh", maxWidth: "90vw", overflowX: "hidden", display: "flex", flexDirection: "column", px: { xs: 1, sm: 2, md: 3 }, pt: 1 }}>
//       <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2, background: "#fff", boxShadow: "0 1px 8px rgba(21, 101, 192, 0.1)", mb: 2 }}>
//         <Typography variant="h5" sx={{ fontWeight: 700, color: "#1565c0", textAlign: { xs: "center", sm: "left" } }}>
//           Live Posts (Updates every {POLL_INTERVAL / 1000}s)
//         </Typography>
//       </Paper>

//       <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", background: "#fff", borderRadius: 2, boxShadow: "0 1px 8px rgba(21, 101, 192, 0.1)", overflow: "hidden" }}>
//         <TableContainer
//           sx={{
//             flexGrow: 1,
//             overflow: "auto",
//             background: "#f5f9fd",
//             "&::-webkit-scrollbar": { display: "none" },
//             "&:hover::-webkit-scrollbar": { height: "6px" },
//             "&:hover::-webkit-scrollbar-thumb": { backgroundColor: "#90a4ae", borderRadius: 3 },
//           }}
//         >
//           <Table stickyHeader sx={{ minWidth: 1100, tableLayout: "auto", maxWidth: "90vw" }}>
//             <TableHead>
//               <TableRow>
//                 {["S.No", "Post", "URL", "Posted At", "Fetched At", "GPT Analysis", "GPT Answered At"].map((label, i) => (
//                   <TableCell
//                     key={i}
//                     sx={{ position: "sticky", top: 0, backgroundColor: "#e3f2fd", fontWeight: "bold", zIndex: 1, textAlign: "center", whiteSpace: "nowrap", px: 1.5 }}
//                   >
//                     {label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
//                     <CircularProgress size={24} color="primary" />
//                   </TableCell>
//                 </TableRow>
//               ) : posts.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center" sx={{ py: 4, color: "#94a3b8" }}>
//                     No posts found.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 posts.map((post, idx) => {
//                   const isOpen = openRowId === post._id;


//                   return (
//                     <React.Fragment key={post._id}>
//                       <TableRow
//                         hover
//                         onClick={() => toggleRow(post._id)}
//                         sx={{
//                           cursor: "pointer",
//                           height: 100,
//                           borderBottom: isOpen ? "none" : "1px solid rgba(224, 224, 224, 1)", // ✨ Dynamic border
//                           backgroundColor: "#f5f9fd",
//                         }}
//                       >



//                         <TableCell align="center">{idx + 1}</TableCell>

//                         <TableCell
//                           sx={{
//                             minWidth: 150,
//                             height: "100px", // match TableRow height
//                             px: 2,
//                             py: 0,
//                             fontSize: "0.875rem",
//                             lineHeight: 1.5,
//                           }}
//                           title={post.content}
//                         >
//                           <Box
//                             sx={{
//                               display: "flex",
//                               alignItems: "center",           // vertical centering
//                               height: "100%",                 // force full height
//                               width: "100%",                  // occupy full width
//                             }}
//                           >
//                             <Box
//                               sx={{
//                                 display: "-webkit-box",
//                                 WebkitLineClamp: 2,
//                                 WebkitBoxOrient: "vertical",
//                                 overflow: "hidden",
//                                 textOverflow: "ellipsis",
//                               }}
//                             >
//                               {post.content || "-"}
//                             </Box>
//                           </Box>
//                         </TableCell>
//                         <TableCell sx={{ textAlign: "center", px: 1 }}>
//                           <a
//                             href={post.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             style={{
//                               color: "#1976d2",
//                               fontWeight: 500,
//                               textDecoration: "underline",
//                               wordBreak: "break-word",
//                               display: "inline-block",
//                               minWidth: 150,
//                             }}
//                             title={post.url}
//                           >
//                             LINK
//                           </a>
//                         </TableCell>

//                         <TableCell sx={{ whiteSpace: "nowrap", minWidth: 225, px: 1, textAlign: "center" }}>
//                           {post.createdAt ? new Date(post.createdAt).toLocaleString() : "-"}
//                         </TableCell>
//                         <TableCell sx={{ whiteSpace: "nowrap", minWidth: 225, px: 1, textAlign: "center" }}>
//                           {post.fetchedAt ? new Date(post.fetchedAt).toLocaleString() : "-"}
//                         </TableCell>

//                         <TableCell
//                           sx={{
//                             minWidth: 150,
//                             height: "100px", // match TableRow height
//                             px: 2,
//                             py: 0,
//                             fontSize: "0.875rem",
//                             lineHeight: 1.5,
//                             display: "flex", // 💡 Use flexbox
//                             alignItems: "center", // ✨ Center vertically
//                           }}
//                           title={post.gptResponse}
//                         >
//                           <Box
//                             sx={{
//                               display: "-webkit-box",
//                               WebkitLineClamp: 2,
//                               WebkitBoxOrient: "vertical",
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                             }}
//                           >
//                             {post.gptResponse || "-"}
//                           </Box>
//                         </TableCell>
//                         <TableCell sx={{ whiteSpace: "nowrap", minWidth: 225, px: 1, textAlign: "center" }}>
//                           {post.gptAnsweredAt ? new Date(post.gptAnsweredAt).toLocaleString() : "-"}
//                         </TableCell>
//                       </TableRow>

//                       {/* Collapsible row */}
//                       <TableRow>
//                         <TableCell
//                           colSpan={7}
//                           sx={{
//                             p: 0,
//                             border: 0, // remove border from this expansion cell
//                           }}
//                         >
//                           <Collapse in={isOpen} timeout="auto" unmountOnExit>
//                             <Box
//                               sx={{
//                                 px: 3,
//                                 py: 4,
//                                 backgroundColor: "#f5f9fd",
//                                 borderTop: "none",
//                                 borderBottom: "1px solid #e0e0e0",
//                                 height: "300px",
//                                 display: "flex",
//                                 gap: 4,
//                                 overflow: "auto",
//                               }}
//                             >
//                               {/* Full Post Content Section */}
//                               <Box
//                                 sx={{
//                                   flex: 1,
//                                   border: "1px solid #ccc",
//                                   borderRadius: 2,
//                                   padding: 2,
//                                   backgroundColor: "#ffffff",
//                                 }}
//                               >
//                                 <Typography
//                                   variant="subtitle2"
//                                   sx={{ fontWeight: "bold", color: "primary.main", mb: 1 }}
//                                 >
//                                   Full Post Content:
//                                 </Typography>
//                                 <Typography
//                                   variant="body2"
//                                   sx={{
//                                     whiteSpace: "pre-wrap",
//                                     wordBreak: "break-word",
//                                   }}
//                                 >
//                                   {post.content || "-"}
//                                 </Typography>
//                               </Box>

//                               {/* GPT Analysis Section */}
//                               <Box
//                                 sx={{
//                                   flex: 1,
//                                   border: "1px solid #ccc",
//                                   borderRadius: 2,
//                                   padding: 2,
//                                   backgroundColor: "#ffffff",
//                                 }}
//                               >
//                                 <Typography
//                                   variant="subtitle2"
//                                   sx={{ fontWeight: "bold", color: "primary.main", mb: 1 }}
//                                 >
//                                   GPT Analysis:
//                                 </Typography>
//                                 <Typography
//                                   variant="body2"
//                                   sx={{
//                                     whiteSpace: "pre-wrap",
//                                     wordBreak: "break-word",
//                                   }}
//                                 >
//                                   {post.gptResponse || "-"}
//                                 </Typography>
//                               </Box>
//                             </Box>
//                           </Collapse>


//                         </TableCell>
//                       </TableRow>


//                     </React.Fragment>
//                   );
//                 })
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// }

// export default SelfAutomatedRealtimeScraper;


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++ with WebSockets +++++++++++++++++++++++++++++++++++++++ //

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
  Divider,
  Pagination, Stack, Button
} from "@mui/material";
import { io } from "socket.io-client";

// const POLL_INTERVAL = 10000;
const BACKEND_URL = "http://localhost:3000/api/manual/posts";

function SelfAutomatedRealtimeScraper() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [openRowId, setOpenRowId] = useState(null);
  const limit = 20;


  const fetchPosts = async (pageNumber = page) => {
    try {
      const res = await axios.get(`${BACKEND_URL}?page=${pageNumber}&limit=20`);
      setPosts(res.data.posts || []);
      setTotalPages(res.data.totalPages || 1);
      setPage(res.data.currentPage || 1);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPosts(); // Initial fetch for page load

    const socket = io("http://localhost:3000"); // or your actual server URL/port

    socket.on("newPost", (newPost) => {
      console.log("📥 New post received:", newPost);

      setPosts((prevPosts) => {
        const isDuplicate = prevPosts.some(p => p.postId === newPost.postId);
        if (isDuplicate) return prevPosts;
        return [newPost, ...prevPosts.slice(0, 19)]; // Keep latest 20
      });
    });

    return () => socket.disconnect();
  }, []);

  const toggleRow = (id) => {
    setOpenRowId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Box sx={{ height: "88vh", maxWidth: "90vw", overflowX: "hidden", display: "flex", flexDirection: "column", px: { xs: 0, sm: 0, md: 0 }, pt: 0 }}>
      {/* <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2, background: "#fff", boxShadow: "0 1px 8px rgba(21, 101, 192, 0.1)", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1565c0", textAlign: { xs: "center", sm: "left" } }}>
          Live Posts (Updates every {POLL_INTERVAL / 1000}s)
        </Typography>
      </Paper> */}

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



                        <TableCell align="center">{(page - 1) * limit + idx + 1}</TableCell>

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
                              {post.gptResponse || "-"}
                            </Box>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 1,
            backgroundColor: "#e3f2fd", // Match table header
            borderTop: "1px solid #ddd", // Optional: clean separation
            borderRadius: "0 0 8px 8px", // Match rounded corners at bottom
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="outlined"
              onClick={() => fetchPosts(page - 1)}
              disabled={page === 1}
              sx={{
                textTransform: "none",
                px: 1,
                backgroundColor: "#fff",
              }}
            >
              ⬅ Prev
            </Button>

            {Array.from({ length: 3 }, (_, i) => {
              let startPage = Math.max(1, page - 1);
              if (page === totalPages) startPage = totalPages - 2;
              if (page === 1) startPage = 1;
              const currentPage = startPage + i;
              if (currentPage > totalPages) return null;

              return (
                <Button
                  key={currentPage}
                  variant={currentPage === page ? "contained" : "outlined"}
                  onClick={() => fetchPosts(currentPage)}
                  sx={{
                    minWidth: 40,
                    backgroundColor: currentPage === page ? "#bbdefb" : "#fff",
                    color: currentPage === page ? "#0d47a1" : "inherit",
                    fontWeight: currentPage === page ? "bold" : "normal",
                    px: 1.5,
                  }}
                >
                  {currentPage}
                </Button>
              );
            })}

            <Button
              variant="outlined"
              onClick={() => fetchPosts(page + 1)}
              disabled={page === totalPages}
              sx={{
                textTransform: "none",
                px: 1,
                backgroundColor: "#fff",
              }}
            >
              Next ➡
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default SelfAutomatedRealtimeScraper;
