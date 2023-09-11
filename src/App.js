import { useDispatch, useSelector } from 'react-redux';

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
import { decodeToken } from 'utils/decodeToken';
import { AuthLogout, loginSuccess } from 'Redux/authSlice';
import { checkTokenExpiryAndWorkingHours } from 'utils/checkTokenExpiry';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
  const dispatch = useDispatch();
  const decodedData = decodeToken(getDataFromLocalStorage('token'));
  const { name = '', location = '', role = '', isWorkingHours } = decodedData || {};

  useEffect(() => {
    if (checkTokenExpiryAndWorkingHours()) {
      dispatch(loginSuccess());
    } else {
      dispatch(AuthLogout());
    }
  }, [dispatch]);

  useEffect(() => {
    // Create an interval for periodic checks
    const checkWorkingHoursInterval = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();
      const dayOfWeek = now.getDay();

      // Check if it's a regular user outside working hours or on weekends
      if (
        role === 'user' &&
        (!isWorkingHours || currentHour < 8 || currentHour >= 17) &&
        dayOfWeek == 5 &&
        dayOfWeek == 6 &&
        dayOfWeek === 0
      ) {
        // Log out the regular user
        dispatch(AuthLogout());
      }
    }, 5000);

    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(checkWorkingHoursInterval);
    };
  }, [dispatch, isAuthenticated, role, isWorkingHours]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          {isAuthenticated ? (
            <Routes />
          ) : (
            <AuthLogin3 />
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
