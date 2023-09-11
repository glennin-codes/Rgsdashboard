import jwt_decode from 'jwt-decode';

export function decodeToken(token) {
  try {
    if (!token) {
      // Token is null or undefined, return null or handle this case accordingly
      return null;
    }

    const decodedData = jwt_decode(token);
    return decodedData;
  } catch (error) {
    // Handle any decoding errors here
    console.error('Error decoding JWT token:', error);
    return null;
  }
}
