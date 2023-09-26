import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import axios from 'axios';
import { useParams } from 'react-router';
import GetAppIcon from '@mui/icons-material/GetApp';
import PrintIcon from '@mui/icons-material/Print';
import './FormComponent.css';

// Function to print data
export const printData = (data) => {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');

  if (printWindow) {
    console.log(data.date);
    printWindow.document.open();
    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
        <head>
          <title>Print Form</title>
          <style>
           
          body {
            font-family: Arial, sans-serif;
            margin: 20px; 
          
          }
          h4 {
            text-align: center;
            margin-bottom: 20px;
          }
          /* Default styles for the form container */
#form-container{
  padding: 16px;
  background: white;
  margin: 0 auto;
  width: 80%;
  font-size: 18px;
  font-family:' ubuntu';
  position: relative;
 
}
.form-header{
  text-align: center;
  margin-bottom: 20px;
}
.form-fields{
  margin-bottom: 30px;

}
.form-fields label{
  color: #f108f1ee;
  font-size: bold;
}
.form-field{
  margin-bottom: 10px;
}
.form-footer{
  position: absolute;
  margin-top: 50px;
  bottom: 10px;
  right: 30px;
  font-size: 12px;

}
.form-actions{
  margin-top: '16px';
  text-align: 'center'
}
.print-button{
  background-color: green;
   color: white;
}
/* Media queries for responsiveness */
@media (min-width: 992px) {
  /* For desktop screens, display 4 fields per row */
  .form-fields {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}


@media (max-width: 991px) {
  /* For medium and small screens, display 3 fields per row */
  .form-fields {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 767px) {
  /* For small screens, display 2 fields per row */
  .form-fields {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

/* Add more styles as needed for form fields, buttons, etc. */

        </style>
        </head>
        <body>
          <div id="print-content">
         
            <div id="form-container">
            <h4>Real Estate Form</h4>
                      <form className="form-fields">
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <span>${data.name}</span>
          </div>
          <div className="form-field">
            <label htmlFor="phone" >Phone:</label>
            <span>${data.phone}</span>
          </div>
          <div className="form-field">
            <label htmlFor="location" >Location:</label>
            <span>${data.location}</span>
          </div>
          <div className="form-field">
            <label htmlFor='houseNo'>HouseNo.:</label>
            <span>${data.houseNo}</span>
          </div>
          <div className="form-field">
            <label htmlFor="pamentID">PayementId:</label>
            <span>${data.paymentUniqueId}</span>
          </div>
          <div className="form-field">
            <label htmlFor="religion">Religion:</label>
            <span>${data.religion}</span>
          </div>
         
          <div className="form-field">
            <label htmlFor="family">No. of Family:</label>
            <span>${data.numberOfFamily}</span>
          </div>
          <div className="form-field">
            <label htmlFor="landSize">LandSize:</label>
            <span>${data.landInSquareMetres}</span>
          </div>
          <div className="form-field">
            <label htmlFor="landSize">Date of issue:</label>
            <span>  ${new Date(data.date).toLocaleDateString('en-GB')}</span>
          </div>
         
        </form>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  } else {
    alert('Unable to open a print window. Please enable pop-ups.');
  }
};
export const RealEstateForm = () => {
  const [realEstate, setRealEstate] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    // 6504a24d4bb17035693cff4e
    // Make a GET request to your API endpoint to fetch a single data entry
    axios
      .get(`https://plum-inquisitive-bream.cyclic.cloud/api/datas/${id}`)
      .then((response) => {
        const { data } = response.data;

        console.log(data.date);
        setRealEstate(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  const handleDownloadFile = () => {
    // You can implement file download logic here
    if (realEstate && realEstate.fileAttachment) {
      window.open(realEstate.fileAttachment.fileUrl, '_blank');
    }
  };

  const handlePrintForm = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');

    // Check if the window was successfully opened
    if (printWindow) {
      // Write the content to be printed to the new window
      printWindow.document.open();
      printWindow.document.write(`
      <html>
        <head>
          <title>Print Form</title>
          <style>
           
            body {
              font-family: Arial, sans-serif;
              margin: 20px; 
            }
            h4 {
              text-align: center;
              margin-bottom: 20px;
            }
            /* Default styles for the form container */
#form-container {
    padding: 16px;
    background: white;
    margin: 0 auto;
    width: 80%;
    font-size: 18px;
    font-family:' ubuntu';
    position: relative;
   
  }
  .form-header{
    text-align: center;
    margin-bottom: 20px;
  }
  .form-fields{
    margin-bottom: 30px;

  }
  .form-fields label{
    color: #f108f1ee;
    font-size: bold;
  }
  .form-field{
    margin-bottom: 10px;
  }
  .form-footer{
    position: absolute;
    margin-top: 50px;
    bottom: 10px;
    right: 30px;
    font-size: 12px;

  }
  .form-actions{
    margin-top: '16px';
    text-align: 'center'
  }
  .print-button{
    background-color: green;
     color: white;
  }
  /* Media queries for responsiveness */
  @media (min-width: 992px) {
    /* For desktop screens, display 4 fields per row */
    .form-fields {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
  }

  
  @media (max-width: 991px) {
    /* For medium and small screens, display 3 fields per row */
    .form-fields {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
  }
  
  @media (max-width: 767px) {
    /* For small screens, display 2 fields per row */
    .form-fields {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
  }
  
  /* Add more styles as needed for form fields, buttons, etc. */
  
          </style>
        </head>
        <body>
          <div id="print-content">
            <h4>Real Estate Form</h4>
            ${document.getElementById('form-container').innerHTML}
          </div>
        </body>
      </html>
    `);
      printWindow.document.close();

      // Wait for the content to be fully loaded, then initiate printing
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    } else {
      alert('Unable to open a print window. Please enable pop-ups.');
    }
  };

  return (
    <div id="form-container">
      <div className="form-header">
        <h2>More Information</h2>
      </div>
      <Paper>
      {realEstate && (
     
        <form className="form-fields">
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <span>{realEstate.name}</span>
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone:</label>
            <span>{realEstate.phone}</span>
          </div>
          <div className="form-field">
            <label htmlFor="location">Location:</label>
            <span>{realEstate.location}</span>
          </div>
          <div className="form-field">
            <label htmlFor="houseNo">HouseNo.:</label>
            <span>{realEstate.houseNo}</span>
          </div>
          <div className="form-field">
            <label htmlFor="pamentID">PayementId:</label>
            <span>{realEstate.paymentUniqueId}</span>
          </div>
          <div className="form-field">
            <label htmlFor="religion">Religion:</label>
            <span>{realEstate.religion}</span>
          </div>

          <div className="form-field">
            <label htmlFor="family">No. of Family:</label>
            <span>{realEstate.numberOfFamily}</span>
          </div>
          <div className="form-field">
            <label htmlFor="landSize">LandSize:</label>
            <span>{realEstate.landInSquareMetres}</span>
          </div>
          <div className="form-field">
            <label htmlFor="landSize">Date of issue:</label>
            <span> {new Date(realEstate.date).toLocaleDateString('en-GB')}</span>
          </div>
        </form>
      )}
      <div>
        <Button variant="contained" onClick={handleDownloadFile} startIcon={<GetAppIcon />} style={{ backgroundColor: 'blue' }}>
          file
        </Button>
      </div>
      <div className="form-actions">
        <Button variant="contained" onClick={handlePrintForm} startIcon={<PrintIcon />} className="print-button">
          Print Form
        </Button>
      </div>
      <div className="form-footer">
        <p>Posted By: PeterSon</p>
      </div>

      {realEstate?.postedBy?.userName && (
        <div className="form-footer">
          <p>Posted By: {realEstate.postedBy.userName}</p>
        </div>
      )}
      {realEstate?.fileAttachment && (
        <div className="form-actions">
          <button className="download-button" onClick={handleDownloadFile}>
            {realEstate.fileAttachment.name}
          </button>
          <button className="print-button" onClick={handlePrintForm}>
            Print Form
          </button>
        </div>
        
      )}
      </Paper>
    </div>
  );
};

export default RealEstateForm;
