/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { loginPageStyles } from './LoginStyles';

export default function ChangePasswordUnsuccessfulDialog(props) {
  const { setUnsuccessful, dialog } = props;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const classes = loginPageStyles();

  const handleClose = () => {
    setOpen(false);
    setUnsuccessful(false);
  };

  const loginScreen = () => {
    navigate('/');
  };
  const borderButton = { border: 2 };
  const titleStyle = {
    fontSize: '17px',
    lineHeight: '22px',
    fontWeight: '700',
    color: '#054E8B'
  };
  const descStyle = {
    fontSize: '15px',
    lineHeight: '19px',
    color: '#2A3752',
    align: 'center'
  };
  const buttonStyle1 = {
    fontFamily: 'Mukta',
    textTransform: 'none',
    fontSize: '15px',
    color: '#ffffff',
    fontWeight: '700',
    lineHeight: '20px'
  };
  const buttonStyle2 = {
    fontFamily: 'Mukta',
    textTransform: 'none',
    fontSize: '15px',
    fontWeight: '700',
    lineHeight: '20px',
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
              padding: '32px 12px 12px 12px',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Box>
              {' '}
              <CancelIcon sx={{ color: '#EA4C59', fontSize: 58 }} />
            </Box>
            <Box sx={{ p: '8px' }}>
              <Box
                sx={{
                  textAlign: 'center',
                  my: '8px'
                }}>
                <Box style={titleStyle} className={classes.heading10}>
                  Password Reset Failed
                </Box>
              </Box>
              <Box
                sx={{ mb: '8px', textAlign: 'center' }}
                style={descStyle}
                className={classes.heading}>
                Your password was unsuccessful, please try again or contact your fleet manager.
              </Box>
            </Box>
            <Button
              onClick={handleClose}
              variant="text"
              style={buttonStyle1}
              sx={{
                ...borderButton,
                width: '100%',
                borderRadius: '8px',
                borderColor: '#054E8B',
                bgcolor: '#054E8B',
                marginBottom: '12px',
                py: '8px',
                ':hover': { bgcolor: '#054E8B' }
              }}>
              {' '}
              Try again
            </Button>
            {!dialog && (
              <Button
                onClick={loginScreen}
                variant="text"
                style={buttonStyle2}
                sx={{
                  ...borderButton,
                  width: '100%',
                  borderRadius: '8px',
                  borderColor: '#054E8B',
                  bgcolor: '#ffffff',
                  marginBottom: '12px',
                  py: '10px'
                }}>
                Back to login screen
              </Button>
            )}
            <Link href="#" sx={{ color: '#054E8B', py: '12px' }}>
              fleetmanager@innoquest.com
            </Link>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
