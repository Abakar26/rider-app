/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { loginPageStyles } from './LoginStyles';

const borderButton = {
  border: 2
};
const titleStyle1 = {
  fontSize: '19px',
  lineHeight: '25px',
  fontWeight: '700',
  color: '#054E8B'
};
const descStyle2 = {
  fontSize: '13.5px',
  lineHeight: '19px',
  fontWeight: '400',
  color: '#2A3752'
};
const buttonStyle3 = {
  textTransform: 'capitalize',
  fontSize: '15px',
  color: '#2A3752',
  fontWeight: '700',
  lineHeight: '20px'
};

export default function PopupForBlockedAccount(props) {
  const { setOpens } = props;
  const classes = loginPageStyles();
  const handleClose = () => {
    setOpens(false);
  };

  const handleCloseCancel = () => {
    setOpens(false);
  };
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
      width="100%"
      margin={0}
      open
      onClose={handleCloseCancel}>
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
              paddingBottom: '12px',
              px: '12px',
              pt: '17px',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              maxWidth: '351px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Box>
              <DoNotDisturbIcon
                sx={{
                  color: '#EA4C59',
                  fontSize: 58
                }}
              />
            </Box>
            <Box
              sx={{
                textAlign: 'center',
                mt: '15px',
                mb: '12px'
              }}>
              <Box style={titleStyle1} className={classes.heading10}>
                Max Attempts Reached
              </Box>
            </Box>
            <Box
              sx={{
                textAlign: 'center',
                mb: '10px'
              }}>
              <Box style={descStyle2} sx={{ fontFamily: 'Sans' }}>
                You have used up 5 attempts to log in to your account.
              </Box>
            </Box>
            <Box
              sx={{
                mb: '20px',
                textAlign: 'center'
              }}>
              <Box
                style={descStyle2}
                sx={{
                  fontFamily: 'Sans'
                }}>
                Please check your Email to unlock your account
              </Box>
            </Box>
            <Button
              onClick={handleClose}
              variant="text"
              style={buttonStyle3}
              className={classes.heading10}
              onClose={handleClose}
              sx={{
                ...borderButton,
                width: '100%',
                borderRadius: '8px',
                borderColor: '#054E8B',
                bgcolor: '#ffffff',

                ':hover': {
                  bgcolor: '#ffffff',
                  color: '#ffffff'
                }
              }}>
              Okay
            </Button>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
