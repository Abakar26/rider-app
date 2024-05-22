/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import Checkbox from '@mui/material/Checkbox';
import React from 'react';

function CustomizedCheckBox2(props) {
  const { setConfirmation, orders, index, setOrders, value } = props;
  const handleChange = (event, isChecked) => {
    if (setConfirmation) {
      setConfirmation(isChecked);
    } else {
      const updatedOrders = orders.map((element, idx) => {
        return idx === index
          ? {
            ...element,
            checked: isChecked
          }
          : element;
      });
      setOrders(updatedOrders);
    }
  };

  return (
    <Checkbox
      value={value}
      className="customized-checkbox"
      sx={{
        color: '#8493AE',
        '&.Mui-checked': {
          color: '#054E8B'
        },
        '&.MuiButtonBase-root': {
          padding: '0px',
          verticalAlign: 'middle'
        }
      }}
      onChange={handleChange}
    />
  );
}

export default CustomizedCheckBox2;
