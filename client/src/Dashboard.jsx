// // import React, { useState } from "react";
// // import axios from "axios";

// // function Dashboard() {
// //   const [scrapedPosts, setScrapedPosts] = useState([]);
// //   const [analyzedPosts, setAnalyzedPosts] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   // Fetch only scraped posts (no analysis)
// //   const handleScrapePosts = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get("http://3.83.254.0:3000/scrape/scrape-posts");
// //       setScrapedPosts(res.data.posts); // [{ post, url }]
// //       setAnalyzedPosts([]); // clear analysis
// //     } catch (e) {
// //       alert("Failed to scrape posts");
// //     }
// //     setLoading(false);
// //   };

// //   // Fetch analyzed posts (with analysis)
// //   const handleAnalyzePosts = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get("http://3.83.254.0:3000/truth/scrape-analyze");
// //       if (res.data.success) {
// //         setAnalyzedPosts(res.data.analyzedPosts);
// //         setScrapedPosts([]); // clear scrape
// //       } else {
// //         alert("Analysis failed");
// //       }
// //     } catch (e) {
// //       alert("Failed to analyze posts");
// //     }
// //     setLoading(false);
// //   };

// //   // Layout rendering
// //   return (
// //     <div style={{ padding: 32, fontFamily: "sans-serif" }}>
// //       <h1>Social Post Dashboard</h1>
// //       <div style={{ marginBottom: 24 }}>
// //         <button onClick={handleScrapePosts} disabled={loading} style={{ marginRight: 12 }}>
// //           Scrape Post
// //         </button>
// //         <button onClick={handleAnalyzePosts} disabled={loading}>
// //           Analyse Post
// //         </button>
// //       </div>

// //       <div style={{ display: "flex", gap: 32 }}>
// //         {/* Left: Scraped Data */}
// //         <div style={{ flex: 1 }}>
// //           <h2>Scraped Data</h2>
// //           {scrapedPosts.length === 0 && <p>No scraped data.</p>}
// //           {scrapedPosts.map((item, idx) => (
// //             <div key={idx} style={{ marginBottom: 16, padding: 12, border: "1px solid #eee" }}>
// //               <div><b>Post:</b> {item.post}</div>
// //               <div>
// //                 <b>URL:</b> <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //         {/* Right: Analysis */}
// //         <div style={{ flex: 1 }}>
// //           <h2>Analysis</h2>
// //           {analyzedPosts.length === 0 && <p>No analysis data.</p>}
// //           {analyzedPosts.map((item, idx) => (
// //             <div key={idx} style={{ marginBottom: 16, padding: 12, border: "1px solid #eee" }}>
// //               <div><b>Post:</b> {item.post}</div>
// //               <div>
// //                 <b>URL:</b> <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
// //               </div>
// //               <div style={{ marginTop: 8 }}>
// //                 <b>GPT Analysis:</b>
// //                 <pre style={{ background: "#f7f7f7", padding: 8, borderRadius: 4 }}>
// //                   {item.gptAnalysis}
// //                 </pre>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Dashboard;


// // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Updated File +++++++++++++++++++++++++++++++++++++++++++++++++++ //

// // import React, { useState } from "react";
// // import axios from "axios";
// // import {
// //   CssBaseline,
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   Button,
// //   CircularProgress,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Snackbar,
// //   Alert,
// //   Card,
// //   CardContent,
// //   TextField,
// //   Paper,
// //   Drawer,
// //   List,
// //   ListItem,
// //   ListItemButton,
// //   ListItemIcon,
// //   ListItemText,
// //   Box,
// //   useMediaQuery,
// //   Divider,
// //   Container,
// //   Grid
// // } from "@mui/material";
// // import FeedIcon from "@mui/icons-material/Feed";
// // import AnalyticsIcon from "@mui/icons-material/Analytics";
// // import MenuIcon from "@mui/icons-material/Menu";

// // const drawerWidth = 230;

// // function Dashboard() {
// //   const [activeTab, setActiveTab] = useState("scraped");
// //   const [scrapedPosts, setScrapedPosts] = useState([]);
// //   const [analyzedPosts, setAnalyzedPosts] = useState([]);
// //   const [scrapeCount, setScrapeCount] = useState(5);
// //   const [analyzeCount, setAnalyzeCount] = useState(5);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const isSmUp = useMediaQuery(theme => theme.breakpoints.up("sm"));
// //   const username = "realDonaldTrump";

