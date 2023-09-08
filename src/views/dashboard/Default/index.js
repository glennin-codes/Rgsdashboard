import { useEffect, useState } from 'react';

// material-ui
import { Box, Grid, Typography } from '@mui/material';
import LandOwnershipForm from 'ui-component/FillForm';
// project imports


// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
<Box>
<LandOwnershipForm/>
</Box>
  );
};

export default Dashboard;
