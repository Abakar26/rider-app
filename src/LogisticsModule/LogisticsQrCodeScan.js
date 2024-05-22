/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { toast } from 'material-react-toastify';
import { loginPageStyles } from '../LoginScreens/LoginStyles';
import QrReaders from './QrReaders';
// Imports

export function LogisticsQrCodeScan({ enroutedPractice, setStep }) {
  const classes = loginPageStyles();
  const [scanResult, setScanResult] = useState();

  // This useEffect will navigate to next screen, if qr is scanned
  useEffect(() => {
    if (scanResult) {
      try {
        if (scanResult.data && JSON.parse(scanResult.data) === enroutedPractice.clinic_code) {
          setStep((prev) => prev + 1);
        } else {
          throw Error();
        }
      } catch (error) {
        toast.error('QRCode is not correct');
      }
    }
  }, [scanResult?.data]);
  return (
    <Box>
      <Box
        className={classes.heading10}
        sx={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: '21px',
          lineHeight: '27px',
          color: '#054E8B',
          fontFamily: 'Mukta',
          my: '10px'
        }}>
        Scan Clinic QR Code
      </Box>
      <QrReaders setScanResult={setScanResult} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          className={classes.heading}
          sx={{
            fontSize: '15px',
            textAlign: 'center',
            mx: 'auto',
            width: '100%',
            marginTop: '10px',
            color: '#2A3752',
            lineHeight: '19px'
          }}>
          Scan the Clinic QR Code to check into the clinic
        </Box>
      </Box>
    </Box>
  );
}
export default LogisticsQrCodeScan;
