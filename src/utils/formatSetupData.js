/**
 * @param {array} dataArray
 * @param {object} structureData
 * @returns {object} formatedData
 */
const formatData = (dataArray, structureData) => {
  const formatedData = {
    id: '',
    parentId: structureData.parentId,
    tag: structureData.tag,
    quantity: dataArray.children.length + 1,
    children: [...dataArray.children, structureData],
  };
  formatedData.children.sort((a, b) => a.position - b.position);
  return formatedData;
};
/**
 * @param {array} arrayToSort
 * @returns {array} sortedArray
 */
const sortArray = (arrayToSort) => {
  const sortedArray = arrayToSort.sort((a, b) => a.level - b.level);
  return sortedArray;
};
/**
 * @param {array} dataArray
 * @returns {object}
 */
const orderByLevel = (dataArray) => {
  const sortedData = sortArray(dataArray);
  const newArray = [];

  sortedData.forEach((element) => {
    newArray[element.level - 1] =
      newArray[element.level - 1] !== undefined
        ? formatData(newArray[element.level - 1], element)
        : {
          id: '',
          children: [element],
          parentId: element.parentId,
          tag: element.tag,
          quantity: 1,
        };
  });
  return newArray;
};
export default orderByLevel;
