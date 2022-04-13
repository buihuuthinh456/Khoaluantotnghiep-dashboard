import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Loading() {
  return (
    <Box sx={{ display: 'flex', color:'blue', transform:'translateX(100%)'}} >
      <CircularProgress size={100} />
    </Box>
  )
}

export default Loading


