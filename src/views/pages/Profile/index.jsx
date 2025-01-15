import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Snackbar } from '@mui/material';
import { AccountProfile } from 'Sections/Account/Account-Profile';
import { AccountProfileDetails } from 'Sections/Account/Account-Profile-Details';
import { useCallback, useEffect, useState } from 'react';
import { decodeToken } from 'utils/decodeToken';
import { getDataFromLocalStorage } from '../authentication/auth-forms/LocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { setRefreshUpdate } from 'Redux/RefreshSlice';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import SimpleBackdrop from '../data/BackDrop';
const ProfilePage = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    checkpassword:'',
    role: '',
    id: ''
  });

  const refreshUpdateId = useSelector((state) => state.refresh.refreshUpdateId);
  const dispatch = useDispatch();
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleFetchUser = useCallback(async (id) => {
    setLoading(true);
    const token = getDataFromLocalStorage('token');

    try {
      const response = await axios.get(`http://204.12.245.222:8080/api/user/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setLoading(false);
       
        const { person } = response.data;
        console.log(person);
        setValues({
          ...values,
          name: person.name,
          email: person.email,
          phone: person.phone,
          location: person.location,
         
          role: person.role,
          id: person._id
        });
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
  }, []);
  const handleUpdate = async (id) => {
    console.log('clicked');
    setIsLoading(true);
    const token = getDataFromLocalStorage('token');
    console.log('values after handle update is called', values);
    try {
      const response = await axios.patch(`http://204.12.245.222:8080/api/user/profile/${id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setIsLoading(false);
        handleSnackbarOpen('Success: User Updated successfully');
        dispatch(setRefreshUpdate());
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      if (err?.response?.status === 401) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 403) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 404) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 409) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 500) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else {
        handleSnackbarOpen('Error: Network problem, check your connections and try again');
      }
    }
  };
  useEffect(() => {
    const token = getDataFromLocalStorage('token');
    if (token) {
      const decodedTokenData = decodeToken(token);
      handleFetchUser(decodedTokenData.id);
    }
  }, [refreshUpdateId, handleFetchUser]);
  return (
    <>
      {loading ? (
        <SimpleBackdrop open={loading} />
      ) : (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth="lg">
            <Stack spacing={3}>
              <div>
                <Typography variant="h4">Account</Typography>
              </div>
              <div>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6} lg={4}>
                    <AccountProfile values={values} setValues={setValues} />
                  </Grid>
                  <Grid xs={12} md={6} lg={8}>
                    <AccountProfileDetails values={values} setValues={setValues} handleUpdate={handleUpdate} isLoading={isLoading} />
                  </Grid>
                </Grid>
              </div>
            </Stack>
          </Container>
        </Box>
      )}
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
export default ProfilePage;
