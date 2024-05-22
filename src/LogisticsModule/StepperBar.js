/* eslint-disable react/prop-types */
import React from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, Step, StepLabel, Stepper, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { loginPageStyles } from '../LoginScreens/LoginStyles';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 13,
    left: 'calc(-50% + 14px)',
    right: 'calc(50% + 15px)'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: { borderColor: '#054E8B' }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: { borderColor: '#054E8B' }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#1B96D8',
    borderTopWidth: 3,
    borderRadius: 1
  }
}));
const steps = ['Clinic QR', 'Pick Up Details', 'Cable Tie QR', 'Confirmation'];
const titleStyle = {
  fontFamily: 'Mukta',
  fontSize: '19px',
  lineHeight: '25px',
  fontWeight: '700',
  color: '#111111'
};

function StepperBar({ step, practiceName }) {
  const classes = loginPageStyles();
  const navigate = useNavigate();
  const goBackToPrevious = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        bgcolor: '#FFFFFF',
        pb: '6px'
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          position: 'relative',
          my: '7.5px',
          mx: '10px'
        }}>
        <Box
          sx={{
            position: 'absolute',
            left: '0%',
            top: '5%',
            cursor: 'pointer'
          }}>
          <Box onClick={goBackToPrevious}>
            {' '}
            <KeyboardArrowLeftIcon sx={{ color: '#8493AE' }} />
          </Box>
        </Box>
        <Box style={titleStyle}>{practiceName}</Box>
      </Box>
      <Stepper
        activeStep={step - 1}
        alternativeLabel
        className={classes.headings}
        connector={<QontoConnector />}
        sx={{
          '& .MuiStepLabel-root .Mui-completed': {
            color: 'secondary.dark'
          },
          '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
            color: 'grey.500'
          },
          '& .MuiStepLabel-root .Mui-active': { color: 'secondary.main' },
          '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
            color: '#2A3752'
          },
          '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
            fill: 'white'
          },
          '& .MuiStepIcon-text-root  ': {
            fill: '#111111'
          },
          '& .MuiStepIcon-text.Mui-active  ': {
            fill: '#ffffff'
          },
          '& .MuiStepIcon-text ': {
            top: '3px',
            fill: '#8493AE',
            fontFamily: 'Mukta',
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: '25px'
          },
          '.MuiSvgIcon-root': {
            borderRadius: '50%',
            border: '2px solid #1B96D8',
            fill: '#ffffff',
            fontSize: '50px'
          },
          '& .MuiStepLabel-label.Mui-active ,': {
            fontSize: '13px',
            lineHeight: '16px',
            color: '#111111',
            width: '100%',
            fontFamily: ['Mulish'].join(',')
          },
          '& .MuiStepLabel-label ,': {
            fontSize: '12px',
            lineHeight: '15px',
            color: '#8493AE',
            width: '100%',
            fontFamily: ['Mulish'].join(',')
          },
          '& .MuiStepLabel-label.Mui-completed ,': {
            fontSize: '12px',
            lineHeight: '15px',
            color: '#8493AE',
            width: '100%',
            fontFamily: ['Mulish'].join(',')
          },
          '& .MuiStep-root ,': {
            paddingLeft: '0px',
            paddingRight: '0px'
          },
          '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel ': {
            marginTop: '2px',
            left: 'calc(-50 % + 15px)',
            right: 'calc(50 % + 16px)',
            paddingLeft: '-0px',
            paddingRight: '-10px'
          },
          '& .MuiStepIcon-root.Mui-completed ': {
            color: '#054E8B',
            fill: '#11111'
          },
          '& .MuiStepIcon-root.Mui-active ': {
            color: '#2A3752',
            fontSize: '19px',
            fontWeight: '700',
            lineHeight: '25px',
            fontFamily: ['Mukta'].join(','),
            width: '30px',
            height: '30px'
          },
          '& .MuiStepIcon-root ': {
            fontSize: '19px',
            fontWeight: '700',
            lineHeight: '25px',
            fontFamily: ['Mukta'].join(','),
            color: '#8493AE',
            width: '30px',
            height: '30px'
          },
          '& .MuiSvgIcon-root.Mui-active  ': {
            color: '#ffffff',
            fill: '#054E8B',
            width: '70px',
            border: 'none',
            fontSize: '20px'
          },
          '& .MuiSvgIcon-root.Mui-completed  ': {
            color: '#054E8B',
            fill: '#054E8B',
            width: '70px',
            border: 'none',
            fontSize: '20px'
          },
          '& .MuiStepper-root .MuiStepIcon-text ': { color: '#ffffff' },
          '& .MuiSvgIcon-root  ': { color: '#CCF1FF' },
          '& .MuiStepConnector-root.MuiStepConnector-alternativeLabel  ': {
            left: 'calc(-50 % + 15px)',
            right: 'calc(50 % + 16px)'
          },
          '& .MuiStepConnector-root': {
            color: '#CCF1FF',
            left: 'calc(-50%+15px)',
            right: 'calc(50 % + 15px)',
            paddingLeft: '-10px',
            paddingRight: '-10px',
            top: '12px',
            position: 'absolute'
          },
          '& .MuiStepConnector-line  ': {
            color: '#CCF1FF',
            borderTopWidth: '3px',
            borderTopStyle: 'solid',
            display: 'block',
            borderColor: '#1B96D8',
            left: 'calc(-50 % + 15px)',
            right: 'calc(50 % + 16px)',
            paddingLeft: '-10px',
            paddingRight: '-10px'
          }
        }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
export default StepperBar;
