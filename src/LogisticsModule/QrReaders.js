/* eslint-disable react/prop-types */
import './styles.css';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import QrReader from 'react-web-qr-reader';
import React, { useState } from 'react';
import { toast } from 'material-react-toastify';
import { Box } from '@material-ui/core';

const FACING_MODE_USER = 'user';
const FACING_MODE_ENVIRONMENT = 'environment';

function QrReaders(props) {
  const { setScanResult } = props;
  const [facingMode, setFacingMode] = useState(FACING_MODE_ENVIRONMENT);
  const handleScan = (result) => {
    if (result) {
      setScanResult(result);
    }
  };
  const handleClick = () => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER ? FACING_MODE_ENVIRONMENT : FACING_MODE_USER
    );
  };

  const handleError = (error) => {
    toast.error(error);
  };
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <FlipCameraIosIcon
          variant="text"
          fontSize="large"
          onClick={handleClick}
          sx={{ color: 'white', background: 'transparent' }}
          className="camera-position"
        />
      </Box>
      <div>
        <QrReader
          className="qr-image-wrapper"
          onScan={handleScan}
          onError={handleError}
          delay={300}
          facingMode={facingMode}
        />
      </div>
    </>
  );
}

export default QrReaders;
