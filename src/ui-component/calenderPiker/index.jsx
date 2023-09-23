import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Box } from '@mui/system';

import 'dayjs/locale/en-gb';

export const DateRangePicker = ({ fetchData, startDate,setStartDate,endDate, setEndDate}) => {
  const handleSearch = (e) => {
    setEndDate(e);
    if (endDate) {
      fetchData();
    }
  };
  // localeText={deDE.components.MuiLocalizationProvider.defaultProps.localeText}
  return (
    <Box
    sx={{
     
      marginTop: {
      xs:5,
      sm:2
      }
    }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DatePicker
          sx={{
            marginRight: 2,
            marginBottom: {
              xs: 2,
              small: 2
            }
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
