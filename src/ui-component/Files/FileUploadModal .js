import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Input, Button, IconButton, Grid, CircularProgress } from '@mui/material';
import { Cancel, Delete } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { Box } from '@mui/system';

const FileUploadModal = ({ open, onClose, info, setShowUploadBtn }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  ///file uploud states
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  // const [uploadCancelToken, setUploadCancelToken] = useState(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };


  const handleUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });
      // const cancelToken = axios.CancelToken.source();
      // setUploadCancelToken(cancelToken);

      // Make a POST request to the API with the FormData
      const res = await axios.post(`https://plum-inquisitive-bream.cyclic.cloud/api/files/${info?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progressPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);

          // Update state with the progress percentage
          setUploadProgress(progressPercentage);
        }
      });

      if (res.status === 200) {
        setUploadProgress(null);
        setLoading(false);
        setOpenSnackBar(true);
        setSuccess(res.data.message);
        setSelectedFiles([]);
        onClose();
        setShowUploadBtn(false);
      }
    } catch (error) {
      setLoading(false);
      setUploadProgress(null);
      setOpenSnackBar(true);
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 400) {
          console.error('Bad Request:', error.response.data);
          setError(error.response.data.error);
        } else if (error.response.status === 403) {
          console.error('Forbidden:', error.response.data);
          setError(error.response.data.error);
        } else if (error?.response?.status === 500) {
          console.error('Internal Server Error:', error.response?.data);
          setError(error.response.data.error);
        } else {
          console.error('Unexpected Error:', error.response.data);
          setError('An unexpected error occurred.');
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Network Error:', error.request);
        setError('Network error. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('General Error:', error);
        setError(error.message);
      }
    }
  };
  // const handleCancelUpload = () => {
  //   // Check if there's an ongoing upload and cancel it
  //   if (uploadCancelToken) {
  //     uploadCancelToken.cancel('Upload canceled by user');
  //     setError('Upload canceled by user');
  //     setUploadProgress(null);
  //   }

  //   // Reset upload progress
  //   setUploadProgress(null);
  // };

  // // Cleanup the cancel token on component unmount
  // useEffect(() => {
  //   return () => {
  //     if (uploadCancelToken) {
  //       uploadCancelToken.cancel('Component unmounted');
       
  //     }
   
  //   };
  // }, []);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle
          sx={{
            backgroundColor: '#F0FFFF',
            color: 'green',
            fontSize: 'large',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: {
              md: 15
            }
          }}
        >
          {' '}
          Upload any Attached Files for {info?.name}{' '}
        </DialogTitle>
        <DialogContent
          sx={{
            marginLeft: {
              md: 10
            },
            marginRight: {
              md: 10
            }
          }}
        >
          <Input type="file" inputProps={{ multiple: true }} onChange={handleFileChange} />
          <Grid container spacing={1} mt={2} sx={{
            width:"100%",
           
          }}>
            {selectedFiles.map((file, index) => (
              <Grid item key={index}>
                <IconButton onClick={() => handleDeleteFile(index)} color="secondary">
                  <Delete />
                </IconButton>
                {file.name}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions
        sx={{
          marginLeft: {
            md: 10,
            
          },
         color:"black",
        }}
        >
        <Grid container spacing={4}
        sx={{
          width:"100%",
         
          marginBottom: {
            md: 5
          },
          display:"flex",
          flexDirection:'row'
        }}
        >
      
      <Grid item>
        <Button 
        onClick={onClose}
        variant="outlined"
         sx={{ paddingLeft:{
          md:2},paddingRight:{md:2} }}>
          Close
        </Button>
      </Grid>
      {/* <Grid item>
        <Button 
        disabled={!isLoading}
        onClick={handleCancelUpload} 
        variant="outlined"
        startIcon={< Cancel color="error" />}
        >
          Cancel Upload
        </Button>
      </Grid> */}

      <Grid item>
        <Button 
        variant="outlined"
        onClick={handleUpload} color="primary" disabled={selectedFiles.length === 0 || isLoading}>
          {uploadProgress !== null ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection:"row"
              }}
            >
              <CircularProgress value={uploadProgress} size={24} thickness={4} />
              <span>{uploadProgress}%</span>
            </Box>
          ) : (
            ' Upload'
          )}
        </Button>
      </Grid>
    </Grid>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity={error ? 'error' : 'success'} elevation={6} variant="filled">
          {error ? error : success}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default FileUploadModal;
