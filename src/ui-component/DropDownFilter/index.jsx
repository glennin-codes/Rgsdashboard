
import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const locations = [
  'Afgooye',
  'Awdheegle',
  'Baraawe',
  'Kuntuwaarey',
  'Marka',
  'Qoryooley',
  'Wanlaweyn',
  'Sablaale',
  'Baydhabo',
  'Buurhakabo',
  'Bardaale',
  'Diinsoor',
  'Qansax-dheere',
  'Hudur',
  'Waajid',
  'Tayeeglow',
  'Ceel-Barde',
  'Rabdhure'
]; 


export const CountryDropdown = ({locationQuery,setLocationQuery}) => {

  const handleLocationChange = (event, newValue) => {
    setLocationQuery(newValue);
  };
  return (
    <Autocomplete
    variant="standard"
      value={locationQuery}
      onChange={handleLocationChange}
      options={locations}
      renderInput={(params) => <TextField {...params} label="Select Location" variant="outlined" />}
    />
  );
};
