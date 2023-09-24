import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";

export const RealEstateForm = () => {
  const [realEstate, setRealEstate] = useState(null);

  useEffect(() => {
    // Make a GET request to your API endpoint to fetch a single data entry
    axios.get("https://plum-inquisitive-bream.cyclic.cloud/api/datas/6504a24d4bb17035693cff4e").then((response) => {
    const {data}=response.data;
    console.log(data)
        setRealEstate(data);
    }).catch(e=>{
      console.log(e);
    });
  }, []);

  const handleDownloadFile = () => {
    // You can implement file download logic here
    if (realEstate && realEstate.fileAttachment) {
      window.open(realEstate.fileAttachment.fileUrl, "_blank");
    }
  };

  const handlePrintForm = () => {
    // You can implement the print logic here
    window.print();
  };

  return (
    <Container
   sx={{
    position:'relative'
   }}
    >
      <Paper elevation={3} style={{ padding: "16px" ,background:'white' }}>
        <Typography variant="h4" align="center" gutterBottom>
        More information
        </Typography>
        {realEstate && (
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Name:</Typography>
                <Typography>{realEstate.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Phone:</Typography>
                <Typography>{realEstate.phone}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Location:</Typography>
                <Typography>{realEstate.location}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">houseNo:</Typography>
                <Typography>{realEstate.houseNo}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">PayementId:</Typography>
                <Typography>{realEstate.paymentUniqueId}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">religion:</Typography>
                <Typography>{realEstate.religion}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">No.Family</Typography>
                <Typography>{realEstate.numberOfFamily}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Land</Typography>
                <Typography>{realEstate.landInSquareMetres} Ha</Typography>
              </Grid>

              {/* Add more fields as needed */}
            </Grid>
            {realEstate.fileAttachment && (
              <div>
                <Button variant="contained" onClick={handleDownloadFile}>
                  Download File ({realEstate.fileAttachment.name})
                </Button>
              </div>
            )}
          
              <div>
                <Button variant="contained" onClick={handleDownloadFile}>
              
                Download  AttachmentFile
                </Button>
         </div>
        
          </form>
        )}
        {realEstate?.postedBy?.userName && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              fontSize: "12px",
            }}
          >
            Posted By: {realEstate.postedBy.userName}
          </div>
        )}
        {/* <div style={{ marginTop: "16px", textAlign: "center" }}>
          <Button variant="contained" onClick={handlePrintForm}>
            Print Form
          </Button>
        </div>
         */}
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "30px",
              fontSize: "12px",
            }}
          >
            Posted By: James Perterson
          </div>
      
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <Button variant="contained" onClick={handlePrintForm}>
            Print Form
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default RealEstateForm;
