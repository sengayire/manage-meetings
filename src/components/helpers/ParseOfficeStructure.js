const getNestedChildren = (arr, parentId) => {
  const nestedChildren = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const i in arr) {
    if (arr[i].parentId === parentId) {
      const children = getNestedChildren(arr, arr[i].id);
      if (children.length) {
        // eslint-disable-next-line no-param-reassign
        arr[i].children = children;
      }
      nestedChildren.push(arr[i]);
    }
  }
  return nestedChildren;
};

const dataTree = (data) => {
  const tree = [];
  const subTree = [];
  if (data.length > 0) {
    // eslint-disable-next-line no-return-assign
    data.map((value, index) => (
      tree[index] = {
        name: value.tag,
        id: value.id,
        children: value.children,
      }));
    tree.map(item => item.children && item.children.map(child => subTree.push({
      id: child.structureId,
      name: child.name,
      parentId: child.parentId === '' ? data[0].id : child.parentId,
      structureId: child.structureId,
      tag: child.tag,
    })));
    return subTree;
  }
  return tree;
};

export { dataTree, getNestedChildren };
