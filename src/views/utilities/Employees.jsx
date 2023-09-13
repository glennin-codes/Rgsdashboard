import { Drawer } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import UserPage from './Table';
import ResponsiveTable from './Table';
import { getDataFromLocalStorage } from 'views/pages/authentication/auth-forms/LocalStorage';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

// =============================|| TABLER ICONS ||============================= //

const Table = () => {
  const [data, setData] = useState([]);
  const token = getDataFromLocalStorage('token'); 

  // console.log(token);
  useEffect(() => {
    // Fetch data from your API using Axios
    axios
      .get('https://jade-panda-robe.cyclic.app/api/employees', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setData(response?.data?.employees);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [token]);

  return (
    <MainCard title="employees list ">
      <Drawer />
      {Array.isArray(data) && data.length > 0 ? (
      <ResponsiveTable data={data} />
    ) : (
      <p>Loading...</p>
    )}
    </MainCard>
  );
};

export default Table;
