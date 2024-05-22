import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, BottomNavigationAction, BottomNavigation } from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  LocalShipping as LocalShippingIcon,
  History as HistoryIcon
} from '@mui/icons-material';

function BottomNavigationScreen() {
  const navigates = useNavigate();
  const selectedTab = useSelector((state) => state.tabReducer.current);

  const logistics = () => {
    navigates('/logistics', {
      state: { from: 'bottomNavigation', to: 'Logistics Home Screen' }
    });
  };
  const logisticsHistory = () => {
    navigates('/logistics_history', {
      state: { from: 'bottomNavigation', to: 'History Screen' }
    });
  };
  const profile = () => {
    navigates('/profile', {
      state: { from: 'bottomNavigation', to: 'Profile Screen' }
    });
  };
  const divStyle = {
    backgroundColor: '#ffffff',
    padding: '8px',
    height: '77px'
  };

  return (
    <Box
      position="fixed"
      sx={{
        bottom: 0,
        width: '100%',
        boxShadow: '0px 0px 8px 1px rgba(0, 0, 0, 0.2)'
      }}>
      <BottomNavigation
        sx={{
          '& .MuiBottomNavigationAction-label.Mui-selected ': {
            fontSize: '13px',
            lineHeight: '16.32px',
            fontWeight: '700',
            color: '#054E8B'
          },
          '& .MuiBottomNavigationAction-label ': {
            fontSize: '13px',
            lineHeight: '16.32px',
            color: '#8493AE',
            marginTop: '4px'
          },
          '& .MuiButtonBase-root.Mui-selected ': { backgroundColor: '#F2F4F7' }
        }}
        showLabels
        style={divStyle}
        value={selectedTab}>
        <BottomNavigationAction
          label="Logistics"
          value="Logistics"
          icon={<LocalShippingIcon sx={{ fontSize: '30px', color: '#8493AE' }} />}
          onClick={logistics}
        />
        <BottomNavigationAction
          label="History"
          value="History"
          icon={<HistoryIcon sx={{ fontSize: '30px', color: '#8493AE' }} />}
          onClick={logisticsHistory}
        />
        <BottomNavigationAction
          label="Profile"
          value="Profile"
          icon={<AccountCircleIcon sx={{ fontSize: '30px', color: '#8493AE' }} />}
          onClick={profile}
        />
      </BottomNavigation>
    </Box>
  );
}

export default BottomNavigationScreen;
