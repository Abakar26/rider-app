/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import * as geolib from 'geolib';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardControlKey as KeyboardControlKeyIcon,
  Call as CallIcon
} from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import WazePopup from '../LoginScreens/WazePopup';
import alertimg from '../Images/alertimg.svg';
import erroralert from '../Images/erroralert.svg';
import wazeimg from '../Images/wazeimg.svg';
import { loginPageStyles } from '../LoginScreens/LoginStyles';
import { SelectStatus } from './SelectStatus';

function PickUpDetail(props) {
  const {
    currentValue,
    practice,
    distance,
    locationCoordinates,
    enableWaze,
    index,
    select,
    style,
    handleButton,
    setDropDownHeight,
    dropDownHeight,
    manualOrders,
    eOrders,
    urgentOrders
  } = props;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const classes = loginPageStyles();
  const buttonStyle = {
    fontFamily: 'Mulish',
    textTransform: 'capitalize',
    color: '#455066',
    fontSize: '13px',
    fontWeight: '400',
    lineHeight: '16px'
  };
  // Navigation function
  const goToNextScreen = () => {
    navigate('/collect_order');
  };
  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.paper',
          width: 1,
          display: 'flex',
          direction: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            width: '100%'
          }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}>
            <Box
              sx={{
                display: 'flex',
                maxWidth:
                  currentValue === 'Assigned' || currentValue === 'En-route' ? '232px' : '194px',
                width: '100%',
                lineHeight: '22px'
              }}>
              <Box
                className={classes.heading10}
                sx={{
                  color: '#000000',
                  fontWeight: '700',
                  fontSize: '17px',
                  width: '100%'
                }}>
                {practice?.name}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '11px'
                }}>
                <Box>
                  <img src={erroralert} alt="" style={{ width: '18px', height: '18px' }} />
                </Box>
                {distance && (
                  <Box
                    className={classes.heading}
                    sx={{
                      color: '#8493AE',
                      fontWeight: '400',
                      fontSize: '13px'
                    }}>
                    {practice?.latitude && practice?.longitude && locationCoordinates
                      ? Number(
                        geolib.convertDistance(
                          geolib.getPreciseDistance(
                            {
                              latitude: parseFloat(practice?.latitude),
                              longitude: parseFloat(practice?.longitude)
                            },
                            {
                              latitude: locationCoordinates?.latitude,
                              longitude: locationCoordinates?.longitude
                            }
                          ),
                          'km'
                        )
                      ).toFixed(2)
                      : 'N/A'}
                  </Box>
                )}
              </Box>
            </Box>
            {enableWaze && (
              <Box onClick={() => setOpen(true)}>
                <Box
                  sx={{
                    display: 'flex',
                    width: '24px',
                    height: '24px',
                    opacity: '1',
                    '&:hover': {
                      opacity: '0.8'
                    }
                  }}>
                  <img src={wazeimg} alt="" />
                </Box>
              </Box>
            )}
            {open && <WazePopup key={index} setOpen={setOpen} data={practice} />}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <CallIcon
                sx={{
                  fontSize: 18,
                  marginRight: '7px',
                  color: '#8493AE'
                }}
              />
              <Box
                className={classes.heading}
                sx={{
                  fontSize: '12px',
                  fontFamily: 'Mulish',
                  fontWeight: '400',
                  lineHeight: '16px',
                  marginTop: '2.5px',
                  color: '#455066'
                }}>
                {practice?.contact_number}
              </Box>
            </Box>
            {select ? (
              <Button variant="text" sx={{ padding: '0px' }}>
                <SelectStatus
                  variant="text"
                  key={index}
                  data={practice}
                  currentValue={currentValue}
                />
              </Button>
            ) : (
              <Button
                variant="text"
                sx={{
                  width: '101px',
                  height: '20px',
                  borderRadius: '20px',
                  border: currentValue === 'Delivered' ? '2px solid #54CB83' : '1px solid #8493AE'
                }}
                style={buttonStyle}>
                {currentValue}
              </Button>
            )}
          </Box>

          <Box
            onClick={() => {
              currentValue === 'En-route' && goToNextScreen();
            }}
            sx={{
              display: style ? 'flex' : 'none',
              flexDirection: 'column',
              gap: '4px'
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row'
              }}>
              <Box
                className={classes.heading10}
                sx={{
                  color: '#455066',
                  fontWeight: '700',
                  fontSize: '15px',
                  lineHeight: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: '19px',
                  width: '100%'
                }}>
                {urgentOrders}
              </Box>

              <Box
                className={classes.heading}
                sx={{
                  color: '#455066',
                  fontWeight: '400',
                  fontSize: '13px',
                  fontFamily: 'Mulish',
                  lineHeight: '16px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                Urgent eOrders
                <img src={alertimg} alt="" />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row'
              }}>
              <Box
                className={classes.heading10}
                sx={{
                  color: '#455066',
                  fontWeight: '700',
                  fontSize: '15px',
                  lineHeight: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: '19px',
                  width: '100%'
                }}>
                {eOrders}{' '}
              </Box>
              <Box
                className={classes.heading}
                sx={{
                  color: '#455066',
                  fontWeight: '400',
                  fontSize: '13px',
                  fontFamily: 'Mulish',
                  lineHeight: '16px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                eOrders
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row'
              }}>
              <Box
                className={classes.heading10}
                sx={{
                  color: '#455066',
                  fontWeight: '700',
                  fontSize: '15px',
                  lineHeight: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: '19px',
                  width: '100%'
                }}>
                {manualOrders}
              </Box>
              <Box
                className={classes.heading}
                sx={{
                  color: '#455066',
                  fontWeight: '400',
                  fontSize: '13px',
                  fontFamily: 'Mulish',
                  lineHeight: '16px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                Non-eOrders
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        onClick={() => {
          handleButton(index);
          setDropDownHeight(!dropDownHeight);
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          cursor: 'pointer',
          bgcolor: '#ffffff'
        }}>
        <Button
          variant="text"
          sx={{
            py: '0px',
            ':hover': {
              bgcolor: '#ffffff',
              color: '#000000'
            }
          }}>
          {style ? (
            <KeyboardControlKeyIcon sx={{ fontsize: '27px', color: '#8493AE' }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ color: '#8493AE', fontSize: '27px' }} />
          )}
        </Button>
      </Box>
    </>
  );
}
export default PickUpDetail;
