/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import React from 'react';

function CustomInputLogisticSignature(props) {
  const { collected, total } = props;
  return (
    <Box
      sx={{
        color: '#455066',
        fontFamily: 'Mulish',
        fontSize: '13px',
        lineHeight: '16px'
      }}>
      {`${collected}/${total}`}
    </Box>
  );
}

export default CustomInputLogisticSignature;
