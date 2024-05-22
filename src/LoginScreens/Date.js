/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './styles.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';

const borderButton = {
  border: 1.5,
  color: '#CAD3E5'
};
const buttonStyle4 = {
  textTransform: 'capitalize',
  fontSize: '14px',
  color: '#ffffff',
  fontWeight: '700',
  lineHeight: '20px'
};
const buttonStyle5 = {
  textTransform: 'capitalize',
  fontSize: '14px',
  color: '#EA4C59',
  fontWeight: '700',
  lineHeight: '20px'
};
function Date(props) {
  const { setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ]);

  const [initialRangeColor, seInitialRangeColor] = useState(true);

  return (
    <>
      <DateRange
        editableDateInputs
        onChange={(item) => {
          seInitialRangeColor(false);
          setState([item.selection]);
        }}
        moveRangeOnFirstSelection={false}
        ranges={state}
        className={initialRangeColor}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          mt: '6px',
          maxWidth: '330px'
        }}>
        <Button
          onClick={handleClose}
          variant="text"
          sx={{
            width: '100%',
            maxWidth: '84px',
            borderRadius: '8px',
            py: '7.5px',
            backgroundColor: '#E5E5E5',
            ...borderButton,
            bgcolor: '#FAFAFA',
            ':hover': { bgcolor: '#FAFAFA' }
          }}>
          <Box style={buttonStyle5} fontFamily="SF Pro Display" onClose={handleClose}>
            Cancel
          </Box>
        </Button>
        <Button
          onClick={handleClose}
          variant="text"
          sx={{
            width: '100%',
            maxWidth: '120px',
            borderRadius: '8px',
            bgcolor: '#054E8B',
            ':hover': { bgcolor: '#054E8B' }
          }}>
          <Box style={buttonStyle4} fontFamily="SF Pro Display" onClose={handleClose}>
            Apply Range
          </Box>
        </Button>
      </Box>
    </>
  );
}

export default Date;
