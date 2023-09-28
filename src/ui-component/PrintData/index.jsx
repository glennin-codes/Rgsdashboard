import React, { useRef, useState } from 'react';
import '../FillForm/LandOwnership.css'; // Import your external CSS for styling
import { useReactToPrint } from 'react-to-print';

export default function PrintData(data) {
  const [values, setValues] = useState({
    No: '',
    BollectarioNo: '',
    Tirsi: '',
    BolletaNo: '',
    Taariikh: '',
    mudan: '',
    Sanadka: '',
    Xaafadda: '',
    vacant: '',
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
  const componentRef = useRef(null);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTittle: 'form-data',
    onAfterPrint: () => console.log('document printed')
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        ref={componentRef}
        style={{
          width: '100%',
          height: window.innerWidth
        }}
      >
        <div className="form-container">
          <div className="title-el">
            <h2>DOWLAD GOBOLEEDKA KOOFUR GALBEED</h2>
            <h4>DOWLADA HOOSE EE DEGMADA BAYDHABO</h4>
            <h3>WAAXDA DHULKA</h3>
          </div>
          <div className="form-column1">
            <div className="form-field">
              <label htmlFor="siro">No:</label>
              <input className="input-test" type="number" id="No" name="No" value={values.No} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="BollectarioNo">Bollectario No:</label>
              <input type="number" id="BollectarioNo" name="BollectarioNo" value={values.BollectarioNo} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="Tirisi">Soo Gelidda Warqadda Tirsi:</label>
              <input type="text" id="Tirsi" name="Tirsi" value={values.Tirsi} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="BolletaNo">Bolleta No:</label>
              <input type="text" id="BolletaNo" name="BolletaNo" value={values.BolletaNo} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="Taariikh">Taariikh:</label>
              <input type="text" id="Taariikh" name="Taariikh" value={values.Taariikh} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="Sanadka">Sanadka:</label>
              <input type="text" id="Sanadka" name="Sanadka" value={values.Sanadka} onChange={handleChange} />
            </div>
          </div>
          <div className="form-title">
            <h4>WARQADDA LAHAANSHAHA DHULKA</h4>
          </div>
          <div className="form-field">
            <label htmlFor="mudMar">Mud. / M ar.</label>
            <input type="text" id="mudMar" name="mudMar" value={values.mudMar} onChange={handleChange} />
          </div>
          <div className="form-title">
            <h6>ha / Marwada kor ku qoran waxaa loo oggolaaday inuu/inay dhisto cariish, Baraako ama Guri Dhagax ah Mudana</h6>
          </div>

          <div className="form-column2">
            <div className="form-field">
              <label htmlFor="vacant"> </label>
              <input type="text" id="vacant" name="vacant" value={values.vacant} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="X"> X :</label>
              <input type="text" id="X" name="X" value={values.X} onChange={handleChange} />
            </div>
            <div className="sub-name">
              <p>oo u uko dhiso / dhisto cad dhul ah oo la eg</p>
            </div>
            <div className="form-field">
              <label htmlFor="vacant"> </label>
              <input type="text" id="vacant" name="vacant" value={values.vacant} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="X"> kuna yaal:</label>
              <input type="text" id="kunaYaal" name="kunaYaal" value={values.kunaYaal} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="Dagmada">Degmada:</label>
              <input type="text" id="Degmada" name="Degmada" value={values.Degmada} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="Xaafadda">Xaafadda:</label>
              <input type="text" id="Xaafadda" name="Xaafadda" value={values.Xaafadda} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="SoohdintiisuTahay">Soohdintiisu Tahay:</label>
              <input type="text" id="SoohdintiisuTahay" name="SoohdintiisuTahay" value={values.SoohdintiisuTahay} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="Waqooyi">X. Waqooyi:</label>
              <input type="text" id="Waqooyi" name="Waqooyi" value={values.Waqooyi} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="Galbeed">X. Galbeed:</label>
              <input type="text" id="Galbeed" name="Galbeed" value={values.Galbeed} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="Bari">X. Bari:</label>
              <input type="text" id="Bari" name="Bari" value={values.Bari} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="kofuur">iyo X. Koofur:</label>
              <input type="text" id="kofuur" name="kofuur" value={values.kofuur} onChange={handleChange} />
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
              <input type="text" id="lacagNo" name="lacagNo" value={values.lacagNo} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="ee">ee:</label>
              <input type="text" id="ee" name="ee" value={values.ee} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="ee">Taariikh:</label>
              <input type="text" id="Taariikh" name="Taariikh" value={values.Taariikh} onChange={handleChange} />
            </div>
          </div>
          <div className="form-footer">
            <div className="footer-item">
              <h5>XASAN MACALIN CALI IBRAAHIM</h5>
              <h6>Agaasimaha Waaxda Dhulka</h6>
              <input type="text" id="Agaasimaha" name="Agaasimaha" value={values.Agaasimaha} onChange={handleChange} />
            </div>
            <div className="footer-item">
              <h4>CABDULLAAHI CALI WATIIN</h4>
              <h5>Duqa Magaalada</h5>
              <input type="text" id="Duqa" name="Duqa" value={values.Duqa} onChange={handleChange} />
            </div>
          </div>
          <div>
            <button onClick={handlePrint} className="form-button no-print" type="submit">
              print
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
