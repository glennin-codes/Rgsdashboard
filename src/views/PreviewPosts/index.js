import React, { useState, useEffect, useCallback, useMemo } from 'react';
// material-ui

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
import { setRefreshUpdate } from 'Redux/RefreshSlice';
import { useDispatch, useSelector } from 'react-redux';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SearchSection from 'layout/MainLayout/Header/SearchSection';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router';
import { getDataFromLocalStorage } from 'views/pages/authentication/auth-forms/LocalStorage';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UserDeleteModal from 'ui-component/Modal/DeleteModal';
import axios from 'axios';
import { decodeToken } from 'utils/decodeToken';

const PreviewPosts = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [id, setId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshUpdateId = useSelector((state) => state.refresh.refreshUpdateId);
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
      const token = getDataFromLocalStorage('token');
      const decodedData = decodeToken(token);
      const response = await fetch(
        `https://api.dowlladahahoosekgs.com/api/reviewPost/${decodedData?.id}?page=${page}&limit=${limit}&search=${value}`,
        requestOptions
      );
      if (response.status === 401) {
        setError('Unauthorized: You are not authorized to access this resource.');
      } else if (response.status === 404) {
        const info = await response.json();
        setError(info.message);
      } else if (response.status === 403) {
        setError('Forbidden: You do not have permission to access this resource.');
      } else if (response.ok) {
        // Handle other successful responses
        const result = await response.json();
        setLoading(false);
        console.log(result);
        setData(result.items);
        setTotalItems(result.totalItems);
        // if (page === Math.ceil(totalItems / limit) && data.length === limit) {
        //   setLimit(limit * 2);
        // }
      } else {
        console.error('Error:', response.status);
        setError('Something went wrong? we are working around to bring everything to its place');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
      setError('Something went wrong! Check your connection and try again.');
    } finally {
      setLoading(false);
    }
    // data.length, totalItems
  }, [page, limit, value, requestOptions]);
  useEffect(() => {
    fetchData();
  }, [fetchData, refreshUpdateId]);

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

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleOpenDeleteModal = (_id) => {
    setIsDeleteModalOpen(true);
    setId(_id);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const HandleDelete = async () => {
    setIsLoading(true);
    const token = getDataFromLocalStorage('token');

    try {
      const response = await axios.delete(`https://api.dowlladahahoosekgs.com/api/datas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setIsLoading(false);
        handleSnackbarOpen('Success: Deleted  successfully');
        dispatch(setRefreshUpdate());
        handleCloseDeleteModal();
      }
    } catch (err) {
      setIsLoading(false);
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

  return (
    <MainCard title="Preview of recent posts">
      <Grid item xs={12}>
        <SearchSection value={value} setValue={setValue} fetchData={fetchData} />
      </Grid>

      <div>
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
        {loading ? (
          <LinearProgress sx={{ width: '100%' }} />
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
                        <IconButton onClick={() => handleOpenDeleteModal(item._id)} aria-label="delete">
                          <DeleteForeverIcon color="error" />
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
        <UserDeleteModal
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={HandleDelete}
          snackbarOpen={snackbarOpen}
          handleSnackbarClose={handleSnackbarClose}
          snackbarMessage={snackbarMessage}
          loading={isLoading}
        />
      </div>
    </MainCard>
  );
};

export default PreviewPosts;
