import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Typography,
  CircularProgress
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';



export const AccountProfileDetails = ({values,setValues,isLoading,handleUpdate}) => {
  const [error,setError]=useState('');

  const handleChange =  (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    };
useEffect(
  ()=>{
    if(values.password && values.checkpassword){
      if(values.password !== values.checkpassword){
        setError('passwords do not match')
      }
      else{
        setError('')
      }
    }
       
  },[values?.checkpassword,values?.password]
)
  
console.log('values before handle update is called ',values)
const handleSubmit = useCallback(
  async (event) => {
    event.preventDefault();
    
    // Use the current state (values) directly here
    await handleUpdate(values.id);
  },
  [values, handleUpdate]
);


  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="View and edit  your profile"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please fill in your full Name"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  type='text'
                  required
                  value={values.name}
                />
              </Grid>
             
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  type='email'
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  type='text'
                  onChange={handleChange}
                  required
                  value={values.location}
                />
              </Grid>
        <Grid
         xs={12}
      

        >
             <Typography
                color="text.secondary"
                variant="body2"
         >
                Change Password
         </Typography>

        </Grid>
        <Grid
                xs={12}
                md={6}
              >
                <TextField
                color={
                  error?'error':'primary'
                }
                  fullWidth
                  type='password'
                  label="Password"
                  name="checkpassword"
                  onChange={handleChange}
                  required
                  value={values.checkpassword}
                  helperText={error?error:""}
                />
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
                <TextField
                 color={
                  error?'error':'primary'
                }
                  fullWidth
                  label="Confirm Password"
                  name="password"
                  onChange={handleChange}
                  type='password'
                  required
                  value={values.password}
                  helperText={error?error:""}
                />
              </Grid>
              
             
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
        <AnimateButton>
                <Button disabled={isLoading} size="large" type="submit" fullWidth variant="contained" color="secondary">
                {isLoading?(<CircularProgress size={24} sx={{
                  color:'green'
                }} />):'Save Details'}  
                </Button>
              </AnimateButton>
        </CardActions>
      </Card>
    </form>
  );
};
