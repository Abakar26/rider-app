/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

const titleStyle4 = {
  fontSize: '17px',
  lineHeight: '22px',
  fontWeight: '600',
  marginTohandleClose: '14px',
  marginBottom: '2px'
};
const descStyle4 = {
  fontSize: '13px',
  lineHeight: '16px',
  letterSpacing: '-0.078px',
  marginBottom: '19px'
};
const buttonStyle4 = {
  textTransform: 'none',
  fontSize: '17px',
  color: '#007AFF',
  lineHeight: '17px',
  letterSpacing: '-0.41px'
};
const buttonStyle5 = {
  textTransform: 'none',
  fontSize: '17px',
  color: '#007AFF',
  fontWeight: '600',
  lineHeight: '17px'
};

export default function WazePopup({ setOpen, data }) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleWaze = (e) => {
    setOpen(false);
    e.preventDefault();
    window.open(`https://waze.com/ul?ll=${data.latitude},${data.longitude}&q=66+&navigate=yes`);
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialogContent-root ': { padding: '0px 0px', margin: 0 },
        '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper ': {
          margin: '19px',
          borderRadius: '14px'
        }
      }}
      width={React.useState(true)}
      margin={0}
      open
      onClose={handleClose}>
      <DialogContent
        sx={{
          '& .MuiDialogContent-root ': { padding: '51px 1px' },
          '& .MuiDialog-paper  ': { margin: '1px', width: '20px' },
          width: '270px'
        }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          background="#FAFAFA"
          backdropFilter="blur(27.1828px)"
          textAlign="center"
          fontFamily="'SF Pro Display', sans-serif"
          letterSpacing="-0.408px">
          <Box
            sx={{
              pt: '19px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Box style={titleStyle4}>Search for route via Waze?</Box>
            <Box style={descStyle4}>This will open the Waze app</Box>

            <Divider orientation="horizontal" flexItem />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                maxWidth: '270px',
                width: '100%',
                height: '45px'
              }}>
              <Button
                onClick={handleClose}
                variant="text"
                sx={{
                  width: '100%',
                  padding: '10.5px 38.5px 11px 38px',
                  borderColor: '#054E8B',
                  ':hover': {
                    bgcolor: '#ffffff'
                  }
                }}
                style={buttonStyle4}>
                Decline
              </Button>
              <Divider orientation="vertical" flexItem />
              <Button
                onClick={(e) => handleWaze(e)}
                variant="text"
                sx={{
                  width: '100%',
                  padding: '10.5px 39px 11px',

                  color: '#007AFF',
                  ':hover': { bgcolor: '#ffffff', color: '#000000' }
                }}
                style={buttonStyle5}>
                Accept
              </Button>
            </Box>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
