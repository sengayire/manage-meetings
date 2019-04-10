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
    parentTitle: structureData.parentTitle,
    children: [...dataArray.children, structureData],
  };
  formatedData.children.sort((a, b) => a.position - b.position);
  return formatedData;
};
/**
 * @returns {parent} string
 * @param {array} sortedData
 * @param {object} child
 */
const getparentTitle = (sortedData, child) => {
  let parent;
  sortedData.forEach((element) => {
    if (child.level - 1 && element.level === child.level - 1 && child.parentId === element.id) {
      parent = element;
      return parent;
    }
    return null;
  });
  return parent;
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
    const newObj = Object.assign({}, element);
    const parentTitle = getparentTitle(sortedData, element);
    newObj.parentTitle = parentTitle ? parentTitle.name : '';
    newArray[element.level - 1] =
      newArray[element.level - 1] !== undefined
        ? formatData(newArray[element.level - 1], newObj, sortedData)
        : {
          id: '',
          children: [newObj],
          parentId: element.parentId,
          tag: element.tag,
          quantity: 1,
        };
  });
  return newArray;
};

export default orderByLevel;
