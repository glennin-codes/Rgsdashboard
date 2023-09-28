import React, { useState } from 'react';
// import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { List, ListItemText, Typography, ButtonBase, ListItemButton } from '@mui/material';

export const CountryDropdown = () => {
  const [selectedTown, setSelectedTown] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const countries = [
    { name: 'USA', towns: ['New York', 'Los Angeles', 'Chicago'] },
    { name: 'Canada', towns: ['Toronto', 'Vancouver', 'Montreal'] },
    // Add more countries and towns as needed
  ];

  const handleTownSelect = (town, countryName) => {
    setSelectedTown(town);
    setSelectedCountry(countryName);
  };
console.log(selectedTown,selectedCountry)
  const dropdownWidth = '200px'; // Adjust the width as needed

  return (
    <div>
      <h3>Select a Town:</h3>
      <Select
        value={selectedTown}
        onChange={(e) => setSelectedTown(e.target.value)}
        style={{ width: dropdownWidth }}
      >
      
        {countries.map((country, index) => (
          <div key={index}>
            <Typography variant="h6">{country.name}</Typography>
            <List component="nav" aria-label="towns"
            sx={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            }}
            >
              {country.towns.map((town, townIndex) => (
                <ButtonBase
                  key={townIndex}
                  onClick={() => handleTownSelect(town, country.name)}
                >
                  <ListItemButton>
                    <ListItemText primary={town} />
                  </ListItemButton>
                </ButtonBase>
              ))}
            </List>
          </div>
        ))}
      </Select>
      
    </div>
  );
};
