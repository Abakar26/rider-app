/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@material-ui/core';

export const loginPageStyles = makeStyles(() => ({
  heading10: {
    fontFamily: ['Mukta'].join(',')
  },
  headings: {
    fontFamily: ['Mulish'].join(','),
    left: 'calc(-50 % + 15px)',
    right: 'calc(50 % + 15px)'
  },
  heading: {
    fontFamily: ['Mulish'].join(',')
  },
  headfamily: {
    fontFamily: ['Over the Rainbow'].join(',')
  },
  boxShadowSet: {
    boxshadow: '0px 0px 8px 1px rgba(0, 0, 0, 0.2)'
  },
  stepper_check: {
    width: '70%',
    height: '55px',
    fontSize: '20px !important',
    '&.css-qivjh0-MuiStepLabel-label': {}
  },
  textFiled: {
    minWidth: '320px !important',
    maxWidth: '320px !important',
    width: '320px !important',
    '& .MuiFormHelperText-root ': {
      marginLeft: '4 !important',
      fontFamily: 'mulish',
      fontWeight: 400,
      fontSize: 13,
      lineHeight: 16
    }
  },
  notFoundSubHeading: {
    '&.MuiStepLabel-label-root': {
      fontSize: '30px !important',
      fontWeight: '700 !important'
    },
    boxDisplayNone: {
      display: 'none'
    }
  },
  textField: {
    '& .MuiInputBase-input': {
      padding: '8px'
    },

    '& .MuiOutlinedInput-root': {
      fontFamily: 'Mulish',
      fontWeight: '400',
      fontSize: '17px',
      lineHeight: '21px',
      '&.Mui-focused fieldset': {
        border: '2px solid#1976d2 !important'
      }
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#DAE0EB !important'
    }
  }
}));
