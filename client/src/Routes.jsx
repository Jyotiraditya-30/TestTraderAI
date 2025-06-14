import React from "react";
import { Routes, Route } from "react-router-dom";
import SocialScraper from "./components/SocialScraper";
import AnalyzeScraper from "./components/AnalyzeScraper";
import RealTimeScraper from "./components/RealTimeScraper";
import RealTimeAnalysis from "./components/RealTimeAnalysis";
import SelfAutomatedRealtimeScraper from "./components/SelfAutomatedRealtimeScraper";
import StickyHeadTable from "./components/Test"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/social-scraper" element={<SocialScraper />} />
      <Route path="/analyze-scraper" element={<AnalyzeScraper />} />
      <Route path="/realtime-scraper" element={<RealTimeScraper />} />
      <Route path="/realtime-analysis" element={<RealTimeAnalysis />} />
      <Route path="/SelfAutomated" element={<SelfAutomatedRealtimeScraper />} />
      <Route path="/test" element={<StickyHeadTable />} />
      <Route path="/" element={<SocialScraper />} />
    </Routes>
  );
};

export default AppRoutes;
