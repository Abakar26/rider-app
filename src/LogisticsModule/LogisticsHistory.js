/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FilterList as FilterListIcon,
  Search as SearchIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import moment from 'moment/moment';
import { toast } from 'material-react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Grid,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Typography,
  Tooltip,
  InputAdornment
} from '@mui/material';
import BottomNavigationScreen from './BottomNavigationScreen';
import CustomizedInputs from './CustomizedInputs';
import FilterPopup from '../LoginScreens/FilterPopup';
import { loginPageStyles } from '../LoginScreens/LoginStyles';
import { destroyUser } from '../redux-store/slices/userSlice';
import { fetchOrdersHistory, setOrdersHistory } from '../redux-store/slices/practicesSlice';
import { setCurrentTab } from '../redux-store/slices/tabSlice';

export function LogisticsHistory(props) {
  const classes = loginPageStyles();
  const user = useSelector((state) => state.userReducer.user);
  const historyData = useSelector((state) => state.practicesReducer.ordersHistory);
  const loading = useSelector((state) => state.practicesReducer.loading);
  const hasMore = useSelector((state) => state.practicesReducer.hasMore);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [filterPopup, setFilterPopup] = useState(false);
  const [apply, setApply] = useState(false);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prev) => prev + 1);
          }
        },
        { threshold: 0.67 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const [data, setData] = React.useState([
    { id: 1, name: 'Urgent', checked: false },
    { id: 2, name: 'Routine', checked: false },
    { id: 3, name: 'Manual', checked: false }
  ]);

  const [queryParams, setQueryParams] = useState({
    userId: user?.id,
    order_type: [],
    clinicArrow: true,
    enOrdersArrow: true,
    attributeToSort: '',
    sortBy: '',
    sortByDate: false,
    startDate: new Date(),
    endDate: new Date()
  });

  const getQueryParams = () => {
    let data = {
      rider_id: user?.id,
      orders_history: true,
      search: searchValue,
      page
    };
    if (queryParams.order_type.length !== 0) {
      queryParams.order_type.forEach((o) => {
        data = { ...data, [o.toLowerCase()]: true };
      });
    }
    if (queryParams.attributeToSort !== '') {
      data = {
        ...data,
        sort: queryParams.attributeToSort,
        direction: queryParams.sortBy.toLowerCase()
      };
    }

    if (queryParams.sortByDate) {
      if (queryParams.endDate !== null) {
        data = {
          ...data,
          start_date: moment(queryParams.startDate).format('YYYY-MM-DD'),
          end_date: moment(queryParams.endDate).format('YYYY-MM-DD')
        };
      }
    }

    return data;
  };

  // Use Effect For handling Authorization Stuff
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate('/');
    }
    dispatch(setCurrentTab('History'));
  }, []);

  // useEffect for resetting state when tab Index changes
  useEffect(() => {
    if (queryParams.attributeToSort === '') {
      dispatch(setOrdersHistory([]));
      setPage(1);
    }
  }, [searchValue, apply]);

  const sortPractices = (by, order) => {
    const temp = JSON.parse(JSON.stringify(historyData));
    by === 'name'
      ? temp.sort((a, b) => {
        const x = a.name.toUpperCase();
        const y = b.name.toUpperCase();
        return order === 'asc' ? (x === y ? 0 : x > y ? 1 : -1) : x === y ? 0 : x > y ? -1 : 1;
      })
      : temp.sort((a, b) => {
        return order === 'asc'
          ? a.order_count.eorders - b.order_count.eorders
          : b.order_count.eorders - a.order_count.eorders;
      });

    dispatch(setOrdersHistory([...temp]));
    setQueryParams((prev) => {
      return {
        ...prev,
        attributeToSort: '',
        sortBy: ''
      };
    });
  };

  useEffect(() => {
    let promise;
    const params = { ...getQueryParams() };

    if (params.sort !== undefined && params.sort !== '') {
      sortPractices(params.sort, params.direction);
    } else if (queryParams.endDate !== null) {
      promise = dispatch(fetchOrdersHistory(params));
      promise.unwrap().catch((err) => {
        if (err?.error === 'You need to sign in or sign up before continuing.') {
          toast.error('Your session has been expired');
          dispatch(destroyUser());
          navigate('/login');
        }
        if (err?.name === 'AbortError') return;
      });
    }
    // Cleanup Function
    return () => {
      promise && promise.abort();
    };
  }, [searchValue, page, apply]);

  const searchFilter = async (e) => {
    setSearchValue(e.target.value);
    setPage(1);
  };

  const handleFilter = () => {
    setFilterPopup(true);
  };

  const buttonStyle = {
    fontFamily: 'Mulish',
    backgroundColor: '#F2F4F7',
    textTransform: 'capitalize',
    color: '#455066',
    fontSize: '13px',
    lineHeight: '16px',
    letterSpacing: '0.01em'
  };

  return (
    <>
      <CssBaseline />
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Box sx={{ width: '100%' }}>
          <Box
            className={classes.heading10}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              color: '#0F2853',
              fontWeight: '700',
              fontSize: '21px',
              lineHeight: '27px',
              my: '4px'
            }}>
            {' '}
            History
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: '12px',
              mx: '15px'
            }}>
            <Tooltip
              followCursor
              title="Clinic Name/ Clinic Code/ EOrder ID / Hcp Name/ Hcp Code"
              sx={{
                backgroundColor: 'transparent'
              }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Search"
                value={searchValue}
                className={classes.textField}
                sx={{ pl: '8px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#8493AE' }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchValue.length > 0 && (
                    <InputAdornment position="end">
                      <IconButton sx={{ p: 0 }} onClick={() => setSearchValue('')}>
                        <CloseIcon size="small" sx={{ color: '#8493AE' }} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                onChange={searchFilter}
              />
            </Tooltip>
            <Button
              variant="text"
              sx={{
                p: 0,
                ':hover': {
                  bgcolor: '#ffffff',
                  color: '#000000'
                }
              }}
              onClick={handleFilter}>
              <FilterListIcon
                fontSize="large"
                sx={{
                  color: '#8493AE'
                }}
              />
            </Button>
          </Box>
          <Box
            sx={{
              mt: '14px',
              bgcolor: '#054E8B',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: '2px',
              pl: '16px'
            }}>
            <Box
              className={classes.heading10}
              sx={{
                color: '#FAFAFA',
                fontWeight: '700',
                fontSize: '20px',
                lineHeight: '33px'
              }}>
              Dispatch History{' '}
            </Box>
          </Box>
          {/* Displaying Practices here */}
          <Box sx={{ height: 'calc(100vh - 210px)', overflow: 'auto' }}>
            {historyData?.length === 0 && hasMore === false ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  my: 'auto',
                  height: 'calc(100vh - 144px)'
                }}>
                <Typography variant="h6"> No History Found.</Typography>
              </Box>
            ) : (
              historyData?.map((data, index) => {
                return index === historyData.length - 1 ? (
                  <Box key={index} ref={lastElementRef}>
                    <Box
                      sx={{
                        padding: '8px 12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderWidth: '1px 0px',
                        borderStyle: 'solid',
                        borderColor: '#CAD3E6'
                      }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box
                          className={classes.heading10}
                          sx={{
                            fontSize: '17px',
                            fontWeight: '700',
                            lineHeight: '22px',
                            color: '#2A3752'
                          }}>
                          {data.name}
                        </Box>
                      </Box>
                      <Button
                        variant="text"
                        sx={{
                          height: '20px',
                          borderRadius: '20px',
                          border: '2px solid #54CB83',
                          padding: '2px 21.5px',
                          backgroundColor: '#F2F4F7'
                        }}
                        style={buttonStyle}>
                        Delivered
                      </Button>
                    </Box>
                    {data.orders_history?.map((order, idx) => (
                      <Box key={idx}>
                        <Box
                          sx={{
                            padding: '2px 16px',
                            bgcolor: '#EBEFF5',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #DAE0EB',
                            height: '36px'
                          }}>
                          <Box sx={{ display: 'flex' }}>
                            <Box
                              sx={{
                                fontFamily: 'Mulish',
                                color: '#2A3752',
                                fontSize: '15px',
                                lineHeight: '19px',
                                width: '100%',
                                mr: '3px'
                              }}>
                              <strong> {idx + 1}</strong>. {order.lab_barcode_id}
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignContent: 'end',
                              alignItems: 'center'
                            }}>
                            <CustomizedInputs
                              total={order.specimens ? order.specimens : order.samples_count}
                              collected={order.specimens ? order.specimens : order.samples_count}
                            />
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box key={index}>
                    <Box
                      sx={{
                        padding: '8px 12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderWidth: '1px 0px',
                        borderStyle: 'solid',
                        borderColor: '#CAD3E6'
                      }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box
                          className={classes.heading10}
                          sx={{
                            fontSize: '17px',
                            fontWeight: '700',
                            lineHeight: '22px',
                            color: '#2A3752'
                          }}>
                          {data.name}
                        </Box>
                      </Box>
                      <Button
                        variant="text"
                        sx={{
                          height: '20px',
                          borderRadius: '20px',
                          border: '2px solid #54CB83',
                          padding: '2px 21.5px',
                          backgroundColor: '#F2F4F7'
                        }}
                        style={buttonStyle}>
                        Delivered
                      </Button>
                    </Box>
                    {data.orders_history?.map((order, idx) => (
                      <Box key={idx}>
                        <Box
                          sx={{
                            padding: '2px 16px',
                            bgcolor: '#EBEFF5',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #DAE0EB',
                            height: '36px'
                          }}>
                          <Box sx={{ display: 'flex' }}>
                            <Box
                              sx={{
                                fontFamily: 'Mulish',
                                color: '#2A3752',
                                fontSize: '15px',
                                lineHeight: '19px',
                                width: '100%',
                                mr: '3px'
                              }}>
                              <strong> {idx + 1}</strong>. {order.lab_barcode_id}
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignContent: 'end',
                              alignItems: 'center'
                            }}>
                            <CustomizedInputs
                              total={order.specimens ? order.specimens : order.samples_count}
                              collected={order.specimens ? order.specimens : order.samples_count}
                            />
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                );
              })
            )}
            {/* Displaying Loader Here */}
            {loading && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  my: 'auto',
                  height: 'calc(100vh - 144px)'
                }}>
                <CircularProgress />
              </Box>
            )}
          </Box>
          <Box
            position="fixed"
            sx={{
              bottom: 0,
              width: '100%'
            }}>
            <BottomNavigationScreen />
          </Box>
        </Box>
        {filterPopup && (
          <FilterPopup
            filterPopup={filterPopup}
            setFilterPopup={setFilterPopup}
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            apply={apply}
            setApply={setApply}
            data={data}
            setData={setData}
          />
        )}
      </Grid>
    </>
  );
}
export default LogisticsHistory;
