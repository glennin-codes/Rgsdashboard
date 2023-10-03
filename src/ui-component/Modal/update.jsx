import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Container,
  // useMediaQuery,
} from '@mui/material';

const UpdateUserModal = ({ open, handleClose, formData, setFormData }) => {

  // const fullScreen = useMediaQuery('(max-width:600px)');

console.log(formData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    // Handle updating user data here
    // You can send formData to your API to update the user
    // Close the modal after the update is successful
    handleClose();
  };

  return (
    <Dialog
      open={open}
     
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <Container>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
          />
          {/* Add fields for password and photo here */}
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUserModal;
   
   
   
