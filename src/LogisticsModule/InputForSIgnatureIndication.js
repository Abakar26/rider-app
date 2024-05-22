/* eslint-disable react/prop-types */
import { TextField } from '@mui/material';
import React from 'react';
import { loginPageStyles } from '../LoginScreens/LoginStyles';

const ALPHABET_REGEX = /^[a-zA-Z ]*$/;
function CustomizedInputs(props) {
  const { value, setSignatureIndication } = props;
  const classes = loginPageStyles();
  const handleChange = (e) => {
    if (ALPHABET_REGEX.test(e.target.value)) {
      setSignatureIndication(e.target.value);
    }
  };
  return (
    <TextField
      size="small"
      fullWidth
      placeholder="Name"
      className={classes.textField}
      value={value}
      onChange={handleChange}
    />
  );
}

export default CustomizedInputs;
