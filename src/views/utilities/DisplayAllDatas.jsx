import React, { useState, useEffect } from 'react';
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
  Grid
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
import PrintData from 'ui-component/PrintData';
import { CountryDropdown } from 'ui-component/DropDownFilter';
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
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      console.log({ start: startDate, end: endDate });
      const startDateString = startDate ? startDate.toISOString() : '';
      const endDateString = endDate ? endDate.toISOString() : '';
      console.log('start', startDateString);
      console.log('end', endDateString);
      const response = await fetch(
        `https://plum-inquisitive-bream.cyclic.cloud/api/datas?page=${page}&limit=${limit}&search=${value}&startDate=${startDateString}&endDate=${endDateString}`
      );
      const result = await response.json();
      console.log(result);
      setData(result);
      console.log(result.length);
      setTotalPages(Math.ceil(result.length / limit));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, limit, value, endDate]);
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
  const handlePrint = async (id) => {
    setIsLoading(true); // Set loading state

    try {
      // Fetch the data for the selected dataset using the ID
      const response = await fetch(`https://plum-inquisitive-bream.cyclic.cloud/api/datas/${id}`);
      const result = await response.json();
      const data = result.data;
      // Print the data without navigating to the page
      // PrintData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  return (
    <MainCard title="display all datas" secondary={<SecondaryAction link="https://glenayienda.tech" />}>
      <Grid container spacing={2}>
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
          </Grid>
         
        )}
        <Grid item xs={12}>
          <CountryDropdown />
          

        </Grid>
        
      </Grid>
      <div>
        {data.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>HouseNo</TableCell>
                  <TableCell>Land Size</TableCell>
                  <TableCell>location</TableCell>
                  <TableCell>No. Family</TableCell>
                  <TableCell>Payment ID</TableCell>
                  <TableCell>Date Uploaded</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.houseNo}</TableCell>
                    <TableCell>{item.landInSquareMetres}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.numberOfFamily}</TableCell>
                    <TableCell>{item.paymentUniqueId}</TableCell>

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
                        <p>locading</p>
                      ) : (
                        <IconButton onClick={() => handlePrint(item._id)} aria-label="Print">
                          <PrintIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

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
    </MainCard>
  );
};
export default DisplayAll;
