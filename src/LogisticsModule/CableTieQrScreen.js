/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import QrReaders from './QrReaders';
import { loginPageStyles } from '../LoginScreens/LoginStyles';

export function CableTieQrScreen({ setStep }) {
  const classes = loginPageStyles();
  const [scanResult, setScanResult] = useState();

  // This useEffect navigates to next screen when qr code scanned succesfully
  useEffect(() => {
    if (scanResult) {
      setStep((prev) => prev + 1);
    }
  }, [scanResult]);

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
          mt: '8px',
          mb: '11.5px'
        }}>
        Scan Cable Tie Bag QR Code
      </Box>
      <QrReaders setScanResult={setScanResult} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            fontFamily: 'Mulish',
            fontSize: '15px',
            textAlign: 'center',
            maxWidth: '330px',
            width: '100%',
            marginTop: '10px',
            marginBottom: '44px',
            display: 'flex',
            justifyContent: 'center',
            color: '#2A3752',
            lineHeight: '18.83px'
          }}>
          Align the QR code within the highlighted area of the overlay.
        </Box>
      </Box>
    </Box>
  );
}
export default CableTieQrScreen;