// //   const handleScrapePosts = async () => {
// //     if (!scrapeCount || scrapeCount <= 0) return setError("Number of posts must be greater than 0.");
// //     setLoading(true);
// //     try {
// //       // const res = await axios.post("http://localhost:3000/scrape/scrape-posts", {
// //       const res = await axios.post("http://3.83.254.0:3000/scrape/scrape-posts", {
// //         username,
// //         maxPosts: scrapeCount,
// //       });
// //       setScrapedPosts(res.data.posts);
// //       setAnalyzedPosts([]);
// //     } catch {
// //       setError("Failed to scrape posts.");
// //     }
// //     setLoading(false);
// //   };

// //   const handleAnalyzePosts = async () => {
// //     if (!analyzeCount || analyzeCount <= 0) return setError("Number of posts must be greater than 0.");
// //     setLoading(true);
// //     try {
// //       // const res = await axios.post("http://localhost:3000/truth/scrape-analyze", {
// //       const res = await axios.post("http://3.83.254.0:3000/truth/scrape-analyze", {
// //         username,
// //         maxPosts: analyzeCount,
// //       });
// //       if (res.data.success) {
// //         setAnalyzedPosts(res.data.analyzedPosts);
// //         setScrapedPosts([]);
// //       } else {
// //         setError("Analysis failed.");
// //       }
// //     } catch {
// //       setError("Failed to analyze posts.");
// //     }
// //     setLoading(false);
// //   };

// //   const drawer = (
// //     <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
// //       <Box sx={{ py: 3, textAlign: "center" }}>
// //         <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, color: "#1565c0" }}>
// //           Truth Monitor
// //         </Typography>
// //       </Box>
// //       <Divider />
// //       <List>
// //         <ListItem disablePadding>
// //           <ListItemButton
// //             selected={activeTab === "scraped"}
// //             onClick={() => {
// //               setActiveTab("scraped");
// //               if (!isSmUp) setMobileOpen(false);
// //             }}
// //             sx={{
// //               borderLeft: activeTab === "scraped" ? "4px solid #1565c0" : "4px solid transparent",
// //               background: activeTab === "scraped" ? "rgba(21,101,192,0.08)" : "none"
// //             }}
// //           >
// //             <ListItemIcon>
// //               <FeedIcon color={activeTab === "scraped" ? "primary" : "inherit"} />
// //             </ListItemIcon>
// //             <ListItemText primary="Social Scraper" />
// //           </ListItemButton>
// //         </ListItem>
// //         <ListItem disablePadding>
// //           <ListItemButton
// //             selected={activeTab === "analyzed"}
// //             onClick={() => {
// //               setActiveTab("analyzed");
// //               if (!isSmUp) setMobileOpen(false);
// //             }}
// //             sx={{
// //               borderLeft: activeTab === "analyzed" ? "4px solid #43a047" : "4px solid transparent",
// //               background: activeTab === "analyzed" ? "rgba(67,160,71,0.08)" : "none"
// //             }}
// //           >
// //             <ListItemIcon>
// //               <AnalyticsIcon color={activeTab === "analyzed" ? "success" : "inherit"} />
// //             </ListItemIcon>
// //             <ListItemText primary="Analyze Scraper" />
// //           </ListItemButton>
// //         </ListItem>
// //       </List>
// //       <Box sx={{ flexGrow: 1 }} />
// //       <Box sx={{ p: 2, textAlign: "center" }}>
// //         <Typography variant="caption" color="text.secondary">
// //           &copy; {new Date().getFullYear()} Social Dashboard
// //         </Typography>
// //       </Box>
// //     </Box>
// //   );

// //   return (
// //     <Box sx={{ display: "flex", bgcolor: "#f7fafd", minHeight: "100vh" }}>
// //       <CssBaseline />

// //       {/* App Bar */}
// //       <AppBar
// //         position="fixed"
// //         sx={{
// //           zIndex: theme => theme.zIndex.drawer + 1,
// //           bgcolor: "#fff",
// //           color: "#21243a",
// //           boxShadow: "0 2px 10px 0 rgba(22,28,45,0.06)",
// //           borderBottom: "1px solid #e3e7ee"
// //         }}
// //       >
// //         <Toolbar>
// //           {!isSmUp && (
// //             <Button
// //               onClick={() => setMobileOpen(!mobileOpen)}
// //               sx={{ minWidth: 0, mr: 2, color: "#1565c0" }}
// //             >
// //               <MenuIcon />
// //             </Button>
// //           )}
// //           <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
// //             Smart Trader AI
// //           </Typography>
// //         </Toolbar>
// //       </AppBar>

