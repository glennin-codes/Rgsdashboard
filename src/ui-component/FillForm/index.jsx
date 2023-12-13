import React, { useEffect, useRef, useState } from 'react';
import './LandOwnership.css'; // Import your external CSS for styling
import axios from 'axios';
import { decodeToken } from 'utils/decodeToken';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getDataFromLocalStorage } from 'views/pages/authentication/auth-forms/LocalStorage';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { getEmptyFields } from 'utils/getEmptyFields';

export default function LandOwnershipForm() {
  const [values, setValues] = useState({
    No: '',
    BollectarioNo: '',
    Tirsi: '',
    BolletaNo: '',
    Taariikh: '',
    Sanadka: '',
    Xaafadda: '',
    vacant1: '',
    vacant2: '',
    mudMar: '',
    X: '',
    kunaYaal: '',
    Degmada: '',
    SoohdintiisuTahay: '',
    Waqooyi: '',
    Galbeed: '',
    Bari: '',
    kofuur: '',
    lacagNo: '',
    ee: '',
    Agaasimaha: '',
    Duqa: '',
    location: '',
    id: '',
    name: ''
  });
  const [inputEnabled, setInputEnabled] = useState({
    No: true, // Enable the first input field initially
    BollectarioNo: false,
    Tirsi: false,
    BolletaNo: false,
    Taariikh: false,
    Sanadka: false,
    Xaafadda: false,
    vacant1: false,
    vacant2: false,
    mudMar: false,
    X: false,
    kunaYaal: false,
    Degmada: false,
    SoohdintiisuTahay: false,
    Waqooyi: false,
    Galbeed: false,
    Bari: false,
    kofuur: false,
    lacagNo: false,
    ee: false,
    Agaasimaha: false,
    Duqa: false
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const NoRef = useRef(null);
  const BollectarioNoRef = useRef(null);
  const TirsiRef = useRef(null);
  const BolletaNoRef = useRef(null);
  const TaariikhRef = useRef(null);
  // const SanadkaRef = useRef(null);
  const XaafaddaRef = useRef(null);
  const vacant1Ref = useRef(null);
  const vacant2Ref = useRef(null);
  const mudMarRef = useRef(null);
  const XRef = useRef(null);
  const kunaYaalRef = useRef(null);
  const DegmadaRef = useRef(null);
  const SoohdintiisuTahayRef = useRef(null);
  const WaqooyiRef = useRef(null);
  const GalbeedRef = useRef(null);
  const BariRef = useRef(null);
  const kofuurRef = useRef(null);
  const lacagNoRef = useRef(null);
  const eeRef = useRef(null);
  const AgaasimahaRef = useRef(null);
  const DuqaRef = useRef(null);

  useEffect(() => {
    const token = getDataFromLocalStorage('token');
    if (token) {
      const decodedTokenData = decodeToken(token);

      setValues({
        ...values,
        name: decodedTokenData?.name,
        id: decodedTokenData?.id,
        location: decodedTokenData?.location
      });
    }
  }, []);

  const handleInputKeyDown = (e, fieldName, nextInputName, nextInputRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (values[fieldName].trim() === '') {
        // Prevent focusing on the next input if the current one is empty
        return;
      }
      if (nextInputName === 'Taariikh') {
        const currentDate = new Date().toLocaleDateString('en-GB'); // Get the current date in dd/mm/yyyy format
        setValues({
          ...values,
          Sanadka: currentDate.split('/')[2],
          [nextInputName]: currentDate // Update the Taariikh field with the formatted date
        });
      }
      setInputEnabled((prevInputEnabled) => ({
        ...prevInputEnabled,
        [nextInputName]: true
      }));
      nextInputRef.current.focus();
      return false;
    }
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const emptyFields = getEmptyFields(values);
    if (emptyFields.length === 0) {
      const token = getDataFromLocalStorage('token');
      try {
        console.log('values ', values);
        const response = await axios.post('https://plum-inquisitive-bream.cyclic.cloud/api/datas', values, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setLoading(false);
          handleSnackbarOpen('Success: Form submitted successfully');
          setValues({
            No: '',
            BollectarioNo: '',
            Tirsi: '',
            BolletaNo: '',
            Taariikh: '',
            Sanadka: '',
            Xaafadda: '',
            vacant1: '',
            vacant2: '',
            mudMar: '',
            X: '',
            kunaYaal: '',
            Degmada: '',
            SoohdintiisuTahay: '',
            Waqooyi: '',
            Galbeed: '',
            Bari: '',
            kofuur: '',
            lacagNo: '',
            ee: '',
            Agaasimaha: '',
            Duqa: ''
          });
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        setLoading(false);
        console.log(err);
        if (err?.response?.status === 401) {
          handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
        } else if (err?.response?.status === 403) {
          handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
        } else if (err?.response?.status === 500) {
          handleSnackbarOpen(`Error: ${err?.response?.data?.message}`);
        } else {
          handleSnackbarOpen('Error: Network problem, check your connections and try again');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const errorMessage = `Error : The following ${emptyFields.length > 1 ? 'fields are' : 'field is'} empty: ${emptyFields.join(', ')}`;
      handleSnackbarOpen(errorMessage);
      setLoading(false);
    }
  };

  return (
    <form>
      <div className="form-container">
        <div className="title-el">
          <h2>DOWLAD GOBOLEEDKA KOOFUR GALBEED</h2>
          <h4>DOWLADA HOOSE EE DEGMADA {values?.location}</h4>
          <h3>WAAXDA DHULKA</h3>
        </div>
        <div className="form-column1">
          <div className="form-field">
            <label htmlFor="No">No:</label>
            <input
              className="input-test"
              type="number"
              id="No"
              name="No"
              value={values.No}
              onChange={handleChange}
              ref={NoRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'No', 'BollectarioNo', BollectarioNoRef)}
              disabled={!inputEnabled.No}
            />
          </div>
          <div className="form-field">
            <label htmlFor="BollectarioNo">Bollectario No:</label>
            <input
              type="number"
              id="BollectarioNo"
              name="BollectarioNo"
              value={values.BollectarioNo}
              onChange={handleChange}
              ref={BollectarioNoRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'BollectarioNo', 'Tirsi', TirsiRef)}
              disabled={!inputEnabled.BollectarioNo}
            />
          </div>
          <div className="form-field">
            <label htmlFor="Tirsi">Soo Gelidda Warqadda Tirsi:</label>
            <input
              type="text"
              id="Tirsi"
              name="Tirsi"
              value={values.Tirsi}
              onChange={handleChange}
              ref={TirsiRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'Tirsi', 'BolletaNo', BolletaNoRef)}
              disabled={!inputEnabled.Tirsi}
            />
          </div>
          <div className="form-field">
            <label htmlFor="BolletaNo">Bolleta No:</label>
            <input
              type="text"
              id="BolletaNo"
              name="BolletaNo"
              value={values.BolletaNo}
              onChange={handleChange}
              ref={BolletaNoRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'BolletaNo', 'Taariikh', TaariikhRef)}
              disabled={!inputEnabled.BolletaNo}
            />
          </div>
          <div className="form-field">
            <label htmlFor="Taariikh">Taariikh:</label>

            <input
              type="text"
              id="Taariikh"
              name="Taariikh"
              value={values.Taariikh}
              // onChange={handleChange}
              ref={TaariikhRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'Taariikh', 'mudMar', mudMarRef)}
              disabled={!inputEnabled.Taariikh}
            />
          </div>
          <div className="form-field">
            <label htmlFor="Sanadka">Sanadka:</label>
            <input type="text" id="Sanadka" name="Sanadka" defaultValue={values.Taariikh.split('/')[2]} disabled={!inputEnabled.Sanadka} />
          </div>
        </div>
        <div className="form-title">
          <h4>WARQADDA LAHAANSHAHA DHULKA</h4>
        </div>
        <div className="form-field">
          <label htmlFor="mudMar">Mud. / M ar.</label>
          <input
            type="text"
            id="mudMar"
            name="mudMar"
            value={values.mudMar}
            onChange={handleChange}
            ref={mudMarRef}
            onKeyDown={(e) => handleInputKeyDown(e, 'mudMar', 'vacant1', vacant1Ref)}
            disabled={!inputEnabled.mudMar}
          />
        </div>
        <div className="form-title">
          <h5>ha / Marwada kor ku qoran waxaa loo oggolaaday inuu/inay dhisto cariish, Baraako ama Guri Dhagax ah Mudana</h5>
        </div>

        <div className="form-column2">
          <div className="form-field">
            <label htmlFor="vacant1"> </label>
            <input
              id="vacant1"
              name="vacant1"
              value={values.vacant1}
              onChange={handleChange}
              ref={vacant1Ref}
              onKeyDown={(e) => handleInputKeyDown(e, 'vacant1', 'X', XRef)}
              disabled={!inputEnabled.vacant1}
            />
          </div>
          <div className="form-field">
            <label htmlFor="X"> X :</label>
            <input
              type="text"
              id="X"
              name="X"
              value={values.X}
              onChange={handleChange}
              ref={XRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'vacant1', 'vacant2', vacant2Ref)}
              disabled={!inputEnabled.X}
            />
          </div>
          <div className="sub-name">
            <p>oo u uko dhiso / dhisto cad dhul ah oo la eg</p>
          </div>
          <div className="form-field">
            <label htmlFor="vacant2"> </label>
            <input
              type="text"
              id="vacant2"
              name="vacant2"
              value={values.vacant2}
              onChange={handleChange}
              ref={vacant2Ref}
              onKeyDown={(e) => handleInputKeyDown(e, 'vacant2', 'kunaYaal', kunaYaalRef)}
              disabled={!inputEnabled.vacant2}
            />
          </div>
          <div className="form-field">
            <label htmlFor="kunaYaal"> kuna yaal:</label>
            <input
              type="text"
              id="kunaYaal"
              name="kunaYaal"
              value={values.kunaYaal}
              onChange={handleChange}
              ref={kunaYaalRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'kunaYaal', 'Degmada', DegmadaRef)}
              disabled={!inputEnabled.kunaYaal}
            />
          </div>
          <div className="form-field">
            <label htmlFor="Dagmada">Degmada:</label>
            <input
              type="text"
              id="Degmada"
              name="Degmada"
              value={values.Degmada}
              onChange={handleChange}
              ref={DegmadaRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'Degmada', 'Xaafadda', XaafaddaRef)}
              disabled={!inputEnabled.Degmada}
            />
          </div>
          <div className="form-field">
            <label htmlFor="Xaafadda">Xaafadda:</label>
            <input
              type="text"
              id="Xaafadda"
              name="Xaafadda"
              value={values.Xaafadda}
              onChange={handleChange}
              ref={XaafaddaRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'Xaafadda', 'SoohdintiisuTahay', SoohdintiisuTahayRef)}
              disabled={!inputEnabled.Xaafadda}
            />
          </div>
          <div className="form-field">
            <label htmlFor="SoohdintiisuTahay">Soohdintiisu Tahay:</label>
            <input
              type="text"
              id="SoohdintiisuTahay"
              name="SoohdintiisuTahay"
              value={values.SoohdintiisuTahay}
              onChange={handleChange}
              ref={SoohdintiisuTahayRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'SoohdintiisuTahay', 'Waqooyi', WaqooyiRef)}
              disabled={!inputEnabled.SoohdintiisuTahay}
            />
          </div>
          <div className="form-field">
            <label htmlFor="Waqooyi">X. Waqooyi:</label>
            <input
              type="text"
              id="Waqooyi"
              name="Waqooyi"
              value={values.Waqooyi}
              onChange={handleChange}
              ref={WaqooyiRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'Waqooyi', 'Galbeed', GalbeedRef)}
              disabled={!inputEnabled.Waqooyi}
            />
          </div>
          <div className="form-field">
            <label htmlFor="Galbeed">X. Galbeed:</label>
            <input
              type="text"
              id="Galbeed"
              name="Galbeed"
              value={values.Galbeed}
              onChange={handleChange}
              ref={GalbeedRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'Galbeed', 'Bari', BariRef)}
              disabled={!inputEnabled.Galbeed}
            />
          </div>
          <div className="form-field">
            <label htmlFor="Bari">X. Bari:</label>
            <input
              type="text"
              id="Bari"
              name="Bari"
              value={values.Bari}
              onChange={handleChange}
              ref={BariRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'Bari', 'kofuur', kofuurRef)}
              disabled={!inputEnabled.Bari}
            />
          </div>
          <div className="form-field">
            <label htmlFor="kofuur">iyo X. Koofur:</label>
            <input
              type="text"
              id="kofuur"
              name="kofuur"
              value={values.kofuur}
              onChange={handleChange}
              ref={kofuurRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'kofuur', 'lacagNo', lacagNoRef)}
              disabled={!inputEnabled.kofuur}
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
              type="text"
              id="lacagNo"
              name="lacagNo"
              value={values.lacagNo}
              onChange={handleChange}
              ref={lacagNoRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'lacagNo', 'ee', eeRef)}
              disabled={!inputEnabled.lacagNo}
            />
          </div>
          <div className="form-field">
            <label htmlFor="ee">ee:</label>
            <input
              type="text"
              id="ee"
              name="ee"
              value={values.ee}
              onChange={handleChange}
              ref={eeRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'ee', 'Agaasimaha', AgaasimahaRef)}
              disabled={!inputEnabled.ee}
            />
          </div>
          <div className="form-field">
            <label htmlFor="Taarikh2">Taariikh:</label>
            <input type="text" id="Taariikh2" name="Taariikh2" defaultValue={values.Taariikh} disabled={inputEnabled.Taariikh} />
          </div>
        </div>
        <div className="form-footer">
          <div className="footer-item">
            <h4>{values.Agaasimaha}</h4>
            <h5>Agaasimaha Waaxda Dhulka</h5>
            <input
              type="text"
              id="Agaasimaha"
              name="Agaasimaha"
              value={values.Agaasimaha}
              onChange={handleChange}
              ref={AgaasimahaRef}
              onKeyDown={(e) => handleInputKeyDown(e, 'Agaasimaha', 'Duqa', DuqaRef)}
              disabled={!inputEnabled.Agaasimaha}
            />
          </div>
          <div className="footer-item">
            <h4>{values.Duqa}</h4>
            <h5>Duqa Magaalada</h5>
            <input
              type="text"
              id="Duqa"
              name="Duqa"
              value={values.Duqa}
              onChange={handleChange}
              ref={DuqaRef}
              disabled={!inputEnabled.Duqa}
            />
          </div>
        </div>
        <div>
          <Button className="form-button " type="button" onClick={handleSubmit} disabled={!values.Duqa || loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
          </Button>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000} // Adjust as needed
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity={snackbarMessage.includes('Success') ? 'success' : 'error'}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    </form>
  );
}
