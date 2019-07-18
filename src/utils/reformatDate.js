/**
   * Format UTC date time to
   * MM-DD-YY format
   *
   * @param {string} dateString
   *
   * @return {string}
   */
const formatDate = (dateString) => {
  const allMonths = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October',
    'November', 'December',
  ];
  const date = new Date(dateString);
  return `${allMonths[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export default formatDate;