// //       {/* Sidebar */}
// //       <Box
// //         component="nav"
// //         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
// //         aria-label="sidebar"
// //       >
// //         <Drawer
// //           variant="temporary"
// //           open={mobileOpen}
// //           onClose={() => setMobileOpen(false)}
// //           ModalProps={{ keepMounted: true }}
// //           sx={{
// //             display: { xs: "block", sm: "none" },
// //             "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
// //           }}
// //         >
// //           {drawer}
// //         </Drawer>
// //         <Drawer
// //           variant="permanent"
// //           sx={{
// //             display: { xs: "none", sm: "block" },
// //             "& .MuiDrawer-paper": {
// //               boxSizing: "border-box",
// //               width: drawerWidth,
// //               bgcolor: "#f8fafc",
// //               borderRight: "1px solid #e3e7ee"
// //             }
// //           }}
// //           open
// //         >
// //           {drawer}
// //         </Drawer>
// //       </Box>

// //       {/* Main Content */}
// //       <Box
// //         component="main"
// //         sx={{
// //           flexGrow: 1,
// //           px: { xs: 1, sm: 4 },
// //           py: { xs: 8, sm: 7 },
// //           width: { sm: `calc(100% - ${drawerWidth}px)` },
// //           minHeight: "100vh",
// //           transition: "padding 0.3s"
// //         }}
// //       >
// //         <Container maxWidth="md" sx={{ px: { xs: 0.5, md: 2 }, py: 0 }}>
// //           <Paper
// //             elevation={0}
// //             sx={{
// //               p: { xs: 1.5, sm: 4 },
// //               mb: 5,
// //               borderRadius: 4,
// //               background: "#fff",
// //               boxShadow: "0 1px 6px 0 rgba(21, 101, 192, 0.06)"
// //             }}
// //           >
// //             <Typography
// //               variant="h5"
// //               sx={{
// //                 fontWeight: 700,
// //                 color: activeTab === "scraped" ? "#1565c0" : "#43a047",
// //                 mb: 3,
// //                 textAlign: { xs: "center", sm: "left" }
// //               }}
// //             >
// //               {activeTab === "scraped"
// //                 ? <>Extract Posts from <b>@{username}</b></>
// //                 : <>Analyze Posts from <b>@{username}</b></>
// //               }
// //             </Typography>
// //             <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
// //               <Grid item xs={12} sm={5}>
// //                 <TextField
// //                   label="No. of Posts"
// //                   type="number"
// //                   size="small"
// //                   fullWidth
// //                   value={activeTab === "scraped" ? scrapeCount : analyzeCount}
// //                   onChange={e =>
// //                     activeTab === "scraped"
// //                       ? setScrapeCount(Number(e.target.value))
// //                       : setAnalyzeCount(Number(e.target.value))
// //                   }
// //                   inputProps={{ min: 1 }}
// //                   sx={{ background: "#f3f7fc", borderRadius: 2 }}
// //                 />
// //               </Grid>
// //               <Grid item xs={12} sm={7}>
// //                 <Button
// //                   variant="contained"
// //                   onClick={activeTab === "scraped" ? handleScrapePosts : handleAnalyzePosts}
// //                   size="large"
// //                   fullWidth
// //                   disabled={loading}
// //                   sx={{
// //                     height: 46,
// //                     fontWeight: 600,
// //                     fontSize: 17,
// //                     background: activeTab === "scraped"
// //                       ? "linear-gradient(90deg,#1976d2,#42a5f5)"
// //                       : "linear-gradient(90deg,#43a047,#81c784)",
// //                     boxShadow: "0 2px 8px 0 rgba(21,101,192,0.10)",
// //                     borderRadius: 2,
// //                     textTransform: "none"
// //                   }}
// //                 >
// //                   {activeTab === "scraped" ? "Extract Posts" : "Analyze Posts"}
// //                 </Button>
// //               </Grid>
// //             </Grid>

