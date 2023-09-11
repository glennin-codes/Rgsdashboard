import {  useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import Loadable from 'ui-component/Loadable';
import { lazy } from 'react';
import { useEffect } from 'react';
import { getDataFromLocalStorage } from 'views/pages/authentication/auth-forms/LocalStorage';


// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
  // useEffect(() => {
  //   // Create an interval for periodic checks
  //   const checkWorkingHoursInterval = setInterval(() => {
  //     const now = new Date();
  //     const currentHour = now.getHours();
  //   // Check if it's a regular user outside working hours or on weekends
  //     if (userRole === 'employee' && (!isWorkingHours || (currentHour < 8 || currentHour >= 17))) {
  //       // Log out the regular user
  //       dispatch(logoutUser());
  //     }
  //   }, 60000); // Check every minute (adjust the interval as needed)

  //   return () => {
  //     // Clean up the interval when the component unmounts
  //     clearInterval(checkWorkingHoursInterval);
  //   };
  // }, [dispatch, isAuthenticated, userRole, isWorkingHours]);
  // const data =decode(getDataFromLocalStorage('token'));  


  return (
    <StyledEngineProvider injectFirst>
     
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
        {isAuthenticated ? (
            <Routes />
          ) : (
            <AuthLogin3/>
            // Render the login page when not authenticated
            // You can add any login redirection logic here
               // Replace with your login component or redirection logic
          )}
        </NavigationScroll>
      </ThemeProvider>
  
    </StyledEngineProvider>
  );
};

export default App;
