/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const titleStyle4 = {
  fontSize: '19px',
  lineHeight: '25px',
  fontWeight: '700',
  color: '#054E8B'
};
const descStyle4 = {
  fontSize: '15px',
  lineHeight: '18.83px',
  fontWeight: '400',
  fontFamily: 'Mulish',
  color: '#2A3752'
};
const buttonStyle4 = {
  textTransform: 'capitalize',
  fontSize: '16px',
  color: '#ffffff',
  fontWeight: '700',
  lineHeight: '22px',
  fontFamily: 'Mukta'
};

export default function HIstoryOrderForSelectedDates(props) {
  const { setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      maxWidth="351px"
      width="100%">
      <Box
        sx={{
          boxShadow: '3',
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          maxWidth: '351px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Box
          sx={{
            textAlign: 'center',
            marginBottom: '12px'
          }}>
          <Box style={titleStyle4} fontFamily="Mukta">
            No Orders for Selected Dates
          </Box>
        </Box>
        <Box
          sx={{
            textAlign: 'center',
            marginBottom: '20px'
          }}>
          <Box sx={{ maxWidth: '264px', width: '100%' }} style={descStyle4}>
            There are no scheduled orders on your selected dates.
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%'
          }}>
          <Button
            onClick={handleClose}
            variant="text"
            sx={{
              width: '100%',
              borderRadius: '8px',
              py: '8px',
              borderColor: '#054E8B',
              bgcolor: '#054E8B',
              ':hover': { bgcolor: '#054E8B' }
            }}>
            <Box style={buttonStyle4} fontFamily="SF Pro Display" onClose={handleClose}>
              Dismiss
            </Box>
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
