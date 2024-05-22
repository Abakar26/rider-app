import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { React, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import ChangePassword from './ChangePassword';

export function ChangePasswordScreen() {
  const { search } = useLocation();
  const invitationToken = new URLSearchParams(search).get('invitation_token');
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      navigate('/logistics');
    }
    if (!invitationToken) {
      navigate('/');
    }
  }, []);

  const textStyle = {
    fontFamily: 'Mulish',
    fontSize: '13px',
    lineHeight: '16px'
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh'
      }}>
      <Box sx={{ width: '100%' }}>
        <Button
          onClick={() => navigate(-1)}
          variant="text"
          sx={{
            minWidth: '0px',
            p: '0px',
            ':hover': {
              bgcolor: '#ffffff',
              color: '#000000'
            }
          }}>
          <KeyboardArrowLeftIcon sx={{ color: '#8493AE' }} />
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          my: 'auto'
        }}>
        <ChangePassword invitationToken={invitationToken} />
      </Box>
      <Box style={textStyle} sx={{ color: '#8493AE', mb: '20%' }}>
        Version X.X
      </Box>
    </Box>
  );
}
export default ChangePasswordScreen;
