/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import 'react-datepicker/dist/react-datepicker.css';
import './DateRange.css';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import React from 'react';
import moment from 'moment/moment';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { loginPageStyles } from '../LoginScreens/LoginStyles';

function DateRange(props) {
  const { queryParams, setQueryParams, setState } = props;
  const classes = loginPageStyles();
  const onChange = (dates) => {
    setState(true);
    const [start, end] = dates;
    if (queryParams.startDate !== null) {
      setQueryParams((prev) => {
        return { ...prev, endDate: end, sortByDate: true };
      });
    }
    setQueryParams((prev) => {
      return { ...prev, startDate: start, sortByDate: true };
    });
  };

  function MyContainer({ children }) {
    return (
      <CalendarContainer marginBottom={21}>
        <Box
          sx={{
            fontFamily: 'Mukta',
            fontWeight: '700',
            fontSize: '15px',
            lineHeight: '20px',
            letterSpacing: '0.005em',
            color: '#054E8B',
            marginBottom: '5px'
          }}>
          Date Range
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            verticalAlign: 'middle'
          }}>
          <Box>
            <TextField
              sx={{ maxWidth: '156px' }}
              className={`date-field ${classes.textField}`}
              disabled
              value={moment(queryParams.startDate).format('D MMM, YYYY')}
            />
          </Box>
          <Box
            sx={{
              fontFamily: 'Mulish',
              fontSize: '15px',
              lineHeight: '34px',
              color: '#111111',
              padding: '10px'
            }}>
            -
          </Box>
          <Box>
            <TextField
              sx={{ maxWidth: '156px' }}
              className={`date-field ${classes.textField}`}
              disabled
              value={
                queryParams.endDate
                  ? moment(queryParams.endDate).format('D MMM, YYYY')
                  : 'Select Date'
              }
            />
          </Box>
        </Box>
        <div className="custom-date-picker">{children}</div>
      </CalendarContainer>
    );
  }
  return (
    <DatePicker
      selected={queryParams.startDate}
      onChange={onChange}
      startDate={queryParams.startDate}
      endDate={queryParams.endDate}
      selectsRange
      inline
      calendarContainer={MyContainer}
      sx={{ marginBottom: '21px' }}
      disabledKeyboardNavigation
    />
  );
}

export default DateRange;
