/* eslint-disable import/no-named-as-default */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import StepperBar from './StepperBar';
import BottomNavigationScreen from './BottomNavigationScreen';
import LogisticsQrCodeScan from './LogisticsQrCodeScan';
import PickupDetailsScreen from './PickupDetailsScreen';
import LogisticsSignature from './LogisticsSignature';
import LogisticsSignatureSampleCollected from './LogisticsSignatureSampleCollected';
import CableTieQrScreen from './CableTieQrScreen';
import useConfirm from '../redux-store/confirmPrompts/useConfirm';
import usePrompt from '../redux-store/confirmPrompts/navigationHooks';

function CollectOrderStepsScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [enroutedPractice] = useSelector((state) => state.practicesReducer.enroutedPractices);
  const user = useSelector((state) => state.userReducer.user);
  const { isConfirmed } = useConfirm();

  const handleClickCancel = async (next) => {
    // eslint-disable-next-line no-return-await
    return await isConfirmed(next);
  };

  // Use Effect For handling authorization
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate('/');
    }
  }, []);

  usePrompt(true, step > 1 && step < 5, handleClickCancel);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          bgcolor: step < 5 && '#FAFAFA',
          gap: '10px'
        }}>
        <Box sx={{ width: '100%', boxShadow: '0px 0px 8px 1px rgb(0 0 0 / 20% )' }}>
          <StepperBar step={step} practiceName={enroutedPractice?.name} />
        </Box>
        <Box sx={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}>
          {step === 1 && (
            <LogisticsQrCodeScan enroutedPractice={enroutedPractice} setStep={setStep} />
          )}
          {step === 2 && (
            <PickupDetailsScreen
              user={user}
              enroutedPractice={enroutedPractice}
              isConfirmed={isConfirmed}
              setStep={setStep}
            />
          )}
          {step === 3 && <CableTieQrScreen setStep={setStep} />}
          {step === 4 && (
            <LogisticsSignature
              user={user}
              enroutedPractice={enroutedPractice}
              isConfirmed={isConfirmed}
              setStep={setStep}
            />
          )}
          {step === 5 && <LogisticsSignatureSampleCollected enroutedPractice={enroutedPractice} />}
        </Box>
        <Box>
          <BottomNavigationScreen />
        </Box>
      </Box>
    </>
  );
}
export default CollectOrderStepsScreen;
