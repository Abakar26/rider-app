/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react';
import { TextField, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { loginPageStyles } from './LoginStyles';
import ChangePasswordPopVew from './ChangePasswordPopVew';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/;

function ChangePassword({ invitationToken }) {
  const classes = loginPageStyles();
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmedPassword: ''
  });
  const rider = useSelector((state) => state.userReducer.rider);
  const [format, setFormat] = useState(true);
  const [equal, setEqual] = useState();
  const [lengthValidation, setLengthValidation] = useState();

  const onNewPasswordChangeHandler = (e) => {
    setPasswords({ ...passwords, newPassword: e.target.value });
  };
  const onConfirmPasswordChangeHandler = (e) => {
    setPasswords({ ...passwords, confirmedPassword: e.target.value });
  };

  useEffect(() => {
    if (passwords.newPassword?.length >= 8) {
      setLengthValidation(true);
    } else {
      setLengthValidation(false);
    }
    if (PASSWORD_REGEX.test(passwords.newPassword)) {
      setFormat(true);
    } else {
      setFormat(false);
    }
    if (passwords.confirmedPassword === passwords.newPassword) {
      setEqual(true);
    } else {
      setEqual(false);
    }
  }, [passwords]);

  const titleStyle = {
    fontFamily: 'Mukta',
    fontSize: '24px',
    lineHeight: '31px',
    fontWeight: '700',
    letterSpacing: '-0.01em',
    color: '#111111'
  };

  const textStyle = {
    fontFamily: 'Mulish',
    fontSize: '13px',
    lineHeight: '16px'
  };

  return (
    <>
      <Box sx={{ textAlign: 'center', mb: '20px' }} style={titleStyle}>
        {' '}
        {invitationToken ? 'Create a New Password' : 'Change Password'}
      </Box>
      <Box sx={{ mb: '20px' }}>
        <Box sx={{ mb: '4px', color: '#455066' }} style={textStyle}>
          New Password
        </Box>
        <TextField
          fullWidth
          error={!!(lengthValidation && !format)}
          autoComplete="off"
          helperText={
            !format && lengthValidation
              ? 'The password must be atleast 8 characters and should contain atleast one alphabet, one digit and one special character'
              : ''
          }
          className={classes.textField}
          type="password"
          value={passwords.newPassword}
          name="newPassword"
          onChange={(e) => onNewPasswordChangeHandler(e)}
          variant="outlined"
          placeholder="New Password"
          inputProps={{ minLength: 8 }}
          sx={{
            width: '60vw',
            '& .MuiInputBase-input': {
              py: '11.5px'
            }
          }}
        />
      </Box>
      <Box sx={{ mb: '20px' }}>
        <Box sx={{ mb: '4px', color: '#455066' }} style={textStyle}>
          Confirm Password
        </Box>{' '}
        <TextField
          fullWidth
          disabled={!format}
          error={passwords.confirmedPassword.length >= passwords.newPassword.length && !equal}
          helperText={
            passwords.confirmedPassword.length >= passwords.newPassword.length && !equal
              ? 'Passwords must match'
              : ''
          }
          autoComplete="off"
          className={classes.textField}
          type="password"
          value={passwords.confirmedPassword}
          name="confirmPassword"
          onChange={(e) => onConfirmPasswordChangeHandler(e)}
          variant="outlined"
          placeholder="Confirm Password"
          inputProps={{ minLength: 8 }}
          sx={{
            width: '60vw',
            '& .MuiInputBase-input': {
              py: '11.5px'
            }
          }}
        />
      </Box>
      <ChangePasswordPopVew
        user={rider?.id}
        passwordValidation={lengthValidation && format && equal}
        invitationToken={invitationToken}
        passwords={passwords}
      />
    </>
  );
}

export default ChangePassword;
