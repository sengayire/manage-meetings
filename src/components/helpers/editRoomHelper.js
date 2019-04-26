/**
 * formarts data
 * @param {array} source
 * @param {array} target
 * @returns {array} formattedData
 */
const tranformInputLevel = (source, target) => {
  if (!target.length) {
    return source;
  }
  if (source.length === target.length) {
    return target.map(element => element.value);
  }
  const castSourceToArrayObject = source.map((level, index) => ({
    id: `${index + 1}`,
    value: level,
  }));
  [...castSourceToArrayObject].forEach((element, index) => {
    // eslint-disable-next-line consistent-return
    target.forEach((targetElement) => {
      if (element.id === targetElement.id) {
        return castSourceToArrayObject.splice(index, 1, targetElement);
      }
    });
  });
  const formattedData = castSourceToArrayObject.map(element => element.value);
  return formattedData;
};
export default tranformInputLevel;
