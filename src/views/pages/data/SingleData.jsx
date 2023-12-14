import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import axios from 'axios';
import { useParams } from 'react-router';
import GetAppIcon from '@mui/icons-material/GetApp';
import PrintIcon from '@mui/icons-material/Print';
import { Alert } from '@mui/material';
import SimpleBackdrop from './BackDrop';
import PrintData from 'ui-component/PrintData';
import '../../../ui-component/FillForm/LandOwnership.css';
import MainCard from 'ui-component/cards/MainCard';
import { getDataFromLocalStorage } from '../authentication/auth-forms/LocalStorage';
export const RealEstateForm = () => {
  const [realEstate, setRealEstate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shouldPrint, setShouldPrint] = useState(false);
  const { id } = useParams();
  const token = getDataFromLocalStorage('token');

  useEffect(() => {
    setIsLoading(true);
    // 6504a24d4bb17035693cff4e
    // Make a GET request to your API endpoint to fetch a single data entry
    axios
      .get(`https://plum-inquisitive-bream.cyclic.cloud/api/datas/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      .then((response) => {
        const { data } = response.data;

        console.log(data.date);
        setRealEstate(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
        if (e?.response && e?.response?.data && e?.response?.data?.message) {
          setError(e.response.data.message);
        }

        setError('check your connections');
      });
  }, [id]);

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
                    <h4>DOWLADA HOOSE EE DEGMADA {realEstate.location || 'Location'}</h4>
                    <h3>WAAXDA DHULKA</h3>
                  </div>
                  <div className="form-column1">
                    <div className="form-field">
                      <label htmlFor="No">No:</label>
                      <input disabled className="input-test" type="text" id="No" name="No" defaultValue={realEstate.No} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="BollectarioNo">Bollectario No:</label>
                      <input disabled type="text" id="BollectarioNo" name="BollectarioNo" defaultValue={realEstate.BollectarioNo} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="Tirisi">Soo Gelidda Warqadda Tirsi:</label>
                      <input disabled type="text" id="Tirsi" name="Tirsi" defaultValue={realEstate.Tirsi} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="BolletaNo">Bolleta No:</label>
                      <input disabled type="text" id="BolletaNo" name="BolletaNo" defaultValue={realEstate.BolletaNo} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="Taariikh">Taariikh:</label>
                      <input disabled type="text" id="Taariikh" name="Taariikh" defaultValue={realEstate.Taariikh} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="Sanadka">Sanadka:</label>
                      <input disabled type="text" id="Sanadka" name="Sanadka" defaultValue={realEstate.Taariikh.split('/')[2]} />
                    </div>
                  </div>
                  <div className="form-title">
                    <h4>WARQADDA LAHAANSHAHA DHULKA</h4>
                  </div>
                  <div className="form-field">
                    <label htmlFor="mudMar">Mud. / M ar.</label>
                    <input disabled type="text" id="mudMar" name="mudMar" defaultValue={realEstate.mudMar} />
                  </div>
                  <div className="form-title">
                    <h5>ha / Marwada kor ku qoran waxaa loo oggolaaday inuu/inay dhisto cariish, Baraako ama Guri Dhagax ah Mudana</h5>
                  </div>

                  <div className="form-column2">
                    <div className="form-field">
                      <label htmlFor="vacant1"> </label>
                      <input disabled type="text" id="vacant1" name="vacant1" defaultValue={realEstate.vacant1} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="X"> X :</label>
                      <input disabled type="text" id="X" name="X" defaultValue={realEstate.X} />
                    </div>
                    <div className="sub-name">
                      <p>oo u uko dhiso / dhisto cad dhul ah oo la eg</p>
                    </div>
                    <div className="form-field">
                      <label htmlFor="vacant2"> </label>
                      <input disabled type="text" id="vacant2" name="vacant2" defaultValue={realEstate.vacant2} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="kunaYaal"> kuna yaal:</label>
                      <input disabled type="text" id="kunaYaal" name="kunaYaal" defaultValue={realEstate.kunaYaal} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="Dagmada">Degmada:</label>
                      <input disabled type="text" id="Degmada" name="Degmada" defaultValue={realEstate.Degmada} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="Xaafadda">Xaafadda:</label>
                      <input disabled type="text" id="Xaafadda" name="Xaafadda" defaultValue={realEstate.Xaafadda} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="SoohdintiisuTahay">Soohdintiisu Tahay:</label>
                      <input
                        disabled
                        type="text"
                        id="SoohdintiisuTahay"
                        name="SoohdintiisuTahay"
                        defaultValue={realEstate.SoohdintiisuTahay}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="Waqooyi">X. Waqooyi:</label>
                      <input disabled type="text" id="Waqooyi" name="Waqooyi" defaultValue={realEstate.Waqooyi} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="Galbeed">X. Galbeed:</label>
                      <input disabled type="text" id="Galbeed" name="Galbeed" defaultValue={realEstate.Galbeed} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="Bari">X. Bari:</label>
                      <input disabled type="text" id="Bari" name="Bari" defaultValue={realEstate.Bari} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="kofuur">iyo X. Koofur:</label>
                      <input disabled type="text" id="kofuur" name="kofuur" defaultValue={realEstate.kofuur} />
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
                      <input disabled type="text" id="lacagNo" name="lacagNo" defaultValue={realEstate.lacagNo} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="ee">ee:</label>
                      <input disabled type="text" id="ee" name="ee" defaultValue={realEstate.ee} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="ee">Taariikh:</label>
                      <input disabled type="text" id="Taariikh" name="Taariikh" defaultValue={realEstate.Taariikh} />
                    </div>
                  </div>
                  <div className="footer--el">
                    <div className="footer-item">
                      <h4>CABDULLAAHI CALI WATIIN</h4>
                      <h5>Duqa Magaalada</h5>
                    </div>
                    <div className="footer-item">
                      <h4>something here too </h4>
                      <h5> </h5>
                    </div>
                    <div className="footer-item">
                      <h4>XASAN MACALIN CALI IBRAAHIM</h4>
                      <h5>Agaasimaha Waaxda Dhulka</h5>
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
            <Button variant="contained" startIcon={<GetAppIcon />} style={{ backgroundColor: 'blue' }}>
              Attached files
            </Button>
            <Button
              variant="inherit"
              sx={{
                color: 'magenta'
              }}
              onClick={() => {
                setShouldPrint(true);
              }}
              startIcon={<PrintIcon />}
              className="print-button"
            >
              Print Form
            </Button>
          </div>
          {/* <div className="form-footer">
        <p>Posted By: PeterSon</p>
      </div> */}

          {/* {realEstate?.postedBy?.userName && (
            <div className="form-footer">
              <p>Posted By: {realEstate.postedBy.userName}</p>
            </div>
          )} */}
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
        </div>
      </MainCard>
      <PrintData data={realEstate} shouldPrint={shouldPrint} setShouldPrint={setShouldPrint} />
    </>
  );
};

export default RealEstateForm;
