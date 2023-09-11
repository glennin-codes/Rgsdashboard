import { Typography } from '@mui/material';
import React from 'react';


function Greeting() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour < 17) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  return (
    <Typography variant="h4">{greeting}</Typography>
  );
}

export default Greeting;
