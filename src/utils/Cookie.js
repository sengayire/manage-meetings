/**
 * Implements methods to parse cookies inorder to login a user
 */
import jwtDecode from 'jwt-decode';
import { removeItemFromLocalStorage } from './Utilities';
import Constants from '../utils/Constants';

/**
 * Returns an object containing cookies key:value pairs
 * @param {string} cookieString The cookie string
 */
const {
  MRM_TOKEN,
} = Constants;


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
 * Clear cookie
 * @param {string} cookiesString Cookies string
 */
const clearCookies = () => {
  document.cookie
    .split(';')
    .forEach((item) => {
      const key = item.split('=')[0];
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.andela.com; path=/;`;
    });
  return true;
};

/**
 * Decodes a token and returns an object containing user data and expiry date
 * @param {object} cookiesObject Returns an object containing user data
 */
const decodeTokenAndGetUserData = (userToken = null) => {
  const token = getToken() || userToken;
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (e) {
    removeItemFromLocalStorage(MRM_TOKEN);
    clearCookies();
    window.location.reload();
    return null;
  }
};

export {
  decodeTokenAndGetUserData,
  getToken,
  parseCookie,
  clearCookies,
};
