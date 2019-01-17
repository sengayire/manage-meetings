/**
 * Converts minutes to hours:minutes
 *
 * @param {number} data
 *
 * @returns {string}
 */
const timeConvert = (data) => {
  const minutes = data % 60;
  const hours = (data - minutes) / 60;
  return `${hours} ${hours <= 1 ? 'Hour' : 'Hours'} ${minutes} ${
    minutes <= 1 ? 'Minute' : 'Minutes'
  }`;
};
export default timeConvert;
