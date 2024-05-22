/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import IconButton from '@material-ui/core/IconButton';
import { Divider } from '@mui/material';
import DateRange from '../DatePicker/DateRange';
import CustomizedCheckBox from '../LogisticsModule/CustomizedCheckBox';
import SortAttribute from './SortAttribute';
import SortAttribute2 from './SortAttribute2';
import '../LogisticsModule/styles.css';

const titleStyle4 = {
  fontFamily: 'Mukta',
  fontSize: '15px',
  lineHeight: '20px',
  fontWeight: '700',
  color: '#054E8B'
};
const titleStyle = {
  fontSize: '19px',
  lineHeight: '25px',
  fontWeight: '700',
  color: '#054E8B',
  fontFamily: 'Mukta'
};

function FilterPopup(props) {
  const {
    setFilterPopup,
    filterPopup,
    data,
    queryParams,
    setQueryParams,
    setData,
    apply,
    setApply
  } = props;
  const [setState] = React.useState(false);
  const handleClose = () => {
    setFilterPopup(false);
  };
  return (
    <Dialog
      sx={{
        '& .MuiDialogContent-root ': {
          padding: '0px 0px'
        }
      }}
      PaperProps={{
        style: {
          margin: '2px'
        }
      }}
      margin={0}
      open={filterPopup}
      onClose={handleClose}>
      <DialogContent>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          backgroundColor="white">
          <Box
            className="filter-pop-up"
            sx={{
              boxShadow: '3',
              padding: '20px',
              paddingRight: '16px',
              width: '100%',
              backgroundColor: '#FFFFFF',
              display: 'inline'
            }}>
            <Box
              sx={{
                display: 'inline',
                width: '100%'
              }}>
              <IconButton
                onClick={handleClose}
                style={{
                  padding: '0px',
                  color: '#8493AE',
                  float: 'right',
                  marginTop: '-10px',
                  marginRight: '-10px'
                }}>
                <CloseIcon className="filter-close-icon" />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: 'inline',
                flexDirection: 'column',
                maxWidth: '350px',
                width: '100%'
              }}>
              <Box
                sx={{
                  marginBottom: '20px'
                }}>
                <Box style={titleStyle}>Filter By</Box>
              </Box>
              <Box
                sx={{
                  marginBottom: '20px'
                }}>
                <Box style={titleStyle4} sx={{ marginBottom: '8.5px' }}>
                  Duty Status
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                  }}>
                  {data.map((dutyStatus, i) => (
                    <Box key={dutyStatus.id}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'flexStart',
                          padding: '0px',
                          width: '116px'
                        }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row'
                          }}>
                          <CustomizedCheckBox
                            index={i}
                            queryParams={queryParams}
                            setQueryParams={setQueryParams}
                            data={dutyStatus}
                            setData={setData}
                            setState={setState}
                          />
                          <Box
                            sx={{
                              fontFamily: 'Mulish',
                              fontSize: '15px',
                              lineHeight: '23px',
                              color: '#111111'
                            }}>
                            {dutyStatus.name}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box
                sx={{
                  marginBottom: '20px'
                }}>
                <Box style={titleStyle4} sx={{ marginBottom: '8.5px' }}>
                  Sort By
                </Box>
              </Box>
              {/* Clinic Sort */}
              <SortAttribute
                attribute="Clinic"
                queryParams={queryParams}
                setQueryParams={setQueryParams}
                setState={setState}
              />
              <SortAttribute2
                attribute="No. of Eorders"
                queryParams={queryParams}
                setQueryParams={setQueryParams}
                setState={setState}
              />
              <Divider
                sx={{
                  borderTop: 1,
                  borderBottomWidth: '0px',
                  borderColor: '#CAD3E5',
                  width: '100%',
                  marginBottom: '20px'
                }}
              />
              <Box sx={{ marginBottom: '21px' }}>
                <DateRange
                  queryParams={queryParams}
                  setQueryParams={setQueryParams}
                  setState={setState}
                />
              </Box>
              <Divider
                sx={{
                  borderTop: 1,
                  borderBottomWidth: '0px',
                  borderColor: '#CAD3E5',
                  width: '100%',
                  marginBottom: '20px'
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  zIndex: 8,
                  alignSelf: 'stretch',
                  width: '100%'
                }}>
                <Button
                  variant="text"
                  className="clear-filter-btn"
                  sx={{
                    textTransform: 'none',
                    '&.MuiButtonBase-root': {
                      maxWidth: '145px',
                      fontSize: '15px',
                      gap: '8px',
                      lineHeight: '19px',
                      fontFamily: 'Mulish',
                      color: '#111111'
                    }
                  }}
                  onClick={() => {
                    setData((prevData) => {
                      return prevData.map((item) => {
                        return { ...item, checked: false };
                      });
                    });
                    setQueryParams((prev) => {
                      return {
                        ...prev,
                        order_type: [],
                        attributeToSort: '',
                        sortBy: '',
                        sortByDate: false,
                        startDate: new Date(),
                        endDate: new Date()
                      };
                    });
                    setApply(!apply);
                    setState(true);
                    handleClose();
                  }}>
                  Clear All Filters
                </Button>
                <Button
                  onClick={handleClose}
                  sx={{
                    textTransform: 'none',
                    width: '100%',
                    '&.MuiButtonBase-root': {
                      maxWidth: '87px',
                      fontSize: '15px',
                      lineHeight: '19px',
                      gap: '8px',
                      padding: '0px',
                      fontFamily: 'Mulish',
                      color: '#EA4C59'
                    }
                  }}>
                  Cancel
                </Button>
                <Button
                  variant="text"
                  sx={{
                    textTransform: 'none',
                    width: '100%',
                    '&.MuiButtonBase-root': {
                      maxWidth: '83px',
                      borderRadius: '8px',
                      gap: '8px',
                      backgroundColor: '#054E8B',
                      color: '#FFFFFF'
                    },
                    '&:disabled': {
                      backgroundColor: 'e0e0e0'
                    }
                  }}
                  onClick={() => {
                    setApply(!apply);
                    handleClose();
                  }}
                  disabled={!!(queryParams.sortByDate && queryParams.endDate === null)}>
                  Apply
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
export default React.memo(FilterPopup);
