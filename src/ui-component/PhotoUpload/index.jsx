import React from 'react';
import Button from '@mui/material/Button';

const PhotoUpload = ({
    setFormData,formData
}) => {
 

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      // Create a FileReader to read the file as binary data
      const reader = new FileReader();

      reader.onload = (e) => {
        // e.target.result contains the binary data as a data URL
        setFormData({ ...formData, photo: e.target.result });
      };

      // Read the file as data URL
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* Your other form fields here */}
      <input
        type="file"
        id="photo-input"
        accept="image/*" // Accept only image files
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="photo-input">
        <Button
          variant="outlined"
          component="span"
          fullWidth
        >
          Upload Photo
        </Button>
      </label>
      {formData.photo && (
        <div>
          <p>Photo uploaded:</p>
          <img 
          height={80}
          width={100}
          style={{
            objectFit:"contain"
          }}
          src={formData.photo} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
