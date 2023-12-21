import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  IconButton,
  Box,
  Typography,
  Grid,
  Alert,
  LinearProgress
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import SearchSection from 'layout/MainLayout/Header/SearchSection';
import { DateRangePicker } from 'ui-component/calenderPiker';
import { useSelector } from 'react-redux';
import PrintIcon from '@mui/icons-material/Print';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router';
import { CountryDropdown } from 'ui-component/DropDownFilter';
import PrintData from 'ui-component/PrintData';
import { getDataFromLocalStorage } from 'views/pages/authentication/auth-forms/LocalStorage';
import axios from 'axios';
const DisplayAll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [value, setValue] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const searchByDate = useSelector((state) => state.dateRange.dateSearch);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [printableData, setPrintableData] = useState(null);
  const [shouldPrint, setShouldPrint] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [currentPrintId, setCurrentPrintId] = useState(null);

  const navigate = useNavigate();

  const token = getDataFromLocalStorage('token');

  // Wrap the initialization of requestOptions in useMemo
  const requestOptions = useMemo(() => {
    return {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }, [token]);
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // console.log({ start: startDate, end: endDate });
      const startDateString = startDate ? startDate.toISOString() : ''; 
      const endDateString = endDate ? endDate.toISOString() : '';

      // console.log("start", startDateString);
      // console.log("end", endDateString);

      // console.log('location', locationQuery);

      const response = await axios.get(
        `https://plum-inquisitive-bream.cyclic.cloud/api/datas?page=${page}&limit=${limit}&search=${value}&startDate=${startDateString}&endDate=${endDateString}&l=${locationQuery}`,
        {  
        headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
    if(response.status === 200){
      setError('')
        // Handle successful responses
        const result = response.data;
        setLoading(false);
        setData(result.items);
        setTotalItems(result.totalItems);
    }
      
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // The request was made, but the server responded with an error
        const status = error.response.status;
        if (status === 401) {
          setError('Unauthorized: You are not authorized to access this resource.');
        } else if (status === 403) {
          setError('Forbidden: You do not have permission to access this resource.');
        } else if (status === 404) {
          const info = error.response.data;
          // console.log(info.message);
          setError(info.message);
        } else {
          console.error('Error:', status);
          setError(`Something went wrong? We are working around to bring everything to its place (Status: ${status})`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        setError('No response received. Check your connection and try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
        setError('Error setting up the request.Please  try again.');
      }
    }
   
    // data.length, totalItems
  }, [page, limit, value, startDate, endDate, locationQuery, requestOptions ]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

 

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalItems / limit)) {
      setPage(newPage);
    }
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };
  const handleView = (id) => {
    navigate(`/datas/all/single/${id}`);
  };

  // Function to handle printing
const HandlePrint = async (id) => {
  setIsLoading(true); // Set loading state

  try {
    const response = await axios.get(`https://plum-inquisitive-bream.cyclic.cloud/api/datas/${id}`, requestOptions);

    // Assuming a successful response has status code 200
    if (response.status === 200) {
      const data = response.data.data; // Adjust the property name based on your API response
      setPrintableData(data);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error (network, 4xx, 5xx)
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 401) {
          setError('Unauthorized: You are not authorized to access this resource.');
        } else if (error.response.status === 403) {
          setError('Forbidden: You do not have permission to access this resource.');
        } else if (error.response.status === 500) {
          setError('Something went wrong? We are working around to bring everything to its place');
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        setError('No response received. Check your connection and try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
        setError('Error setting up the request. Please try again.');
      }
    } else {
      // Non-Axios error
      console.error('Error fetching data:', error);
      setError('Network error! Please check your connection then try again.');
    }
  } finally {
    setIsLoading(false); // Reset loading state
  }
};
useEffect(() => {
  if (currentPrintId) {
    HandlePrint(currentPrintId);
    setCurrentPrintId(null); // Reset the currentPrintId after handling the print
  }
}, [currentPrintId]);

useEffect(() => {
  if (printableData) {
    setShouldPrint(true);
  }
}, [printableData]);

 return (    
  <>  
   {/*secondary={<SecondaryAction link="https://glenayienda.tech" />*/}
    <MainCard title="display all datas" >
      <Grid container spacing={5}>
        {/* On extra-small screens (xs), display components in a column */}
        <Grid item xs={12}>
          <SearchSection value={value} setValue={setValue} fetchData={fetchData} />
        </Grid>
        {searchByDate && (
          <Grid item xs={12}>
            <DateRangePicker
              fetchData={fetchData}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />

            <CountryDropdown variant='outlined' locationQuery={locationQuery} setLocationQuery={setLocationQuery} />
          </Grid>
        )}
      </Grid>

      <div>
        {error &&  <Alert
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
          </Alert>}
        {loading ? (
          <LinearProgress sx={{ width: '100%', }} />

        ) : data.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Bollectario No</TableCell>
                  <TableCell>Mud. / M ar.</TableCell>
                  <TableCell>Warqadda Tirsi</TableCell>
                  <TableCell>Xaafadda</TableCell>
                  <TableCell>X. Waqooyi</TableCell>
                  <TableCell>X. Galbeed</TableCell>
                  <TableCell>Taariikh</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.No}</TableCell>
                    <TableCell>{item.BollectarioNo}</TableCell>
                    <TableCell>{item.mudMar}</TableCell>
                    <TableCell>{item.Tirsi}</TableCell>
                    <TableCell>{item.Xaafadda}</TableCell>
                    <TableCell>{item.Waqooyi}</TableCell>
                    <TableCell>{item.Galbeed}</TableCell>
                    <TableCell>
                      <div
                        style={{
                          backgroundColor: 'lightblue',
                          fontWeight: '500',
                          fontSize: '16px',
                          padding: 4,
                          borderRadius: 10,
                          color: 'purple'
                        }}
                      >
                        {new Date(item.date).toLocaleDateString('en-GB')}
                      </div>
                    </TableCell>
                    <TableCell
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <IconButton onClick={() => handleView(item._id)} aria-label="View">
                        <VisibilityIcon />
                      </IconButton>
                      {isLoading ? (
                        <p>Loading</p>
                      ) : (
                        <IconButton onClick={() => setCurrentPrintId(item._id)} aria-label="Print">
                        <PrintIcon />
                      </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}

        <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
          <Typography variant="body2" color="textSecondary" mr={2}>
            Rows per page:
          </Typography>
          <Select value={limit} onChange={handleLimitChange}>
            {[10, 15, 20].map((pageSize) => (
              <MenuItem key={pageSize} value={pageSize}>
                {pageSize} rows per page
              </MenuItem>
            ))}
          </Select>

          <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
            <IconButton onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
              <KeyboardArrowLeft />
            </IconButton>
            <Typography variant="body2" color="textSecondary">
              Page {page} of {Math.ceil(totalItems / limit)}
            </Typography>
            <IconButton onClick={() => handlePageChange(page + 1)} disabled={page === Math.ceil(totalItems / limit)}>
              <KeyboardArrowRight />
            </IconButton>
          </Box>
        </Box>
      </div>
    
    </MainCard>

     <PrintData shouldPrint={shouldPrint} data={printableData} setShouldPrint={setShouldPrint} />
    </>

  );
};
export default DisplayAll;
