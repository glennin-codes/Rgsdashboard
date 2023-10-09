import React, { useEffect, useRef, useState } from 'react';
import '../FillForm/LandOwnership.css'; // Import your external CSS for styling
import { useReactToPrint } from 'react-to-print';
import PropTypes from 'prop-types';
export default function PrintData({ data, shouldPrint, setShouldPrint }) {
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
      console.log('document printed successful');

      setShouldPrint(false);
    }
  });
  if (shouldPrint) {
    print();
  }

  return (
    <div
      style={{
        display: 'none'
      }}
    >
      <form
        ref={componentRef}
        style={{
          width: '100%',
          height: window.innerWidth
        }}
      >
        <div className="form-container">
          <div className="title-el">
            <h2>DOWLAD GOBOLEEDKA KOOFUR GALBEED</h2>
            <h4>DOWLADA HOOSE EE DEGMADA {values.location || 'Location'}</h4>

            <h3>WAAXDA DHULKA</h3>
          </div>
          <div className="form-column1">
            <div className="form-field">
              <label htmlFor="No">No:</label>
              <input className="input-test" type="text" id="No" name="No" defaultValue={values.No} />
            </div>
            <div className="form-field">
              <label htmlFor="BollectarioNo">Bollectario No:</label>
              <input type="text" id="BollectarioNo" name="BollectarioNo" defaultValue={values.BollectarioNo} />
            </div>
            <div className="form-field">
              <label htmlFor="Tirisi">Soo Gelidda Warqadda Tirsi:</label>
              <input type="text" id="Tirsi" name="Tirsi" defaultValue={values.Tirsi} />
            </div>
            <div className="form-field">
              <label htmlFor="BolletaNo">Bolleta No:</label>
              <input type="text" id="BolletaNo" name="BolletaNo" defaultValue={values.BolletaNo} />
            </div>
            <div className="form-field">
              <label htmlFor="Taariikh">Taariikh:</label>
              <input type="text" id="Taariikh" name="Taariikh" defaultValue={values.Taariikh} />
            </div>
            <div className="form-field">
              <label htmlFor="Sanadka">Sanadka:</label>
              <input type="text" id="Sanadka" name="Sanadka" defaultValue={values.Sanadka} />
            </div>
          </div>
          <div className="form-title">
            <h4>WARQADDA LAHAANSHAHA DHULKA</h4>
          </div>
          <div className="form-field">
            <label htmlFor="mudMar">Mud. / M ar.</label>
            <input type="text" id="mudMar" name="mudMar" defaultValue={values.mudMar} />
          </div>
          <div className="form-title">
            <h5>ha / Marwada kor ku qoran waxaa loo oggolaaday inuu/inay dhisto cariish, Baraako ama Guri Dhagax ah Mudana</h5>
          </div>

          <div className="form-column2">
            <div className="form-field">
              <label htmlFor="vacant1"> </label>
              <input type="text" id="vacant1" name="vacant1" defaultValue={values.vacant1} />
            </div>
            <div className="form-field">
              <label htmlFor="X"> X :</label>
              <input type="text" id="X" name="X" defaultValue={values.X} />
            </div>
            <div className="sub-name">
              <p>oo u uko dhiso / dhisto cad dhul ah oo la eg</p>
            </div>
            <div className="form-field">
              <label htmlFor="vacant2"> </label>
              <input type="text" id="vacant2" name="vacant2" defaultValue={values.vacant2} />
            </div>
            <div className="form-field">
              <label htmlFor="kunaYaal"> kuna yaal:</label>
              <input type="text" id="kunaYaal" name="kunaYaal" defaultValue={values.kunaYaal} />
            </div>
            <div className="form-field">
              <label htmlFor="Dagmada">Degmada:</label>
              <input type="text" id="Degmada" name="Degmada" defaultValue={values.Degmada} />
            </div>
            <div className="form-field">
              <label htmlFor="Xaafadda">Xaafadda:</label>
              <input type="text" id="Xaafadda" name="Xaafadda" defaultValue={values.Xaafadda} />
            </div>
            <div className="form-field">
              <label htmlFor="SoohdintiisuTahay">Soohdintiisu Tahay:</label>
              <input type="text" id="SoohdintiisuTahay" name="SoohdintiisuTahay" defaultValue={values.SoohdintiisuTahay} />
            </div>
            <div className="form-field">
              <label htmlFor="Waqooyi">X. Waqooyi:</label>
              <input type="text" id="Waqooyi" name="Waqooyi" defaultValue={values.Waqooyi} />
            </div>
            <div className="form-field">
              <label htmlFor="Galbeed">X. Galbeed:</label>
              <input type="text" id="Galbeed" name="Galbeed" defaultValue={values.Galbeed} />
            </div>
            <div className="form-field">
              <label htmlFor="Bari">X. Bari:</label>
              <input type="text" id="Bari" name="Bari" defaultValue={values.Bari} />
            </div>
            <div className="form-field">
              <label htmlFor="kofuur">iyo X. Koofur:</label>
              <input type="text" id="kofuur" name="kofuur" defaultValue={values.kofuur} />
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
              <input type="text" id="lacagNo" name="lacagNo" defaultValue={values.lacagNo} />
            </div>
            <div className="form-field">
              <label htmlFor="ee">ee:</label>
              <input type="text" id="ee" name="ee" defaultValue={values.ee} />
            </div>
            <div className="form-field">
              <label htmlFor="ee">Taariikh:</label>
              <input type="text" id="Taariikh" name="Taariikh" defaultValue={values.Taariikh} />
            </div>
          </div>
          <div className="form-footer">
            <div className="footer-item">
              <h4>XASAN MACALIN CALI IBRAAHIM</h4>
              <h5>Agaasimaha Waaxda Dhulka</h5>
              <input type="text" id="Agaasimaha" name="Agaasimaha" defaultValue={values.Agaasimaha} />
            </div>
            <div className="footer-item">
              <h4>CABDULLAAHI CALI WATIIN</h4>
              <h5>Duqa Magaalada</h5>
              <input type="text" id="Duqa" name="Duqa" defaultValue={values.Duqa} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
PrintData.propTypes = {
  data: PropTypes.object,
  shouldPrint: PropTypes.bool,
  setShouldPrint: PropTypes.func
};