// //             <Box sx={{ position: "relative" }}>
// //               {loading && (
// //                 <Box
// //                   sx={{
// //                     position: "absolute", inset: 0,
// //                     display: "flex", justifyContent: "center", alignItems: "center",
// //                     bgcolor: "rgba(255,255,255,0.7)", zIndex: 10
// //                   }}
// //                 >
// //                   <CircularProgress />
// //                 </Box>
// //               )}
// //               <TableContainer
// //                 component={Paper}
// //                 sx={{
// //                   boxShadow: 0,
// //                   borderRadius: 2,
// //                   mt: 1,
// //                   background: "#f5f9fd"
// //                 }}
// //               >
// //                 <Table>
// //                   <TableHead>
// //                     <TableRow>
// //                       <TableCell>
// //                         <b>Post</b>
// //                       </TableCell>
// //                       <TableCell>
// //                         <b>URL</b>
// //                       </TableCell>
// //                       {activeTab === "analyzed" && (
// //                         <TableCell>
// //                           <b>GPT Analysis</b>
// //                         </TableCell>
// //                       )}
// //                     </TableRow>
// //                   </TableHead>
// //                   <TableBody>
// //                     {(activeTab === "scraped"
// //                       ? scrapedPosts
// //                       : analyzedPosts
// //                     ).length === 0 ? (
// //                       <TableRow>
// //                         <TableCell
// //                           colSpan={activeTab === "scraped" ? 2 : 3}
// //                           align="center"
// //                           sx={{
// //                             color: "#94a3b8",
// //                             fontStyle: "italic"
// //                           }}
// //                         >
// //                           {activeTab === "scraped"
// //                             ? 'No data yet. Click "Extract Posts".'
// //                             : 'No analysis yet. Click "Analyze Posts".'}
// //                         </TableCell>
// //                       </TableRow>
// //                     ) : (
// //                       (activeTab === "scraped"
// //                         ? scrapedPosts
// //                         : analyzedPosts
// //                       ).map((item, idx) => (
// //                         <TableRow
// //                           key={idx}
// //                           hover
// //                           sx={{
// //                             transition: "background 0.2s",
// //                             "&:hover": { background: "#e3f2fd" }
// //                           }}
// //                         >
// //                           <TableCell
// //                             sx={{
// //                               wordBreak: "break-word",
// //                               maxWidth: 300,
// //                               fontSize: 16
// //                             }}
// //                           >
// //                             {item.post}
// //                           </TableCell>
// //                           <TableCell>
// //                             <a
// //                               href={item.url}
// //                               target="_blank"
// //                               rel="noopener noreferrer"
// //                               style={{ color: "#1976d2", fontWeight: 500, textDecoration: "underline" }}
// //                             >
// //                               {item.url}
// //                             </a>
// //                           </TableCell>
// //                           {activeTab === "analyzed" && (
// //                             <TableCell sx={{ width: 260 }}>
// //                               <Card
// //                                 variant="outlined"
// //                                 sx={{
// //                                   background: "#e8f5e9",
// //                                   borderRadius: 2,
// //                                   px: 1,
// //                                   py: 0.5
// //                                 }}
// //                               >
// //                                 <CardContent sx={{ p: 1.5 }}>
// //                                   <Typography
// //                                     variant="body2"
// //                                     component="pre"
// //                                     sx={{
// //                                       whiteSpace: "pre-wrap",
// //                                       fontFamily: "inherit",
// //                                       fontSize: 15
// //                                     }}
// //                                   >
// //                                     {item.gptAnalysis}
// //                                   </Typography>
// //                                 </CardContent>
// //                               </Card>
// //                             </TableCell>
// //                           )}
// //                         </TableRow>
// //                       ))
// //                     )}
// //                   </TableBody>
// //                 </Table>
// //               </TableContainer>
// //             </Box>
// //           </Paper>
// //         </Container>
// //         <Snackbar
// //           open={!!error}
// //           autoHideDuration={4000}
// //           onClose={() => setError("")}
// //           anchorOrigin={{ vertical: "top", horizontal: "center" }}
// //         >
// //           <Alert onClose={() => setError("")} severity="error" sx={{ width: "100%" }}>
// //             {error}
// //           </Alert>
// //         </Snackbar>
// //       </Box>
// //     </Box>
// //   );
// // }

// // export default Dashboard;

// //+++++++++++++++++++++++++++++++++++++++++++++++++ update ++++++++++++++++++++++++++++++++++++++ //

//   import React, { useState } from "react";
//   import axios from "axios";
//   import {
//     CssBaseline,
//     AppBar,
//     Toolbar,
//     Typography,
//     Button,
//     CircularProgress,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Snackbar,
//     Alert,
//     Card,
//     CardContent,
//     TextField,
//     Paper,
//     Drawer,
//     List,
//     ListItem,
//     ListItemButton,
//     ListItemIcon,
//     ListItemText,
//     Box,
//     useMediaQuery,
//     Divider,
//     // Removed Container import as it will no longer be used to constrain width
//     Grid,
//     useTheme, // Import useTheme for responsive breakpoints
//   } from "@mui/material";
//   import FeedIcon from "@mui/icons-material/Feed";
//   import AnalyticsIcon from "@mui/icons-material/Analytics";
//   import MenuIcon from "@mui/icons-material/Menu";

//   const drawerWidth = 240; // Adjusted for a bit more space

