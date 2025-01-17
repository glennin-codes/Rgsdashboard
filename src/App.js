import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import themes from 'themes';
import NavigationScroll from 'layout/NavigationScroll';
import Loadable from 'ui-component/Loadable';
import { lazy } from 'react';
import { useEffect } from 'react';
import { getDataFromLocalStorage } from 'views/pages/authentication/auth-forms/LocalStorage';
import { decodeToken } from 'utils/decodeToken';
import { AuthLogout, loginSuccess } from 'Redux/authSlice';
import { checkTokenExpiryAndWorkingHours } from 'utils/checkTokenExpiry';
import { useDispatch } from 'react-redux';
import {  useLocation, useNavigate } from 'react-router-dom';
import Routes from 'routes'
import { setRole } from 'Redux/RoleSlyce';

const App = () => {
  const customization = useSelector((state) => state.customization);
  const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const Register = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
  const dispatch = useDispatch();
  const decodedData = decodeToken(getDataFromLocalStorage('token'));
  const {  role = '', isWorkingHours } = decodedData || {};
  const pathLocation = useLocation();
  const isMasterRegisterRoute = pathLocation.pathname.includes('master-register');
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const navigate = useNavigate();
  useEffect(() => {
    if (checkTokenExpiryAndWorkingHours()) {
      dispatch(loginSuccess());
    } else {
      localStorage.removeItem('token');
        // Log out the regular user
        dispatch(AuthLogout());
        if(!isMasterRegisterRoute){
          navigate('/')
        }
     
    }
  }, [dispatch]);
  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Decode the token
      const decodedData = decodeToken(token);

      // Dispatch the setRole action
      dispatch(setRole(decodedData.role));
    }
  }, [dispatch]);
  useEffect(() => {
    // Create an interval for periodic checks
    const checkWorkingHoursInterval = setInterval(() => {
      setCurrentHour(new Date().getHours());
      const now = new Date();
      const dayOfWeek = now.getDay();

      // Check if it's a regular user outside working hours or on weekend that is friday
      if (
        role === 'user' &&
        (!isWorkingHours || currentHour < 7 || currentHour >= 20) &&
        (dayOfWeek === 5  && !checkTokenExpiryAndWorkingHours())
      ) {

        localStorage.removeItem('token');
        // Log out the regular user
        dispatch(AuthLogout());
        navigate('/')
      }
    }, 5000);

    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(checkWorkingHoursInterval);
    };
  }, [dispatch, isAuthenticated, role, isWorkingHours,currentHour]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>{isMasterRegisterRoute ? <Register /> : isAuthenticated ? <Routes /> : <AuthLogin3 />}</NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
