/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import OtpInput from 'react-otp-input';
import React, { useEffect, useState } from 'react';
import { toast } from 'material-react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginPageStyles } from './LoginStyles';
import { verifyOTP } from '../redux-store/slices/userSlice';
import sendOTP from '../utils/send_otp';

const textStyle = {
  fontFamily: 'Mulish',
  fontSize: '13px',
  lineHeight: '16px'
};

export function LoginVerificationScreen({ setStep }) {
  const classes = loginPageStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [verification, setVerification] = useState(false);
  const rider = useSelector((state) => state.userReducer.rider);

  useEffect(() => {
    if (code.length === 6 && rider.id) {
      setVerification(true);
    } else {
      setVerification(false);
    }
  }, [code, rider.id]);
  const handleChange = (mycode) => setCode(mycode);
  const verifyOtp = () => {
    const body = {
      id: rider?.id,
      params: {
        otp: code
      }
    };
    dispatch(verifyOTP(body))
      .unwrap()
      .then(() => {
        setStep(3);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const titleStyle = {
    fontFamily: 'Mukta',
    fontSize: '24px',
    lineHeight: '31px',
    fontWeight: '700',
    letterSpacing: '-0.01em',
    color: '#111111'
  };
  const buttonStyle = {
    textTransform: 'capitalize',
    fontSize: '19px',
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: '25px'
  };
  return (
    <>
      <Box sx={{ mb: '16px' }} className={classes.heading10} style={titleStyle}>
        Verification
      </Box>
      <Box
        className={classes.heading}
        sx={{
          mb: '49px',
          textAlign: 'center',
          fontSize: '15px',
          lineHeight: '19px',
          color: '#111111',
          maxWidth: '318px'
        }}>
        Enter the verification code we just to your phone number{' '}
      </Box>
      <Box sx={{ mx: 'auto', mb: '18px' }}>
        <OtpInput
          value={code}
          onChange={handleChange}
          numInputs={6}
          separator={
            <span
              style={{
                width: '21px',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                textAlign: 'center'
              }}
            />
          }
          isInputNum
          shouldAutoFocus
          inputStyle={{
            border: 'none',
            borderBottom: '1px solid #054E8B',
            textAlign: 'center',
            width: '29px',
            fontSize: '12px',
            color: '#000',
            caretColor: 'blue'
          }}
          focusStyle={{
            border: 'none',
            borderBottom: '1px solid #054E8B',
            outline: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            textAlign: 'center'
          }}
        />
      </Box>
      <Box style={textStyle} sx={{ color: '#111111', textAlign: 'center', mb: '19px' }}>
        If you did't receive a code.&nbsp;
        <Box
          onClick={() => sendOTP(localStorage.getItem('phoneNumber'), navigate, true)}
          sx={{ display: 'inline', color: '#054E8B' }}
          style={textStyle}>
          <span>Resend</span>
        </Box>
      </Box>
      <Box width="78%">
        <Button
          onClick={verifyOtp}
          disabled={!verification}
          variant="text"
          style={buttonStyle}
          sx={{
            width: '100%',
            borderRadius: '8px',
            bgcolor: '#054E8B',
            ':hover': { bgcolor: '#054E8B' }
          }}>
          Verify
        </Button>
      </Box>
    </>
  );
}
export default LoginVerificationScreen;
