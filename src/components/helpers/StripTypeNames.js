/**
   * Removes typename from returned objects
   *
   * @param {array} value
   *
   * @returns {array}
   */
const stripTypenames = (value) => {
  if (Array.isArray(value)) {
    return value.map(stripTypenames);
  } else if (value !== null && typeof (value) === 'object') {
    const newObject = {};
    Object.keys(value).forEach((property) => {
      if (property !== '__typename') {
        newObject[property] = stripTypenames(value[property]);
      }
    });
    return newObject;
  }
  return value;
};

export default stripTypenames;
