/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import 'material-react-toastify/dist/ReactToastify.css';
import Barcode from 'react-barcode';
import ImageUploading from 'react-images-uploading';
import React, { useState, useEffect } from 'react';
import { toast } from 'material-react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CssBaseline, Divider, Grid } from '@mui/material';
// import axios from 'axios';
import BottomNavigationScreen from '../LogisticsModule/BottomNavigationScreen';
import ChangePasswordDialog from './ChangePasswordDialog';
import ChangePasswordSuccessFullDialog from './ChangePasswordSuccessFullDialog';
import ChangePasswordUnsuccessfulDialog from './ChangePasswordUnsuccessfulDialog';
import CustomizedSwitches from '../LogisticsModule/CustomizedSwitches';
import DeliveryOverviewDialog from './DeliveryOverviewDialog';
import LogoutPopUp from './LogoutPopUp';
import forwardBtn from '../Images/forward_btn.svg';
import logoutBtn from '../Images/logout_btn_img.svg';
import profileImg from '../Images/profile_img.svg';
import { loginPageStyles } from './LoginStyles';
import {
  destroyUser,
  fetchRiderDetails,
  setNotificationSubscription,
  updateProfile,
  wazeToggle
} from '../redux-store/slices/userSlice';
import { setCurrentTab } from '../redux-store/slices/tabSlice';
import { subscribeNotification } from '../redux-store/slices/subscriptionSlice';

function ProfileScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const [changePassword, setChangePassword] = useState(false);
  const [deliveryOverview, setDeliveryOverview] = useState(false);
  const [logout, setLogout] = useState(false);
  const deliveryData = useSelector((state) => {
    return state.deliveryDataReducer.data;
  });
  const [successful, setSuccessful] = useState(false);
  const [unSuccessful, setUnsuccessful] = useState(false);
  const image = user?.profile_picture_url ? user?.profile_picture_url : profileImg;
  const isLinkWazeEnabled = user?.enable_waze;

  const isNotificationEnabled = user?.enable_notification ? user?.enable_notification : false;

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate('/');
    }
    dispatch(setCurrentTab('Profile'));
  }, []);

  const toggleLinkWaze = () => {
    const data = {
      userId: user?.id,
      isLinkWazeEnabled
    };
    const promise = dispatch(wazeToggle(data));
    promise.unwrap().catch((err) => {
      if (err?.error === 'You need to sign in or sign up before continuing.') {
        toast.error('Your session has been expired');
        dispatch(destroyUser());
        navigate('/login');
      } else {
        toast.error('Something went wrong.');
      }
    });
  };

  const toggleNotification = () => {
    const data = {
      subscription: { rider_id: user?.id, active: !isNotificationEnabled }
    };
    const promise = dispatch(subscribeNotification(data));
    promise
      .unwrap()
      .then(() => {
        dispatch(setNotificationSubscription(!isNotificationEnabled));
        /*
          As soon as, user got authenticated
          we will, communicate wit our service
          worker to make user as validated, so
          that user can receive push notifications
          */
        navigator.serviceWorker.controller?.postMessage({
          type: 'MESSAGE_IDENTIFIER',
          user
        });
      })
      .catch((err) => {
        if (err?.error === 'You need to sign in or sign up before continuing.') {
          toast.error('Your session has been expired');
          dispatch(destroyUser());
          navigate('/login');
        } else {
          toast.error('Something went wrong.');
        }
      });
  };

  const onProfilePictureChange = (image) => {
    const data = {
      userId: user?.id,
      profileImage: image[0].data_url
    };
    dispatch(updateProfile(data))
      .unwrap()
      .then(() => {
        toast.success('Profile Image updated successfully');
      })
      .catch((err) => {
        if (err?.error === 'You need to sign in or sign up before continuing.') {
          toast.error('Your session has been expired');
          dispatch(destroyUser());
          navigate('/login');
        } else {
          err.errors.map((message) => toast.error(message));
        }
      });
  };

  const getDeliveryOverviewData = () => {
    setDeliveryOverview(true);
  };

  const settings_screen = () => {
    navigate('/settings');
  };
  const handleLogout = () => {
    setLogout(true);
  };
  const help_center_screen = () => {
    navigate('/help_center');
  };
  const changePasswordScreen = () => {
    setChangePassword(true);
  };

  const staffTitle = {
    fontSize: '15px',
    fontWeight: '700',
    lineHeight: '20px',
    color: '#2A3752',
    fontFamily: 'Mukta'
  };
  const staffTitle2 = {
    fontSize: '13px',
    fontWeight: '400',
    lineHeight: '20px',
    color: '#455066',
    fontFamily: 'Mukta'
  };
  const staffName = {
    fontSize: '24px',
    fontWeight: '700',
    lineHeight: '31px',
    color: '#054E8B',
    fontFamily: 'Mukta'
  };
  const myprofileStyle = {
    fontWeight: '700',
    fontSize: '21px',
    lineHeight: '27px',
    color: '#0F2853',
    fontFamily: 'Mukta'
  };
  const staffIdStyle = {
    fontSize: '14px',
    color: '#2A3752',
    lineHeight: '19px',
    fontFamily: 'Mulish'
  };
  const staffNameStyle = {
    fontSize: '13.5px',
    color: '#8493AE',
    lineHeight: '19px',
    fontFamily: 'Mulish'
  };
  const profileTextStyle = {
    backgroundColor: '#054E8B',
    color: '#FAFAFA',
    fontWeight: '700',
    fontSize: '19px',
    lineHeight: '25px'
  };
  const profileStyle = {
    fontWeight: '700',
    fontSize: '15px',
    lineHeight: '20px',
    color: '#455066',
    fontFamily: 'Mukta'
  };

  const profile_information_style = {
    display: 'flex',
    alignItems: 'baseline',
    padding: '0px 4px',
    gap: '8px'
  };

  // this useEffect is for fetching userProfile
  useEffect(() => {
    const promise = dispatch(fetchRiderDetails({ id: user?.id }));
    promise
      .then(() => { })
      .catch((err) => {
        toast.error(err.error);
      });
  }, []);

  const classes = loginPageStyles();

  return (
    <>
      <CssBaseline />
      <Box>
        <Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              my: '4px'
            }}
            style={myprofileStyle}>
            Profile
          </Box>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '8px 20px',
                gap: '20px',
                alignItems: 'center'
              }}>
              <Box>
                <ImageUploading
                  value={image}
                  onChange={onProfilePictureChange}
                  dataURLKey="data_url">
                  {({ onImageUpload }) => (
                    <img
                      src={image}
                      alt="profile_image"
                      onClick={onImageUpload}
                      style={{
                        borderRadius: '100%',
                        width: '96px',
                        height: '96px',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                </ImageUploading>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  width: 'auto'
                }}>
                <Box style={staffName}>{user?.full_name}</Box>
                <Box style={profile_information_style}>
                  <Box style={staffTitle}>Staff ID</Box>
                  <Box style={staffTitle2}>{user?.staff_id}</Box>
                </Box>
                <Box style={profile_information_style}>
                  <Box style={staffTitle}>Role</Box>
                  <Box sx={{ textTransform: 'capitalize' }} style={staffTitle2}>
                    {user?.employment_type?.split('_').join(' ')}
                  </Box>
                </Box>
                <Box style={profile_information_style}>
                  <Box style={staffTitle}>Vehicle</Box>
                  <Box
                    sx={{ textTransform: 'capitalize' }}
                    className={classes.heading}
                    style={staffTitle2}>
                    {user?.vehicle?.vehicle_type ? user?.vehicle?.vehicle_type : 'N/A'}
                  </Box>
                </Box>
                <Box style={profile_information_style}>
                  <Box style={staffTitle}>Vehicle No</Box>
                  <Box className={classes.heading} style={staffTitle2}>
                    {user?.vehicle?.number ? user?.vehicle?.number : 'N/A'}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              padding: '8px 20px'
            }}
            className={classes.heading10}
            style={profileTextStyle}>
            Profile Settings
          </Box>
          <Box
            sx={{
              padding: '4px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Box style={profileStyle}>Link Waze</Box>
            <CustomizedSwitches enabled={isLinkWazeEnabled} toggleSwitch={toggleLinkWaze} />
          </Box>
          <Divider />
          <Box
            sx={{
              padding: '4px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Box style={profileStyle}>Notifications</Box>
            <CustomizedSwitches enabled={isNotificationEnabled} toggleSwitch={toggleNotification} />
          </Box>
          <Divider />
          <Box
            onClick={getDeliveryOverviewData}
            sx={{
              padding: '8px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Box style={profileStyle}>Delivery Overview</Box>
            <Button
              variant="text"
              sx={{
                minWidth: '0px',
                p: '0px',
                ':hover': {
                  bgcolor: '#ffffff',
                  color: '#000000'
                }
              }}>
              <img
                src={forwardBtn}
                alt=""
                style={{
                  width: '26px'
                }}
              />
            </Button>
          </Box>
          <Divider />
          <Box
            onClick={changePasswordScreen}
            sx={{
              padding: '8px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Box style={profileStyle}>Change Password</Box>
            <Button
              variant="text"
              sx={{
                minWidth: '0px',
                p: '0px',
                ':hover': {
                  bgcolor: '#ffffff',
                  color: '#000000'
                }
              }}>
              <img
                src={forwardBtn}
                alt=""
                style={{
                  width: '26px'
                }}
              />
            </Button>
          </Box>
          <Divider />
          <Box
            variant="text"
            onClick={settings_screen}
            sx={{
              padding: '8px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Box style={profileStyle}>Settings </Box>
            <Button
              variant="text"
              sx={{
                minWidth: '0px',
                p: '0px',
                ':hover': {
                  bgcolor: '#ffffff',
                  color: '#000000'
                }
              }}>
              <img
                src={forwardBtn}
                alt=""
                style={{
                  width: '26px'
                }}
              />
            </Button>
          </Box>
          <Divider />
          <Box
            onClick={help_center_screen}
            sx={{
              padding: '8px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Box style={profileStyle}>Help Center</Box>
            <Button
              variant="text"
              sx={{
                minWidth: '0px',
                p: 0,
                ':hover': {
                  bgcolor: '#ffffff',
                  color: '#000000'
                }
              }}>
              <img
                src={forwardBtn}
                alt=""
                style={{
                  width: '26px'
                }}
              />
            </Button>
          </Box>
          <Divider />
          <Box
            onClick={handleLogout}
            sx={{
              padding: '8px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Box style={profileStyle}>Log Out</Box>
            <Button
              variant="text"
              sx={{
                minWidth: '0px',
                p: '0px',
                ':hover': {
                  bgcolor: '#ffffff',
                  color: '#000000'
                }
              }}>
              <img
                src={logoutBtn}
                alt=""
                style={{
                  width: '25px'
                }}
              />
            </Button>
          </Box>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Barcode
              value={user?.staff_id}
              background="#ffffff"
              textPosition="center"
              textAlign="center"
              fontSize={14.5}
              font="Mulish"
              displayValue={false}
            />
            <Box
              sx={{
                display: 'flex',
                flexFlow: 'wrap',
                mt: '-1px'
              }}>
              <Box style={staffIdStyle}>{user?.staff_id}</Box>
              <Box
                sx={{
                  mr: '4px'
                }}
              />
              <Box style={staffNameStyle}>{user?.full_name}</Box>
            </Box>
          </Box>
          <Box
            position="fixed"
            sx={{
              bottom: 0,
              width: '100%'
            }}>
            {changePassword && (
              <ChangePasswordDialog
                user={user?.id}
                setChangePasswordDialog={setChangePassword}
                setSuccessful={setSuccessful}
                setUnsuccessful={setUnsuccessful}
              />
            )}
            {successful && <ChangePasswordSuccessFullDialog dialog />}
            {unSuccessful && (
              <ChangePasswordUnsuccessfulDialog setUnsuccessful={setUnsuccessful} dialog />
            )}
            {deliveryOverview && (
              <DeliveryOverviewDialog
                deliveryData={deliveryData}
                openDialog={deliveryOverview}
                setOpenDialog={setDeliveryOverview}
              />
            )}
            {logout && <LogoutPopUp setLogout={setLogout} />}
            <BottomNavigationScreen />
          </Box>
        </Grid>
      </Box>
    </>
  );
}
export default ProfileScreen;
