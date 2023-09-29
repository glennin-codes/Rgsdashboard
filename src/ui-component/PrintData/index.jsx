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
            <h4>DOWLADA HOOSE EE DEGMADA {data?.location}</h4>
            <h3>WAAXDA DHULKA</h3>
          </div>
          <div className="form-column1">
            <div className="form-field">
              <label htmlFor="No">No:</label>
              <input className="input-test" type="text" id="No" name="No" defaultValue={values.name} />
            </div>
            <div className="form-field">
              <label htmlFor="BollectarioNo">Bollectario No:</label>
              <input type="text" id="BollectarioNo" name="BollectarioNo" defaultValue={values.name} />
            </div>
            <div className="form-field">
              <label htmlFor="Tirisi">Soo Gelidda Warqadda Tirsi:</label>
              <input type="text" id="Tirsi" name="Tirsi" defaultValue={values.name} />
            </div>
            <div className="form-field">
              <label htmlFor="BolletaNo">Bolleta No:</label>
              <input type="text" id="BolletaNo" name="BolletaNo" defaultValue={values.paymentUniqueId} />
            </div>
            <div className="form-field">
              <label htmlFor="Taariikh">Taariikh:</label>
              <input type="text" id="Taariikh" name="Taariikh" defaultValue={values.name} />
            </div>
            <div className="form-field">
              <label htmlFor="Sanadka">Sanadka:</label>
              <input type="text" id="Sanadka" name="Sanadka" defaultValue={values.numberOfFamily} />
            </div>
          </div>
          <div className="form-title">
            <h4>WARQADDA LAHAANSHAHA DHULKA</h4>
          </div>
          <div className="form-field">
            <label htmlFor="mudMar">Mud. / M ar.</label>
            <input type="text" id="mudMar" name="mudMar" defaultValue={values.name} />
          </div>
          <div className="form-title">
            <h6>ha / Marwada kor ku qoran waxaa loo oggolaaday inuu/inay dhisto cariish, Baraako ama Guri Dhagax ah Mudana</h6>
          </div>

          <div className="form-column2">
            <div className="form-field">
              <label htmlFor="vacant"> </label>
              <input type="text" id="vacant" name="vacant" defaultValue={values.name} />
            </div>
            <div className="form-field">
              <label htmlFor="X"> X :</label>
              <input type="text" id="X" name="X" defaultValue={values.landInSquareMetres} />
            </div>
            <div className="sub-name">
              <p>oo u uko dhiso / dhisto cad dhul ah oo la eg</p>
            </div>
            <div className="form-field">
              <label htmlFor="vacant2"> </label>
              <input type="text" id="vacant2" name="vacant2" defaultValue={values.location} />
            </div>
            <div className="form-field">
              <label htmlFor="kunaYaal"> kuna yaal:</label>
              <input type="text" id="kunaYaal" name="kunaYaal" defaultValue={values.paymentUniqueId} />
            </div>
            <div className="form-field">
              <label htmlFor="Dagmada">Degmada:</label>
              <input type="text" id="Degmada" name="Degmada" defaultValue={values.paymentUniqueId} />
            </div>
            <div className="form-field">
              <label htmlFor="Xaafadda">Xaafadda:</label>
              <input type="text" id="Xaafadda" name="Xaafadda" defaultValue={values.houseNo} />
            </div>
            <div className="form-field">
              <label htmlFor="SoohdintiisuTahay">Soohdintiisu Tahay:</label>
              <input type="text" id="SoohdintiisuTahay" name="SoohdintiisuTahay" defaultValue={values.location} />
            </div>
            <div className="form-field">
              <label htmlFor="Waqooyi">X. Waqooyi:</label>
              <input type="text" id="Waqooyi" name="Waqooyi" defaultValue={values.houseNo} />
            </div>
            <div className="form-field">
              <label htmlFor="Galbeed">X. Galbeed:</label>
              <input type="text" id="Galbeed" name="Galbeed" defaultValue={values.numberOfFamily} />
            </div>
            <div className="form-field">
              <label htmlFor="Bari">X. Bari:</label>
              <input type="text" id="Bari" name="Bari" defaultValue={values.name} />
            </div>
            <div className="form-field">
              <label htmlFor="kofuur">iyo X. Koofur:</label>
              <input type="text" id="kofuur" name="kofuur" defaultValue={values.houseNo} />
            </div>

            {/* Submit button */}
          </div>
          <div className="title-el">
            <h4>Warqaddaan xaq waxaad ugu leedahay muddo laba iyo toban (12) bilood ah</h4>
            <h4>oo maantaka bilaabata, fasax la&#39;aan inaad dhulka dhistid.</h4>
          </div>

          <div className="form-column1">
            <div className="form-field">
              <label htmlFor="lacagNo"> Warqadadda lacag qabashada No. :</label>
              <input type="text" id="lacagNo" name="lacagNo" defaultValue={values.name} />
            </div>
            <div className="form-field">
              <label htmlFor="ee">ee:</label>
              <input type="text" id="ee" name="ee" defaultValue={values.name} />
            </div>
            <div className="form-field">
              <label htmlFor="ee">Taariikh:</label>
              <input type="text" id="Taariikh" name="Taariikh" defaultValue={new Date(values.date).toLocaleDateString('en-GB')} />
            </div>
          </div>
          <div className="form-footer">
            <div className="footer-item">
              <h4>XASAN MACALIN CALI IBRAAHIM</h4>
              <h5>Agaasimaha Waaxda Dhulka</h5>
              <input type="text" id="Agaasimaha" name="Agaasimaha" defaultValue={values.name} />
            </div>
            <div className="footer-item">
              <h4>CABDULLAAHI CALI WATIIN</h4>
              <h5>Duqa Magaalada</h5>
              <input type="text" id="Duqa" name="Duqa" defaultValue={values.name} />
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
  setShouldPrint: PropTypes.func,
};