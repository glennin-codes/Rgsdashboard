 import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, IconButton, Box, Typography } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import SearchSection from 'layout/MainLayout/Header/SearchSection';



const DisplayAll = () =>{
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [value, setValue] = useState('');


const fetchData = async () => {
  try {
    const response = await fetch(
      `https://plum-inquisitive-bream.cyclic.cloud/api/datas?page=${page}&limit=${limit}&search=${value}`
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
  }, [page, limit,value]);
console.log(value);

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
 return(
  <MainCard title="display all datas" secondary={<SecondaryAction link="https://glenayienda.tech" />}>
     <SearchSection value={value} setValue={setValue} fetchData={fetchData}/>
 

     <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>HouseNo</TableCell>
              <TableCell>Land Size</TableCell>
              <TableCell>location</TableCell>
              <TableCell>No.Family</TableCell>
              <TableCell>paymentId</TableCell>
              {/* Add more table columns as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item,index) => (
              <TableRow key={item._id}>
                <TableCell>{index}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.houseNo}</TableCell>
                <TableCell>{item.landInSquareMetres}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.numberOfFamily}</TableCell>
                <TableCell>{item.paymentUniqueId}</TableCell>
                {/* Render additional columns */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
        <Typography variant="body2" color="textSecondary" mr={2}>
          Rows per page:
        </Typography>
        <Select value={limit} onChange={handleLimitChange}>
          {[10, 20, 30].map((pageSize) => (
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
          }
export default DisplayAll;
