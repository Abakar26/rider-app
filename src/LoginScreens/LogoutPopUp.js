/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logoutImg from '../Images/logout_btn_img.svg';
import { loginPageStyles } from './LoginStyles';
import { destroyUser } from '../redux-store/slices/userSlice';

export default function LogoutPopUp(props) {
  const { setLogout } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const classes = loginPageStyles();
  const handleClose = () => {
    setLogout(false);
    setOpen(false);
  };
  const logout = () => {
    /*
     we now communicate with our service worker
     for marking user as invalidated
    */
    navigator.serviceWorker.controller.postMessage({
      type: 'MESSAGE_IDENTIFIER',
      user: null
    });
    dispatch(destroyUser());
    handleClose();
    navigate('/');
  };
  const titleStyle = {
    fontSize: '17px',
    lineHeight: '22px',
    fontWeight: '700',
    color: '#054E8B'
  };
  const descStyle = {
    fontSize: '15px',
    lineHeight: '19px',
    color: '#455066',
    fontFamily: 'Mulish'
  };
  const Logoutbutton = {
    textTransform: 'none',
    lineHeight: '22px',
    fontFamily: 'Mukta',
    fontSize: '17px',
    fontWeight: '700'
  };
  const closebutton = {
    fontFamily: 'Mulish',
    fontSize: '15px',
    lineHeight: '19px',
    color: '#EA4C59',
    textTransform: 'none'
  };
  return (
    <Dialog
      PaperProps={{
        sx: {
          margin: '13px',
          borderRadius: '8px',
          px: '0px',
          width: '100%',
          maxWidth: '350px',
          maxHeight: '277px',
          height: '100%'
        }
      }}
      margin={0}
      open={open}
      onClose={handleClose}>
      <DialogContent
        sx={{
          p: '24px 12px 20px',
          width: '100%'
        }}>
        <Grid container direction="row" justifyContent="center" alignItems="center" width="100%">
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
            <Box sx={{ height: '64px', width: '64px' }}>
              <img src={logoutImg} alt="Logout" />
            </Box>
            <Box
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                p: '8px'
              }}>
              <Box style={titleStyle} className={classes.heading10}>
                Are you sure you want to log out?
              </Box>
              <Box style={descStyle}>You will be listed as offline</Box>
            </Box>
            <Button
              onClick={logout}
              variant="text"
              sx={{
                width: '100%',
                borderRadius: '8px',
                background: '#054E8B',
                color: '#ffffff',
                py: '8px',
                mb: '4px',
                ':hover': { bgcolor: '#054E8B' }
              }}>
              <Box style={Logoutbutton}>Log Out</Box>
            </Button>
            <Button
              onClick={handleClose}
              variant="text"
              sx={{
                width: '100%',
                borderRadius: '8px',
                background: '#FAFAFA',
                gap: '8px',
                color: 'red',
                border: 1,
                borderColor: '#E5E5E5'
              }}>
              <Box style={closebutton}>Close</Box>
            </Button>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
