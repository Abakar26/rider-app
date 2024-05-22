/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { loginPageStyles } from './LoginStyles';

export default function ChangePasswordSuccessFullDialog(props) {
  const { dialog } = props;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const classes = loginPageStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const loginScreen = () => {
    setOpen(false);
    navigate('/');
  };
  const borderButton = { border: 2 };
  const titleStyle = {
    fontSize: '19px',
    lineHeight: '25px',
    fontWeight: '700',
    color: '#054E8B'
  };
  const descStyle = {
    fontSize: '15px',
    lineHeight: '19px',
    color: '#2A3752'
  };
  const buttonStyle1 = {
    fontFamily: 'Mukta',
    textTransform: 'none',
    fontSize: '17px',
    fontWeight: '700',
    lineHeight: '22px'
  };

  const buttonStyle2 = {
    fontFamily: 'Mukta',
    textTransform: 'none',
    fontSize: '15px',
    fontWeight: '700',
    lineHeight: '19px',
    color: '#2A3752'
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialogContent-root ': { padding: '0px 0px', margin: 0 },
        '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper ': {
          margin: '7px',
          borderRadius: '8px'
        }
      }}
      margin={0}
      open={open}
      onClose={handleClose}>
      <DialogContent
        sx={{
          '& .MuiDialogContent-root ': { padding: '51px 1px' },
          '& .MuiDialog-paper  ': { margin: '1px', width: '20px' }
        }}>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Box
            sx={{
              boxShadow: '3',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
            <Box sx={{ textAlign: 'center', padding: '0px 0px 12px' }}>
              <Box sx={{ mt: '8px', mb: '20px' }}>
                {' '}
                <CheckCircleIcon sx={{ color: '#054E8B', fontSize: 58 }} />
              </Box>
              <Box
                sx={{
                  marginBottom: '12px'
                }}>
                <Box style={titleStyle} className={classes.heading10}>
                  Password Changed!
                </Box>
              </Box>
              <Box style={descStyle} className={classes.heading}>
                Your password has been changed successfully.
              </Box>
            </Box>
            {dialog ? (
              <Button
                onClick={handleClose}
                style={buttonStyle1}
                variant="text"
                sx={{
                  width: '100%',
                  borderRadius: '8px',
                  background: '#054E8B',
                  bgcolor: '#054E8B',
                  color: '#ffffff',
                  py: '9px',
                  ':hover': { bgcolor: '#054E8B', color: '#ffffff' }
                }}>
                Okay
              </Button>
            ) : (
              <Button
                onClick={loginScreen}
                variant="text"
                style={buttonStyle2}
                className={classes.heading10}
                sx={{
                  ...borderButton,
                  width: '100%',
                  borderRadius: '8px',
                  borderColor: '#054E8B',
                  bgcolor: '#ffffff',
                  py: '8px',
                  ':hover': { bgcolor: '#ffffff' }
                }}>
                Back to login screen
              </Button>
            )}
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
