import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/en-gb';
import { TextField } from '@mui/material';

export default function CustomDatePicker({ value, onChange, onKeyDown, disabled }) {
  return (
    <TextField
        label="Select Date"
        value={value}
        onKeyDown={onKeyDown}
        disabled={disabled}
        onClick={(e) => {
            // Prevent the TextField from receiving focus on click
            e.preventDefault();
        }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <DatePicker
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => <TextField {...params} />}
                    
                    onClose={() => {}}
                    PopperProps={{
                        disablePortal: true
                    }}
                />
      </LocalizationProvider>
    </TextField>
  );
}
