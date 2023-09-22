import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Box } from '@mui/system';

import 'dayjs/locale/en-gb';

export const DateRangePicker = ({ fetchData }) => {
  const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);

  const handleSearch = (e) => {
    setEndDate(e);
    if (endDate) {
      fetchData(startDate,endDate);
    }
  };

  // localeText={deDE.components.MuiLocalizationProvider.defaultProps.localeText}
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DatePicker
          sx={{
            marginRight:2
          }}
          label="Select Start Date"
          value={startDate}
          views={['day', 'month', 'year']}
          onChange={(e) => {
            setStartDate(e);
          }}
        />

        <DatePicker
          disabled={!startDate ? true : false}
          label="Select endDate"
          value={endDate}
          views={['day', 'month', 'year']}
          onChange={handleSearch}
        />
      </LocalizationProvider>
    </Box>
  );
};
