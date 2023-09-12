import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Paper } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MainCard from 'ui-component/cards/MainCard';
import { generateRandomPassword } from 'utils/GeneratePassword';
import PhotoUpload from 'ui-component/PhotoUpload';
import axios from 'axios';
import { getDataFromLocalStorage } from 'views/pages/authentication/auth-forms/LocalStorage';
import CustomSnackbar from 'ui-component/SnackBar';

const initialState = {
  name: '',
  location: '',
  phone: '',
  photo: '',
  email: '',
  password: '',
};

export function CreateAdmin() {
  const [formData, setFormData] = useState(initialState);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGeneratePassword = () => {
    const generatedPassword = generateRandomPassword(8); // Change 12 to your desired password length
    setFormData({ ...formData, password: generatedPassword });
  };

  const handleSuccessSnackbarClose = () => {
    setOpenSuccessSnackbar(false);
  };
  
  const handleErrorSnackbarClose = () => {
    setOpenErrorSnackbar(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
  const token=getDataFromLocalStorage('token');
  
    // Create an Axios instance with the default headers
    const apiInstance = axios.create({
      baseURL: 'https://jade-panda-robe.cyclic.app', 
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    try {

      const response = await apiInstance.post('/api/admin', formData);
  // Handle success
     
  setSuccessMessage(response.data.message);
  setOpenSuccessSnackbar(true);
      // Handle the API response as needed
      console.log('API Response:', response.data);
  
      // Reset the form if needed
      setFormData(initialState);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
      setOpenErrorSnackbar(true);
      console.error('API Error:', error);

    }
  };
  return (

  <MainCard title="Register an Admin">
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        
        <form onSubmit={handleSubmit} style={{
          marginTop:"20px"
        }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                name="location"
                fullWidth
                variant="outlined"
                value={formData.location}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                name="phone"
                fullWidth
                variant="outlined"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                fullWidth
                variant="outlined"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <Button onClick={handleGeneratePassword} variant="contained">
                      Generate
                    </Button>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <PhotoUpload setFormData={setFormData} formData={formData}/>
            </Grid>
            <Grid item xs={12}>
              <AnimateButton>
              <Button type="submit" variant="contained" color="secondary" fullWidth>
                Register
              </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <CustomSnackbar
        openSuccessSnackbar={openSuccessSnackbar}
        openErrorSnackbar={openErrorSnackbar}
        successMessage={successMessage}
        errorMessage={errorMessage}
        handleSuccessSnackbarClose={handleSuccessSnackbarClose}
        handleErrorSnackbarClose={handleErrorSnackbarClose}
      />
    </Container>
    </MainCard>
  );
}

export default CreateAdmin;
