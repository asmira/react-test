import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

const LoaderComponent = () => {
  const {isOpen} = useSelector((state)=> state.loader);

  React.useEffect(() => {
    console.log("isOpen", isOpen);
  },[isOpen])
  return (
    <Box
        sx={{
          display: (isOpen)?"flex":"none",
          position: 'absolute',
          top: 20,
          left: '90%',
          zIndex: 'tooltip',
        }}
      >
        <CircularProgress />
      </Box>
  );
}

export default LoaderComponent;