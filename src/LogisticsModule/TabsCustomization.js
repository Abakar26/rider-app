/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, Box, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import PickUp from './Pickup';
import LogisticsTabData from './LogisticsTabData';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const TabsCustomization = React.forwardRef((props, lastElementRef) => {
  const { value, setValue } = props;

  // Subscribing To Store for assigned and Enrouted Practices
  const assignedPractices = useSelector((state) => state.practicesReducer.practices);
  const enroutedPractices = useSelector((state) => state.practicesReducer.enroutedPractices);

  // Event Handler for tab switch
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const StyledTabs = styled((props) => <Tabs {...props} />)({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor: 'transparent'
    },
    '& .MuiTab-root.Mui-selected': {
      backgroundColor: '#054E8B',
      color: '#ffffff',
      fontWeight: '700',
      lineHeight: '20px',
      fontFamily: 'Mukta'
    },
    '& .MuiTab-root': {
      margin: '0px',
      fontSize: '15px',
      lineHeight: '19px',
      minHeight: '40px',
      fontWeight: '400',
      fontFamily: 'Mulish'
    },
    '& .MuiButtonBase-root-MuiTab-root': {
      color: '#054E8B'
    },
    '&.MuiTabs-root': {
      minHeight: '40px'
    }
  });

  const StyledTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    '&.MuiButtonBase-root-MuiTab-root': {
      padding: '16px 25px'
    },

    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)'
    }
  }));
  return (
    <Box sx={{ width: '100%' }}>
      <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
        <StyledTab
          label="Pick Ups "
          {...a11yProps(0)}
          sx={{ '& .MuiTab-root.Mui-selected': { color: '#112233' } }}
          style={{ minWidth: '33.3%', padding: '4px 12px' }}
        />
        <StyledTab
          label="Collected"
          {...a11yProps(1)}
          style={{ minWidth: '33.3%', padding: '4px 12px' }}
        />
        <StyledTab
          label="Delivered"
          {...a11yProps(2)}
          style={{ minWidth: '33.3%', padding: '4px 12px' }}
        />
      </StyledTabs>

      <TabPanel value={value} index={0}>
        <Box sx={{ height: 'calc(100vh - 204px)', overflow: 'auto', mt: '-1px' }}>
          <LogisticsTabData
            assignedPractice={assignedPractices}
            enroutedPractice={enroutedPractices}
            locationCoordinates={props.locationCoordinates}
            dropDownHeight={props?.dropDownHeight}
            setDropDownHeight={props?.setDropDownHeight}
            apply={props.apply}
            setApply={props.setApply}
            ref={lastElementRef}
          />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{ height: 'calc(100vh - 210px)', overflow: 'auto', mt: '-1px' }}>
          <PickUp
            practiceOrdersData={assignedPractices}
            locationCoordinates={props.locationCoordinates}
            currentValue="Collected"
            apply={props.apply}
            setApply={props.setApply}
            dropDownHeight={props.dropDownHeight}
            setDropDownHeight={props.setDropDownHeight}
            ref={lastElementRef}
          />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box sx={{ height: 'calc(100vh - 205px)', overflow: 'auto', mt: '-1px' }}>
          <PickUp
            practiceOrdersData={assignedPractices}
            locationCoordinates={props.locationCoordinates}
            currentValue="Delivered"
            apply={props.apply}
            setApply={props.setApply}
            dropDownHeight={props.dropDownHeight}
            setDropDownHeight={props.setDropDownHeight}
            ref={lastElementRef}
          />
        </Box>
      </TabPanel>
    </Box>
  );
});

export default TabsCustomization;
