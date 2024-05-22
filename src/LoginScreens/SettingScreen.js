import { Divider, Box, Grid, Button, CssBaseline } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import forwardBtn from '../Images/forward_btn.svg';
import BottomNavigationScreen from '../LogisticsModule/BottomNavigationScreen';
import ProfileHeader from './ProfileHeader';

const data = [
  { id: 1, name: 'Email' },
  { id: 2, name: 'Alarms' },
  { id: 3, name: 'Driving Mode' },
  { id: 4, name: 'Driver License' }
];

function SettingScreen() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);

  // UseEffect For Handling Authorization
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate('/');
    }
  }, []);
  const backToMain = () => {
    navigate('/profile');
  };
  const TitleStyle = {
    fontFamily: 'Mukta',
    paddingTop: '8px',
    paddingBottom: '3px',
    paddingLeft: '16px',
    backgroundColor: '#054E8B',
    color: '#FAFAFA',
    fontWeight: '700',
    fontSize: '19px',
    lineHeight: '25px'
  };
  const TextStyle = {
    fontSize: '15px',
    lineHeight: '18.83px',
    color: '#2A3752',
    fontFamily: ' Mulish'
  };
  return (
    <>
      <CssBaseline />
      <Box>
        <Grid>
          <ProfileHeader name="Settings" onClick={backToMain} />
          <Box style={TitleStyle}>App Settings</Box>
          {data.map((row) => (
            <Box key={row.id}>
              <Box
                sx={{
                  py: '8.5px',
                  pl: '19px',
                  pr: '5px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  style={TextStyle}>
                  {row.name}
                </Box>
                <Button
                  variant="text"
                  sx={{
                    py: '0px',
                    ':hover': {
                      bgcolor: '#ffffff',
                      color: '#000000'
                    }
                  }}>
                  <img
                    src={forwardBtn}
                    alt=""
                    style={{
                      width: '23px'
                    }}
                  />
                </Button>
              </Box>
              <Divider />
            </Box>
          ))}
          <Box
            position="fixed"
            sx={{
              bottom: 0,
              width: '100%'
            }}>
            <BottomNavigationScreen />
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export default SettingScreen;
