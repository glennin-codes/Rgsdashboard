import { Alert, Drawer, LinearProgress } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import UserPage from './Table';
import ResponsiveTable from './Table';
import { getDataFromLocalStorage } from 'views/pages/authentication/auth-forms/LocalStorage';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

// =============================|| TABLER ICONS ||============================= //

const Table = () => {
  const refreshUpdateId = useSelector((state) => state.refresh.refreshUpdateId);
  console.log(refreshUpdateId);
  
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const token = getDataFromLocalStorage('token');

  // console.log(token);
  useEffect(() => {
    // Fetch data from your API using Axios
    axios
      .get('https://plum-inquisitive-bream.cyclic.cloud/api/employees', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setData(response?.data?.employees);
      })
      .catch((err) => {
         setLoading(false);
      console.log(err);
      if (err?.response?.status === 401) {
        setError(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 403) {
        setError(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 404) {
        setError(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 500) {
        setError(`Error: ${err?.response?.data?.message}`);
      } else {
        setError('Error: Network problem, check your connections and try again');
      }
    });
  }, [token,refreshUpdateId]);

  return (
    <MainCard title="employees list ">
      <Drawer />
      {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              mt: 2,
              width: '100%',
              borderRadius: 2,
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {error}
          </Alert>
        )}
        {loading &&  <LinearProgress sx={{ width: '100%', }} />}
        
      {Array.isArray(data) && data.length > 0 && <ResponsiveTable data={data} /> }
    </MainCard>
  );
};

export default Table;
