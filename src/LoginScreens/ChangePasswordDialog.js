/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-duplicate-props */
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { React, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  Box,
  TextField
} from '@mui/material';
import { loginPageStyles } from './LoginStyles';

import ChangePasswordPopVew from './ChangePasswordPopVew';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/;

export default function ChangePasswordDialog(props) {
  const { setChangePasswordDialog, setSuccessful, setUnsuccessful, user } = props;
  const [open, setOpen] = useState(true);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const classes = loginPageStyles();
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmedPassword: ''
  });
  const [format, setFormat] = useState();
  const [equal, setEqual] = useState();
  const [lengthValidation, setLengthValidation] = useState();
  const onNewPasswordChangeHandler = (e) => {
    setPasswords({
      ...passwords,
      newPassword: e.target.value
    });
  };
  const onConfirmPasswordChangeHandler = (e) => {
    setPasswords({
      ...passwords,
      confirmedPassword: e.target.value
    });
  };
  const handleClickShowNewPassword = () => {
    setNewPasswordVisible((previousValue) => !previousValue);
  };
  const handleClickShowConfirmPassword = () => {
    setConfirmPasswordVisible((previousValue) => !previousValue);
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
    if (passwords.newPassword === passwords.confirmedPassword) {
      setEqual(true);
    } else {
      setEqual(false);
    }
  }, [passwords]);

  const handleClose = () => {
    setChangePasswordDialog(false);
    setOpen(false);
  };

  return (
    <>
      {' '}
      <Dialog
        sx={{
          '& .MuiDialogContent-root ': {
            padding: '0px 0px',
            margin: 0
          }
        }}
        margin={0}
        open={open}
        onClose={handleClose}>
        <DialogContent>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            padding="24px"
            maxWidth="350px">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
              noValidate>
              <Box sx={{ marginBottom: '20px' }}>
                <Box
                  sx={{
                    mb: '2px',
                    display: 'flex',
                    fontWeight: '700',
                    fontSize: '15px',
                    color: '#455066',
                    lineHeight: '20px',
                    fontFamily: 'Mukta',
                    letterSpacing: '0.005em'
                  }}>
                  Enter New Password
                </Box>
                <Box>
                  <TextField
                    size="small"
                    error={!!(lengthValidation && !format)}
                    autoComplete="off"
                    helperText={
                      !format && lengthValidation
                        ? 'The password must be atleast 8 characters and should contain atleast one alphabet, one digit and one special character'
                        : ''
                    }
                    className={classes.textField}
                    type={newPasswordVisible ? 'text' : 'password'}
                    value={passwords.newPassword}
                    name="newPassword"
                    onChange={(e) => onNewPasswordChangeHandler(e)}
                    variant="outlined"
                    placeholder="New Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={handleClickShowNewPassword} edge="end">
                            {newPasswordVisible ? (
                              <Visibility
                                sx={{
                                  width: '21px',
                                  color: '#8493AE'
                                }}
                              />
                            ) : (
                              <VisibilityOff
                                sx={{
                                  width: '21px',
                                  color: '#8493AE'
                                }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    inputProps={{
                      minLength: 8
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ marginBottom: '20px' }}>
                <Box
                  sx={{
                    mb: '2px',
                    display: 'flex',
                    fontWeight: '700',
                    fontSize: '15px',
                    color: '#455066',
                    lineHeight: '20px',
                    fontFamily: 'Mukta',
                    letterSpacing: '0.005em'
                  }}>
                  Re-enter New Password
                </Box>
                <Box>
                  <TextField
                    size="small"
                    disabled={!format}
                    error={
                      passwords.confirmedPassword.length >= passwords.newPassword.length && !equal
                    }
                    helperText={
                      passwords.confirmedPassword.length >= passwords.newPassword.length && !equal
                        ? 'Passwords must match'
                        : ''
                    }
                    className={classes.textField}
                    autoComplete="off"
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    value={passwords.confirmedPassword}
                    name="confirmPassword"
                    onChange={(e) => onConfirmPasswordChangeHandler(e)}
                    variant="outlined"
                    placeholder="Confirm Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={handleClickShowConfirmPassword}
                            edge="end">
                            {confirmPasswordVisible ? (
                              <Visibility
                                sx={{
                                  width: '21px',
                                  color: '#8493AE'
                                }}
                              />
                            ) : (
                              <VisibilityOff
                                sx={{
                                  width: '21px',
                                  color: '#8493AE'
                                }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    inputProps={{
                      minLength: 8
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: '100%'
              }}>
              <ChangePasswordPopVew
                passwordValidation={lengthValidation && format && equal}
                passwords={passwords}
                dialog
                setSuccessful={setSuccessful}
                setUnsuccessful={setUnsuccessful}
                setPasswordDialogOpen={handleClose}
                user={user}
              />
            </Box>
          </Grid>
        </DialogContent>
      </Dialog>{' '}
    </>
  );
}
