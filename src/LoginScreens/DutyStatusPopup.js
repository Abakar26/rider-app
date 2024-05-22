/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import crossBtn from '../Images/crossbtn.svg';
import CustomizedCheckBox2 from '../LogisticsModule/CustomizedCheckBox';

const data = [
  { id: 1, name: 'Routine' },
  { id: 2, name: 'Urgent' }
];
const titleStyle4 = {
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '700',
  color: '#054E8B'
};
const buttonStyle5 = {
  textTransform: 'capitalize',
  fontSize: '14px',
  color: '#ffffff',
  fontWeight: '700',
  lineHeight: '20px'
};
export default function DutyStatusPopup(props) {
  const { setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Box
        sx={{
          boxShadow: '3',
          paddingLeft: '20px',
          paddingBottom: '20px',
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          maxWidth: '375px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            pt: '3px',
            pr: '3px'
          }}>
          <img src={crossBtn} alt="" />
        </Box>
        <Box
          sx={{
            mt: '-10px',
            display: 'flex',
            flexDirection: 'column',
            paddingRight: '20px'
          }}>
          <Box
            sx={{
              marginBottom: '2px'
            }}>
            <Box style={titleStyle4} fontFamily="SF Pro Display">
              Duty Status
            </Box>
          </Box>
          <Box
            sx={{
              marginBottom: '3px',
              mt: '0px'
            }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              {data.map((user) => (
                <Box key={user.id}>
                  <Box
                    sx={{
                      mb: '17px',
                      ml: '-10px',
                      mt: '-4px',
                      display: 'flex',
                      flexDirection: 'row'
                    }}>
                    <Box
                      sx={{
                        mr: '16px',
                        display: 'flex',
                        flexDirection: 'row'
                      }}>
                      <CustomizedCheckBox2 />
                      <Box
                        sx={{
                          mt: '8.5px',
                          ml: '1.5px'
                        }}>
                        <Box
                          sx={{
                            fontFamily: 'Sans',
                            fontWeight: '400',
                            fontSize: '14px',
                            lineHeight: '28px'
                          }}>
                          {user.name}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box style={titleStyle4} mb={0.5} fontFamily="SF Pro Display">
              Sort by
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              mb: '22px'
            }}>
            <Button
              onClick={handleClose}
              variant="text"
              sx={{
                width: '100%',
                maxWidth: '72px',
                borderRadius: '8px',
                py: '9px',
                bgcolor: '#054E8B',
                ':hover': { bgcolor: '#054E8B' }
              }}>
              <Box style={buttonStyle5} fontFamily="SF Pro Display" onClose={handleClose}>
                Date
              </Box>
            </Button>
            <Box
              sx={{
                mr: '10px'
              }}
            />
            <Button
              onClick={handleClose}
              variant="text"
              sx={{
                width: '100%',
                maxWidth: '72px',
                borderRadius: '8px',
                borderColor: '#054E8B !important',
                border: 2,
                py: '4px',
                backgroundColor: '#ffffff',
                ':hover': { bgcolor: '#ffffff' }
              }}>
              <Box
                sx={{
                  textTransform: 'capitalize',
                  fontSize: '13px',
                  color: '#0F2853',
                  backgroundColor: '#ffffff',
                  fontWeight: '700',
                  lineHeight: '20px'
                }}
                fontFamily="SF Pro Display"
                onClose={handleClose}>
                Clinic
              </Box>
            </Button>
          </Box>
          <Divider
            sx={{
              border: 1,
              borderColor: '#CAD3E5'
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: '20px'
            }}>
            <Box
              sx={{
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '19px',
                color: '#111111',
                pl: '14px'
              }}
              fontFamily="Sans">
              Clear All Filters
            </Box>
            <Box
              sx={{
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '19px',
                color: '#EA4C59',
                pl: '16px'
              }}
              fontFamily="Sans">
              Cancel
            </Box>
            <Button
              variant="text"
              sx={{
                width: '100%',
                maxWidth: '79px',
                borderRadius: '8px',
                py: '9px',
                bgcolor: '#054E8B',
                ':hover': { bgcolor: '#054E8B' }
              }}>
              <Box style={buttonStyle5} fontFamily="SF Pro Display">
                Apply
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
