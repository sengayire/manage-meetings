/**
 * Implements methods to parse cookies inorder to login a user
 */
import jwtDecode from 'jwt-decode';

/**
 * Returns an object containing cookies key:value pairs
 * @param {string} cookieString The cookie string
 */
const parseCookie = (cookieString) => {
  const cookiesObject = cookieString.split('; ').reduce((acc, val) => {
    const [key, value] = val.split('=');

    if (!key) return acc;

    return {
      ...acc,
      [key]: decodeURIComponent(value),
    };
  }, {});

  return cookiesObject;
};

/**
 * Gets the jwt from the cookie string
 * @param {string} cookiesString Cookies string
 */
const getToken = (cookiesString = document.cookie) =>
  parseCookie(cookiesString)['jwt-token'] || null;

/**
 * Decodes a token and returns an object containing user data and expiry date
 * @param {object} cookiesObject Returns an object containing user data
 */
const decodeTokenAndGetUserData = (userToken = null) => {
  const token = getToken() || userToken;
  if (!token) return null;

  return jwtDecode(token);
};

export { decodeTokenAndGetUserData, getToken, parseCookie };
