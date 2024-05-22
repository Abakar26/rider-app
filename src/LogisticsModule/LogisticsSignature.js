/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import './styles.css';
import React, { useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import moment from 'moment';
import { toast } from 'material-react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  styled,
  Typography
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { loginPageStyles } from '../LoginScreens/LoginStyles';
import { fetchDeliveryOverviewData } from '../redux-store/slices/deliveryDataSlice';
import { setUserStatus, destroyUser } from '../redux-store/slices/userSlice';
import alertImg from '../Images/alertimg.svg';
import Loader from '../Reusable/Loader';
import InputForSIgnatureIndication from './InputForSIgnatureIndication';

// Imports

import {
  setEnroutedPractices,
  setOrderCollectedTime,
  updateEnroutedPracticeOrders,
  collectPracticeOrders
} from '../redux-store/slices/practicesSlice';
import CustomInputLogisticSignature from './CustomInputLogisticSignature';

// Table Configuration

const cleanOrders = (data) => {
  const filteredOrders = data.map((item, idx) => {
    return {
      id: idx + 1,
      ...item
    };
  });
  return filteredOrders;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#054E8B',
    color: theme.palette.common.white,
    fontFamily: 'Mukta',
    fontWeight: '700',
    fontSize: '15px',
    lineHeight: '20px',
    padding: '8px 16px',
    borderLeft: '1px solid #054E8B',
    letterSpacing: '0.005em'
  }
}));

const tableCellStyle = {
  fontSize: '15px',
  lineHeight: '19px',
  fontFamily: 'Mulish',
  padding: '8px 16px'
};

