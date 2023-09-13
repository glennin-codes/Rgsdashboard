import React from 'react';
import { FormControl,  InputLabel, OutlinedInput, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

const PhotoUploadField = ({ name, value, selectedImage, setSelectedImage, ...props }) => {


  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Convert the selected file to binary data
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const binaryData = e.target.result;
        // Set the value of the photo field to the binary data
        setSelectedImage(binaryData);
  
      
      };
  
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <FormControl fullWidth >
      <InputLabel>Upload Photo</InputLabel>
      <OutlinedInput
      sx={{
        textIndent:"20px"
      }}
        type="file"
        name={name}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {/* {!selected && <FormHelperText error>a photo is required</FormHelperText>} */}
{/* 
      Display the image preview */}
      {selectedImage && (
        <Box mt={2}>
          <Card>
            <CardMedia
              component="img"
              alt="Uploaded Photo"
              height="90"
              image={selectedImage}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Uploaded Photo Preview
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </FormControl>
  );
};

export default PhotoUploadField;
