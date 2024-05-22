/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import Grid from '@mui/material/Grid';
import { loginPageStyles } from './LoginStyles';

const borderButton4 = {
  border: 2
};
const titleStyle4 = {
  fontSize: '19px',
  lineHeight: '25px',
  fontWeight: '700',
  color: '#054E8B'
};
const descStyle4 = {
  fontFamily: 'Mulish',
  fontSize: '14px',
  lineHeight: '19px',
  fontWeight: '400',
  color: '#2A3752'
};
const buttonStyle4 = {
  textTransform: 'capitalize',
  fontSize: '15px',
  color: '#2A3752',
  fontWeight: '700',
  lineHeight: '20px'
};

export default function MaxAttemptPopupForLogin(props) {
  const { setOpens } = props;
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
      width={React.useState(true)}
      margin={0}
      open
      onClose={setOpens}>
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
              paddingTop: '17px',
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
                  color: '#FFD75E',
                  fontSize: 58
                }}
              />
            </Box>
            <Box
              sx={{
                textAlign: 'center',
                marginTohandleClosep: '14px',
                marginBottom: '12px'
              }}>
              <Box style={titleStyle4} className={classes.heading10}>
                Account Inactive
              </Box>
            </Box>
            <Box
              sx={{
                textAlign: 'center',
                marginBottom: '11px'
              }}>
              <Box style={descStyle4} className={classes.heading}>
                You cannot access the app as your account has been deactivated.
              </Box>
            </Box>
            <Box
              sx={{
                textAlign: 'center',
                marginBottom: '20px'
              }}
            />
            <Button
              onClick={setOpens}
              variant="text"
              sx={{
                ...borderButton4,
                width: '100%',
                borderRadius: '8px',
                borderColor: '#054E8B',
                bgcolor: '#ffffff',
                ':hover': {
                  bgcolor: '#ffffff'
                }
              }}>
              <Box style={buttonStyle4} className={classes.heading10} onClose={setOpens}>
                Okay
              </Box>
            </Button>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
