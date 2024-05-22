/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import React from 'react';
import { TextField } from '@mui/material';
import { loginPageStyles } from '../LoginScreens/LoginStyles';

const NUMBER_REGEX = /^(|[1-9]\d*)$/;
function CustomizedInputs(props) {
  const { orders, index, setOrders, value } = props;
  const classes = loginPageStyles();
  const handleChange = (event) => {
    if (NUMBER_REGEX.test(event.target.value)) {
      const updatedOrders = orders.map((element, idx) => {
        return idx === index
          ? {
            ...element,
            samples: event.target.value
          }
          : element;
      });
      setOrders(updatedOrders);
    }
  };
  return (
    <>
      {orders[index].type === 'new_manual_order' ? (
        <TextField
          id="QTY-[] "
          placeholder="[QTY]"
          size="small"
          className={classes.textField}
          sx={{
            pr: '9px',
            '& .MuiOutlinedInput-root': {
              fontSize: '13px',
              lineHeight: '16px'
            }
          }}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <Box
          sx={{
            fontFamily: 'Mulish',
            fontSize: '13px',
            lineHeight: '16px',
            padding: '0px 4px'
          }}>
          {orders[index].samples}
        </Box>
      )}
    </>
  );
}

export default CustomizedInputs;