//   function Dashboard() {
//     const [activeTab, setActiveTab] = useState("scraped");
//     const [scrapedPosts, setScrapedPosts] = useState([]);
//     const [analyzedPosts, setAnalyzedPosts] = useState([]);
//     const [scrapeCount, setScrapeCount] = useState(5);
//     const [analyzeCount, setAnalyzeCount] = useState(5);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [mobileOpen, setMobileOpen] = useState(false);

//     const theme = useTheme(); // Initialize useTheme to access theme properties
//     const isSmUp = useMediaQuery(theme.breakpoints.up("sm")); // Use theme breakpoints for responsiveness

//     const username = "realDonaldTrump"; // Hardcoded username for the dashboard

//     /**
//      * Handles the scraping of posts.
//      * Sets loading state, clears previous errors, makes an API call to scrape posts,
//      * and updates the scrapedPosts state. Handles errors if the API call fails.
//      */
//     const handleScrapePosts = async () => {
//       if (!scrapeCount || scrapeCount <= 0) {
//         setError("Number of posts must be greater than 0.");
//         return;
//       }
//       setLoading(true);
//       setError(""); // Clear previous errors
//       try {
//         const res = await axios.post("http://3.83.254.0:3000/scrape/scrape-posts", {
//           username,
//           maxPosts: scrapeCount,
//         });
//         setScrapedPosts(res.data.posts);
//         setAnalyzedPosts([]); // Clear analyzed posts when scraping new data
//       } catch (err) {
//         console.error("Scrape failed:", err); // Log error for debugging
//         setError("Failed to scrape posts. Please try again.");
//       } finally {
//         setLoading(false); // Always set loading to false
//       }
//     };

//     /**
//      * Handles the analysis of posts.
//      * Sets loading state, clears previous errors, makes an API call to analyze posts,
//      * and updates the analyzedPosts state. Handles errors if the API call fails.
//      */
//     const handleAnalyzePosts = async () => {
//       if (!analyzeCount || analyzeCount <= 0) {
//         setError("Number of posts must be greater than 0.");
//         return;
//       }
//       setLoading(true);
//       setError(""); // Clear previous errors
//       try {
//         const res = await axios.post("http://3.83.254.0:3000/truth/scrape-analyze", {
//           username,
//           maxPosts: analyzeCount,
//         });
//         if (res.data.success) {
//           setAnalyzedPosts(res.data.analyzedPosts);
//           setScrapedPosts([]); // Clear scraped posts when analyzing new data
//         } else {
//           // Provide a more specific error message from the API if available
//           setError("Analysis failed: " + (res.data.message || "Unknown error."));
//         }
//       } catch (err) {
//         console.error("Analyze failed:", err); // Log error for debugging
//         setError("Failed to analyze posts. Please try again.");
//       } finally {
//         setLoading(false); // Always set loading to false
//       }
//     };

//     /**
//      * Toggles the mobile drawer open/close state.
//      */
//     const handleDrawerToggle = () => {
//       setMobileOpen(!mobileOpen);
//     };

//     // Drawer content common to both temporary and permanent drawers
//     const drawer = (
//       <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
//         {/* App title in drawer */}
//         <Box sx={{ py: 3, textAlign: "center" }}>
//           <Typography
//             variant="h6"
//             sx={{ fontWeight: 700, letterSpacing: 1, color: "#1565c0" }}
//           >
//             Truth Monitor
//           </Typography>
//         </Box>
//         <Divider />
//         {/* Navigation List */}
//         <List>
//           <ListItem disablePadding>
//             <ListItemButton
//               selected={activeTab === "scraped"} // Highlight if active
//               onClick={() => {
//                 setActiveTab("scraped");
//                 if (!isSmUp) setMobileOpen(false); // Close drawer on mobile after selection
//               }}
//               sx={{
//                 // Visual indicator for active tab
//                 borderLeft:
//                   activeTab === "scraped"
//                     ? "4px solid #1565c0"
//                     : "4px solid transparent",
//                 background:
//                   activeTab === "scraped" ? "rgba(21,101,192,0.08)" : "none",
//               }}
//             >
//               <ListItemIcon>
//                 <FeedIcon color={activeTab === "scraped" ? "primary" : "inherit"} />
//               </ListItemIcon>
//               <ListItemText primary="Social Scraper" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton
//               selected={activeTab === "analyzed"} // Highlight if active
//               onClick={() => {
//                 setActiveTab("analyzed");
//                 if (!isSmUp) setMobileOpen(false); // Close drawer on mobile after selection
//               }}
//               sx={{
//                 // Visual indicator for active tab
//                 borderLeft:
//                   activeTab === "analyzed"
//                     ? "4px solid #43a047"
//                     : "4px solid transparent",
//                 background:
//                   activeTab === "analyzed" ? "rgba(67,160,71,0.08)" : "none",
//               }}
//             >
//               <ListItemIcon>
//                 <AnalyticsIcon
//                   color={activeTab === "analyzed" ? "success" : "inherit"}
//                 />
//               </ListItemIcon>
//               <ListItemText primary="Analyze Scraper" />
//             </ListItemButton>
//           </ListItem>
//         </List>
//         <Box sx={{ flexGrow: 1 }} /> {/* Pushes footer to the bottom */}
//         {/* Copyright info in drawer */}
//         <Box sx={{ p: 2, textAlign: "center" }}>
//           <Typography variant="caption" color="text.secondary">
//             &copy; {new Date().getFullYear()} Social Dashboard
//           </Typography>
//         </Box>
//       </Box>
//     );

