/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import biomarkLogo from '../Images/biomark_logo.svg';
import biomarkText from '../Images/biomark_text.svg';
import { loginPageStyles } from '../LoginScreens/LoginStyles';

const titleStyle = {
  fontSize: '17px',
  lineHeight: '22px',
  fontWeight: '700',
  color: '#054E8B'
};
const descStyle = {
  fontSize: '15px',
  lineHeight: '19px',
  color: '#455066'
};
const nextButtonStyle = {
  fontFamily: 'Mukta',
  backgroundColor: '#054E8B',
  textTransform: 'capitalize',
  fontSize: '15px',
  color: '#FFFFFF',
  fontWeight: '700',
  lineHeight: '20px',
  letterSpacing: '0.005em'
};
const cancelButtonStyle = {
  fontFamily: 'Mulish',
  textTransform: 'capitalize',
  fontSize: '15px',
  color: '#EA4C59',
  lineHeight: '19px'
};

export default function ConfirmSamplesPopup({
  confirmEOrders,
  openConfirmPopUp,
  setOpenConfirmPopUp
}) {
  const classes = loginPageStyles();
  return (
    <Dialog
      sx={{
        '& .MuiDialogContent-root ': {
          padding: '0px 0px',
          margin: 0
        },
        '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper ': {
          margin: '19px',
          borderRadius: '8px'
        }
      }}
      margin={0}
      open={openConfirmPopUp}
      onClose={() => setOpenConfirmPopUp(false)}>
      <DialogContent
        sx={{
          '& .MuiDialogContent-root ': {
            padding: '51px 1px'
          },
          '& .MuiDialog-paper  ': {
            margin: '1px',
            width: '20px'
          }
        }}>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Box
            sx={{
              boxShadow: '3',
              pb: '20px',
              px: '12px',
              pt: '32px',
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
                display: 'flex',
                alignContent: 'center',
                maxWidth: '148px',
                justifyContent: 'space-between'
              }}>
              <img
                src={biomarkLogo}
                alt=""
                style={{
                  width: '44px'
                }}
              />
              <Box
                sx={{
                  mr: '11px'
                }}
              />
              <img
                src={biomarkText}
                alt=""
                style={{
                  width: '92px'
                }}
              />
            </Box>
            <Box
              sx={{
                textAlign: 'center',
                mt: '20px',
                mb: '8px'
              }}>
              <Box style={titleStyle} className={classes.heading10}>
                Confirm Orders and Sample Count!
              </Box>
            </Box>
            <Box
              sx={{
                textAlign: 'center',
                mb: '20px',
                display: 'flex',
                justifyContent: 'center'
              }}>
              <Box style={descStyle} className={classes.heading}>
                Ensure checking that the orders and quantity that you are collecting is correct.
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
              }}>
              <Button
                onClick={() => setOpenConfirmPopUp(false)}
                variant="text"
                sx={{
                  maxWidth: '128px',
                  width: '100%',
                  borderRadius: '8px',
                  border: 1,
                  borderColor: '#E5E5E5'
                }}
                style={cancelButtonStyle}>
                Check Again
              </Button>
              <Button
                onClick={confirmEOrders}
                variant="text"
                sx={{
                  maxWidth: '133px',
                  width: '100%',
                  borderRadius: '8px',
                  ':hover': { bgcolor: '#054E8B', color: '#ffffff' }
                }}
                style={nextButtonStyle}>
                Confirm
              </Button>
            </Box>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
