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


// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));

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
