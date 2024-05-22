/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const titleStyle = {
  fontSize: '19px',
  lineHeight: '25px',
  fontWeight: '700',
  color: '#054E8B',
  fontFamily: 'Mukta'
};
const descStyle = {
  fontSize: '15px',
  lineHeight: '19px',
  fontWeight: '400',
  color: '#2A3752',
  fontFamily: 'Mulish'
};
function EmptyStatesForTab(props) {
  const { title, description } = props;
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Box sx={{ width: '100%' }}>
        <Grid container direction="row" justifyContent="flex-start" />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: '330px', maxHeight: '187px', height: '100%', width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center',
                mt: '14.6875rem',
                mb: '0.625rem'
              }}>
              <Box style={titleStyle}>
                {/* <img src={calender_img} alt='' style={{ width: '3.2em' }} /> */}
              </Box>
            </Box>
            <Box
              sx={{
                mb: '0.625rem',
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center'
              }}>
              <Box style={titleStyle}>{title}</Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
              <Box style={descStyle}>{description}</Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }} />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

export default EmptyStatesForTab;
