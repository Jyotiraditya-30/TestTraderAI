// import React from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Box,
//   Typography,
//   Divider,
//   useTheme,
//   useMediaQuery,
//   Tooltip,
// } from "@mui/material";
// import FeedIcon from "@mui/icons-material/Feed";
// import AnalyticsIcon from "@mui/icons-material/Analytics";
// import { Link as RouterLink } from "react-router-dom";
// import { useDrawer } from "../contexts/DrawerContext";

// const drawerWidth = 240;
// const closedDrawerWidth = 60;

// const navItems = [
//   {
//     label: "Social Scraper",
//     to: "/social-scraper",
//     key: "social-scraper",
//     icon: (active) => <FeedIcon color={active ? "primary" : "inherit"} />,
//     color: "#1565c0",
//     bg: "rgba(21,101,192,0.08)",
//   },
//   {
//     label: "Analyze Scraper",
//     to: "/analyze-scraper",
//     key: "analyze-scraper",
//     icon: (active) => <AnalyticsIcon color={active ? "success" : "inherit"} />,
//     color: "#2e7d32",
//     bg: "rgba(67,160,71,0.08)",
//   },
//   {
//     label: "Realtime Scraper",
//     to: "/realtime-scraper",
//     key: "realtime-scraper",
//     icon: (active) => <AnalyticsIcon color={active ? "success" : "inherit"} />,
//     color: "#2e7d32",
//     bg: "rgba(67,160,71,0.08)",
//   },
//   {
//     label: "Realtime Analysis",
//     to: "/realtime-analysis",
//     key: "realtime-analysis",
//     icon: (active) => <AnalyticsIcon color={active ? "secondary" : "inherit"} />,
//     color: "#6a1b9a",
//     bg: "rgba(106,27,154,0.08)",
//   },
//   {
//     label: "Self Automated",
//     to: "/SelfAutomated",
//     key: "SelfAutomated",
//     icon: (active) => <AnalyticsIcon color={active ? "secondary" : "inherit"} />,
//     color: "#6a1b9a",
//     bg: "rgba(106,27,154,0.08)",
//   },
// ];

// function MiniDrawer({ mobileOpen, handleDrawerToggle }) {
//   const theme = useTheme();
//   const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
//   const { activeTab, setActiveTab, open } = useDrawer(); // open = true (expanded), false (mini)

//   const drawerContent = (
//     <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
//       {/* Title */}
//       <Box sx={{ py: 3, textAlign: "center" }}>
//         {open && (
//           <Typography
//             variant="h6"
//             sx={{ fontWeight: 700, letterSpacing: 1, color: "#1565c0" }}
//           >
//             Truth Monitor
//           </Typography>
//         )}
//       </Box>

//       <Divider />

//       {/* Navigation List */}
//       <List>
//         {navItems.map(({ label, to, key, icon, color, bg }) => {
//           const isActive = activeTab === key;
//           const buttonContent = (
//             <ListItemButton
//               component={RouterLink}
//               to={to}
//               selected={isActive}
//               onClick={() => {
//                 setActiveTab(key);
//                 if (!isSmUp) handleDrawerToggle();
//               }}
//               sx={{
//                 borderLeft: isActive
//                   ? `4px solid ${color}`
//                   : "4px solid transparent",
//                 backgroundColor: isActive ? bg : "none",
//                 justifyContent: open ? "initial" : "center",
//                 px: open ? 2 : 1,
//               }}
//             >
//               <ListItemIcon
//                 sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center" }}
//               >
//                 {icon(isActive)}
//               </ListItemIcon>
//               {open && <ListItemText primary={label} />}
//             </ListItemButton>
//           );

//           return (
//             <ListItem disablePadding key={key}>
//               {open ? (
//                 buttonContent
//               ) : (
//                 <Tooltip title={label} placement="right">
//                   {buttonContent}
//                 </Tooltip>
//               )}
//             </ListItem>
//           );
//         })}
//       </List>

//       <Box sx={{ flexGrow: 1 }} />

//       {/* Footer */}
//       <Box sx={{ p: 2, textAlign: "center" }}>
//         {open && (
//           <Typography variant="caption" color="text.secondary">
//             &copy; {new Date().getFullYear()} Social Dashboard
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );

//   const getDrawerWidth = open ? drawerWidth : closedDrawerWidth;

