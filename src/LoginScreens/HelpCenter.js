/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Divider,
  Link,
  TextField,
  Box,
  Button,
  Grid,
  CssBaseline,
  InputAdornment,
  Tooltip
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { Call as CallIcon, KeyboardArrowRight } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import ProfileHeader from './ProfileHeader';
import BottomNavigationScreen from '../LogisticsModule/BottomNavigationScreen';
import { loginPageStyles } from './LoginStyles';

const questions = [
  { id: 1, description: 'How to reschedule pick ups ' },
  { id: 2, description: 'How to cancel pick ups' },
  { id: 3, description: 'What to do when driving' },
  { id: 4, description: 'How to use the app' }
];
function HelpCenter() {
  const [description, setDescription] = useState('');

  const [foundQuestions, setFoundQuestions] = useState(questions);

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const results = questions.filter((q) => {
        return q.description.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundQuestions(results);
    } else {
      setFoundQuestions(questions);
    }
    setDescription(keyword);
  };
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate('/');
    }
  }, []);
  const backToMain = () => {
    navigate('/profile');
  };

  const classes = loginPageStyles();
  const CallButtonStyle = {
    fontFamily: 'Mulish',
    display: 'flex',
    backgroundColor: '#FAFAFA',
    textTransform: 'none',
    fontSize: '13px',
    color: '#1B96D8',
    lineHeight: '16px'
  };
  const TopicsStyle = {
    fontFamily: 'Mukta',
    paddingTop: '8px',
    paddingBottom: '3px',
    paddingLeft: '16px',
    backgroundColor: '#054E8B',
    color: '#FAFAFA',
    fontWeight: '700',
    fontSize: '19px',
    lineHeight: '25px'
  };
  const TextStyle = {
    fontFamily: 'Mulish',
    fontSize: '15px',
    lineHeight: '18.83px',
    color: '#2A3752'
  };
  const DescripStyle = {
    fontFamily: 'Mukta',
    fontWeight: '700',
    fontSize: '15px',
    lineHeight: '20px',
    color: '#2A3752',
    letterSpacing: '0.005em'
  };

  return (
    <>
      <CssBaseline />
      <Box>
        <Grid>
          <ProfileHeader name="Help Center" onClick={backToMain} />
          <Box sx={{ m: '0px 26px 7px' }}>
            <Tooltip
              followCursor
              title="Search for your Question"
              sx={{
                backgroundColor: 'transparent'
              }}>
              <TextField
                fullWidth
                placeholder="Search for your Question"
                className={classes.textField}
                value={description}
                sx={{
                  '& .MuiInputBase-input': {
                    textOverflow: 'ellipsis'
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#8493AE' }} />
                    </InputAdornment>
                  ),
                  disableunderline: 'true'
                }}
                onChange={filter}
              />
            </Tooltip>
          </Box>
          <Box style={TopicsStyle}>Topics</Box>
          {foundQuestions && foundQuestions.length > 0
            ? foundQuestions.map((q) => (
              <Box key={q.id}>
                <Box
                  sx={{
                    py: '8.5px',
                    pl: '19px',
                    pr: '0px',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    style={TextStyle}>
                    {q.description}
                  </Box>
                  <Button
                    variant="text"
                    sx={{
                      py: '0px',
                      ':hover': {
                        bgcolor: '#ffffff',
                        color: '#000000'
                      }
                    }}>
                    <KeyboardArrowRight sx={{ color: '#8493AE' }} />
                  </Button>
                </Box>
                <Divider />
              </Box>
            ))
            : ''}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              mt: '40px',
              py: '9px'
            }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
              style={DescripStyle}>
              If you are still unsure contact your fleet manager
            </Box>
            <Button
              sx={{
                border: '1px solid #CAD3E5',
                textAlign: 'center',
                mt: '8px',
                mb: '16px',
                padding: '5px 10px',
                gap: '4px',
                borderRadius: '12px',
                ':hover': {
                  bgcolor: '#ffffff',
                  color: '#000000'
                }
              }}
              style={CallButtonStyle}>
              <CallIcon
                sx={{
                  fontSize: 15,
                  color: '#8493AE',
                  mr: '6px'
                }}
              />
              <Link
                style={{
                  color: '#1B96D8'
                }}
                href="#">
                <Box
                  sx={{
                    fontSize: '13px',
                    fontFamily: 'Mulish',
                    lineHeight: '16px'
                  }}>
                  Call Fleet Manager
                </Box>
              </Link>
            </Button>
          </Box>
          <Box
            position="fixed"
            sx={{
              bottom: 0,
              width: '100%'
            }}>
            <BottomNavigationScreen />
          </Box>
        </Grid>
      </Box>
    </>
  );
}
export default HelpCenter;
