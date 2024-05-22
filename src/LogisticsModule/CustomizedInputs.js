/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    borderRadius: 4
  },
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  bootstrapInput: {
    borderRadius: '4px',
    position: 'relative',
    border: '0',
    fontSize: '13px',
    color: '#455066',
    lineHeight: '16px',
    textAlign: 'center',
    padding: '0px',

    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: 'Mulish',
    '&:focus': {
      borderRadius: '4px'
    },
    '&:selected': {
      borderRadius: '4px'
    },
    '&:hover': {
      borderRadius: '4px'
    }
  }
});

function CustomizedInputs(props) {
  const { classes, collected, total } = props;

  return (
    <div className={classes.root}>
      <FormControl className={classes.margin}>
        <InputBase
          sx={{ color: '#455066' }}
          id="QTY-[] "
          placeholder={`${collected}/${total}`}
          disabled
          classes={{
            root: classes.bootstrapRoot,
            input: classes.bootstrapInput
          }}
        />
      </FormControl>
    </div>
  );
}

CustomizedInputs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedInputs);