//   return (
//     <Box component="nav" sx={{ width: { sm: getDrawerWidth }, flexShrink: { sm: 0 } }}>
//       {/* Mobile Drawer */}
//       <Drawer
//         variant="temporary"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           display: { xs: "block", sm: "none" },
//           "& .MuiDrawer-paper": {
//             boxSizing: "border-box",
//             width: drawerWidth,
//           },
//         }}
//       >
//         {drawerContent}
//       </Drawer>

//       {/* Desktop Drawer */}
//       <Drawer
//         variant="permanent"
//         open={open}
//         sx={{
//           display: { xs: "none", sm: "block" },
//           transition: theme.transitions.create("width", {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//           }),
//           "& .MuiDrawer-paper": {
//             boxSizing: "border-box",
//             whiteSpace: "nowrap",
//             width: getDrawerWidth,
//             overflowX: "hidden",
//             transition: theme.transitions.create("width", {
//               easing: theme.transitions.easing.sharp,
//               duration: theme.transitions.duration.enteringScreen,
//             }),
//             bgcolor: "#f8fafc",
//             borderRight: "1px solid #e3e7ee",
//           },
//         }}
//       >
//         {drawerContent}
//       </Drawer>
//     </Box>
//   );
// }

// export default MiniDrawer;


// import React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import {
//   Box,
//   Drawer as MuiDrawer,
//   CssBaseline,
//   Divider,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   useMediaQuery
// } from '@mui/material';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import HomeIcon from '@mui/icons-material/Home';
// import PeopleIcon from '@mui/icons-material/People';
// import PersonIcon from '@mui/icons-material/Person';
// import AnalyticsIcon from '@mui/icons-material/Analytics';
// import { useNavigate } from 'react-router-dom';
// import { useDrawer } from '../contexts/DrawerContext';

// const drawerWidth = 220;
// const miniDrawerWidth = 60;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   width: miniDrawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     '& .MuiDrawer-paper': {
//       top: 64, // match AppBar height
//       ...(open ? openedMixin(theme) : closedMixin(theme)),
//     },
//   }),
// );

// export default function MiniDrawer() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { activeTab,open, toggleDrawer } = useDrawer();

//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
//   const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

//   // Determine drawer variant
//   // Determine drawer variant
//   const variant = isMobile
//     ? 'temporary'
//     : isTablet
//       ? open
//         ? 'temporary' // only overlay when open
//         : 'permanent' // mini mode, non-overlay
//       : 'permanent'; // desktop: always open, side-by-side


//   const drawerOpen = isMobile ? open : isDesktop || (isTablet && open);


//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />

//       <MuiDrawer
//         variant={variant}
//         open={drawerOpen}
//         onClose={toggleDrawer}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           flexShrink: 0,
//           whiteSpace: 'nowrap',
//           boxSizing: 'border-box',
//           '& .MuiDrawer-paper': {
//             top: 64, // height of AppBar
//             width: drawerOpen ? drawerWidth : miniDrawerWidth,
//             transition: theme.transitions.create('width', {
//               easing: theme.transitions.easing.sharp,
//               duration: theme.transitions.duration.enteringScreen,
//             }),
//             overflowX: 'hidden',
//             ...(variant === 'permanent'
//               ? { borderRight: '1px solid #e3e7ee' }
//               : { boxShadow: theme.shadows[5] }),
//           },
//         }}
//       >
//         <DrawerHeader>
//           {!isDesktop && (
//             <IconButton onClick={toggleDrawer}>
//               {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//             </IconButton>
//           )}
//         </DrawerHeader>

//         <Divider />

//         <List>
//           <ListItem disablePadding onClick={() => navigate('/SelfAutomated')} sx={{ display: 'block' }}>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: drawerOpen ? 'initial' : 'center',
//                 px: 2.5,
//                 backgroundColor: activeTab === 'SelfAutomated' ? 'rgba(106,27,154,0.08)' : 'transparent',
//                 '&:hover': {
//                   backgroundColor: 'rgba(106,27,154,0.12)',
//                 },
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: drawerOpen ? 3 : 'auto',
//                   justifyContent: 'center',
//                   color: activeTab === 'SelfAutomated' ? '#6a1b9a' : 'inherit',
//                 }}
//               >
//                 <AnalyticsIcon color={activeTab === 'SelfAutomated' ? 'secondary' : 'inherit'} />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Self Automated"
//                 sx={{ opacity: drawerOpen ? 1 : 0 }}
//               />
//             </ListItemButton>
//           </ListItem>


