import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, FormControl, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateUserModal from 'ui-component/Modal/update';
import UserDeleteModal from 'ui-component/Modal/DeleteModal';
import { setRefreshUpdate } from 'Redux/RefreshSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getDataFromLocalStorage } from 'views/pages/authentication/auth-forms/LocalStorage';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './Table.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
  
const columns = ['Name', 'Location', 'Role', 'Phone', 'Email','status','Actions'];

const ResponsiveTable = ({ data }) => {

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [displayedData, setDisplayedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[id,setId]=useState('')
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    password:"",
    id:""
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const currentDate = new Date(); 

   const getStatusIcon = (accountExpiration) => {
    if (!accountExpiration) {
      return <CheckCircleOutlineIcon style={{ color: 'green' }} />;
      } else if (new Date(accountExpiration) > currentDate) {
      return <PendingIcon className="spin" />;
    } else {
      return <ErrorOutlineIcon style={{ color: 'red' }} />;
    }
  };
  
 
 

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [renewalLoading, setRenewalLoading] = useState(false);
  const [password,setPassword]=useState("");
  const handleOpenDeleteModal = (_id) => {
    setIsDeleteModalOpen(true);
    setId(_id)
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    
  };

  const handleDeleteUser = async() => {
    
    setLoading(true);
    const token = getDataFromLocalStorage('token');

    try {
      const response = await axios.delete(`https://api.dowlladahahoosekgs.com/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setLoading(false);
        handleSnackbarOpen('Success: Deleted  successfully');
       dispatch(setRefreshUpdate());
       handleCloseDeleteModal();

      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err?.response?.status === 401) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 403) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 404) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 500) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else {
        handleSnackbarOpen('Error: Network problem, check your connections and try again');
      }
    }
  };

  const handleRenewUser = async(id) => {
    
    setRenewalLoading(true);
    const token = getDataFromLocalStorage('token');

    try {
      const response = await axios.post(`https://api.dowlladahahoosekgs.com/api/user/renewal`, {
        id
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setRenewalLoading(false);
        handleSnackbarOpen('Success:  User renewed successfully');
       dispatch(setRefreshUpdate());
       handleCloseDeleteModal();

      }
    } catch (err) {
      setRenewalLoading(false);
      console.log(err);
      if (err?.response?.status === 401) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 403) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 404) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 400) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 500) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else {
        handleSnackbarOpen('Error: Network problem, check your connections and try again');
      }
    }
  };
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

 setFormData({ ...formData, name:datas?.name,
  location: datas?.location,
  phone: datas?.phone,
  email:datas?.email,
 
  id:datas?._id
})
setPassword(datas?.password);
    setIsModalOpen(true);

}
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [weekendAccessLoading, setWeekendAccessLoading] = useState({});
  
  const grantWeekendAccess = async (userId) => {
    setWeekendAccessLoading(prev => ({ ...prev, [userId]: true }));
    const token = getDataFromLocalStorage('token');

    try {
      const response = await axios.patch(
        `https://api.dowlladahahoosekgs.com/api/employees/grant-weekend-access/${userId}`,
       {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response?.data) {
        const { message, expiresAt } = response.data;
  
        if (message && expiresAt) {
          // Parse the `expiresAt` timestamp
          const expiryDate = new Date(expiresAt).toLocaleString(); // Converts to local readable format
  
          // Display a more informative success message
          handleSnackbarOpen(
            `Success: ${message}. Access expires on ${expiryDate}, but regular working hours remain unchanged.`
          );
          
        } else {
          // Fallback for incomplete response
          handleSnackbarOpen("Success: Weekend access granted successfully.");
        }
      } else {
        // Fallback for undefined response
        handleSnackbarOpen("Success: Weekend access granted successfully.");
      }
      dispatch(setRefreshUpdate());
    } catch (err) {
      console.log(err)
      if (err?.response?.status === 401) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 403) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 404) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 400) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else if (err?.response?.status === 500) {
        handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
      } else {
        handleSnackbarOpen('Error: Network problem, check your connections and try again');
      }
    } finally {
      setWeekendAccessLoading(prev => ({ ...prev, [userId]: false }));
    }
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
                <TableCell>{getStatusIcon(row.accountExpiration)}</TableCell>
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
                  {row.role === 'user' && (
      <IconButton
        color="secondary"
        disabled={weekendAccessLoading[row._id]}
        onClick={() => grantWeekendAccess(row._id)}
        title="Grant weekend access"
      >
        <AccessTimeIcon />
      </IconButton>
    )}
                  {row.accountExpiration && new Date(row.accountExpiration) < currentDate && (
                    <IconButton
                      color="secondary"
                      disabled={renewalLoading}
                      size="small"
                      onClick={() => {
                        handleRenewUser(row._id)
                       
                      }}
                    >
                      <RefreshIcon  />
                    </IconButton>
                    )}
                   
                  <IconButton 
                  color="error"
                  onClick={()=>{
                    handleOpenDeleteModal(row._id)
                  }}
                  >

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
      setFormData={setFormData}
      password={password}
    />
      <UserDeleteModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteUser}
        snackbarOpen={snackbarOpen}
        handleSnackbarClose={handleSnackbarClose}
        snackbarMessage={snackbarMessage}
        loading={loading}
      />
    </>
    
  );
};

export default ResponsiveTable;
