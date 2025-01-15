import { Drawer, IconButton } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Grid } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { generateRandomPassword } from 'utils/GeneratePassword';
import PhotoUpload from 'ui-component/PhotoUpload';
import axios from 'axios';
import { getDataFromLocalStorage } from 'views/pages/authentication/auth-forms/LocalStorage';
import CustomSnackbar from 'ui-component/SnackBar';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CountryDropdown } from 'ui-component/DropDownFilter';


const initialState = {
  name: '',
  location: '',
  phone: '',
  photo: '',
  email: '',
  password: ''
};

const CreateEmployee = () => {
  const [formData, setFormData] = useState(initialState);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [location, setLocation] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGeneratePassword = () => {
    const generatedPassword = generateRandomPassword(8); 
    setFormData({ ...formData, password: generatedPassword });
  };
  const handleSuccessSnackbarClose = () => {
    setOpenSuccessSnackbar(false);
  };

  const handleErrorSnackbarClose = () => {
    setOpenErrorSnackbar(false);
  };
  useEffect(() => {
    if (location) {
      setFormData((prevData) => ({
        ...prevData,
        location,
      }));
    }
  }, [location]); 

  const handleSubmit = async (event) => {
    event.preventDefault();
 
    const token = getDataFromLocalStorage('token');

    // Create an Axios instance with the default headers
    const apiInstance = axios.create({
      baseURL: 'http://204.12.245.222:8080',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    try {
      const response = await apiInstance.post('/api/employees', formData);

      // Handle success

      setSuccessMessage(response.data.message);
      setOpenSuccessSnackbar(true);
      // Reset the form if needed
      setFormData(initialState);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
      setOpenErrorSnackbar(true);
    }
  };
  return (
    <MainCard title="Register an Employee">
      <Drawer />
      <Container maxWidth="sm"
      sx={{
        position:'relative'
      }}
      >
        {/* <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}> */}
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: '20px'
            }}
          >
            <Grid container spacing={2}  >
              <Grid item xs={12}>
                <TextField required label="Name" name="name" fullWidth variant="standard" value={formData.name} onChange={handleInputChange} />
              </Grid>
              <Grid item xs={12}>
              <CountryDropdown variant='standard' locationQuery={location} setLocationQuery={setLocation} />
    
    </Grid>
              <Grid item xs={12}>
                <TextField  label="Phone(optional)" name="phone" fullWidth variant="standard" value={formData.phone} onChange={handleInputChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField  autoComplete="username"  required label="Email" name="email" fullWidth variant="standard" value={formData.email} onChange={handleInputChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField
               required
                  label="Password"
                  name="password"
                  fullWidth
                  variant="standard"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                    <>
                     <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                      <AnimateButton>
                      <Button 
                      color="secondary" 
                      onClick={handleGeneratePassword} 
                      variant="outlined"
                      >
                        Generate
                      </Button>
                      </AnimateButton>
                    </>
                    )
                  }}
                />
              </Grid>
              <Grid item 
              xs={12}
              sx={{
                marginTop:'10px'
              }} 
              >
                <PhotoUpload setFormData={setFormData} formData={formData} />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end'}}   >
                <AnimateButton>
                  <Button type="submit" variant="contained" color="secondary" position='end' >
                    Register Employee
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        {/* </Paper> */}
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
};

export default CreateEmployee;
