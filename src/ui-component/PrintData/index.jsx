import '../../views/pages/data/FormComponent.css'
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
            <link rel="stylesheet" type="text/css" href="../../views/pages/data/FormComponent.css">
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
            <h4>Form Data </h4>
            <div id="form-container">

            <form
            class="form-fields"
            style={{
              border: '2px solid red',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            }}
          >
          <div class="form-field">
            <label htmlFor="name">Name:</label>
            <span>${data.name}</span>
          </div>
          <div class="form-field">
            <label htmlFor="phone" >Phone:</label>
            <span>${data.phone}</span>
          </div>
          <div class="form-field">
            <label htmlFor="location" >Location:</label>
            <span>${data.location}</span>
          </div>
          <div class="form-field">
            <label htmlFor='houseNo'>HouseNo.:</label>
            <span>${data.houseNo}</span>
          </div>
          <div class="form-field">
            <label htmlFor="pamentID">PayementId:</label>
            <span>${data.paymentUniqueId}</span>
          </div>
          <div class="form-field">
            <label htmlFor="religion">Religion:</label>
            <span>${data.religion}</span>
          </div>
         
          <div class="form-field">
            <label htmlFor="family">No. of Family:</label>
            <span>${data.numberOfFamily}</span>
          </div>
          <div class="form-field">
            <label htmlFor="landSize">LandSize:</label>
            <span>${data.landInSquareMetres}</span>
          </div>
          <div class="form-field">
            <label htmlFor="landSize">Date of issue:</label>
            <span>  ${new Date(data.date).toLocaleDateString('en-GB')}</span>
          </div>
         
        </form>
    
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