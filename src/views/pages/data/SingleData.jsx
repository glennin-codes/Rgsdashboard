import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import axios from 'axios';
import { useParams } from 'react-router';
import GetAppIcon from '@mui/icons-material/GetApp';
import PrintIcon from '@mui/icons-material/Print';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import SimpleBackdrop from './BackDrop';
import PrintData from 'ui-component/PrintData';
import '../../../ui-component/FillForm/LandOwnership.css';
import MainCard from 'ui-component/cards/MainCard';
import { getDataFromLocalStorage } from '../authentication/auth-forms/LocalStorage';
import { saveAs } from 'file-saver';
import MuiAlert from '@mui/material/Alert';
import { Edit } from '@mui/icons-material';

export const RealEstateForm = () => {
  const [realEstate, setRealEstate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shouldPrint, setShouldPrint] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  //updating Data
  const [updateLoading, setUpdateLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const { id } = useParams();
  const token = getDataFromLocalStorage('token');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  useEffect(() => {
    setIsLoading(true);
    // 6504a24d4bb17035693cff4e
    // Make a GET request to your API endpoint to fetch a single data entry
    axios
      .get(`https://plum-inquisitive-bream.cyclic.cloud/api/datas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const { data } = response.data;

        console.log(data.date);
        setRealEstate(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setOpenSnackBar(true);
        setIsLoading(false);
        console.log(e);
        if (e?.response && e?.response?.data && e?.response?.data?.message) {
          setError(e.response.data.message);
        }

        setError('check your connections and try again');
      });
  }, [id,token]);

  const HandleDownload = async (userId) => {
    setDownloadLoading(true);

    try {
      const res = await axios.get(`https://plum-inquisitive-bream.cyclic.cloud/api/files/${userId}`,{
        responseType:'blob'
      });

      if (res.status === 200) {
        setError('')
        setDownloadLoading(false);

        saveAs(res.data, `${realEstate?.mudMar}.zip`);
      }
    } catch (error) {
      setOpenSnackBar(true);
      setDownloadLoading(false);
      console.error(error);
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 400) {
          console.error('Bad Request:', error.response.data.error);
          setError(error.response?.data?.error);
        } else if (error.response.status === 403) {
          console.error('Forbidden:', error.response?.data?.message);
          setError("Forbidden:your token has expired kindly login again");
        } else if (error.response.status === 404) {
          console.error('No files found:', error.response.data);
          setError("No files found for the user");
        } else if (error?.response?.status === 500) {
          console.error('Internal Server Error:', error.response?.data);
          setError("Internal Server Error:our engineers are working to make everything ok!");
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

  // handle updates
  const handleInputChange = (name, value) => {
    setRealEstate({
      ...realEstate,
      [name]: value
    });
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdateLoading(true);

      // Make a PATCH request to update the data
      const res = await axios.patch(`https://plum-inquisitive-bream.cyclic.cloud/api/datas/${id}`, realEstate, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.status === 200) {
        setError('');
        setUpdateLoading(false);
        setSuccess(res.data?.message);
        setOpenSnackBar(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error updating data:', error);
      setOpenSnackBar(true);
      if (e?.response && e?.response?.data && e?.response?.data?.error) {
        setError(e.response.data.error);
      }

      setError('check your connections and try again');
    }
  };

  return (
    <>
      <MainCard title="More Information">
        <div
          id="form-container"
          style={{
            boxShadow: 'none',
            width: '100%'
          }}
        >
          {error && <Alert severity="error">{error}</Alert>}

          {isLoading ? (
            <SimpleBackdrop open={isLoading} />
          ) : (
            realEstate && (
              <form>
                <div
                  className="form-container"
                  style={{
                    boxShadow: 'none',
                    width: '100%'
                  }}
                >
                  <div className="title-el">
                    <h2>DOWLAD GOBOLEEDKA KOOFUR GALBEED</h2>
                    <h4>DOWLADA HOOSE EE DEGMADA {realEstate.location === "Lafoole" || realEstate.location === 'Jazira'?"Afgooye":realEstate.location }</h4>
                    <h3>WAAXDA DHULKA</h3>
                  </div>
                  <div className="form-column1">
                    <div className="form-field">
                      <label htmlFor="No">No:</label>
                      <input
                        onChange={(e) => handleInputChange('No', e.target.value)}
                        className="input-test"
                        type="text"
                        id="No"
                        name="No"
                        value={realEstate.No}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="BollectarioNo">Bollectario No:</label>
                      <input
                        onChange={(e) => handleInputChange('BollectarioNo', e.target.value)}
                        type="text"
                        id="BollectarioNo"
                        name="BollectarioNo"
                        value={realEstate.BollectarioNo}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="Tirisi">Soo Gelidda Warqadda Tirsi:</label>
                      <input
                        onChange={(e) => handleInputChange('Tirsi', e.target.value)}
                        type="text"
                        id="Tirsi"
                        name="Tirsi"
                        value={realEstate.Tirsi}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="BolletaNo">Bolleta No:</label>
                      <input
                        onChange={(e) => handleInputChange('BolletaNo', e.target.value)}
                        type="text"
                        id="BolletaNo"
                        name="BolletaNo"
                        value={realEstate.BolletaNo}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="Taariikh">Taariikh:</label>
                      <input
                        disabled
                        onChange={(e) => handleInputChange('Taariikh', e.target.value)}
                        type="text"
                        id="Taariikh"
                        name="Taariikh"
                        value={realEstate.Taariikh}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="Sanadka">Sanadka:</label>
                      <input
                        disabled
                        onChange={(e) => handleInputChange('Sanadka', e.target.value)}
                        type="text"
                        id="Sanadka"
                        name="Sanadka"
                        value={realEstate.Taariikh.split('/')[2]}
                      />
                    </div>
                  </div>
                  <div className="form-title">
                    <h4>WARQADDA LAHAANSHAHA DHULKA</h4>
                  </div>
                  <div className="form-field">
                    <label htmlFor="mudMar">Mud. / M ar.</label>
                    <input
                      onChange={(e) => handleInputChange('mudMar', e.target.value)}
                      type="text"
                      id="mudMar"
                      name="mudMar"
                      value={realEstate.mudMar}
                    />
                  </div>
                  <div className="form-title">
                    <h5>ha / Marwada kor ku qoran waxaa loo oggolaaday inuu/inay dhisto cariish, Baraako ama Guri Dhagax ah Mudana</h5>
                  </div>

                  <div className="form-column2">
                    <div className="form-field">
                      <label htmlFor="vacant1"> </label>
                      <input
                        onChange={(e) => handleInputChange('vacant1', e.target.value)}
                        type="text"
                        id="vacant1"
                        name="vacant1"
                        value={realEstate.vacant1}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="X"> X :</label>
                      <input onChange={(e) => handleInputChange('X', e.target.value)} type="text" id="X" name="X" value={realEstate.X} />
                    </div>
                    <div className="sub-name">
                      <p>oo u uko dhiso / dhisto cad dhul ah oo la eg</p>
                    </div>
                    <div className="form-field">
                      <label htmlFor="vacant2"> </label>
                      <input
                        onChange={(e) => handleInputChange('vacant2', e.target.value)}
                        type="text"
                        id="vacant2"
                        name="vacant2"
                        value={realEstate.vacant2}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="kunaYaal"> kuna yaal:</label>
                      <input
                        onChange={(e) => handleInputChange('kunaYaal', e.target.value)}
                        type="text"
                        id="kunaYaal"
                        name="kunaYaal"
                        value={realEstate.kunaYaal}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="Degmada">Degmada:</label>
                      <input
                        onChange={(e) => handleInputChange('Degmada', e.target.value)}
                        type="text"
                        id="Degmada"
                        name="Degmada"
                        value={realEstate.Degmada}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="Xaafadda">Xaafadda:</label>
                      <input
                        onChange={(e) => handleInputChange('Xaafadda', e.target.value)}
                        type="text"
                        id="Xaafadda"
                        name="Xaafadda"
                        value={realEstate.Xaafadda}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="SoohdintiisuTahay">Soohdintiisu Tahay:</label>
                      <input
                        onChange={(e) => handleInputChange('SoohdintiisuTahay', e.target.value)}
                        type="text"
                        id="SoohdintiisuTahay"
                        name="SoohdintiisuTahay"
                        value={realEstate.SoohdintiisuTahay}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="Waqooyi">X. Waqooyi:</label>
                      <input
                        onChange={(e) => handleInputChange('Waqooyi', e.target.value)}
                        type="text"
                        id="Waqooyi"
                        name="Waqooyi"
                        value={realEstate.Waqooyi}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="Galbeed">X. Galbeed:</label>
                      <input
                        onChange={(e) => handleInputChange('Galbeed', e.target.value)}
                        type="text"
                        id="Galbeed"
                        name="Galbeed"
                        value={realEstate.Galbeed}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="Bari">X. Bari:</label>
                      <input
                        onChange={(e) => handleInputChange('Bari', e.target.value)}
                        type="text"
                        id="Bari"
                        name="Bari"
                        value={realEstate.Bari}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="kofuur">iyo X. Koofur:</label>
                      <input
                        onChange={(e) => handleInputChange('kofuur', e.target.value)}
                        type="text"
                        id="kofuur"
                        name="kofuur"
                        value={realEstate.kofuur}
                      />
                    </div>

                    {/* Submit button */}
                  </div>
                  <div className="subtitle-el">
                    <h4>Warqaddaan xaq waxaad ugu leedahay muddo laba iyo toban (12) bilood ah</h4>
                    <h4>oo maantaka bilaabata, fasax la&#39;aan inaad dhulka dhistid.</h4>
                  </div>

                  <div className="form-column1">
                    <div className="form-field">
                      <label htmlFor="lacagNo"> Warqadadda lacag qabashada No. :</label>
                      <input
                        onChange={(e) => handleInputChange('lacagNo', e.target.value)}
                        type="text"
                        id="lacagNo"
                        name="lacagNo"
                        value={realEstate.lacagNo}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="ee">ee:</label>
                      <input
                        onChange={(e) => handleInputChange('ee', e.target.value)}
                        type="text"
                        id="ee"
                        name="ee"
                        value={realEstate.ee}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="ee">Taariikh:</label>
                      <input
                        disabled
                        onChange={(e) => handleInputChange('Taariikh', e.target.value)}
                        type="text"
                        id="Taariikh"
                        name="Taariikh"
                        value={realEstate.Taariikh}
                      />
                    </div>
                  </div>
                  <div className="form-footer">
                    <div className="footer-item">
                      <h4>{realEstate.Agaasimaha}</h4>
                      <h5>Agaasimaha Waaxda Dhulka</h5>
                      <input
                        style={{
                          marginBottom: '20px'
                        }}
                        type="text"
                        id="Agaasimaha"
                        name="Agaasimaha"
                        value={realEstate.Agaasimaha}
                        onChange={(e) => handleInputChange('Agaasimaha', e.target.value)}
                      />
                    </div>
                    <div className="footer-item">
                      <h4>{realEstate.Duqa}</h4>
                      <h5>Duqa Magaalada</h5>
                      <input
                        style={{
                          marginBottom: '20px'
                        }}
                        type="text"
                        id="Duqa"
                        name="Duqa"
                        value={realEstate.Duqa}
                        onChange={(e) => handleInputChange('Duqa', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </form>
            )
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'raw',
              justifyContent: 'space-between'
            }}
          >
            <Button
              variant="outlined"
              disabled={downloadLoading}
              startIcon={<GetAppIcon />}
              onClick={() => HandleDownload(id)}
              sx={error ? { border: '1px solid red' } : {}}
            >
              {downloadLoading?<CircularProgress size={24} /> : "Attached files"}
            </Button>
            <Button
              variant="inherit"
              sx={{
                color: 'magenta'
              }}
              onClick={() => {
                setShouldPrint(true);
              }}
              startIcon={<PrintIcon size={24} />}
              className="print-button"
            >
              Print Form
            </Button>
            <Button
              disabled={updateLoading}
              sx={{
                color: 'purple'
              }}
              variant="outlined"
              onClick={handleSubmit}
              startIcon={<Edit size={24} color="primary" />}
              className="print-button"
            >
              {updateLoading ? <CircularProgress size={24} /> : 'Update Data'}
            </Button>
          </div>
        </div>
      </MainCard>
      <PrintData data={realEstate} shouldPrint={shouldPrint} setShouldPrint={setShouldPrint} />
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

export default RealEstateForm;
