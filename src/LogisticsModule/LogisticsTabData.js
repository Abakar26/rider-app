/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import PickUp from './Pickup';
import { loginPageStyles } from '../LoginScreens/LoginStyles';

const LogisticsTabData = React.forwardRef((props, lastElementRef) => {
  const {
    assignedPractice,
    enroutedPractice,
    apply,
    setApply,
    locationCoordinates,
    dropDownHeight,
    setDropDownHeight
  } = props;
  const classes = loginPageStyles();
  const [assignedPractices, setAssignedPractices] = useState([]);
  const [enRoutedPractices, setEnRoutedPractices] = useState([]);

  /*
  UseEffect for keeping track of assigned practices
  So when ever, practice is enrouted it will update states
  */

  useEffect(() => {
    setAssignedPractices(() => {
      return assignedPractice;
    });
  }, [assignedPractice]);

  /*
  UseEffect for keeping track of Enrouted practices
  So when ever, practice is enrouted it will update states
  */
  useEffect(() => {
    setEnRoutedPractices(() => {
      return enroutedPractice;
    });
  }, [enroutedPractice]);

  return (
    <Box sx={{ mt: '-1px' }}>
      <Box
        sx={{
          bgcolor: '#054E8B',
          display: 'flex',
          padding: '4px 20px'
        }}>
        <Box
          className={classes.heading10}
          sx={{
            color: '#FAFAFA',
            fontWeight: '700',
            fontSize: '15px',
            textAlign: 'end',
            lineHeight: '20px',
            pt: '16px'
          }}>
          Current Pick Up
        </Box>
      </Box>
      <PickUp
        practiceOrdersData={enRoutedPractices}
        locationCoordinates={locationCoordinates}
        currentValue="En-route"
        distance
        dropDownHeight={dropDownHeight}
        setDropDownHeight={setDropDownHeight}
        apply={apply}
        setApply={setApply}
        ref={lastElementRef}
      />
      <Box
        sx={{
          bgcolor: '#EBEFF5',
          display: 'flex',
          padding: '4px 20px'
        }}>
        <Box
          className={classes.heading10}
          sx={{
            color: '#455066',
            fontWeight: '700',
            fontSize: '15px',
            textAlign: 'end',
            lineHeight: '20px',
            pt: '16px'
          }}>
          Next Locations
        </Box>
      </Box>
      <Box
        sx={{
          height: enRoutedPractices.length === 0 ? 'calc(100vh - 292px)' : 'calc(100vh - 380px)',
          overflow: 'auto'
        }}>
        <PickUp
          practiceOrdersData={assignedPractices}
          locationCoordinates={locationCoordinates}
          currentValue="Assigned"
          distance
          apply={apply}
          setApply={setApply}
          dropDownHeight={dropDownHeight}
          setDropDownHeight={setDropDownHeight}
          ref={lastElementRef}
        />
      </Box>
    </Box>
  );
});

export default LogisticsTabData;
