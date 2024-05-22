/* eslint-disable no-useless-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import moment from 'moment/moment';
import { toast } from 'material-react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FilterList as FilterListIcon,
  Search as SearchIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import {
  Box,
  Button,
  CssBaseline,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip
} from '@mui/material';
import { loginPageStyles } from '../LoginScreens/LoginStyles';
import { setCurrentTab } from '../redux-store/slices/tabSlice';

import TabsCustomization from './TabsCustomization';
import FilterPopup from '../LoginScreens/FilterPopup';
import BottomNavigationScreen from './BottomNavigationScreen';

// Imports

import {
  setPractices,
  fetchPracticesData,
  fetchEnroutedPractices
} from '../redux-store/slices/practicesSlice';
import { destroyUser } from '../redux-store/slices/userSlice';

export default function Logistics(props) {
  const { locationCoordinates } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.user);
  const [dropDownHeight, setDropDownHeight] = useState(false);
  const classes = loginPageStyles();
  const [searchValue, setSearchValue] = useState('');
  const practices = useSelector((state) => state.practicesReducer.practices);
  const loading = useSelector((state) => state.practicesReducer.loading);
  const hasMore = useSelector((state) => state.practicesReducer.hasMore);
  const [filterPopup, setFilterPopup] = useState(false);
  const [apply, setApply] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [pageNo, setPageNo] = useState(1);

  // Infinite Scroll Logic
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && loading) {
            setPageNo((prev) => prev + 1);
          }
        },
        { threshold: 0.67 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // CheckBoxes State is lifted from FilterPopup to parent for filter state persistance
  const [data, setData] = React.useState([
    { id: 1, name: 'Urgent', checked: false },
    { id: 2, name: 'Routine', checked: false },
    { id: 3, name: 'Manual', checked: false }
  ]);

  // This state is for handling filters through out the app
  const [queryParams, setQueryParams] = useState({
    userId: user?.id,
    order_type: [],
    clinicArrow: true,
    enOrdersArrow: true,
    attributeToSort: '',
    status: 'assigned',
    sortBy: '',
    sortByDate: false,
    startDate: new Date(),
    endDate: new Date()
  });

  // This effect is for authorization
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  });

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate('/');
    }
    dispatch(setCurrentTab('Logistics'));
  }, []);

  // This function set's our query parameters for making call to server
  const getQueryParams = () => {
    let data = {
      rider_id: user?.id,
      search: searchValue,
      status: tabIndex === 0 ? 'assigned' : tabIndex === 1 ? 'collected' : 'delivered',
      page: pageNo
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

  /*
  This function sorts data, it takes 2 params:
  1. attribute to sort
  2. order
  */

  const sortPractices = (by, order) => {
    const temp = JSON.parse(JSON.stringify(practices));
    by === 'name'
      ? temp.sort((a, b) => {
        const x = a.name.toUpperCase();
        const y = b.name.toUpperCase();
        return order === 'asc' ? (x === y ? 0 : x > y ? 1 : -1) : x === y ? 0 : x > y ? -1 : 1;
      })
      : temp.sort((a, b) => {
        return order === 'asc'
          ? a.orders_count.eorders - b.orders_count.eorders
          : b.orders_count.eorders - a.orders_count.eorders;
      });

    dispatch(setPractices([...temp]));
    setQueryParams((prev) => {
      return {
        ...prev,
        attributeToSort: '',
        sortBy: ''
      };
    });
  };

  // useEffect for resetting state when tab Index changes
  useEffect(() => {
    if (queryParams.attributeToSort === '') {
      dispatch(setPractices([]));
      setPageNo(1);
    }
  }, [tabIndex, searchValue, apply]);

  // UseEffect for fetching practices Data
  useEffect(() => {
    let promise;
    const params = { ...getQueryParams() };
    if (params.sort !== undefined && params.sort !== '') {
      sortPractices(params.sort, params.direction);
    } else if (queryParams.endDate !== null) {
      promise = dispatch(fetchPracticesData(params));
      promise.unwrap().catch((err) => {
        if (err?.error === 'You need to sign in or sign up before continuing.') {
          toast.error('Your session has been expired');
          dispatch(destroyUser());
          navigate('/login');
        }
        if (err?.name === 'AbortError') return;
      });
    }

    // Cleanup
    return () => {
      promise && promise.abort();
    };
  }, [searchValue, apply, tabIndex, pageNo]);

  // This useEffect fetches EnroutedPractices
  useEffect(() => {
    const promise = dispatch(fetchEnroutedPractices({ riderId: user?.id }));
    promise.catch(() => {
      toast.error('Error While fetching Enrouted Practices');
    });
    return () => {
      promise.abort();
    };
  }, []);

  // Event Handlers
  const searchFilter = async (e) => {
    setSearchValue(e.target.value);
    setPageNo(1);
  };
  const handleFilter = () => {
    setFilterPopup(true);
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          width: '100%'
        }}>
        <Box sx={{ width: '100%' }}>
          <Box
            className={classes.heading10}
            sx={{
              color: '#0F2853',
              fontWeight: '700',
              fontSize: '21px',
              lineHeight: '27px',
              my: '4px',
              textAlign: 'center'
            }}>
            Logistics
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
                fullWidth
                placeholder="Search"
                className={classes.textField}
                sx={{ pl: '8px' }}
                value={searchValue}
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
              onClick={handleFilter}
              sx={{
                p: 0,
                ':hover': {
                  bgcolor: '#ffffff',
                  color: '#000000'
                }
              }}>
              <FilterListIcon
                sx={{
                  fontSize: '2rem',
                  color:
                    queryParams.order_type.length !== 0 || queryParams.attributeToSort !== ''
                      ? '#054E8B'
                      : '#8493AE'
                }}
              />
            </Button>
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
        <TabsCustomization
          locationCoordinates={locationCoordinates}
          dropDownHeight={dropDownHeight}
          setDropDownHeight={setDropDownHeight}
          apply={apply}
          setApply={setApply}
          value={tabIndex}
          setValue={setTabIndex}
          ref={lastElementRef}
        />
        <BottomNavigationScreen />
      </Box>
    </>
  );
}
