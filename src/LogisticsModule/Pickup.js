/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress, Typography } from '@mui/material';
import PickUpDetail from './PickUpDetail';

const PickUp = React.forwardRef((props, ref) => {
  const user = useSelector((state) => state.userReducer.user);
  const loading = useSelector((state) => state.practicesReducer.loading);
  const [orders, setOrders] = useState([]);
  const [styles, setStyles] = useState(new Array(props.practiceOrdersData?.length).fill(false));

  // This function sorts orders based on how urgent they are
  const sort_urgent_orders_first = (ordersArray) => {
    ordersArray?.sort(
      (a, b) => b.orders_count.assigned_urgent_orders - a.orders_count.assigned_urgent_orders
    );
    return ordersArray;
  };

  // Event Handler
  const handleButton = (index) => {
    const updatedStyles = styles.map((element, id) => (id === index ? !element : false));
    setStyles(updatedStyles);
  };

  // This useEffect will take care of practice orders to display
  useEffect(() => {
    if (props.currentValue === 'Assigned') {
      // const sortedData = sort_urgent_orders_first(props.practiceOrdersData);
      setOrders(() => {
        return [...props.practiceOrdersData];
      });
    } else {
      setOrders(() => {
        return props.practiceOrdersData;
      });
      // Setting Styles
      setStyles(new Array(props.practiceOrdersData?.length).fill(false));
    }
  }, [props.practiceOrdersData, props.currentValue]);

  return (
    <Box>
      {!loading && orders.length === 0 && props.currentValue !== 'En-route' ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            my: 'auto',
            height: '50vh',
            overflow: 'auto'
          }}>
          <Typography>No result found</Typography>
        </Box>
      ) : (
        orders?.map((data, index) =>
          index === orders.length - 1 ? (
            <Box
              sx={{
                borderTop: '1px solid #DAE0EB',
                borderBottom: '1px solid #DAE0EB',
                padding: '8px 12px 4px',
                gap: '4px'
              }}
              key={index}
              ref={ref}>
              <PickUpDetail
                practice={data}
                distance={props.distance}
                locationCoordinates={props.locationCoordinates}
                select={
                  props.currentValue === 'En-route' ||
                  (props.currentValue === 'Assigned' && user?.status !== 'en-route')
                }
                index={index}
                currentValue={props.currentValue}
                urgentOrders={data?.orders_count?.urgent_orders}
                eOrders={data?.orders_count?.eorders}
                manualOrders={data?.orders_count?.manual_orders}
                handleButton={handleButton}
                dropDownHeight={props?.dropDownHeight}
                setDropDownHeight={props?.setDropDownHeight}
                style={styles[index]}
                enableWaze={props.currentValue === 'En-route' && user?.enable_waze}
              />
            </Box>
          ) : (
            <Box
              sx={{
                borderTop: '1px solid #DAE0EB',
                padding: '8px 12px 4px',
                gap: '4px'
              }}
              key={index}>
              <PickUpDetail
                practice={data}
                distance={props.distance}
                locationCoordinates={props.locationCoordinates}
                select={
                  props.currentValue === 'En-route' ||
                  (props.currentValue === 'Assigned' && user?.status !== 'en-route')
                }
                index={index}
                currentValue={props.currentValue}
                urgentOrders={data.orders_count.urgent_orders}
                eOrders={data.orders_count.eorders}
                manualOrders={data.orders_count.manual_orders}
                handleButton={handleButton}
                dropDownHeight={props?.dropDownHeight}
                setDropDownHeight={props?.setDropDownHeight}
                style={styles[index]}
                enableWaze={props.currentValue === 'En-route' && user?.enable_waze}
              />
            </Box>
          )
        )
      )}
      {props.currentValue !== 'En-route' && loading && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            my: 'auto'
          }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
});
export default PickUp;
