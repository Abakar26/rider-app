/* eslint-disable react/prop-types */
import React from 'react';
import { Box, CssBaseline, Grid, Button } from '@mui/material';
import { KeyboardArrowLeft as KeyboardArrowLeftIcon } from '@mui/icons-material';

function ProfileHeader({ name, onClick }) {
  const TitleStyle = {
    fontFamily: 'Mukta',
    fontWeight: '700',
    fontSize: '21px',
    lineHeight: '27px',
    color: '#0F2853',
    margin: '0 auto'
  };

  return (
    <>
      <CssBaseline />
      <Box>
        <Grid container direction="row">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              padding: '8px 12px',
              width: '100%'
            }}>
            <Button
              variant="text"
              sx={{
                minWidth: '0px',
                p: '0px',
                ':hover': {
                  color: '#000000'
                }
              }}
              onClick={onClick}>
              <KeyboardArrowLeftIcon sx={{ color: '#8493AE' }} />
            </Button>
            <Box style={TitleStyle}>{name}</Box>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
export default ProfileHeader;