//     const appBarHeight = 64; // Define standard AppBar height for consistent layout calculations

//     return (
//       <Box sx={{ display: "flex", bgcolor: "#f7fafd", minHeight: "100vh" }}>
//         <CssBaseline /> {/* Resets CSS to a consistent baseline */}

//         {/* Main AppBar */}
//         <AppBar
//           position="fixed" // Keeps AppBar at the top
//           sx={{
//             zIndex: (theme) => theme.zIndex.drawer + 1, // Ensures AppBar is above drawer
//             bgcolor: "#fff",
//             color: "#21243a",
//             boxShadow: "0 2px 10px 0 rgba(22,28,45,0.06)",
//             borderBottom: "1px solid #e3e7ee",
//             height: appBarHeight, // Explicitly set height
//             justifyContent: "center", // Vertically centers content in toolbar
//           }}
//         >
//           <Toolbar>
//             {!isSmUp && ( // Show menu icon only on small screens
//               <Button
//                 onClick={handleDrawerToggle} // Toggles mobile drawer
//                 sx={{ minWidth: 0, mr: 2, color: "#1565c0" }}
//               >
//                 <MenuIcon />
//               </Button>
//             )}
//             <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
//               Smart Trader AI
//             </Typography>
//           </Toolbar>
//         </AppBar>

//         {/* Responsive Sidebar */}
//         <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
//           {/* Temporary drawer for mobile */}
//           <Drawer
//             variant="temporary"
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             ModalProps={{ keepMounted: true }} // Better performance on mobile
//             sx={{
//               display: { xs: "block", sm: "none" }, // Only on small screens
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//           >
//             {drawer}
//           </Drawer>
//           {/* Permanent drawer for desktop */}
//           <Drawer
//             variant="permanent"
//             sx={{
//               display: { xs: "none", sm: "block" }, // Only on large screens
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//                 bgcolor: "#f8fafc",
//                 borderRight: "1px solid #e3e7ee",
//               },
//             }}
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Box>

