import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import PropTypes from 'prop-types';
import './PrintData.css';

const PrintData = ({ data, shouldPrint, setShouldPrint }) => {
  const [values, setValues] = useState('');
  const componentRef = useRef();

  useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  const print = useReactToPrint({
    content: () => componentRef.current,

    documentTitle: 'form-data',
    onAfterPrint: () => {
      console.log('document printed successfully');
      setShouldPrint(false);
    }
  });

  if (shouldPrint) {
    print();
  }

  return (
    <div ref={componentRef} className="form--el">
      <div className="container--el">
        <div className="main-tittle--el">
          <h4>DOWLADA HOOSE EE DEGMADA {data?.location || 'Location'}</h4>
          <h3>WAAXDA DHULKA</h3>
        </div>

        <div className="InputSet-As">
          <div className="col--1">
            <div className="field--el">
              <label htmlFor="No">No:</label>
              <input className="input--el col-1" type="text" id="No" name="No" defaultValue={values.No} />
            </div>

            <div className="break--el">
              <p htmlFor="Tirisi">Soo Gelidda Warqadda </p>
              <span className="tilt-away--el">
                {' '}
                <p>Tirsi:</p> <input className="input--el  col-1" type="text" id="Tirsi" name="Tirsi" defaultValue={values.Tirsi} />{' '}
              </span>
            </div>
            <div className="field--el">
              <label htmlFor="Taariikh">Taariikh:</label>
              <input className="input--el col-1" type="text" id="Taariikh" name="Taariikh" defaultValue={values.Taariikh} />
            </div>
          </div>
          <div className="col--2">
            <div className="fields--el">
              <label htmlFor="BollectarioNo">Bollectario No:</label>
              <input className="input--el col-2" type="text" id="BollectarioNo" name="BollectarioNo" defaultValue={values.BollectarioNo} />
            </div>
            <div className="fields--el">
              <label htmlFor="BolletaNo">Bolleta No:</label>
              <input className="input--el col-2" type="text" id="BolletaNo" name="BolletaNo" defaultValue={values.BolletaNo} />
            </div>
            <div className="fields--el">
              <label htmlFor="Sanadka">Sanadka:</label>
              <input className="input--el col-2" type="text" id="Sanadka" name="Sanadka" defaultValue={values.Sanadka} />
            </div>
          </div>
        </div>
        <div className="main-tittle--el">
          <h3>WARQADDA LAHAANSHAHA DHULKA</h3>
        </div>
        <div className="form-field--el">
          <label htmlFor="mudMar">Mud. / M ar.</label>
          <input type="text" id="mudMar" name="mudMar" defaultValue={values.mudMar} />
        </div>
        <div className="tittle--el">
          <h5>Mudanaha/ Marwada kor ku qoran waxaa loo oggolaaday inuu/inay dhisto cariish, Baraako ama Guri Dhagax ah </h5>
        </div>
        <div className="field2--el">
          <div className="fig--a">
            <div className="fig-field--el">
              <label htmlFor="vacant1"> </label>
              <input type="text" id="vacant1" name="vacant1" defaultValue={values.vacant1} />
            </div>
            <div className="fig-field--el">
              <label htmlFor="X"> X :</label>
              <input type="text" id="X" name="X" defaultValue={values.X} />
              <p>oo u uko dhiso / dhisto cad dhul ah oo la eg</p>
            
            </div>
            
              
          </div>
        </div>
        {/* Your existing form code goes here */}

        <div className="subtitles--el">
          <h4>Warqaddaan xaq waxaad ugu leedahay muddo laba iyo toban (12) bilood ah</h4>
          <h4>oo maantaka bilaabata, fasax la&apos; aan inaad dhulka dhistid.</h4>
        </div>

        <div className="footer--el">
          <div className="footer-item">
            <h4>CABDULLAAHI CALI WATIIN</h4>
            <h5>Duqa Magaalada</h5>
          </div>

          <div className="footer-item">
            <h4>XASAN MACALIN CALI IBRAAHIM</h4>
            <h5>Agaasimaha Waaxda Dhulka</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

PrintData.propTypes = {
  data: PropTypes.object,
  shouldPrint: PropTypes.bool,
  setShouldPrint: PropTypes.func
};

export default PrintData;
