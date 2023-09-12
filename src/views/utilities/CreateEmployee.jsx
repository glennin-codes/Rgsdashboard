import { Drawer } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import React, { useState } from 'react';
import { Container,  TextField, Button, Grid, Paper } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { generateRandomPassword } from 'utils/GeneratePassword';
import PhotoUpload from 'ui-component/PhotoUpload';

const initialState = {
  name: '',
  location: '',
  phone: '',
  photo: '',
  email: '',
  password: '',
};


 


const CreateEmployee = () =>{

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGeneratePassword = () => {
    const generatedPassword = generateRandomPassword(8); // Change 12 to your desired password length
    setFormData({ ...formData, password: generatedPassword });
  };
  

  const handleFileInputChange = () => {
    // Handle file input change to upload a photo
    // You can implement file upload logic here
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log(formData);
    // Reset the form if needed
    setFormData(initialState);
  };
return (
  <MainCard title="Register an Employee">
   
    <Drawer />
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
                Register Employee
              </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  </MainCard>
);
              };

export default CreateEmployee;
