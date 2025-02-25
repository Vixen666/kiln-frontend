import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage"; // Your main page component
import OvenSelection from "./components/Oven/OvenSelection"; // Component for editing ovens
import TemplateOptions from "./TemplateOptions"; // Component for editing templates
import BurnPage from "./components/Burn/BurnPage"; // Component for editing templates
import BurnHistoryPage from "./components/Burn/BurnHistoryPage"; // Component for editing templates
import BurnSettingsPage from "./components/Burn/BurnSettingsPage"; // Component for editing templates
import SettingsPage from "./components/settings/SettingsPage"; // Component for editing templates
//import CreateBurnPage from './CreateBurnPage'; // Component for creating burns

import NavigationTabs from "./NavigationTabs";
import {AppBar, Box} from "@mui/material";


function App() {
  return (
    <Router>
      <AppBar
        position="static"
        sx={{ backgroundColor: "White", color: "white" }}
      >
        <NavigationTabs />
      </AppBar>
      <Box sx={{ backgroundColor: "grey.400", minHeight: "100vh", padding: 2 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/oven-page" element={<OvenSelection />} />
          <Route path="/template-page" element={<TemplateOptions />} />
          <Route path="/create-burn" element={<BurnPage />} />
          <Route
            path="/burns"
            element={<BurnHistoryPage/>}
          />
          <Route path="/burn-settings" element={<BurnSettingsPage />} />
          <Route path="/settings-page" element={<SettingsPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
