import { getDataFromLocalStorage } from "views/pages/authentication/auth-forms/LocalStorage";
import { decodeToken } from "./decodeToken";

export const checkTokenExpiryAndWorkingHours = () => {
  const token = getDataFromLocalStorage('token');

  if (!token) {
    // Token is missing, user is not authenticated
    return false;
  }

  try {
    const decodedToken = decodeToken(token);
    const currentTime = new Date();

    // Check if it's a weekend (Friday, Saturday, or Sunday)
    const dayOfWeek = currentTime.getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
      if (decodedToken.role === "user") {
        return false; // Deny access during weekends for "user" role
      }
    }

    // Check if it's outside of working hours (8:00 AM to 5:00 PM)
    const currentHour = currentTime.getHours();
    if (currentHour < 8 || currentHour >= 17) {
      if (decodedToken.role === "user") {
        return false; // Deny access outside working hours for "user" role
      }
    }

    const currentTimeInSeconds = Math.floor(currentTime.getTime() / 1000);

    if (decodedToken.exp && decodedToken.iat) {
   if (currentTimeInSeconds >= decodedToken.iat && currentTimeInSeconds <= decodedToken.exp) {
        return true; // Allow access if the token is valid and not expired
      }
    }
  } catch (error) {
    // Handle any decoding errors here
    console.error('Error decoding JWT token:', error);
  }

  // Token is either expired or invalid, user is not authenticated or not within working hours
  return false;
};
