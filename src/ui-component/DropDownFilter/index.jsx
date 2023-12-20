import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const countries = [
  {
    name: 'Lower-Shabeele',
    towns: [
      {
        name: 'Afgooye',
        districts: ['Lafoole', 'Jazira'],
      },
      {
        name: 'Marka',
        districts: [], // No districts 
      },
      {
        name: 'Aw-dheegle',
        districts: [], // No districts 
      },
      {
        name: 'Qoryooley',
        districts: [], // No districts 
      },
      {
        name: 'Kuntuwaarey',
        districts: [], // No districts 
      },
      {
        name: 'Sablaale',
        districts: [], // No districts 
      },
      {
        name: 'Wanlaweyn',
        districts: [], // No districts 
      }
     
    ],
  },
  {
    name: 'Bay',
    towns: [
      {
        name:'Bay-dhabo',
        districts:[],
      },
      {
        name:'Bardaale',
        districts:[]
      },
      {
        name:'Buur-hakabo',
        districts:[]
      },
      {
        name:'Diinsoor',
        districts:[]
      },
      {
        name:'Qansax-dheere',
        districts:[]
      },

    ],
  },
  {
    name:"Bakool",
    towns:[
       { name:"Hudur",
         districts:[]
       },
       { name:"Waajid",
         districts:[]
       },
       { name:"Tayeeglow",
         districts:[]
       },
       { name:"Ceel-Barde",
         districts:[]
       },
       { name:"Rabdhure",
         districts:[]
       },
    ]
  }

];
export const CountryDropdown = ({variant, locationQuery, setLocationQuery}) => {
  const flattenOptions = (options) => {
    const flattened = [];
    options.forEach((country) => {
      flattened.push({ name: country.name, type: 'country' });
      if (country.towns) {
        country.towns.forEach((town) => {
          flattened.push({ name: town.name, type: 'town' });
          if (town.districts && town.districts.length > 0) {
            town.districts.forEach((district) => {
              flattened.push({ name: district, type: 'district' });
            });
          }
        });
      }
    });
    return flattened;
  };

  const flattenedOptions = flattenOptions(countries);

  const handleLocationChange = (event, newValue) => {
    if (newValue) {
      setLocationQuery(newValue.name || '');
    
    } else {
      setLocationQuery('');
    }
  };

  const getOptionLabel = (option) => option.name || '';

  const getOptionSelected = (option, value) => option.name === value.name;

  return (
    <Autocomplete
    sx={{
      width:{
        md:300,
        xs:'100%',
        sm:'100%'
      }

    }}
      value={flattenedOptions.find((option) => getOptionSelected(option, { name: locationQuery }))}
      onChange={handleLocationChange}
      options={flattenedOptions}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      renderOption={(props, option) => (
        <li {...props} style={{ marginLeft: option.type === 'town' ? '20px' : option.type === 'district' ? '40px' : '0' }}>
          {option.type === 'country' ? (
            <strong>{option.name}</strong>
          ) : option.type === 'town' ? (
            <span>{option.name}</span>
          ) : (
            <em>{option.name}</em>
          )}
          {option.type === 'district' && <Box ml={2} fontStyle="italic">(SubDistrict)</Box>}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Select Location" variant={variant} />
      )}
    />
  );
};