export function LogisticsSignature({ user, enroutedPractice, isConfirmed, setStep }) {
  // const boxClasses = useStyles();
  const classes = loginPageStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedOrders = useSelector((state) => state.practicesReducer.selectedOrders);
  const loading = useSelector((state) => state.practicesReducer.loading);
  const practiceOrders = useSelector((state) => state.practicesReducer.practiceOrders);
  const [signatureIndication, setSignatureIndication] = useState('');
  const [isSigned, setIsSigned] = useState(false);
  const signaturePad = useRef({});

  const handleCancel = async () => {
    return (await isConfirmed('Logistics Home Screen')) && navigate('/logistics');
  };

  const btnTheme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            boxShadow: 'none',
            '&.Mui-disabled': {
              opacity: 0.7
            }
          }
        }
      }
    }
  });

  const nextbuttonStyle = {
    fontFamily: 'Mukta',
    backgroundColor: '#054E8B',
    textTransform: 'capitalize',
    fontSize: '15px',
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: '20px'
  };
  const cancelbuttonStyle = {
    fontFamily: 'Mulish',
    textTransform: 'capitalize',
    fontSize: '15px',
    color: '#EA4C59',
    lineHeight: '19px',
    fontWeight: '400'
  };

  const OnClear = () => {
    signaturePad?.current.clear();
    setIsSigned(false);
  };

  // Utility Method for checking if all orders against practice is selected or not
  const verifyAllChecked = () => {
    const collectedEOrders = practiceOrders.filter((element) =>
      selectedOrders?.some((order) => element.id === order.order_id)
    );
    return practiceOrders.length === collectedEOrders.length;
  };

  // Utility Function for separation of e and manual orders
  const filter_orders = () => {
    // Finding Eorders
    const orders = [];
    const newManualOrders = [];
    selectedOrders.forEach((element) => {
      element.type === 'new_manual_order'
        ? newManualOrders.push(element.samples)
        : orders.push(element.order_id);
    });
    return [orders, newManualOrders];
  };

  // Handler for order collection
  const handleSignatures = () => {
    if (isSigned && signatureIndication && selectedOrders) {
      const signatureObject = signaturePad.current.getTrimmedCanvas().toDataURL('image/png');

      const [orders, newManualOrders] = filter_orders();
      const payload = {
        id: enroutedPractice?.id,
        practices: {
          name: signatureIndication,
          image: signatureObject,
          order_ids: orders,
          rider_id: user.id,
          new_manual_orders: newManualOrders,
          all_collected: verifyAllChecked()
        }
      };

      // Dispatching request for Collecting Practice Orders
      dispatch(collectPracticeOrders(payload))
        .unwrap()
        .then(() => {
          /*
          On promise resolution, we will then then update status for rider,
          we will store signature, date & time of order collection and lastly
          fetch data for statistics on profile Screen
          */
          const newEnOrders = practiceOrders.filter((elem) => {
            return selectedOrders.some((item) => item.id !== elem.id);
          });

          if (verifyAllChecked()) {
            dispatch(setUserStatus('assigned'));
          }

          dispatch(updateEnroutedPracticeOrders(newEnOrders));
          dispatch(setOrderCollectedTime(moment(new Date()).format(' hh:mma, DD MMM YYYY')));
          dispatch(fetchDeliveryOverviewData(user?.id));
          const updatedEnroutedPractice = JSON.parse(JSON.stringify(enroutedPractice));
          // Updating Counts
          selectedOrders.forEach((order) => {
            if (order.type === 'eorder') {
              if (updatedEnroutedPractice.orders_count.eorders > 0)
                updatedEnroutedPractice.orders_count.eorders -= 1;
            } else if (updatedEnroutedPractice.orders_count.manual_orders > 0)
              updatedEnroutedPractice.orders_count.manual_orders -= 1;
            if (
              order?.priority === 'urgent' &&
              updatedEnroutedPractice.orders_count.urgent_orders > 0
            ) {
              updatedEnroutedPractice.orders_count.urgent_orders -= 1;
            }
          });
          // dispatch action for setting updated EnroutedPractice
          dispatch(setEnroutedPractices([updatedEnroutedPractice]));
          setStep((prev) => prev + 1);
        })
        .catch((err) => {
          if (err?.error === 'You need to sign in or sign up before continuing.') {
            toast.error('Your session has been expired');
            dispatch(destroyUser());
            navigate('/login');
          }
          toast.error('Error While Collecting Order');
        });
    }
  };
  const commonStyles = {
    color: '#DAE0EB',
    borderColor: '#DAE0EB',
    borderRadius: '8px'
  };
  const smallTextStyle = {
    fontFamily: 'Mulish',
    fontWeight: '400px',
    textTransform: 'none',
    fontSize: '13px',
    color: '#455066',
    lineHeight: '16px'
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        mb: 'auto'
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%'
        }}>
        <Box
          sx={{
            fontSize: '19px',
            lineHeight: '25px',
            fontWeight: '700',
            color: '#054E8B',
            mx: '8px'
          }}
          className={classes.heading10}>
          Order Tally
        </Box>

        <Box style={smallTextStyle}>Please check if the quantities are correct.</Box>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Table size="small" aria-label="Order Confirmation">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr. No.</StyledTableCell>
              <StyledTableCell>Order ID</StyledTableCell>
              <StyledTableCell align="center">No. of Samples</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cleanOrders(selectedOrders).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: '#EBEFF5' }}>
                <TableCell sx={tableCellStyle}>{row.id}.</TableCell>
                <TableCell sx={tableCellStyle} style={{ paddingLeft: 0, width: '45%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      lineBreak: 'anywhere'
                    }}>
                    {row.lab_barcode_id}
                    {row?.priority === 'urgent' && (
                      <Box>
                        <img src={alertImg} alt="" />
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <CustomInputLogisticSignature total={row.samples} collected={row.samples} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '12px 0px',
          textAlign: 'center',
          gap: '12px',
          mx: '15.5px'
        }}>
        <Box
          className={classes.heading10}
          sx={{
            mb: '4px',
            fontWeight: '700',
            fontSize: '19px',
            lineHeight: '25px',
            color: '#054E8B'
          }}>
          Clinic Staff Confirmation
        </Box>
        <Box
          className={classes.heading}
          sx={{
            fontSize: '12px',
            lineHeight: '16px',
            color: '#2A3752',
            mx: '13px'
          }}>
          I declare that the above collection is correct and acceptable by {enroutedPractice?.name}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              ...commonStyles,
              border: 1,
              borderColor: '#1B96D8',
              mb: '12px',
              py: '4px',
              bgcolor: '#FFFFFF'
            }}>
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  width: '100%',
                  fontSize: '13px',
                  lineHeight: '12px',
                  color: '#8493AE',
                  ml: '12.5%'
                }}>
                Sign within the Box
              </Box>
              <Button
                onClick={OnClear}
                className={classes.heading}
                variant="text"
                sx={{
                  background: '#FFFFFF',
                  border: '1px solid #CAD3E6',
                  minWidth: 'fit-content',
                  borderRadius: '99px',
                  m: '2.5px 7.5px 0px 0px',
                  p: '2px 4px',
                  boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.24)',
                  ':hover': { bgcolor: '#ffffff' }
                }}
                style={smallTextStyle}>
                Clear
              </Button>
            </Box>
            <SignaturePad
              canvasProps={{
                width: 'auto',
                height: 'auto',
                className: 'signature'
              }}
              clearOnResize={false}
              penColor="#054E8B"
              ref={signaturePad}
              onEnd={() => {
                setIsSigned(true);
              }}
            />
          </Box>
          <Box
            className={classes.heading}
            sx={{
              textAlign: 'left',
              fontSize: '13px',
              lineHeight: '16px',
              color: '#455066',
              mb: '4px',
              textTransform: 'capitalize'
            }}>
            Please Indicate Your Name
            <Typography variant="span" sx={{ ml: '2px', color: '#EA4C59' }}>
              <strong> *</strong>
            </Typography>
          </Box>
          <Box sx={{ bgcolor: '#FFFFFF' }}>
            <InputForSIgnatureIndication
              value={signatureIndication}
              setSignatureIndication={setSignatureIndication}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={handleCancel}
            variant="text"
            sx={{
              border: 1,
              borderColor: '#E5E5E5',
              maxWidth: '86px',
              width: '100%',
              borderRadius: '10px',
              py: '4px'
            }}
            style={cancelbuttonStyle}>
            Cancel
          </Button>
          <ThemeProvider theme={btnTheme}>
            <Button
              onClick={handleSignatures}
              disabled={!(isSigned && signatureIndication.length)}
              variant="text"
              sx={{
                maxWidth: '86px',
                width: '100%',
                borderRadius: '8px',
                ':hover': { bgcolor: '#054E8B' }
              }}
              style={nextbuttonStyle}>
              Confirm
            </Button>
          </ThemeProvider>
          {loading && <Loader />}
        </Box>
      </Box>
    </Box>
  );
}
export default LogisticsSignature;
