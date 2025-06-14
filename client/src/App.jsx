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

import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Box, Toolbar } from "@mui/material";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

import Header from "./components/Header";
import SideNavigation from "./components/Sidebar";
import AppRoutes from "./Routes";

// import "./App.css";

const theme = createTheme();
const drawerWidth = 240;

function AppContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("social-scraper");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/social-scraper") {
      setActiveTab("social-scraper");
    } else if (location.pathname === "/analyze-scraper") {
      setActiveTab("analyze-scraper");
    }
    else if (location.pathname === "/analyze-scraper") {
      setActiveTab("analyze-scraper");
    }
    else if (location.pathname === "/realtime-scraper") {
      setActiveTab("realtime-scraper");
    } 
    else if (location.pathname === "/realtime-analysis") {
      setActiveTab("realtime-analysis");
    } 
    else if (location.pathname === "/SelfAutomated") {
      setActiveTab("Self Automated");
    } 
    else {
      setActiveTab("social-scraper");
    }
  }, [location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

 return (
  <div>
    <CssBaseline />
    <Header handleDrawerToggle={handleDrawerToggle} />
    <Box sx={{ display: 'flex' }}>
      <SideNavigation
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px', // adjust if Header height differs
          height: `calc(100vh - 64px)`,
          overflow: 'hidden',
          p: 2,
        }}
      >
        <AppRoutes />
      </Box>
    </Box>
  </div>
);
}
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
