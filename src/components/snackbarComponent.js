import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar } from '../reducers/snackbarReducer';

  const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const AVAILABLE_SEVERITY = ["error","info","success","warning"];

  export default function SnackBarComponent(props) {
    const {isOpen, severity, message, label} = useSelector((state) => state.snackbar);
   
    const dispatch = useDispatch();

    const handleClose = () => dispatch(closeSnackbar());
  
    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert severity={AVAILABLE_SEVERITY.indexOf(severity) > -1 ? severity : "success" } sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    );
  }