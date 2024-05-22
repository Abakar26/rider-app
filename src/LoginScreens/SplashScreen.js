import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import biomarkLogo from '../Images/biomark_logo_splash.svg';
import biomarkText from '../Images/biomark_text_splash.svg';

function SplashScreen() {
  const titleStyle = {
    fontSize: '21px',
    lineHeight: '27px',
    fontFamily: 'Mukta',
    fontWeight: '700',
    color: '#2A3752'
  };
  const textStyle = {
    fontFamily: 'Mulish',
    fontSize: '13px',
    lineHeight: '16px',
    textTransform: 'none'
  };
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh'
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            my: 'auto'
          }}>
          <Box>
            <Box sx={{ mb: '1rem' }}>
              <img src={biomarkLogo} alt="" />{' '}
            </Box>
          </Box>
          <Box sx={{ mb: '10px' }}>
            <img src={biomarkText} alt="" />{' '}
          </Box>
          <Box sx={{ height: '39px', mb: '10px', textAlign: 'center' }} style={titleStyle}>
            Lab Dispatch App
          </Box>
        </Box>

        <Box style={textStyle} sx={{ color: '#8493AE', mb: '20%' }}>
          Version X.X{' '}
        </Box>
      </Box>
    </>
  );
}
export default SplashScreen;
