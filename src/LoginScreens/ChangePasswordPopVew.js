/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import ChangePasswordUnsuccessfulDialog from './ChangePasswordUnsuccessfulDialog';
import ChangePasswordSuccessFullDialog from './ChangePasswordSuccessFullDialog';
import { changePassword } from '../redux-store/slices/userSlice';

const ButtonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          '&.Mui-disabled': {
            opacity: 0.7
          }
        }
      }
    }
  }
});

export default function ChangePasswordPopVew(props) {
  const dispatch = useDispatch();
  const [successful, setSuccessful] = React.useState();
  const [unSuccessful, setUnsuccessful] = React.useState();
  const navigate = useNavigate();
  const handleChangePassword = () => {
    dispatch(changePassword(props))
      .unwrap()
      .then(() => {
        if (props.invitation_token) {
          navigate('/login');
        } else {
          props.setSuccessful && props.setSuccessful(true);
          setSuccessful(true);
        }
      })
      .catch((error) => {
        props.setUnsuccessful && props.setUnsuccessful(true);
        setUnsuccessful(true);
      })
      .finally(() => {
        props.setPasswordDialogOpen && props.setPasswordDialogOpen(false);
      });
  };

  const dialogButtonStyle = {
    textTransform: 'capitalize',
    fontSize: '17px',
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: '22px',
    fontFamily: 'Mukta',
    padding: '8px'
  };

  const pageButtonStyle = {
    textTransform: 'capitalize',
    fontSize: '19px',
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: '25px',
    fontFamily: 'Mukta'
  };

  return (
    <Box sx={{ width: '100%' }}>
      <ThemeProvider theme={ButtonTheme}>
        <Button
          onClick={handleChangePassword}
          disabled={!props.passwordValidation}
          variant="text"
          style={props.dialog ? dialogButtonStyle : pageButtonStyle}
          sx={{
            width: '100%',
            borderRadius: '8px',
            background: '#054E8B',
            bgcolor: '#054E8B',
            ':hover': {
              bgcolor: '#054E8B'
            }
          }}>
          {props.invitation_token ? 'Create Password' : 'Change Password'}
        </Button>
      </ThemeProvider>
      {successful && <ChangePasswordSuccessFullDialog />}
      {unSuccessful && <ChangePasswordUnsuccessfulDialog setUnsuccessful={setUnsuccessful} />}
    </Box>
  );
}
