/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Box } from '@material-ui/core';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import './style.css';

function Input(props) {
  const { touched, error, onChange } = props;
  return (
    <Box>
      <PhoneInput
        specialLabel=""
        country="my"
        onlyCountries={['my', 'sg', 'id']}
        countryCodeEditable={false}
        inputStyle={{
          width: '100%',
          height: 'auto',
          borderColor: touched && error && 'red'
        }}
        buttonStyle={{
          backgroundColor: 'transparent'
        }}
        {...props}
        onChange={onChange}
      />
      {touched && error && (
        <p
          style={{ color: 'red' }}
          className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-filled MuiFormHelperText-marginDense">
          {error}
        </p>
      )}
    </Box>
  );
}

const index = (props) => {
  return (
    <Input
      label="Mobile Phone"
      req
      helperText=""
      error
      isSelect={false}
      onChange={props.onChange}
      {...props.input}
      {...props.meta}
      {...props.custom}
    />
  );
};

export default index;
