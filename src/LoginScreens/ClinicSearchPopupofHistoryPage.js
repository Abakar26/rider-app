/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import CustomizedCheckBox2 from '../LogisticsModule/CustomizedCheckBox2';
import searchIcon from '../Images/search_icon.svg';

const data = [
  { id: 1, name: 'West' },
  { id: 2, name: 'East' },
  { id: 3, name: 'North' },
  { id: 4, name: 'South' }
];
const titleStyle4 = {
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '700',
  color: '#054E8B'
};
const borderButton = {
  border: 1.5,
  color: '#CAD3E5'
};
const buttonStyle4 = {
  textTransform: 'capitalize',
  fontSize: '14px',
  color: '#ffffff',
  fontWeight: '700',
  lineHeight: '20px'
};
const buttonStyle5 = {
  textTransform: 'capitalize',
  fontSize: '14px',
  color: '#EA4C59',
  fontWeight: '700',
  lineHeight: '20px'
};

export default function ClinicSearchPopupofHistoryPage(props) {
  const { setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Box
        sx={{
          boxShadow: '3',
          paddingTop: '11px',
          px: '11px',
          pb: '11px',
          backgroundColor: '#FFFFFF',
          maxWidth: '375px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '14px',
            marginRight: '14px',
            width: '100%',
            maxWidth: '350px '
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: 1,
              py: '3px',
              borderRadius: '4px',
              borderColor: '#DAE0EB',
              width: '100%',
              maxWidth: '350px '
            }}>
            <img
              src={searchIcon}
              alt=""
              style={{
                width: '23px',
                paddingBottom: '1px',
                paddingTop: '1px',
                paddingLeft: '5px',
                paddingRight: '11px'
              }}
            />
            <TextField
              variant="standard"
              placeholder="Search Clinic"
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& .MuiInput-input': {
                  fontSize: '17px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  fontFamily: 'SF Pro Display'
                }
              }}
              InputProps={{
                disableUnderline: true
              }}
            />
          </Box>
        </Box>
        <Divider
          sx={{
            border: 1,
            borderColor: '#CAD3E5'
          }}
        />
        <Box
          sx={{
            mb: '1px',
            mt: '10px'
          }}>
          <Box style={titleStyle4} fontFamily="SF Pro Display">
            Sort by Location
          </Box>
          <Box
            sx={{
              ml: '-10px',
              mt: '-2px',
              display: 'flex',
              flexDirection: 'row'
            }}>
            {data.map((user) => (
              <Box key={user.id}>
                <Box
                  sx={{
                    mr: '5px',
                    display: 'flex',
                    flexDirection: 'row'
                  }}>
                  <CustomizedCheckBox2 />
                  <Box
                    sx={{
                      mt: '12.5px',
                      ml: '0px'
                    }}>
                    <Box
                      sx={{
                        fontFamily: 'Sans',
                        fontWeight: '400',
                        fontSize: '14.5px',
                        lineHeight: '19px',
                        color: '#111111'
                      }}>
                      {user.name}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            mt: '6px'
          }}>
          <Button
            onClick={handleClose}
            variant="text"
            sx={{
              width: '100%',
              maxWidth: '84px',
              borderRadius: '8px',
              py: '7.5px',
              backgroundColor: '#E5E5E5',
              ...borderButton,
              bgcolor: '#FAFAFA',
              ':hover': { bgcolor: '#FAFAFA' }
            }}>
            <Box style={buttonStyle5} fontFamily="SF Pro Display" onClose={handleClose}>
              Cancel
            </Box>
          </Button>
          <Button
            onClick={handleClose}
            variant="text"
            sx={{
              width: '100%',
              maxWidth: '79px',
              borderRadius: '8px',
              bgcolor: '#054E8B',
              ':hover': { bgcolor: '#054E8B' }
            }}>
            <Box style={buttonStyle4} fontFamily="SF Pro Display" onClose={handleClose}>
              Apply
            </Box>
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
