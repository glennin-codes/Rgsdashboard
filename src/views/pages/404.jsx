// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const RenderNotFoundPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" gutterBottom>
        404 - Page not found
      </Typography>
      <Typography variant="body1">The page you are looking for might have been removed or doesn&apos;t exist.</Typography>
      <Button component={Link} to="/" variant="contained" color="primary" startIcon={<HomeIcon />} style={{ marginTop: '20px' }}>
        Go to Home
      </Button>
    </Box>
  );
};

export default RenderNotFoundPage ;
