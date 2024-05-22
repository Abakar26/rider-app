/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'material-react-toastify';
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  CssBaseline
} from '@mui/material';
import MaxAttemptPopupForLogin from './MaxAttemptPopupForLogin';
import PopupForBlockedAccount from './PopupForBlockedAccount';
import InActiveAccountPopup from './InActiveAccountPopup';
import biomarkLogo from '../Images/biomark_logo.svg';
import biomarkText from '../Images/biomark_text.svg';
import { loginPageStyles } from './LoginStyles';
import { authenticateUser, setError, unlockAccount } from '../redux-store/slices/userSlice';
import Loader from '../Reusable/Loader';
import { subscribeNotification } from '../redux-store/slices/subscriptionSlice';

function LoginScreen() {
  const { search } = useLocation();
  const unlockToken = new URLSearchParams(search).get('unlock_token');

  const classes = loginPageStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [invalidCreds, setInvalidCreds] = React.useState(false);
  const [maxLimitReached, setMaxLimitReached] = React.useState(false);
  const [isActive, setIsActive] = React.useState(true);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const loading = useSelector((state) => state.userReducer.loading);
  const [loginInfo, setLoginInfo] = useState({
    userName: null,
    password: null
  });

  // Styles Definition Here
  const titleStyle = {
    fontFamily: 'Mukta',
    fontSize: '21px',
    lineHeight: '27px',
    fontWeight: '700',
    color: '#2A3752'
  };
  const textStyle = {
    fontFamily: 'Mulish',
    fontSize: '13px',
    lineHeight: '16px',
    textTransform: 'none'
  };

  // useEffects Here
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/logistics');
    }
  });

  useEffect(() => {
    if (unlockToken) {
      dispatch(unlockAccount({ unlockToken }))
        .unwrap()
        .then(() => { })
        .catch(() => {
          toast.error('Sorry, this link is no longer valid');
        });
    }
  }, []);

  // Handlers Here
  const loginHandler = async () => {
    if (
      (loginInfo.userName == null && loginInfo.password == null) ||
      (loginInfo.userName === '' && loginInfo.password === '')
    ) {
      setLoginInfo({ userName: '', password: '' });
      dispatch(setError('Please Enter Email Address and Password.'));
    } else if (loginInfo.password === '' || loginInfo.password == null) {
      setLoginInfo({ userName: loginInfo.userName, password: '' });
    } else if (loginInfo.userName === '' || loginInfo.userName == null) {
      setLoginInfo({ userName: '', password: loginInfo.password });
      dispatch(setError('Please Enter Email Address.'));
    }
    if (!!loginInfo.userName && !!loginInfo.password) {
      const data = JSON.stringify({
        rider: { staff_id: loginInfo.userName, password: loginInfo.password }
      });
      const subscription = JSON.parse(localStorage.getItem('subscription'));
      let notificationData;
      if (subscription) {
        notificationData = {
          subscription: {
            endpoint: subscription.endpoint,
            auth: subscription.keys.auth,
            p256dh: subscription.keys.p256dh
          }
        };
      }
      dispatch(authenticateUser(data))
        .unwrap()
        .then((res) => {
          if (notificationData) {
            dispatch(
              subscribeNotification({
                ...notificationData,
                subscription: {
                  ...notificationData.subscription,
                  rider_id: res.data.id
                }
              })
            )
              .unwrap()
              .then(() => {
                /*
                As soon as, user got authenticated
                we will, communicate wit our service
                worker to make user as validated, so
                that user can receive push notifications
              */
                navigator.serviceWorker.controller?.postMessage({
                  type: 'MESSAGE_IDENTIFIER',
                  user: res.data
                });

                /*
                 * Now we will send another message for
                 * checking pending notifications
                 */
                navigator.serviceWorker.controller?.postMessage({
                  type: 'PENDING_NOTIFICATIONS'
                });

                navigate('/logistics');
              });
          } else {
            navigator.serviceWorker.controller?.postMessage({
              type: 'MESSAGE_IDENTIFIER',
              user: res.data
            });

            /*
             * Now we will send another message for
             * checking pending notifications
             */
            navigator.serviceWorker.controller?.postMessage({
              type: 'PENDING_NOTIFICATIONS'
            });

            navigate('/logistics');
          }
        })
        .catch((err) => {
          if (err === 'Invalid Staff or password.') {
            setInvalidCreds(true);
          } else if (err === 'Your account is not activated yet.') {
            setIsActive(false);
          } else if (err === 'Your account is locked.') {
            setMaxLimitReached(true);
          }
        });
    }
  };
  const onChangeHandler = (e) => {
    setLoginInfo({ ...loginInfo, userName: e.target.value });
  };

  const onPasswordChangeHandler = (e) => {
    setLoginInfo({ ...loginInfo, password: e.target.value });
  };
  const handleClickShowNewPassword = () => {
    setNewPasswordVisible((previousValue) => !previousValue);
  };
  const forgotPassword = () => {
    navigate('/forgot_password');
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          m: 'auto 27.5px'
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '320px',
            m: 'auto'
          }}>
          <Box sx={{ mb: '1rem' }}>
            <img src={biomarkLogo} alt="" />{' '}
          </Box>
          <Box sx={{ mb: '10px' }}>
            <img src={biomarkText} alt="" />{' '}
          </Box>
          <Box sx={{ height: '39px', mb: '10px', textAlign: 'center' }} style={titleStyle}>
            Lab Dispatch App
          </Box>
          <Box sx={{ width: 'inherit' }}>
            <Box style={textStyle} sx={{ color: '#455066', mb: '4px' }}>
              Staff ID
              <Typography variant="span" sx={{ ml: '2px', color: '#EA4C59' }}>
                <strong>*</strong>
              </Typography>
            </Box>
            <TextField
              fullWidth
              error={loginInfo?.userName === ''}
              autoComplete="off"
              helperText={
                loginInfo?.userName != null && loginInfo?.userName === ''
                  ? 'Staff ID Required'
                  : ' '
              }
              type="text"
              placeholder="Staff ID"
              value={loginInfo.userName ?? ''}
              className={classes.textField}
              name="username"
              onChange={(e) => onChangeHandler(e)}
              sx={{
                '& .MuiInputBase-input': {
                  py: '11.5px',
                  height: 'auto'
                }
              }}
            />
            <Box style={textStyle} sx={{ color: '#455066', mb: '4px' }}>
              Password
              <Typography variant="span" sx={{ ml: '2px', color: '#EA4C59' }}>
                <strong>*</strong>
              </Typography>
            </Box>
            <TextField
              fullWidth
              error={loginInfo?.password === ''}
              type={newPasswordVisible ? 'text' : 'password'}
              autoComplete="off"
              helperText={
                loginInfo?.password != null && loginInfo?.password === ''
                  ? 'Password Required'
                  : ' '
              }
              placeholder="Password"
              value={loginInfo.password ?? ''}
              className={classes.textField}
              name="password"
              onChange={(e) => onPasswordChangeHandler(e)}
              sx={{
                '& .MuiInputBase-input': {
                  py: '11.5px',
                  height: 'auto'
                }
              }}
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
            />
          </Box>
          <Box sx={{ mb: '14px', textAlign: 'center' }}>
            <Button
              onClick={forgotPassword}
              variant="text"
              sx={{
                textAlign: 'center',
                color: '#054E8B',
                backgroundColor: '054E8B',
                ':hover': {
                  bgcolor: '#ffffff'
                }
              }}>
              <Box style={textStyle}>Forgot password?</Box>
            </Button>
          </Box>
          <Button
            onClick={() => loginHandler()}
            variant="text"
            sx={{
              py: '9px',
              fontFamily: 'Mukta',
              width: '100%',
              borderRadius: '8px',
              bgcolor: '#054E8B',
              color: '#ffffff',
              textTransform: 'capitalize',
              fontSize: '17px',
              fontWeight: '700',
              lineHeight: '22px',
              ':hover': { bgcolor: '#054E8B', color: '#ffffff' },
              height: '40px'
            }}>
            {' '}
            Login
          </Button>
          {loading && <Loader />}
          {invalidCreds && <MaxAttemptPopupForLogin setOpen={setInvalidCreds} />}
          {maxLimitReached && <PopupForBlockedAccount setOpens={setMaxLimitReached} />}
          {!isActive && <InActiveAccountPopup setOpens={setIsActive} />}
        </Box>
        <Box style={textStyle} sx={{ color: '#8493AE', mb: '20%' }}>
          Version X.X
        </Box>
      </Box>
    </>
  );
}

export default LoginScreen;
