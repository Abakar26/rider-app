/* eslint-disable radix */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
// Imports

import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  styled
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { toast } from 'material-react-toastify';
import { loginPageStyles } from '../LoginScreens/LoginStyles';
import alertImg from '../Images/alertimg.svg';
import CustomizedInputForPIckupDetails from './CustomizedInputForPIckupDetails';
import CustomizedCheckBox2 from './CusomizedCheckBox2';
import ConfirmSamplesPopup from './ConfirmSamplesPopup';
import { destroyUser } from '../redux-store/slices/userSlice';
import { setSelectedOrders, fetchPracticeOrders } from '../redux-store/slices/practicesSlice';

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
    padding: '8px 0px 8px 8px',
    borderLeft: '1px solid #054E8B'
  }
}));

const tableCellStyle = {
  fontSize: '15px',
  lineHeight: '19px',
  fontFamily: 'Mulish',
  padding: '8px 0px 8px 8px'
};

export function PickupDetailsScreen({ user, enroutedPractice, isConfirmed, setStep }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const practiceOrders = useSelector((state) => state.practicesReducer.practiceOrders);

  const loading = useSelector((state) => state.practicesReducer.loading);
  const [orders, setOrders] = useState([]);
  const [confirmation, setConfirmation] = useState(false);
  const [openConfirmPopUp, setOpenConfirmPopUp] = useState(false);
  const handleClickConfirm = () => {
    setOpenConfirmPopUp(true);
  };

  const handleCancel = async () => {
    return (await isConfirmed('Logistics Home Screen')) && navigate('/logistics');
  };

  // This Use Effect fetches Orders for a enrouted Practice
  useEffect(() => {
    const data = {
      practiceId: enroutedPractice?.id,
      riderId: user?.id
    };
    const promise = dispatch(fetchPracticeOrders(data));
    promise.unwrap().catch((err) => {
      if (err?.error === 'You need to sign in or sign up before continuing.') {
        toast.error('Your session has been expired');
        dispatch(destroyUser());
        navigate('/login');
      }
    });
  }, []);

  useEffect(() => {
    const riderOrders = [];
    practiceOrders.forEach((data) => {
      riderOrders.push({
        order_id: data.id,
        lab_barcode_id: data.lab_barcode_id,
        type: data.order_type,
        samples: data.specimens,
        checked: '',
        priority: data.order_priority
      });
    });
    setOrders(riderOrders);
  }, [loading]);

  // Helper Functions
  const getNumericCheckedValues = () => {
    if (orders.length > 0) {
      const checked = orders.filter(
        (order) => typeof order.samples === 'number' && order.checked
      ).length;
      return checked > 0;
    }
    return false;
  };
  const getStringCheckedValues = () => {
    if (orders.length > 0) {
      const checked = orders.some(
        (order) => order.type === 'new_manual_order' && order.samples !== '' && order.checked
      );
      return checked;
    }
    return false;
  };

  const classes = loginPageStyles();

  const nextButtonStyle = {
    fontFamily: 'Mukta',
    backgroundColor: '#054E8B',
    textTransform: 'capitalize',
    fontSize: '15px',
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: '20px'
  };
  const cancelButtonStyle = {
    fontFamily: 'Mulish',
    textTransform: 'none',
    fontSize: '15px',
    color: '#EA4C59',
    lineHeight: '19px',
    fontWeight: '400'
  };

  const buttonStyle = {
    fontFamily: 'Mukta',
    textTransform: 'none',
    fontSize: '15px',
    color: '#2A3752',
    fontWeight: '700',
    lineHeight: '20px',
    letterSpacing: '0.005em'
  };

  const theme = createTheme({
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

  const handleAddNonEOrderButton = () => {
    setOrders([
      ...orders,
      {
        order_id: '',
        lab_barcode_id: 'Non-eOrder',
        type: 'new_manual_order',
        samples: '',
        checked: ''
      }
    ]);
  };

  const confirmOrders = () => {
    const checkedOrders = orders.filter(
      (element) => element.checked && parseInt(element.samples) >= 0
    );
    if (confirmation && checkedOrders.length > 0) {
      dispatch(setSelectedOrders(checkedOrders));
      setStep((prev) => prev + 1);
    }
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            my: 'auto'
          }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
              padding: '0 20px',
              mt: '10px',
              mb: '8px'
            }}>
            <Box
              className={classes.heading10}
              sx={{
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center',
                textAlign: 'left',
                fontWeight: '700',
                fontSize: '17px',
                lineHeight: '22px',
                color: '#054E8B'
              }}>
              {enroutedPractice?.name}
            </Box>
          </Box>
          <Divider />
          <Table size="small" aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sr. No.</StyledTableCell>
                <StyledTableCell style={{ paddingLeft: 0 }}>Order ID</StyledTableCell>
                <StyledTableCell>No. of Samples</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cleanOrders(orders).map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell sx={tableCellStyle} style={{ width: '17%' }}>
                    {row.id}.
                  </TableCell>
                  <TableCell sx={tableCellStyle} style={{ paddingLeft: 0, width: '32%' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        lineBreak: 'anywhere'
                      }}>
                      {row.lab_barcode_id}
                      {row?.priority === 'urgent' && <img src={alertImg} alt="" />}
                    </Box>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      p: row.type === 'new_manual_order' ? '4px 0px' : '8px 0px'
                    }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginLeft: '1rem',
                        width: '80%'
                      }}>
                      <CustomizedInputForPIckupDetails
                        index={index}
                        value={row?.samples}
                        orders={orders}
                        setOrders={setOrders}
                      />
                      <CustomizedCheckBox2
                        index={index}
                        value={row?.checked}
                        orders={orders}
                        setOrders={setOrders}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}>
            <Button
              onClick={handleAddNonEOrderButton}
              variant="text"
              sx={{
                border: 1,
                borderColor: '#E5E5E5',
                marginTop: '12px',
                marginBottom: '16px',
                height: '36px',
                p: '4px 20px',
                width: 'auto',
                borderRadius: '8px'
              }}
              style={buttonStyle}>
              Add Non-eOrder
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}>
            <Box
              sx={{
                maxWidth: '320px',
                width: '100%',
                marginTop: '20px',
                marginBottom: '120px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
              }}>
              <CustomizedCheckBox2 value={confirmation} setConfirmation={setConfirmation} />
              <Box
                className={classes.heading}
                sx={{
                  ml: '2px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '13px',
                  color: '#111111',
                  lineHeight: '19px'
                }}>
                I ensure that the orders and samples quantity listed are correct.
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%'
            }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: '32px'
              }}>
              <Box
                sx={{
                  maxWidth: '280px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: '43px',
                  pl: '10px',
                  pr: '8px'
                }}>
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
                  style={cancelButtonStyle}>
                  Cancel
                </Button>
                <ThemeProvider theme={theme}>
                  <Button
                    onClick={handleClickConfirm}
                    disabled={
                      !(confirmation && (getNumericCheckedValues() || getStringCheckedValues()))
                    }
                    variant="text"
                    sx={{
                      maxWidth: '86px',
                      width: '100%',
                      borderRadius: '8px',
                      ':hover': { bgcolor: '#054E8B' }
                    }}
                    style={nextButtonStyle}>
                    Next
                  </Button>
                </ThemeProvider>
              </Box>
            </Box>
            {openConfirmPopUp && (
              <ConfirmSamplesPopup
                confirmEOrders={confirmOrders}
                openConfirmPopUp={openConfirmPopUp}
                setOpenConfirmPopUp={setOpenConfirmPopUp}
              />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
export default PickupDetailsScreen;
