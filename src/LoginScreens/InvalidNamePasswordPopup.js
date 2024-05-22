import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { loginPageStyles } from './LoginStyles';

const borderButton = { border: 2 };
const titleStyle = { fontSize: '19px', lineHeight: '25px', fontWeight: '700', color: '#054E8B' };
const descStyle = { fontSize: '14px', lineHeight: '19px', fontWeight: '400', color: '#2A3752' };
const buttonStyle = {
  textTransform: 'capitalize',
  fontSize: '15px',
  color: '#2A3752',
  fontWeight: '700',
  lineHeight: '20px'
};
function InvalidNamePasswordPopup() {
  const classes = loginPageStyles();
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Box
        sx={{
          boxShadow: '3',
          paddingBottom: '11px',
          px: '12px',
          paddingTop: '15px',
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          maxWidth: '351px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Box>
          {' '}
          <DoNotDisturbIcon sx={{ color: '#FFD75E', fontSize: 58 }} />
        </Box>
        <Box sx={{ textAlign: 'center', marginTop: '14px', marginBottom: '12px' }}>
          <Box style={titleStyle} className={classes.heading10}>
            Invalid Username/Password
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', marginBottom: '11px' }}>
          <Box style={descStyle} className={classes.heading}>
            The entered information is wrong.
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
          <Box style={descStyle} className={classes.heading}>
            Please try again.
          </Box>
        </Box>
        <Button
          variant="text"
          sx={{
            ...borderButton,
            width: '100%',
            borderRadius: '8px',
            borderColor: '#054E8B',
            bgcolor: '#ffffff',
            ':hover': { bgcolor: '#ffffff' }
          }}>
          <Box style={buttonStyle} className={classes.heading10}>
            Okay
          </Box>
        </Button>
      </Box>
    </Grid>
  );
}
export default InvalidNamePasswordPopup;
