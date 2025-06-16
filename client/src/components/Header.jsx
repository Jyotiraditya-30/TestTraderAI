// // Header.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
// import Tooltip from "@mui/material/Tooltip";


// const appBarHeight = 64;

// function Header({ handleDrawerToggle }) {
//   const theme = useTheme();
//   const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
//   const [isScraperRunning, setIsScraperRunning] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const toggleScraper = async () => {
//     setLoading(true);
//     try {
//       if (!isScraperRunning) {
//         await axios.post("http://3.83.254.0:3000/api/realtime/scraper/start", {
//           username: "realdonaldtrump",
//           intervalInMs: 60000,
//         });
//       } else {
//         await axios.post("http://3.83.254.0:3000/api/realtime/scraper/stop");
//       }
//       setIsScraperRunning(!isScraperRunning);
//     } catch (error) {
//       console.error("Scraper toggle error:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
    // <AppBar
    //   position="fixed"
    //   sx={{
    //     zIndex: (theme) => theme.zIndex.drawer + 1,
    //     bgcolor: "#fff",
    //     color: "#21243a",
    //     boxShadow: "0 2px 10px 0 rgba(22,28,45,0.06)",
    //     borderBottom: "1px solid #e3e7ee",
    //     height: appBarHeight,
    //     justifyContent: "center",
    //   }}
    // >
    //   <Toolbar>
    //     {!isSmUp && (
    //       <Button
    //         onClick={handleDrawerToggle}
    //         sx={{ minWidth: 0, mr: 2, color: "#1565c0" }}
    //       >
    //         <MenuIcon />
    //       </Button>
    //     )}
    //     <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
    //       Smart Trader AI
    //     </Typography>

    //     <Box>
    //       <Button
    //         variant="contained"
    //         color={isScraperRunning ? "error" : "primary"}
    //         onClick={toggleScraper}
    //         disabled={loading}
    //         sx={{ minWidth: 0, mr: 2 }}
    //       >
    //         {loading
    //           ? "Processing..."
    //           : isScraperRunning
    //           ? "Stop Scraper"
    //           : "Start Scraper"}
    //       </Button>
    //     </Box>
    //   </Toolbar>
    // </AppBar>
//   );
// }

// export default Header;



import React, { useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useDrawer } from "../contexts/DrawerContext"; // ✅ Drawer context

const appBarHeight = 64;

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const { toggleDrawer } = useDrawer();

  const [isScraperRunning, setIsScraperRunning] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleScraper = async () => {
    setLoading(true);
    try {
      if (!isScraperRunning) {
        await axios.post("http://localhost:3000/api/realtime/scraper/start", {
          username: "realdonaldtrump",
          intervalInMs: 60000,
        });
      } else {
        await axios.post("http://localhost:3000/api/realtime/scraper/stop");
      }
      setIsScraperRunning(!isScraperRunning);
    } catch (error) {
      console.error("Scraper toggle error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "#fff",
        color: "#21243a",
        boxShadow: "0 2px 10px 0 rgba(22,28,45,0.06)",
        borderBottom: "1px solid #e3e7ee",
        height: appBarHeight,
        justifyContent: "center",
      }}
    >
      <Toolbar>
        {/* ✅ Show toggle button only on tablet or mobile */}
        {(isMobile || isTablet) && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          sx={{ fontWeight: 700, flexGrow: 1 }}
        >
          Smart Trader AI
        </Typography>

        <Box>
          <Button
            variant="contained"
            color={isScraperRunning ? "error" : "primary"}
            onClick={toggleScraper}
            disabled={loading}
            sx={{ minWidth: 0, mr: 2 }}
          >
            {loading
              ? "Processing..."
              : isScraperRunning
              ? "Stop Scraper"
              : "Start Scraper"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
