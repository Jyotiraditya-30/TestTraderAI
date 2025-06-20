// import React from "react";
// import Dashboard from "./Dashboard.jsx";

// function App() {
//   return (
//     <div>
//       <Dashboard />
//     </div>
//   );
// }

// export default App;

//+++++++++++++++++++++++++++ update ++++++++++++++++++++++++++++++++//

// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import Dashboard from "./Dashboard";

// const theme = createTheme();

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Dashboard />
//     </ThemeProvider>
//   );
// }

// export default App;

//+++++++++++++++++++++++++++ update 2 ++++++++++++++++++++++++++++++++//

import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Box, useMediaQuery } from "@mui/material";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { DrawerProvider, useDrawer } from "./contexts/DrawerContext";

import Header from "./components/Header";
import SideNavigation from "./components/Sidebar";
import AppRoutes from "./Routes";

import { useTheme } from "@mui/material/styles";

const theme = createTheme();
const drawerWidth = 220;
const miniDrawerWidth = 60;

function AppContent() {
  const location = useLocation();
  const { open } = useDrawer();
  const [activeTab, setActiveTab] = useState("social-scraper");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("analyze-scraper")) setActiveTab("analyze-scraper");
    else if (path.includes("realtime-scraper")) setActiveTab("realtime-scraper");
    else if (path.includes("realtime-analysis")) setActiveTab("realtime-analysis");
    else if (path.includes("SelfAutomated")) setActiveTab("Self Automated");
    else setActiveTab("social-scraper");
  }, [location.pathname]);

  const sidebarWidth = isDesktop
    ? drawerWidth
    : isTablet
      ? open
        ? drawerWidth // overlay mode, shouldn't shift content
        : miniDrawerWidth
      : 0;

  const shouldPushContent = isDesktop || (isTablet && !open); // ✅ Don't push if tablet + open

  return (
    <>
      <CssBaseline />
      <Header />
      <Box sx={{ display: "flex" }}>
        <SideNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: "64px",
            height: "calc(100vh - 64px)",
            overflow: "auto",
            p: 1, // always padding 2
            pl: isTablet && open ? `${miniDrawerWidth}px` : 1, // only apply on tablet open
            width: shouldPushContent
              ? `calc(100% - ${sidebarWidth}px)`
              : "100%",
            ml: shouldPushContent
              ? `${sidebarWidth}px`
              : 0,
          }}
        >
          <AppRoutes />
        </Box>
      </Box>
    </>
  );
}


function App() {
  return (
    <DrawerProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </DrawerProvider>
  );
}

export default App;
