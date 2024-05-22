/* eslint-disable react/prop-types */
import Checkbox from '@mui/material/Checkbox';
import React from 'react';

function CustomizedCheckBox(props) {
  const { setData, setState, data, index, setQueryParams, queryParams } = props;
  const handleChange = (event) => {
    setState(true);
    setData((prevData) => {
      const temp = JSON.parse(JSON.stringify(prevData));
      temp[index] = {
        ...temp[index],
        checked: !temp[index].checked
      };
      return temp;
    });

    if (event.target.checked) {
      setQueryParams((prev) => {
        return {
          ...prev,
          order_type: [...new Set([...queryParams.order_type, event.target.name])]
        };
      });
    } else {
      setQueryParams((prev) => {
        return {
          ...prev,
          order_type: prev.order_type.filter((item) => item !== data.name)
        };
      });
    }
  };

  return (
    <Checkbox
      value={data.value}
      name={data.name}
      className="customized-checkbox"
      sx={{
        color: '#8493AE',
        '&.Mui-checked': {
          color: '#054E8B'
        },
        '&.MuiButtonBase-root': {
          padding: '0px',
          mr: '12px',
          verticalAlign: 'middle'
        }
      }}
      onChange={handleChange}
      checked={data.checked}
    />
  );
}

export default CustomizedCheckBox;
