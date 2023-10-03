import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar
  // useMediaQuery,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import { getDataFromLocalStorage } from 'views/pages/authentication/auth-forms/LocalStorage';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setRefreshUpdate } from 'Redux/RefreshSlice';
const locations = [
  'Afgooye',
  'Awdheegle',
  'Baraawe',
  'Kuntuwaarey',
  'Marka',
  'Qoryooley',
  'Wanlaweyn',
  'Sablaale',
  'Baydhabo',
  'Buurhakabo',
  'Bardaale',
  'Diinsoor',
  'Qansax-dheere',
  'Hudur',
  'Waajid',
  'Tayeeglow',
  'Ceel-Barde',
  'Rabdhure'
];
const UpdateUserModal = ({ open, handleClose, formData, setFormData }) => {
  // const fullScreen = useMediaQuery('(max-width:600px)');
  const dispatch=useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleUpdate = async (event) => {
    event.preventDefault();
   setLoading(true);
    const token = getDataFromLocalStorage('token');

    try {
      const response = await axios.put(`https://plum-inquisitive-bream.cyclic.cloud/api/employees/${formData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setLoading(false);
        handleSnackbarOpen('Success: User Updated successfully');
       dispatch(setRefreshUpdate());
        handleClose();

      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err?.response?.status === 401) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 403) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 404) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 500) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else {
        handleSnackbarOpen('Error: Network problem, check your connections and try again');
      }
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <Container>
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleInputChange} margin="normal" />
            <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleInputChange} margin="normal" />
            <FormControl
              margin="normal"
              required
              sx={{
                width: '100%'
              }}
            >
              <InputLabel>Location</InputLabel>
              <Select
                label="Location"
                name="location"
                // sx={{
                //     width:"50%"
                // }}
                value={formData.location}
                onChange={handleInputChange}
              >
                {locations.map((location, index) => (
                  <MenuItem key={index} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} margin="normal" />
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleInputChange} margin="normal" />
            <TextField fullWidth label="password" name="password" value={formData.password} onChange={handleInputChange} margin="normal" />
            {/* Add fields for password and photo here */}
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : ' Update'}
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
};

export default UpdateUserModal;
UpdateUserModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  formData: PropTypes.object,
  setFormData: PropTypes.func
};
