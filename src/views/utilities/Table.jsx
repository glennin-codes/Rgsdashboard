import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, FormControl, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = ['Name', 'Location', 'Role', 'Phone', 'Email', 'Actions'];

const ResponsiveTable = ({ data }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [displayedData, setDisplayedData] = useState([]);
console.log(data);
  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setDisplayedData(data.slice(startIndex, endIndex));
  }, [data, page, rowsPerPage]);

  // const handleChangePage = (_, newPage) => {
  //   setPage(newPage);
  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FormControl>
        <Select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}

        >
          <MenuItem value={5}>5 Rows</MenuItem>
          <MenuItem value={10}>10 Rows</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};

export default ResponsiveTable;
