/**
 * @param {array} dataArray
 * @param {object} structureData
 * @returns {object} formatedData
 */
/* istanbul ignore next */
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
/* istanbul ignore next */
const getparentTitle = (sortedData, child) => {
  let parent;
  sortedData.forEach((element) => {
    if (child.level - 1 && element.level === child.level - 1
      && child.parentId === element.structureId) {
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
/* istanbul ignore next */
const sortArray = (arrayToSort) => {
  const sortedArray = arrayToSort.sort((a, b) => a.level - b.level);
  return sortedArray;
};
/**
 * @param {Array} dataArray
 * @returns {object}
 */
const orderByLevel = (dataArray) => {
  const sortedData = sortArray(dataArray);
  const newArray = [];

  sortedData.forEach((element) => {
    const newObj = Object.assign({}, element);
    const parentTitle = getparentTitle(sortedData, element);
    newObj.parentTitle = parentTitle ? /* istanbul ignore next */ parentTitle.name : '';
    newArray[element.level - 1] =
      newArray[element.level - 1] !== undefined
        ? /* istanbul ignore next */ formatData(newArray[element.level - 1], newObj, sortedData)
        : {
          id: '',
          children: [newObj],
          parentId: element.parentId,
          parentTitle: element.parentTitle,
          tag: element.tag,
          quantity: 1,
          structureId: element.structureId,
        };
  });
  return newArray;
};

/* istanbul ignore next */
const flattenLocationStructureData = (levelsDetails) => {
  const flattenData = [];
  [...levelsDetails].map(({ tag, level, children }) => (
    children.map(({
      structureId, name, parentId, parentTitle,
    }) => (
      flattenData.push({
        level,
        parentId,
        parentTitle,
        structureId,
        name,
        tag,
      })
    ))
  ));
  return flattenData;
};

const removeDeletedLevels = (flattenedStructure, nodesToBeDeleted) =>
  flattenedStructure
    .map(item => !nodesToBeDeleted.includes(item.structureId) && item)
    .filter(item => item !== false);

// eslint-disable-next-line import/prefer-default-export
export {
  orderByLevel,
  formatData,
  getparentTitle,
  removeDeletedLevels,
  flattenLocationStructureData,
};
