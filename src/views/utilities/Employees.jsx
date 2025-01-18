import { useState, useEffect } from 'react';
import { 
  Alert, 
  Drawer, 
  LinearProgress, 
  TextField, 
  Box,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MainCard from 'ui-component/cards/MainCard';
import ResponsiveTable from './Table';
import { getDataFromLocalStorage } from 'views/pages/authentication/auth-forms/LocalStorage';
import axios from 'axios';
import { useSelector } from 'react-redux';
 const Table = () => {
  const refreshUpdateId = useSelector((state) => state.refresh.refreshUpdateId);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const token = getDataFromLocalStorage('token');

  const fetchEmployees = async (searchTerm = '') => {
    setLoading(true);
    setError(``);
    try {
      const response = await axios.get(
        `https://api.dowlladahahoosekgs.com/api/employees?search=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setData(response?.data?.employees);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err?.response?.status === 401) {
        setError(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 403) {
        setError(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 404) {
        setError(`Error: ${err?.response?.data?.message}`);
        setData([]);
      } else if (err?.response?.status === 500) {
        setError(`Error: ${err?.response?.data?.message}`);
      } else {
        setError('Error: Network problem, check your connections and try again');
      }
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchEmployees(search);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, token, refreshUpdateId]);

  return (
    <MainCard title="Employees List">
      <Drawer />
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <TextField
          placeholder="Search by name, location, or phone"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: '300px' }}
        />
      </Box>
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
      {loading && <LinearProgress sx={{ width: '100%' }} />}
      {Array.isArray(data) && data.length > 0 && <ResponsiveTable data={data} />}
    </MainCard>
  );
};
export default Table;
