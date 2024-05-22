import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import useConfirm from './useConfirm';
import { loginPageStyles } from '../../LoginScreens/LoginStyles';

export default function CancelSamplesPopup() {
  const { isOpen = false, nextTab, proceed, cancel } = useConfirm();

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
      open={isOpen}
      onClose={cancel}>
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
              padding: '32px 12px 20px',
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
                mt: '0px',
                mb: '8px'
              }}>
              <Box style={titleStyle} className={classes.heading10}>
                Cancel Changes?
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
                Changes you made so far will not be saved. You will be brought back to the {nextTab}
                .
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
              }}>
              <Button
                onClick={cancel}
                variant="text"
                sx={{
                  border: 1,
                  borderColor: '#E5E5E5',
                  maxWidth: '134px',
                  width: '100%',
                  maxHeight: '36px',
                  height: '100%',
                  borderRadius: '10px',
                  py: '10px',
                  ':hover': { bgcolor: '#ffffff' }
                }}
                style={cancelButtonStyle}>
                Don’t Cancel
              </Button>
              <Button
                onClick={proceed}
                variant="text"
                sx={{
                  maxWidth: '103px',
                  width: '100%',
                  maxHeight: '36px',
                  height: '100%',
                  borderRadius: '8px',
                  py: '10px',
                  ':hover': { bgcolor: '#054E8B' }
                }}
                style={nextButtonStyle}>
                Yes
              </Button>
            </Box>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
