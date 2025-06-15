// contexts/DrawerContext.jsx
import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('SelfAutomated');

  const toggleDrawer = () => setOpen((prev) => !prev);
  const closeDrawer = () => setOpen(false);

  return (
    <DrawerContext.Provider value={{ open, toggleDrawer, closeDrawer, activeTab, setActiveTab }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
