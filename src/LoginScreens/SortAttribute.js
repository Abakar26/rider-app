/* eslint-disable react/prop-types */
import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

function SortAttribute(props) {
  const { setQueryParams, attribute, queryParams } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        padding: '8px 4px',
        marginBottom: '20px',
        width: 'fit-content',
        cursor: 'pointer'
      }}
      onClick={() => {
        setQueryParams((prev) => {
          return {
            ...prev,
            attributeToSort: attribute === 'Clinic' ? 'name' : 'eorders_count',
            clinicArrow: attribute === 'Clinic' && !prev.clinicArrow,
            sortBy: prev.clinicArrow ? 'asc' : 'desc'
          };
        });
      }}>
      {!queryParams.clinicArrow ? (
        <ArrowDownwardIcon
          sx={{
            color: '#054E8B',
            fontSize: '18px',
            mr: '12px'
          }}
        />
      ) : (
        <ArrowUpwardIcon
          sx={{
            color: '#054E8B',
            fontSize: '18px',
            mr: '12px'
          }}
        />
      )}
      <Tooltip title={`Sort By ${attribute}`}>
        <Box>
          <Box
            sx={{
              fontFamily: 'Mukta',
              fontWeight: '700',
              fontSize: '15px',
              color: '#054E8B',
              lineHeight: '20px',
              letterSpacing: '0.005em'
            }}>
            {attribute}
          </Box>
        </Box>
      </Tooltip>
    </Box>
  );
}

export default SortAttribute;
