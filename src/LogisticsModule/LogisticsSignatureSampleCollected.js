/* eslint-disable react/prop-types */
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { loginPageStyles } from '../LoginScreens/LoginStyles';
import { setEnroutedPractices } from '../redux-store/slices/practicesSlice';

export function LogisticsSignatureSampleCollected({ enroutedPractice }) {
  const classes = loginPageStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ordersCollected = useSelector((state) => state.practicesReducer.ordersCollected);
  const collectedTimestamp = useSelector((state) => state.practicesReducer.orderCollectedTime);

  // Handler
  const handleClose = () => {
    if (ordersCollected) {
      /*
      disatch request for setting enroutedPractice to empty list
      if all orders for a practice are collected
      */
      dispatch(setEnroutedPractices([]));
      navigate('/logistics', { replace: true });
    }
  };
  const nextbuttonStyle = {
    fontFamily: 'Mukta',
    backgroundColor: '#FAFAFA',
    textTransform: 'capitalize',
    fontSize: '17px',
    color: '#2A3752',
    fontWeight: '700',
    lineHeight: '22px'
  };
  return (
    <Box
      sx={{
        px: '27.5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        my: 'auto',
        height: '100%'
      }}>
      <CheckCircleIcon sx={{ color: '#54CB83', fontSize: '85px', marginBottom: '22px' }} />
      <Box
        className={classes.heading10}
        sx={{
          marginBottom: '4px',
          fontWeight: '700',
          fontSize: '19px',
          lineHeight: '25px',
          color: '#2A3752'
        }}>
        Samples Collected At {enroutedPractice?.name}
      </Box>
      <Box
        className={classes.heading}
        sx={{
          marginBottom: '32px',
          fontSize: '13px',
          lineHeight: '16px',
          color: '#8493AE'
        }}>
        Your orders have been updated at {collectedTimestamp}
      </Box>
      <Button
        onClick={handleClose}
        className={classes.heading10}
        variant="text"
        sx={{
          border: 1,
          borderColor: '#E5E5E5',
          width: '100%',
          borderRadius: '8px',
          py: '9px',
          ':hover': { bgcolor: '#FAFAFA' }
        }}
        style={nextbuttonStyle}>
        Close
      </Button>
    </Box>
  );
}
export default LogisticsSignatureSampleCollected;
