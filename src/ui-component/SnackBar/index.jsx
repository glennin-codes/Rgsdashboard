import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const CustomSnackbar = ({ openSuccessSnackbar, openErrorSnackbar, successMessage, errorMessage, handleSuccessSnackbarClose, handleErrorSnackbarClose }) => {
  return (
    <>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={4000}
        onClose={handleSuccessSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleSuccessSnackbarClose} severity="success" elevation={6} variant="filled">
          {successMessage}
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={4000}
        onClose={handleErrorSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleErrorSnackbarClose} severity="error" elevation={6} variant="filled">
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default CustomSnackbar;
