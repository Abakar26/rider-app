/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CheckBoxForHistory from './CheckBoxForHistory';

const data = [
  { id: 1, name: 'Routine' },
  { id: 2, name: 'Urgent' },
  { id: 3, name: 'Route' }
];
const titleStyle4 = {
  fontSize: '14px',
  lineHeight: '16px',
  fontWeight: '700',
  color: '#8493AE'
};
const borderButton = {
  border: 1,
  color: '#CAD3E5'
};
const buttonStyle4 = {
  textTransform: 'capitalize',
  fontSize: '12px',
  color: '#0F2853',
  fontWeight: '700',
  lineHeight: '20px'
};
const buttonStyle5 = {
  textTransform: 'capitalize',
  fontSize: '16px',
  color: '#ffffff',
  fontWeight: '300',
  lineHeight: '18px'
};

export default function HistoryPopUpFilter(props) {
  const { setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Box
        sx={{
          boxShadow: '3',
          paddingTop: '22px',
          px: '14px',
          paddingBottom: '13px',
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          maxWidth: '301px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Box
          sx={{
            marginBottom: '4px'
          }}>
          <Box style={titleStyle4} fontFamily="SF Pro Display">
            Sort by
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            ml: '-5px'
          }}>
          <Button
            onClick={handleClose}
            variant="text"
            sx={{
              ...borderButton,
              width: '100%',
              maxWidth: '90px',
              borderRadius: '44px',
              py: '4px',
              bgcolor: '#ffffff',
              ':hover': { bgcolor: '#ffffff' }
            }}>
            <Box style={buttonStyle4} fontFamily="SF Pro Display" onClose={handleClose}>
              Date Range
            </Box>
          </Button>
        </Box>
        <Box
          sx={{
            marginBottom: '3px',
            mt: '9px'
          }}>
          <Box style={titleStyle4} fontFamily="SF Pro Display">
            Filters
          </Box>
          <Box
            sx={{
              ml: '-10px',
              mt: '-4px',
              display: 'flex',
              flexDirection: 'row'
            }}>
            {data.map((user) => (
              <Box key={user.id}>
                <Box
                  sx={{
                    mr: '6px',
                    display: 'flex',
                    flexDirection: 'row'
                  }}>
                  <CheckBoxForHistory />
                  <Box
                    sx={{
                      mt: '10.5px',
                      ml: '-7px'
                    }}>
                    <Box
                      sx={{
                        fontFamily: 'Sans',
                        fontWeight: '400',
                        fontSize: '16px',
                        lineHeight: '28px'
                      }}>
                      {user.name}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-end'
          }}>
          <Button
            onClick={handleClose}
            variant="text"
            sx={{
              width: '100%',
              maxWidth: '100px',
              borderRadius: '44px',
              py: '9px',
              bgcolor: '#054E8B',
              ':hover': { bgcolor: '#054E8B' }
            }}>
            <Box style={buttonStyle5} fontFamily="SF Pro Display" onClose={handleClose}>
              Select
            </Box>
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
