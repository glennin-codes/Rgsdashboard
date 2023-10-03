import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { CircularProgress, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
export default function UserDeleteModal({ open, onClose, onDelete, snackbarOpen, handleSnackbarClose, snackbarMessage }) {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          fontFamily: 'Ubuntu'
        }}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this user? This action is irreversible.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            variant="outlined"
            color="primary"
            sx={{
              borderRadius: '10px',
              marginRight: '10px',
              '&:hover': {
                backgroundColor: 'purple',
                color: 'white',
                transform: 'scale(1.1)' // Scale the button on hover
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDelete();
              
            }}
            variant="outlined"
            disable={loading}
            sx={{
              border: '1px solid magenta',
              borderRadius: '10px',
              transition: 'transform 0.2s', // Add transition for smooth scaling
              '&:hover': {
                backgroundColor: 'red',
                color: 'white',
                transform: 'scale(1.1)' // Scale the button on hover
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarMessage.includes('Success') ? 'success' : 'error'}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
UserDeleteModal.propTypes = {
  open: PropTypes.bool,
  onClose:PropTypes.func,
  onDelete:PropTypes.func,
  snackbarOpen:PropTypes.bool,
  handleSnackbarClose:PropTypes.func,
  snackbarMessage:PropTypes.string
};
