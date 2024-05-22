/* eslint-disable import/no-named-as-default */
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, CssBaseline, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'material-react-toastify';
import { sendOTP, setPhoneNo } from '../redux-store/slices/userSlice';
import { loginPageStyles } from './LoginStyles';
import LoginVerificationScreen from './LoginVerificationScreen';
import ChangePassword from './ChangePassword';
import MuiPhoneNumber from './PhoneNumber';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          '&.Mui-disabled': {
            opacity: 0.7,
            color: 'white'
          }
        }
      }
    }
  }
});

const textStyle = {
  fontFamily: 'Mulish',
  fontSize: '13px',
  lineHeight: '16px'
};

// const DIGIT_REGEX = /^\+6[0-9]+$/;

export function ForgotPasswordScreen() {
  const user = useSelector((state) => state.userReducer.user);
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState({});
  const dispatch = useDispatch();

  const [validatePhoneNumber, setValidatePhoneNumber] = useState(false);
  const navigate = useNavigate();

  // use Effect for handling authorization stuff
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      navigate('/logistics');
    }
  }, []);

  const classes = loginPageStyles();

  const isValidPhoneNumber = () => {
    const country = phoneNumber?.value?.substring(0, 2);
    switch (country) {
      case '60':
        return phoneNumber?.value?.length >= 10;
      case '65':
        return phoneNumber?.value?.length === 10;
      case '62':
        return phoneNumber?.value?.length >= 11;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (isValidPhoneNumber()) {
      setValidatePhoneNumber(true);
    } else {
      setValidatePhoneNumber(false);
    }
  }, [phoneNumber?.value]);

  const titleStyle = {
    fontSize: '24px',
    lineHeight: '31px',
    fontWeight: '700',
    letterSpacing: '-0.01em',
    color: '#111111'
  };
  const buttonStyle = {
    backgroundColor: '#054E8B',
    fontSize: '19px',
    color: 'FFFFFF',
    fontWeight: '700',
    lineHeight: '25px'
  };

  return (
    <>
      <CssBaseline />
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
              m: '8px',
              ':hover': {
                bgcolor: '#ffffff',
                color: '#000000'
              }
            }}>
            <KeyboardArrowLeftIcon sx={{ color: '#8493AE' }} />
          </Button>
        </Box>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              m: 'auto 26px'
            }}>
            {step === 1 && (
              <>
                <Box
                  sx={{ mb: '10px', textAlign: 'center' }}
                  className={classes.heading10}
                  style={titleStyle}>
                  Forgot Password?
                </Box>
                <Box sx={{ maxWidth: '323px' }}>
                  <Box
                    className={classes.heading}
                    sx={{
                      textAlign: 'center',
                      mb: '20px',
                      fontSize: '15px',
                      lineHeight: '19px',
                      color: '#111111'
                    }}>
                    Enter your phone number and we will send you an OTP to reset your password.
                  </Box>
                  <Box sx={{ px: '1.5px', mb: '20px' }}>
                    <Box
                      className={classes.heading}
                      sx={{
                        mb: '0.25rem',
                        fontSize: '13px',
                        color: '#455066',
                        lineHeight: '16px'
                      }}>
                      Phone Number
                      <Typography variant="span" sx={{ ml: '2px', color: '#EA4C59' }}>
                        <strong>*</strong>
                      </Typography>
                    </Box>
                    <MuiPhoneNumber
                      onChange={(value, data) => {
                        setPhoneNumber({ ...data, value });
                      }}
                    />
                  </Box>
                </Box>
                <Box width="74.31%">
                  <Button
                    onClick={() => {
                      const body = {
                        riders: { contact_number: phoneNumber.value }
                      };
                      dispatch(sendOTP(body))
                        .unwrap()
                        .then(() => {
                          setStep(2);
                          dispatch(setPhoneNo(phoneNumber));
                        })
                        .catch((error) => {
                          toast.error(error.message);
                        });
                    }}
                    disabled={!validatePhoneNumber}
                    variant="text"
                    style={buttonStyle}
                    sx={{
                      width: '100%',
                      fontFamily: 'Mukta',
                      borderRadius: '8px',
                      bgcolor: '#054E8B',
                      color: 'white',
                      py: '4px',
                      ':hover': { bgcolor: '#054E8B' }
                    }}
                    classes={{ disabled: classes.disabledButton }}>
                    Send OTP
                  </Button>
                </Box>
              </>
            )}
            {step === 2 && <LoginVerificationScreen setStep={setStep} />}
            {step === 3 && <ChangePassword />}
          </Box>
        </ThemeProvider>
        <Box style={textStyle} sx={{ color: '#8493AE', mb: '20%' }}>
          Version X.X
        </Box>
      </Box>
    </>
  );
}
export default ForgotPasswordScreen;
