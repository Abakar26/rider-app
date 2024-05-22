/* eslint-disable react/prop-types */
import Checkbox from '@mui/material/Checkbox';
import React from 'react';

function CheckBoxForHistory(props) {
  const { value } = props;
  return (
    <Checkbox
      disableRipple
      value={value}
      sx={{
        color: '#8493AE',
        '&.Mui-checked': {
          color: '#054E8B'
        },
        '& .MuiSvgIcon-root': { fontSize: '32px' }
      }}
    />
  );
}

export default CheckBoxForHistory;
