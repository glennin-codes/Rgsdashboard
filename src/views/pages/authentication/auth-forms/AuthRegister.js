import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhotoUploadField from 'ui-component/FormikPhotoUpload';
import CustomSnackbar from 'ui-component/SnackBar';
import axios from 'axios';
import { useNavigate } from 'react-router';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);


  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };
  const handleSuccessSnackbarClose = () => {
    setOpenSuccessSnackbar(false);
  };

  const handleErrorSnackbarClose = () => {
    setOpenErrorSnackbar(false);
  };
const navigate=useNavigate()

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          phone: '',
          location: '',
          photo: '',
          fname:"",
          lname:""
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
          phone: Yup.number().required('Phone number is required'),
          location: Yup.string().max(280).required('Location or an Address  is required'),
          
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting ,resetForm}) => {
          const dataToSend = {
            photo: selectedImage, // You might need to serialize this if it's not a file path or URL
            email: values.email,
            password: values.password,
            location: values.location,
            phone: values.phone,
            name: values.fname + ' ' + values.lname,
          };
      
          try {
            console.log('formdata',dataToSend);
         
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
            const response = await axios.post('https://jade-panda-robe.cyclic.app/api/master-admin',dataToSend);
           
            setSuccessMessage(response.data.message);
            setOpenSuccessSnackbar(true);
            resetForm();
            setSelectedImage(null);
            setTimeout(() => {
              // Navigate after the delay (e.g., 3 seconds)
              navigate('/');
            }, 3000);
          
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err?.response?.data?.message});
              setSubmitting(false);
            }
            setErrorMessage(err?.response?.data?.message);
            setOpenErrorSnackbar(true);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  margin="normal"
                  name="fname"
                  type="text"
                  value={values.fname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                 
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  name="lname"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                 
                  value={values.lname}
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.location && errors.location)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-location-register">Address Location</InputLabel>
              <OutlinedInput
                id="outlined-adornment-address-register"
                type="text"
                value={values.location}
                name="location"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.location && errors.location && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.location}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-phone-register">Phone Number</InputLabel>
              <OutlinedInput
                id="outlined-adornment-phone-register"
                type="text"
                value={values.phone}
                name="phone"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.phone && errors.phone && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.phone}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}
            <PhotoUploadField
              name="photo"
              value={values.photo}
              error={Boolean(touched.photo && errors.photo)}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}

            />

            {errors.submit && (
              <Box sx={{ mt: 2}}>
                <FormHelperText  sx={{textAlign:"center"}} error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>

        )}
      </Formik>
      <CustomSnackbar
          openSuccessSnackbar={openSuccessSnackbar}
          openErrorSnackbar={openErrorSnackbar}
          successMessage={successMessage}
          errorMessage={errorMessage}
          handleSuccessSnackbarClose={handleSuccessSnackbarClose}
          handleErrorSnackbarClose={handleErrorSnackbarClose}
        />
    </>
  );
};

export default FirebaseRegister;
