import React, { useState } from 'react';
import './LandOwnershipForm.css'; // Import your external CSS for styling

export default function LandOwnershipForm() {
  const [values, setValues] = useState({
    No: '',
    BollectarioNo:'',
    Tirsi:"",
    BolletaNo:"",
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
    field9: '',
    field10: '',
    field11: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="form-column">
          <div className="form-field">
            <label htmlFor="siro">No:</label>
            <input
              type="number"
              id="No"
              name="No"
              value={values.No}
              onChange={handleChange}
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
            />
          </div>
          <div className="form-field">
            <label htmlFor="Tirisi">Soo Gelidda Warqadda Tirsi:</label>
            <input
              type="text"
              id="Tirsi"
              name="Tirsi"
              value={values.Tirsi}
              onChange={handleChange}
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
            />
          </div>
          <div className="form-field">
            <label htmlFor="Taariikh">Taariikh:</label>
            <input
              type="text"
              id="Taariikh"
              name="Taariikh"
              value={values.Taariikh}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="Sanadka">Sanadka:</label>
            <input
              type="text"
              id="Sanadka"
              name="Sanadka"
              value={values.Sanadka}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-title">
              WARQADDA LAHAANSHAHA DHULKA
          </div>
          <div className="form-field">
            <label htmlFor="mudMar">Mud. / M ar.</label>
            <input
              type="text"
              id="mudMar"
              name="mudMar"
              value={values.mudMar}
              onChange={handleChange}
            />
          </div>
          <div
          className="form-title"
          >
            <h6>
            ha / Marwada kor ku qoran waxaa loo oggolaaday inuu/inay dhisto cariish, Baraako ama Guri Dhagax ah Mudana 
            </h6>
          </div>
     
        <div className="form-column2">
        <div className="form-field">
            <label htmlFor="vacant" > </label>
            <input
              type="text"
              id="vacant"
              name="vacant"
              value={values.vacant}
              onChange={handleChange}
            />
          </div>
        <div className="form-field">
            <label htmlFor="X" > X :</label>
            <input
              type="text"
              id="X"
              name="X"
              value={values.X}
              onChange={handleChange}
            />
          </div>
          <div
          className='sub-name'
          >
            <p>
            oo u uko dhiso / dhisto cad dhul ah oo la eg
            </p>
          </div>
          <div className="form-field">
            <label htmlFor="vacant" > </label>
            <input
              type="text"
              id="vacant"
              name="vacant"
              value={values.vacant}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="X" > kuna yaal:</label>
            <input
              type="text"
              id="kunaYaal"
              name="kunaYaal"
              value={values.kunaYaal}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="Dagmada" >Degmada:</label>
            <input
              type="text"
              id="Degmada"
              name="Degmada"
              value={values.Degmada}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="Xaafadda" >Xaafadda:</label>
            <input
              type="text"
              id="Xaafadda"
              name="Xaafadda"
              value={values.Xaafadda}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="SoohdintiisuTahay" >Soohdintiisu Tahay:</label>
            <input
              type="text"
              id="SoohdintiisuTahay"
              name="SoohdintiisuTahay"
              value={values.SoohdintiisuTahay}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="Waqooyi" >X. Waqooyi:</label>
            <input
              type="text"
              id="Waqooyi"
              name="Waqooyi"
              value={values.Waqooyi}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="Galbeed" >X. Galbeed:</label>
            <input
              type="text"
              id="Galbeed"
              name="Galbeed"
              value={values.Galbeed}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="Bari" >X. Bari:</label>
            <input
              type="text"
              id="Bari"
              name="Bari"
              value={values.Bari}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="kofuur" >iyo X.
Koofur:</label>
            <input
              type="text"
              id="kofuur"
              name="kofuur"
              value={values.kofuur}
              onChange={handleChange}
            />
          </div>
        
          {/* Submit button */}
          <div >
            <button className="form-button" type="submit">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
}