//           <ListItem disablePadding onClick={() => navigate('/Directory')} sx={{ display: 'block' }}>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: drawerOpen ? 'initial' : 'center',
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: drawerOpen ? 3 : 'auto',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <PeopleIcon />
//               </ListItemIcon>
//               <ListItemText primary="Directory" sx={{ opacity: drawerOpen ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding onClick={() => navigate('/UserProfile')} sx={{ display: 'block' }}>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: drawerOpen ? 'initial' : 'center',
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: drawerOpen ? 3 : 'auto',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <PersonIcon />
//               </ListItemIcon>
//               <ListItemText primary="My Profile" sx={{ opacity: drawerOpen ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//         </List>

//         <Divider />
//       </MuiDrawer>
//     </Box>
//   );
// }


import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  CssBaseline,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Analytics as AnalyticsIcon,
  Feed as FeedIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDrawer } from '../contexts/DrawerContext';

const drawerWidth = 220;
const miniDrawerWidth = 60;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  width: miniDrawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
      top: 64,
      ...(open ? openedMixin(theme) : closedMixin(theme)),
    },
  })
);

// 🔹 Navigation Items Array
const navItems = [
  {
    label: 'Self Automated',
    to: '/SelfAutomated',
    key: 'SelfAutomated',
    icon: (active) => <AnalyticsIcon color={active ? 'secondary' : 'inherit'} />,
    color: '#6a1b9a',
    bg: 'rgba(106,27,154,0.08)',
  },
  {
    label: 'Social Scraper',
    to: '/social-scraper',
    key: 'social-scraper',
    icon: (active) => <FeedIcon color={active ? 'primary' : 'inherit'} />,
    color: '#1565c0',
    bg: 'rgba(21,101,192,0.08)',
  },
  {
    label: 'Analyze Scraper',
    to: '/analyze-scraper',
    key: 'analyze-scraper',
    icon: (active) => <AnalyticsIcon color={active ? 'success' : 'inherit'} />,
    color: '#2e7d32',
    bg: 'rgba(67,160,71,0.08)',
  },
  {
    label: 'Realtime Scraper',
    to: '/realtime-scraper',
    key: 'realtime-scraper',
    icon: (active) => <AnalyticsIcon color={active ? 'success' : 'inherit'} />,
    color: '#2e7d32',
    bg: 'rgba(67,160,71,0.08)',
  },
  {
    label: 'Realtime Analysis',
    to: '/realtime-analysis',
    key: 'realtime-analysis',
    icon: (active) => <AnalyticsIcon color={active ? 'secondary' : 'inherit'} />,
    color: '#6a1b9a',
    bg: 'rgba(106,27,154,0.08)',
  },
];

export default function MiniDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { open, toggleDrawer, activeTab, setActiveTab } = useDrawer();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const variant = isMobile
    ? 'temporary'
    : isTablet
    ? open
      ? 'temporary'
      : 'permanent'
    : 'permanent';

  const drawerOpen = isMobile ? open : isDesktop || (isTablet && open);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <MuiDrawer
        variant={variant}
        open={drawerOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          '& .MuiDrawer-paper': {
            top: 0,
            width: drawerOpen ? drawerWidth : miniDrawerWidth,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
            ...(variant === 'permanent'
              ? { borderRight: '1px solid #e3e7ee' }
              : { boxShadow: theme.shadows[5] }),
          },
        }}
      >
        <DrawerHeader>
          {!isDesktop && (
            <IconButton onClick={toggleDrawer}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          )}
        </DrawerHeader>

        <Divider />

        <List>
          {navItems.map(({ label, to, key, icon, bg }) => {
            const isActive = activeTab === key;
            return (
              <ListItem
                key={key}
                disablePadding
                onClick={() => {
                  setActiveTab(key);
                  navigate(to);
                }}
                sx={{ display: 'block' }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: drawerOpen ? 'initial' : 'center',
                    px: 2.5,
                    backgroundColor: isActive ? bg : 'transparent',
                    '&:hover': {
                      backgroundColor: bg ? bg.replace('0.08', '0.12') : 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: drawerOpen ? 3 : 'auto',
                      justifyContent: 'center',
                      color: isActive ? 'inherit' : undefined,
                    }}
                  >
                    {icon(isActive)}
                  </ListItemIcon>
                  <ListItemText primary={label} sx={{ opacity: drawerOpen ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider />
      </MuiDrawer>
    </Box>
  );
}
