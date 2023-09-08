import * as React from 'react';
import { TextField, Button, Grid, FormControl, InputLabel, Box } from '@mui/material';

export default function LandOwnershipForm() {
  const [values, setValues] = React.useState({
    siro: '',
    tarikh: '',
    mudan: '',
    baan: '',
    xaafada: '',
    xoog: '',
    mudMar: '',
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: '',
    field8: '',
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="siro">Siro</InputLabel>
            <TextField
              id="siro"
              name="siro"
              value={values.siro}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="tarikh">Tarikh</InputLabel>
            <TextField
              id="tarikh"
              name="tarikh"
              value={values.tarikh}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="mudan">Mudan</InputLabel>
            <TextField
              id="mudan"
              name="mudan"
              value={values.mudan}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="baan">Baan</InputLabel>
            <TextField
              id="baan"
              name="baan"
              value={values.baan}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="xaafada">Xaafada</InputLabel>
            <TextField
              id="xaafada"
              name="xaafada"
              value={values.xaafada}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="xoog">Xoog</InputLabel>
            <TextField
              id="xoog"
              name="xoog"
              value={values.xoog}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {/* Title */}
          Dowlad Goboleedka Koofur Galbeed - Waaxda Dhulka
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="mudMar">Mud/Mar</InputLabel>
            <TextField
              id="mudMar"
              name="mudMar"
              value={values.mudMar}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        {/* Additional fields */}
        {[...Array(12)].map((_, i) => (
          <Grid item xs={(i + 1) % 4 === 0 ? 4 : 4} key={`field${i + 1}`}>
            <FormControl fullWidth>
              <InputLabel htmlFor={`field${i + 1}`}>Field {i + 1}</InputLabel>
              <TextField
                id={`field${i + 1}`}
                name={`field${i + 1}`}
                value={values[`field${i + 1}`]}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
        ))}
        {/* Submit button */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}