import React, {  useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import PropTypes from 'prop-types';
import './PrintData.css';

const PrintData = ({ data, shouldPrint, setShouldPrint }) => {
  const [values, setValues] = useState({});
  const componentRef = useRef();

  useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  const print = useReactToPrint({
    content: () => componentRef.current,

    documentTitle: values?.mudMar,
    onAfterPrint: () => {
      console.log('document printed successfully');
      setShouldPrint(false);
    }
  });

  useEffect(() => {
    if (shouldPrint) {
      print();
    }
  }, [shouldPrint, print]);
  return (
    <div
      style={{
        display: 'none',
        // marginTop:2
      }}
    >
      <div ref={componentRef} className="form--el">
        <div className="container--el">
          <div className="main-tittle--el">
            <h5>DOWLADA HOOSE EE DEGMADA {values?.location === "Lafoole" || values?.location === "Jazira"? "Afgooye" : values?.location}</h5>
            <h3>WAAXDA DHULKA</h3>
          </div>

          <div className="InputSet-As">
            <div className="col--1">
              <div className="field--el">
                <label htmlFor="No">No:</label>
                <input className="input--el col-1" type="text" id="No" name="No" defaultValue={values?.No} />
              </div>

              <div className="break--el">
                <p htmlFor="Tirisi">Soo Gelidda Warqadda </p>
                <span className="tilt-away--el">
                  {' '}
                  <p>Tirsi:</p> <input className="input--el  col-1" type="text" id="Tirsi" name="Tirsi" defaultValue={values?.Tirsi} />{' '}
                </span>
              </div>
              <div className="field--el">
                <label htmlFor="Taariikh">Taariikh:</label>
                <input className="input--el col-1" type="text" id="Taariikh" name="Taariikh" defaultValue={values?.Taariikh} />
              </div>
            </div>
            <div className="col--2">
              <div className="fields--el">
                <label htmlFor="BollectarioNo">Bollectario No:</label>
                <input
                  className="input--el col-2"
                  type="text"
                  id="BollectarioNo"
                  name="BollectarioNo"
                  defaultValue={values?.BollectarioNo}
                />
              </div>
              <div className="fields--el">
                <label htmlFor="BolletaNo">Bolleta No:</label>
                <input className="input--el col-2" type="text" id="BolletaNo" name="BolletaNo" defaultValue={values?.BolletaNo} />
              </div>
              <div className="fields--el">
                <label htmlFor="Sanadka">Sanadka:</label>
                <input className="input--el col-2" type="text" id="Sanadka" name="Sanadka" defaultValue={values?.Sanadka} />
              </div>
            </div>
          </div>
          <div className="main-tittle--el-warqada">
            <h3>WARQADDA LAHAANSHAHA DHULKA</h3>
          </div>
          <div className="form-field--el">
            <label htmlFor="mudMar">Mud. / M ar.</label>
            <input type="text" id="mudMar" name="mudMar" defaultValue={values?.mudMar} />
          </div>
          <div className="tittle--el">
            <h5>Mudanaha/ Marwada kor ku qoran waxaa loo oggolaaday inuu/inay dhisto cariish, Baraako ama Guri Dhagax ah </h5>
          </div>
          <div className="field2--el">
            <div className="fig--a">
              <div className="fig-field--el">
                <label htmlFor="vacant1"> </label>
                <input type="text" id="vacant1" name="vacant1" defaultValue={values?.vacant1} />
              </div>
              <div className="fig-x--el">
                <label htmlFor="X"> X ,</label>
                <input type="text" id="X" name="X" defaultValue={values?.X} />
                <p>oo u uko dhiso / dhisto cad dhul ah oo la eg</p>
              </div>
            </div>
            <div className="fig--b">
              <div className="fig--b-field--el">
                {/* <label htmlFor="vacant2"> </label> */}
                <input type="text" className="input-b--el" id="vacant2" name="vacant2" defaultValue={values?.vacant2} />
              </div>
              <div
                className="fig--b-field--el"
                style={{
                  gap: '10px'
                }}
              >
                <label htmlFor="kunaYaal"> kuna yaal</label>
                <input type="text" className="input-b--el" id="kunaYaal" name="kunaYaal" defaultValue={values?.kunaYaal} />
              </div>
              <div
                className="fig--b-fieldDeg--el"
                style={{
                  gap: '10px'
                }}
              >
                <label htmlFor="Degmada">Degmada</label>
                <input type="text" id="Degmada" name="Degmada" className="degmada" defaultValue={values?.Degmada} />
              </div>
            </div>
            <div className="fig--c">
              <div className="fig--c-field--el">
                <label htmlFor="Xaafadda">Xaafadda</label>
                <input type="text" className="input-c--el" id="Xaafadda" name="Xaafadda" defaultValue={values?.Xaafadda} />
              </div>
              <div className="fig--c-field--el">
                <label htmlFor="SoohdintiisuTahay">Soohdintiisu Tahay</label>
                <input
                  type="text"
                  className="input-c--el"
                  id="SoohdintiisuTahay"
                  name="SoohdintiisuTahay"
                  defaultValue={values?.SoohdintiisuTahay}
                />
              </div>
              <div className="fig--c-field--el">
                <label htmlFor="Waqooyi">X. Waqooyi</label>
                <input type="text" id="Waqooyi" className="X" name="Waqooyi" defaultValue={values?.Waqooyi} />
              </div>
            </div>
            <div className="fig--d">
              <div className="fig--d-field--el">
                <label htmlFor="Galbeed">X. Galbeed</label>
                <input type="text" className="input-d--el" id="Galbeed" name="Galbeed" defaultValue={values?.Galbeed} />
              </div>
              <div className="fig--d-field--el">
                <label htmlFor="Bari">X. Bari</label>
                <input type="text" className="input-d--el" id="Bari" name="Bari" defaultValue={values?.Bari} />
              </div>
              <div className="fig--b-fieldDeg--el">
                <label htmlFor="kofuur">iyo X. Koofur</label>
                <input type="text" id="kofuur" name="kofuur" className="kofuur" defaultValue={values?.kofuur} />
              </div>
            </div>
          </div>

          {/* Your existing form code goes here */}

          <div className="subtitles--el">
            <h4>Warqaddaan xaq waxaad ugu leedahay muddo laba iyo toban (12) bilood ah</h4>
            <h4>oo maantaka bilaabata, fasax la&apos; aan inaad dhulka dhistid.</h4>
          </div>
          <div className="field3--el">
            <div className="fig--3-field--el">
              <label htmlFor="lacagNo"> Warqadadda lacag qabashada No. </label>
              <input type="text" id="lacagNo" className="fig-3-input1--el" name="lacagNo" defaultValue={values?.lacagNo} />
            </div>
            <div className="fig--3-field2--el">
              <label htmlFor="ee">ee</label>
              <input type="text" className="fig-3-input2--el" id="ee" name="ee" defaultValue={values?.ee} />
            </div>
          </div>
          <div className="fig--4-field--el">
            <label htmlFor="ee">Taariikh</label>
            <input type="text" id="Taariikh" name="Taariikh" defaultValue={values?.Taariikh} />
          </div>
          <div
            className="footer--el"
            style={{
              marginTop: '30px'
            }}
          >
            <div className="footer-item">
              <h5 className='footer-caps'>{values?.Agaasimaha}</h5>
              <h5 className='line-bellow'>Duqa Magaalada</h5>
            </div>
            {/* <div className="footer-item">
              <h4>something here too </h4>
              <h5> </h5>
            </div> */}
            <div className="footer-item">
              <h5 className='footer-caps'>{values?.Duqa}</h5>
              <h5 className='line-bellow'>Agaasimaha Waaxda Dhulka</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PrintData.propTypes = {
  values: PropTypes.object,
  shouldPrint: PropTypes.bool,
  setShouldPrint: PropTypes.func
};

export default PrintData;
