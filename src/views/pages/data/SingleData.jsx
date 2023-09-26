import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
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
          </style>
        </head>
        <body>
          <div id="print-content">
            <h4>Real Estate Form</h4>
            <div id="form-content">
              <!-- Render data fields here -->
              <p>Name: ${data.name}</p>
              <p>Phone: ${data.phone}</p>
              <!-- Add more fields as needed -->
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
              margin: 20px; /* Add margin for better print layout */
            }
            h4 {
              text-align: center;
              margin-bottom: 20px;
            }
            /* Customize the styles as needed */
          </style>
        </head>
        <body>
          <div id="print-content">
            <h4>Real Estate Form</h4>
            ${document.getElementById('form-content').innerHTML}
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
    <div id="form-content">
    <div className="form-container">
      <div className="form-header">
        <h2>More Information</h2>
      </div>
      {realEstate && (
        <form className="form-fields">
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <span>{realEstate.name}</span>
          </div>
          <div className="form-field">
            <label htmlFor="phone" >Phone:</label>
            <span>{realEstate.phone}</span>
          </div>
          <div className="form-field">
            <label htmlFor="location" >Location:</label>
            <span>{realEstate.paymentUniqueId}</span>
          </div>
          <div className="form-field">
            <label>HouseNo.:</label>
            <span>{realEstate.houseNo}</span>
          </div>
          <div className="form-field">
            <label htmlFor="pamentID">PayementId:</label>
            <span>{realEstate.houseNo}</span>
          </div>
          <div className="form-field">
            <label htmlFor="religion">Religion:</label>
            <span>{realEstate.religion}</span>
          </div>
         
          <div className="form-field">
            <label htmlFor="familyyy">No. of Family:</label>
            <span>{realEstate.religion}</span>
          </div>
          <div className="form-field">
            <label htmlFor="family">No. of Family::</label>
            <span>{realEstate.numberOfFamily}</span>
          </div>
          <div className="form-field">
            <label htmlFor="landSize">LandSize:</label>
            <span>{realEstate.landInSquareMetres}</span>
          </div>
         
        </form>
      )}
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
          <button
            className="download-button"
            onClick={handleDownloadFile}
          >
            {realEstate.fileAttachment.name}
          </button>
          <button
            className="print-button"
            onClick={handlePrintForm}
          >
            Print Form
          </button>
        </div>
      )}
    </div>
  </div>
  );
};

export default RealEstateForm;
