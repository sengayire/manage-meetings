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
  return formattedQueryString
    .split('&')
    .reduce((parsedObject, stringToSplit) => {
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

/*
* Returns the start and end dates of a 5 day working week
* endDate is either a Friday or current day if the week
* days are still less or equal to Friday
* @retuns {object} that contains startDay and endDay
*/
function thisWeek() {
  const today = Date();
  const date = new Date();
  let milliSecs;
  let weekStart;
  let weekEnd;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weekDay = today.toString().substring(0, 3);
  if (days.indexOf(weekDay) > 4) {
    milliSecs = date.setDate(date.getDate() - (days.indexOf(weekDay) - 4));
    const fourDays = 4 * 24 * 60 * 60 * 999;
    weekStart = new Date(date - fourDays).toString().substring(4, 15);
    weekEnd = new Date(milliSecs).toString().substring(4, 15);

    return { weekStart, weekEnd };
  }
  milliSecs = date.setDate(date.getDate() - days.indexOf(weekDay));
  weekStart = new Date(milliSecs).toString().substring(4, 15);
  weekEnd = today.toString().substring(4, 15);
  return { weekStart, weekEnd };
}
/**
 * getFirstDayOfTheMonth : This returns the firstDay of the current month.
 * getTodaysDate : This returns today's current date.
 * The format is day/month/year, e.g "01 Nov 2018"
 * @type {Date}
 */
const date = new Date();
const getFirstDayOfTheMonth = () => {
  const firstOfMonth = `${date
    .toString()
    .substring(4, 7)} 01 ${date.toString().substring(11, 15)}`;
  return firstOfMonth;
};
const getTodaysDate = () => {
  const today = date.toString().substring(4, 15);
  return today;
};

export const compressArray = (original) => {
  let compressed = [];
  // make a copy of the input array
  const copy = [...original];

  // first loop goes over every element
  original.forEach((originalItem) => {
    let myCount = 0;
    // loop over every element in the copy and see if it's the same
    copy.forEach((copyItem, i) => {
      if (originalItem === copyItem) {
        // increase amount of times duplicate is found
        myCount += 1;
        // sets item to undefined
        delete copy[i];
      }

      if (myCount > 0) {
        const a = {};
        a.value = original[i];
        a.count = myCount;
        compressed = compressed.filter(({ value }) => value !== copyItem);
        compressed.push(a);
      }
    });
  });
  return compressed;
};


export {
  parseQueryString,
  getItemFromLocalStorage,
  saveItemInLocalStorage,
  removeItemFromLocalStorage,
  thisWeek,
  getFirstDayOfTheMonth,
  getTodaysDate,
};
