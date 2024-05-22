/* eslint-disable no-unused-vars */
import { Box } from '@mui/material';
import React from 'react';
import { Puff } from 'react-loader-spinner';
import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 99999
  },

  loader: {
    width: 'inherit',
    height: 'inherit',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '999'
  }
}));

function Loader() {
  const classes = styles();

  return (
    <Box className={classes.root}>
      <Box className={classes.loader}>
        <Puff color="#054E8B" height={40} width={40} />
      </Box>
    </Box>
  );
}

export default Loader;
