import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { Link as RouterLink } from "react-router-dom";

const drawerWidth = 240;

function SideNavigation({ mobileOpen, handleDrawerToggle, activeTab, setActiveTab }) {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Title */}
      <Box sx={{ py: 3, textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, letterSpacing: 1, color: "#1565c0" }}
        >
          Truth Monitor
        </Typography>
      </Box>

      <Divider />

      {/* Navigation List */}
      <List>
        {/* Social Scraper */}
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/social-scraper"
            selected={activeTab === "social-scraper"}
            onClick={() => {
              setActiveTab("social-scraper");
              if (!isSmUp) handleDrawerToggle();
            }}
            sx={{
              borderLeft: activeTab === "social-scraper" ? "4px solid #1565c0" : "4px solid transparent",
              backgroundColor: activeTab === "social-scraper" ? "rgba(21,101,192,0.08)" : "none",
            }}
          >
            <ListItemIcon>
              <FeedIcon color={activeTab === "social-scraper" ? "primary" : "inherit"} />
            </ListItemIcon>
            <ListItemText primary="Social Scraper" />
          </ListItemButton>
        </ListItem>

        {/* Analyze Scraper */}
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/analyze-scraper"
            selected={activeTab === "analyze-scraper"}
            onClick={() => {
              setActiveTab("analyze-scraper");
              if (!isSmUp) handleDrawerToggle();
            }}
            sx={{
              borderLeft: activeTab === "analyze-scraper" ? "4px solid #2e7d32" : "4px solid transparent",
              backgroundColor: activeTab === "analyze-scraper" ? "rgba(67,160,71,0.08)" : "none",
            }}
          >
            <ListItemIcon>
              <AnalyticsIcon color={activeTab === "analyze-scraper" ? "success" : "inherit"} />
            </ListItemIcon>
            <ListItemText primary="Analyze Scraper" />
          </ListItemButton>
        </ListItem>

        {/* Realtime Scraper */}
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/realtime-scraper"
            selected={activeTab === "realtime-scraper"}
            onClick={() => {
              setActiveTab("realtime-scraper");
              if (!isSmUp) handleDrawerToggle();
            }}
            sx={{
              borderLeft: activeTab === "realtime-scraper" ? "4px solid #2e7d32" : "4px solid transparent",
              backgroundColor: activeTab === "realtime-scraper" ? "rgba(67,160,71,0.08)" : "none",
            }}
          >
            <ListItemIcon>
              <AnalyticsIcon color={activeTab === "realtime-scraper" ? "success" : "inherit"} />
            </ListItemIcon>
            <ListItemText primary="Realtime Scraper" />
          </ListItemButton>
        </ListItem>

        {/* Realtime Analysis */}
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/realtime-analysis"
            selected={activeTab === "realtime-analysis"}
            onClick={() => {
              setActiveTab("realtime-analysis");
              if (!isSmUp) handleDrawerToggle();
            }}
            sx={{
              borderLeft: activeTab === "realtime-analysis" ? "4px solid #6a1b9a" : "4px solid transparent",
              backgroundColor: activeTab === "realtime-analysis" ? "rgba(106,27,154,0.08)" : "none",
            }}
          >
            <ListItemIcon>
              <AnalyticsIcon color={activeTab === "realtime-analysis" ? "secondary" : "inherit"} />
            </ListItemIcon>
            <ListItemText primary="Realtime Analysis" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/SelfAutomated"
            selected={activeTab === "SelfAutomated"}
            onClick={() => {
              setActiveTab("SelfAutomated");
              if (!isSmUp) handleDrawerToggle();
            }}
            sx={{
              borderLeft: activeTab === "SelfAutomated" ? "4px solid #6a1b9a" : "4px solid transparent",
              backgroundColor: activeTab === "SelfAutomated" ? "rgba(106,27,154,0.08)" : "none",
            }}
          >
            <ListItemIcon>
              <AnalyticsIcon color={activeTab === "SelfAutomated" ? "secondary" : "inherit"} />
            </ListItemIcon>
            <ListItemText primary="Self Automated" />
          </ListItemButton>
        </ListItem>
      </List>


      <Box sx={{ flexGrow: 1 }} />

      {/* Footer */}
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="caption" color="text.secondary">
          &copy; {new Date().getFullYear()} Social Dashboard
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "#f8fafc",
            borderRight: "1px solid #e3e7ee",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default SideNavigation;
