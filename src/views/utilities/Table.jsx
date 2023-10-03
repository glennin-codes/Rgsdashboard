import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, FormControl, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateUserModal from 'ui-component/Modal/update';

const columns = ['Name', 'Location', 'Role', 'Phone', 'Email', 'Actions'];

const ResponsiveTable = ({ data }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [displayedData, setDisplayedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    password:"",
  });


  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setDisplayedData(data.slice(startIndex, endIndex));
  }, [data, page, rowsPerPage]);

  // const handleChangePage = (_, newPage) => {
  //   setPage(newPage);
  // };
const handleData=(datas)=>{
  console.log(datas);

 setFormData({ name:datas?.name,
  location: datas?.location,
  phone: datas?.phone,
  email:datas?.email,
  password: datas?.password,
})
    setIsModalOpen(true);

}
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
   
    <>
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
              <TableRow key={row._id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                >
                  <IconButton 
                  onClick={()=>{
                    handleData(row)
                  }}
                  color="primary"
                  >
                    <EditIcon  />
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
      <UpdateUserModal
      open={isModalOpen}
      handleClose={handleCloseModal}
      formData={formData}
      setFormData
    />
    </>
    
  );
};

export default ResponsiveTable;