//         {/* Main Content Area */}
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1, // Takes all available horizontal space after sidebar
//             display: "flex",
//             flexDirection: "column", // Lays out children vertically
//             // Ensures the main content area occupies full viewport height minus app bar,
//             // crucial for table to expand to the bottom.
//             minHeight: `calc(100vh - ${appBarHeight}px)`,
//             mt: `${appBarHeight}px`, // Pushes content down to clear the fixed AppBar
//             // Apply padding directly to the main content box
//             p: { xs: 2, sm: 3 },
//             boxSizing: "border-box", // Include padding in minHeight calculation
//             overflow: "hidden", // Prevents extra scrollbars on the main content box itself
//           }}
//         >
//           {/* Removed Container component to allow full width */}
//           <Box
//             sx={{
//               flexGrow: 1, // This Box expands to fill remaining vertical space
//               display: "flex",
//               flexDirection: "column", // Lays out its children (Paper components) vertically
//               gap: theme.spacing(3), // Spacing between the header/actions and table sections
//               width: "100%", // Ensure this box takes full available width
//               // No horizontal padding here, it's now handled by the main Box
//             }}
//           >
//             {/* Header & Actions Section */}
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 2, sm: 3 }, // Internal padding
//                 borderRadius: theme.shape.borderRadius * 2, // Rounded corners
//                 background: "#fff",
//                 boxShadow: "0 1px 6px 0 rgba(21, 101, 192, 0.06)",
//                 flexShrink: 0, // Prevents this section from shrinking when space is tight
//               }}
//             >
//               <Typography
//                 variant={isSmUp ? "h5" : "h6"}
//                 sx={{
//                   fontWeight: 700,
//                   color: activeTab === "scraped" ? "#1565c0" : "#43a047",
//                   mb: theme.spacing(2), // Margin below the title
//                   textAlign: { xs: "center", sm: "left" },
//                   userSelect: "none",
//                 }}
//               >
//                 {activeTab === "scraped" ? (
//                   <>
//                     Extract Posts from <b>@{username}</b>
//                   </>
//                 ) : (
//                   <>
//                     Analyze Posts from <b>@{username}</b>
//                   </>
//                 )}
//               </Typography>
//               <Grid container spacing={2} alignItems="center">
//                 <Grid item xs={12} sm={4}>
//                   <TextField
//                     label="No. of Posts"
//                     type="number"
//                     size="small"
//                     fullWidth
//                     value={activeTab === "scraped" ? scrapeCount : analyzeCount}
//                     onChange={(e) =>
//                       activeTab === "scraped"
//                         ? setScrapeCount(Number(e.target.value))
//                         : setAnalyzeCount(Number(e.target.value))
//                     }
//                     inputProps={{ min: 1 }}
//                     sx={{
//                       background: "#f3f7fc",
//                       borderRadius: theme.shape.borderRadius,
//                       "& .MuiInputBase-input": { fontWeight: 600 },
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={8}>
//                   <Button
//                     variant="contained"
//                     onClick={
//                       activeTab === "scraped" ? handleScrapePosts : handleAnalyzePosts
//                     }
//                     size="large"
//                     fullWidth
//                     disabled={loading}
//                     sx={{
//                       height: 46,
//                       fontWeight: 600,
//                       fontSize: 17,
//                       // Dynamic background gradient based on active tab
//                       background:
//                         activeTab === "scraped"
//                           ? "linear-gradient(90deg,#1976d2,#42a5f5)"
//                           : "linear-gradient(90deg,#43a047,#81c784)",
//                       boxShadow: "0 2px 8px 0 rgba(21,101,192,0.10)",
//                       borderRadius: theme.shape.borderRadius,
//                       textTransform: "none", // Prevent uppercase
//                       transition: "background-color 0.3s ease", // Smooth transition
//                       "&:hover": {
//                         filter: "brightness(1.1)", // Slightly brightens on hover
//                         boxShadow: "0 4px 12px rgba(21,101,192,0.3)", // Enhanced shadow on hover
//                       },
//                     }}
//                   >
//                     {loading ? (
//                       <CircularProgress size={24} color="inherit" />
//                     ) : activeTab === "scraped" ? (
//                       "Extract Posts"
//                     ) : (
//                       "Analyze Posts"
//                     )}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Paper>

