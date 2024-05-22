/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { React } from 'react';

export default function DeliveryOverviewDialog(props) {
  const { setOpenDialog, openDialog, deliveryData } = props;
  const deliveryOverviewCell = {
    padding: '4px 20px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    border: '1px solid #DAE0EB',
    borderBottom: '0px'
  };

  const deliveryOverviewHeading = {
    fontWeight: '700',
    fontSize: '15px',
    color: '#455066',
    fontFamily: 'Mukta',
    lineHeight: '20px',
    letterSpacing: '0.005em',
    my: '6px'
  };

  const deliveryOverviewData = {
    fontSize: '15px',
    color: '#455066',
    lineHeight: '19px',
    fontFamily: 'Mulish',
    my: '6.5px'
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Dialog
        sx={{
          '& .MuiDialogContent-root ': {
            padding: '0px 0px',
            margin: 0
          },
          '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper ': {
            margin: '11.5px',
            borderRadius: '0px'
          }
        }}
        margin={0}
        open={openDialog}
        onClose={handleClose}>
        <DialogContent
          sx={{
            '& .MuiDialogContent-root ': {
              padding: '51px 0px'
            },
            '& .MuiDialog-paper ': {
              margin: '1px',
              width: '0px'
            }
          }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            maxWidth="350px">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '350px'
              }}>
              <Box>
                <Box sx={deliveryOverviewCell}>
                  <Box sx={deliveryOverviewHeading}>Total pick ups</Box>
                  <Box sx={deliveryOverviewData}>
                    {deliveryData?.total_pick_ups ? deliveryData?.total_pick_ups : 'N/A'}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box sx={deliveryOverviewCell}>
                  <Box sx={deliveryOverviewHeading}>Samples delivered</Box>
                  <Box sx={deliveryOverviewData}>
                    {deliveryData?.samples_delivered ? deliveryData?.samples_delivered : 'N/A'}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box sx={deliveryOverviewCell}>
                  <Box sx={deliveryOverviewHeading}>Urgent pick ups</Box>
                  <Box sx={deliveryOverviewData}>
                    {deliveryData?.urgent_pick_ups ? deliveryData?.urgent_pick_ups : 'N/A'}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box sx={deliveryOverviewCell}>
                  <Box sx={deliveryOverviewHeading}>Cancelled orders</Box>
                  <Box sx={deliveryOverviewData}>
                    {deliveryData?.cancelled_orders ? deliveryData?.cancelled_orders : 'N/A'}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </DialogContent>
      </Dialog>{' '}
    </>
  );
}
