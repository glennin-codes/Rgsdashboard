import { useEffect, useState } from 'react';

// material-ui
import { Box,  } from '@mui/material';
import LandOwnershipForm from 'ui-component/FillForm';
// project imports


// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  console.log(isLoading);
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
