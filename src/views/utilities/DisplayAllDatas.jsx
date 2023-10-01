import React, { useState, useEffect, useCallback } from 'react';
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
  Alert
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import SearchSection from 'layout/MainLayout/Header/SearchSection';
import { DateRangePicker } from 'ui-component/calenderPiker';
import { useSelector } from 'react-redux';
import PrintIcon from '@mui/icons-material/Print';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router';
import { CountryDropdown } from 'ui-component/DropDownFilter';
import PrintData from 'ui-component/PrintData';
import SimpleBackdrop from 'views/pages/data/BackDrop';
import { getDataFromLocalStorage } from 'views/pages/authentication/auth-forms/LocalStorage';
const DisplayAll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [value, setValue] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const searchByDate = useSelector((state) => state.dateRange.dateSearch);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [printableData, setPrintableData] = useState(null);
  const [shouldPrint, setShouldPrint] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

 const token = getDataFromLocalStorage('token');
  const requestOptions = {
    method: 'GET', 
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      console.log({ start: startDate, end: endDate });
      const startDateString = startDate ? startDate.toISOString() : '';
      const endDateString = endDate ? endDate.toISOString() : '';
      console.log('start', startDateString);
      console.log('end', endDateString);
      const response = await fetch(
        `https://plum-inquisitive-bream.cyclic.cloud/api/datas?page=${page}&limit=${limit}&search=${value}&startDate=${startDateString}&endDate=${endDateString}`,
     requestOptions
      );
      if (response.status === 401) {
      
        setError('Unauthorized: You are not authorized to access this resource.');
      } else if (response.status === 403) {
        setError('Forbidden: You do not have permission to access this resource.');
      } else if (response.ok) {
        // Handle other successful responses
        const result = await response.json();
        setLoading(false);
        console.log(result);
        setData(result);
        console.log(result.length);
        setTotalPages(Math.ceil(result.length / limit));
      } else {
     
        console.error('Error:', response.status);
        setError('Something went wrong? we are working around to bring everything to its place');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
      setError('Something went wrong! Check your connection and try again.');
    }finally{
      setLoading(false)
    }
    
  }, [page, limit, value, startDate, endDate]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(endDate);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
    // Increase the limit when reaching the end of the page
    if (newPage === totalPages && data.length === limit) {
      setLimit(limit * 2);
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
      // Fetch the data for the selected dataset using the ID
      const response = await fetch(`https://plum-inquisitive-bream.cyclic.cloud/api/datas/${id}`, requestOptions);  
      if (response.status === 401) {
        setError('Unauthorized: You are not authorized to access this resource.');
      } else if (response.status === 403) {
        setError('Forbidden: You do not have permission to access this resource.');
      } else if (response.status === 500){
         setError('Something went wrong? we are working around to bring everything to its place')
      } else if (response.ok) {
        const result = await response.json();
        const data = result.data;
        setPrintableData(data);
      } else {
        console.error('Error:', response.status);
        setError('Network error! Please check your connection then try again');
      }
      setShouldPrint(true);
    } catch (error) {
      setError('Network error! Please check your connection then try again');
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <MainCard title="display all datas" secondary={<SecondaryAction link="https://glenayienda.tech" />}>
      
      <Grid container spacing={5} >
  {/* On extra-small screens (xs), display components in a column */}
  <Grid item xs={12} >
    <SearchSection value={value} setValue={setValue} fetchData={fetchData} />
  </Grid>
  {searchByDate && (
    <Grid item xs={12} >
      <DateRangePicker
        fetchData={fetchData}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      
    <CountryDropdown />

    </Grid>
  )}
 
</Grid>

      <div>
      {error && <Alert severity="error">{error}</Alert>}
        {loading ? (
          <SimpleBackdrop open={loading} />
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
                        <IconButton onClick={() => HandlePrint(item._id)} aria-label="Print">
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
            {[5, 10, 20].map((pageSize) => (
              <MenuItem key={pageSize} value={pageSize}>
                {pageSize} rows per page
              </MenuItem>
            ))}
          </Select>
          <IconButton onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            <KeyboardArrowLeft />
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            Page {page} of {totalPages}
          </Typography>
          <IconButton onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </div>
      {printableData && <PrintData shouldPrint={shouldPrint} data={printableData} setShouldPrint={setShouldPrint} />}
    </MainCard>
  );
};
export default DisplayAll;
