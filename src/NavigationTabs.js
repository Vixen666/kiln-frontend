import React from 'react';
import { useLocation } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { Link } from 'react-router-dom';
import useTranslation from "./utils/useTranslation";
function NavigationTabs() {
  const location = useLocation();
  const currentPath = location.pathname;
  const ovensLabel = useTranslation("ovens");
  const templatesLabel = useTranslation("templates");
  const createBurnLabel = useTranslation("create_burn");
  const historyBurnLabel = useTranslation("history_burn");
  const ongoingBurnLabel = useTranslation("ongoing_burn");
  
  return (
    <Tabs
      centered
      value={currentPath}
      sx={{
        flexGrow: 1, // Make Tabs take full width of its parent
        '.MuiTabs-indicator': {
          backgroundColor: 'white',
        },
        display: 'flex', // Use flex display for direct children alignment
      }}
    >
      <Tab label="Home" value="/home-page" component={Link} to="/home-page" sx={{ mr: 'auto' }} /> {/* Align left */}
      <Tab label={ovensLabel} value="/oven-page" component={Link} to="/oven-page" />
      <Tab label={templatesLabel} value="/template-page" component={Link} to="/template-page" />
      <Tab label={createBurnLabel} value="/create-burn" component={Link} to="/create-burn" />
      <Tab label={ongoingBurnLabel} value="/burns" component={Link} to="/burns" />
      <Tab label="Settings" value="/settings-page" component={Link} to="/settings-page" sx={{ ml: 'auto' }} /> {/* Align Right */}
    </Tabs>
  );
}

export default NavigationTabs;