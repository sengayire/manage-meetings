/**
 * This file has utility methods that implement ungrouped functionality in the application
 */

/**
 * Converts a url query string into an object containing key value pairs of the query params
 * @param {string} urlQueryString The URL query string e.g ?q=hello&v=waw. Can parse
 * the string got from props.location.search when using react router.
 */
const parseQueryString = (urlQueryString) => {
// replace first ? with a space
  const formattedQueryString = decodeURIComponent(urlQueryString.replace(/^\?/, ''));
  return formattedQueryString.split('&').reduce((parsedObject, stringToSplit) => {
    const [key, value] = stringToSplit.split('=');
    return { ...parsedObject, [key]: value };
  }, {});
};

/**
 * Gets the value of a particular key from localStorage
 * @param {string} itemKey The key of the item to get from local storage
 */
const getItemFromLocalStorage = (itemKey) => {
  try {
    return JSON.parse(localStorage.getItem(itemKey));
  } catch (e) {
    return null;
  }
};

/**
 * Remove the value of a particular key from localStorage
 * @param {string} itemKey The key of the item to remove from local storage
 */
const removeItemFromLocalStorage = (itemKey) => {
  try {
    localStorage.removeItem(itemKey);
    return true;
  } catch (e) {
    return null;
  }
};

/**
 * Stores a an item in the local storage
 * @param {string} key The Key of the item in local storage
 * @param {any} value The value of the item to be store in local storage
 */
const saveItemInLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return null;
  }
};

export {
  parseQueryString,
  getItemFromLocalStorage,
  saveItemInLocalStorage,
  removeItemFromLocalStorage,
};

