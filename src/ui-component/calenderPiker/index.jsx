import React, { useState } from 'react';
import { OutlineInputStyle, InputAdornment, ButtonBase, Box } from '@mui/material';
import { IconSearch, IconAdjustmentsHorizontal } from '@mui/icons-material';
import { DateRangePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const SearchBar = ({ onDateRangeChange }) => {
  const [value, setValue] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false);

  const handleSearchInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
    onDateRangeChange(newDateRange);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <OutlineInputStyle
          id="input-search-header"
          value={value}
          onChange={handleSearchInputChange}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="1rem" color="grey" />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <ButtonBase
                sx={{ borderRadius: '12px' }}
                onClick={() => setIsDateRangePickerOpen(true)}
              >
                <div>Filter by Date</div>
                <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
              </ButtonBase>
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{ 'aria-label': 'weight' }}
        />
        <DateRangePicker
          open={isDateRangePickerOpen}
          onChange={handleDateRangeChange}
          value={dateRange}
          onClose={() => setIsDateRangePickerOpen(false)}
          calendars={2}
          renderInput={(startProps, endProps) => (
            <>
              <div>Start Date:</div>
              <input {...startProps} />
              <div>End Date:</div>
              <input {...endProps} />
            </>
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default SearchBar;