//             {/* Data Table Section */}
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 0, // Padding will be handled by TableContainer or individual cells
//                 borderRadius: theme.shape.borderRadius * 2,
//                 background: "#fff",
//                 flexGrow: 1, // This Paper expands to fill the remaining vertical space
//                 display: "flex",
//                 flexDirection: "column", // Important for TableContainer to grow inside
//                 boxShadow: "0 1px 6px 0 rgba(21, 101, 192, 0.06)",
//                 overflow: "hidden", // Ensures table content scrolling is contained within this Paper
//               }}
//             >
//               <TableContainer
//                 sx={{
//                   background: "#f5f9fd",
//                   borderRadius: theme.shape.borderRadius,
//                   flexGrow: 1, // TableContainer expands to fill its parent Paper
//                   // No fixed maxHeight; it will fill the available space
//                   overflowY: "auto", // Enables vertical scrolling for table rows
//                   overflowX: "auto", // Enables horizontal scrolling for wide tables
//                   scrollbarWidth: "thin", // For Firefox
//                   "&::-webkit-scrollbar": {
//                     width: "6px",
//                     height: "6px",
//                   },
//                   "&::-webkit-scrollbar-thumb": {
//                     backgroundColor: "transparent", // Hide thumb by default
//                     borderRadius: 3,
//                   },
//                   "&:hover::-webkit-scrollbar-thumb": {
//                     backgroundColor: "#cfd8dc", // Show thumb on hover
//                   },
//                   "& table": {
//                     minWidth: 700, // Ensures table doesn't collapse too much on small screens
//                   },
//                 }}
//               >
//                 <Table stickyHeader> {/* stickyHeader keeps headers visible on scroll */}
//                   <TableHead>
//                     <TableRow>
//                       <TableCell sx={{ width: 60 }}>
//                         <b>S. No.</b>
//                       </TableCell>
//                       <TableCell sx={{ maxWidth: 400, wordBreak: "break-word" }}>
//                         <b>Post</b>
//                       </TableCell>
//                       <TableCell sx={{ width: 160 }}>
//                         <b>URL</b>
//                       </TableCell>
//                       {activeTab === "analyzed" && ( // Show Analysis column only on analyzed tab
//                         <TableCell sx={{ width: 260 }}>
//                           <b>GPT Analysis</b>
//                         </TableCell>
//                       )}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {/* Conditional rendering for no data or loading state */}
//                     {(activeTab === "scraped" ? scrapedPosts : analyzedPosts)
//                       .length === 0 ? (
//                       <TableRow>
//                         <TableCell
//                           colSpan={activeTab === "scraped" ? 3 : 4} // Span columns based on active tab
//                           align="center"
//                           sx={{ color: "#94a3b8", fontStyle: "italic", py: 4 }}
//                         >
//                           {loading ? (
//                             <CircularProgress size={24} color="primary" /> // Show spinner when loading
//                           ) : activeTab === "scraped" ? (
//                             'No data yet. Click "Extract Posts".'
//                           ) : (
//                             'No analysis yet. Click "Analyze Posts".'
//                           )}
//                         </TableCell>
//                       </TableRow>
//                     ) : (
//                       // Map through posts and render table rows
//                       (activeTab === "scraped" ? scrapedPosts : analyzedPosts).map(
//                         (item, idx) => (
//                           <TableRow
//                             key={idx} // Unique key for each row
//                             hover // Visual feedback on hover
//                             sx={{
//                               "&:hover": { background: "#e3f2fd" },
//                               cursor: "default",
//                             }}
//                           >
//                             <TableCell>{idx + 1}</TableCell>
//                             <TableCell
//                               sx={{
//                                 wordBreak: "break-word", // Ensures long words break
//                                 maxWidth: 400,
//                                 whiteSpace: "normal", // Allows text to wrap naturally
//                               }}
//                             >
//                               {item.post}
//                             </TableCell>
//                             <TableCell>
//                               <a
//                                 href={item.url}
//                                 target="_blank" // Opens URL in a new tab
//                                 rel="noopener noreferrer" // Security best practice for target="_blank"
//                                 style={{
//                                   color: "#1976d2",
//                                   fontWeight: 500,
//                                   textDecoration: "underline",
//                                   wordBreak: "break-word",
//                                   display: "inline-block",
//                                   maxWidth: 150,
//                                 }}
//                                 title={item.url} // Shows full URL on hover
//                               >
//                                 {item.url}
//                               </a>
//                             </TableCell>
//                             {activeTab === "analyzed" && (
//                               <TableCell sx={{ width: 260 }}>
//                                 <Card
//                                   variant="outlined"
//                                   sx={{
//                                     background: "#e8f5e9",
//                                     borderRadius: theme.shape.borderRadius,
//                                     px: 1,
//                                     py: 0.5,
//                                     maxHeight: 120, // Max height for individual analysis card content
//                                     overflowY: "auto", // Allows scrolling within the analysis card
//                                     scrollbarWidth: "thin",
//                                     "&::-webkit-scrollbar": {
//                                       width: "4px",
//                                     },
//                                     "&::-webkit-scrollbar-thumb": {
//                                       backgroundColor: "#a5d6a7",
//                                       borderRadius: 3,
//                                     },
//                                   }}
//                                 >
//                                   <CardContent sx={{ p: 1.5 }}>
//                                     <Typography
//                                       variant="body2"
//                                       component="pre" // Preserves whitespace and line breaks
//                                       sx={{
//                                         whiteSpace: "pre-wrap", // Wraps text while preserving pre-formatted spaces
//                                         fontFamily: "inherit", // Inherits font from parent
//                                         fontSize: 15,
//                                         margin: 0,
//                                       }}
//                                     >
//                                       {item.gptAnalysis}
//                                     </Typography>
//                                   </CardContent>
//                                 </Card>
//                               </TableCell>
//                             )}
//                           </TableRow>
//                         )
//                       )
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Paper>
//           </Box>
//         </Box>

//         {/* Snackbar for error messages */}
//         <Snackbar
//           open={!!error} // Opens if error string is non-empty
//           autoHideDuration={4000} // Closes automatically after 4 seconds
//           onClose={() => setError("")} // Clears error on close
//           anchorOrigin={{ vertical: "top", horizontal: "center" }} // Positions at top center
//         >
//           <Alert
//             onClose={() => setError("")} // Allows manual close
//             severity="error" // Red error styling
//             sx={{ width: "100%" }}
//           >
//             {error}
//           </Alert>
//         </Snackbar>
//       </Box>
//     );
//   }

//   export default Dashboard;
