import React, { useState, useEffect } from 'react';

function CountdownTimer() {
  // Set the end time (8 PM)
  const endTime = new Date();
  endTime.setHours(20, 0, 0, 0);

  // Calculate the initial time remaining based on the current time
  const currentTime = new Date();
  const initialTimeRemaining = endTime - currentTime;

  // Initialize state for the time remaining
  const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining);

  // Update the time remaining every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      const remaining = endTime - new Date();

      if (remaining <= 0) {
        clearInterval(intervalId);
        setTimeRemaining(0);
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endTime]);

  // Convert milliseconds to hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / 3600000);
  const minutes = Math.floor((timeRemaining % 3600000) / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);

  return (
    <div>
      <h2>Time Remaining: {hours}h {minutes}m {seconds}s</h2>
    </div>
  );
}

export default CountdownTimer;
