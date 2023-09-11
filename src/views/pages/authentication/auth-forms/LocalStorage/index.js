// localStorage.js

export const storeDataInLocalStorage = (email,name,token,expirationTimeInSeconds) => {
    const expirationTimestamp = Date.now() + expirationTimeInSeconds * 1000;
    const dataToStoreToken_Time= { token, expirationTimestamp };
    localStorage.setItem("email", JSON.stringify(email));
    localStorage.setItem("name", JSON.stringify(name));
    localStorage.setItem("token", JSON.stringify(dataToStoreToken_Time));
  };
  
  export const getDataFromLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  };
  