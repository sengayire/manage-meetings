/* eslint-disable jsx-a11y/no-static-element-interactions
jsx-a11y/click-events-have-key-events,jsx-a11y/anchor-is-valid */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/previewModal.scss';


class StructurePreviewTree extends Component {
  getNestedChildren = (arr, parentId) => {
    const nestedChildren = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const i in arr) {
      if (arr[i].parentId === parentId) {
        const children = this.getNestedChildren(arr, arr[i].id);
        if (children.length) {
          // eslint-disable-next-line no-param-reassign
          arr[i].children = children;
        }
        nestedChildren.push(arr[i]);
      }
    }
    return nestedChildren;
  };

  dataTree = (data) => {
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
      })));

      return subTree;
    }
    return tree;
  };

  renderLevels = parsed => (
    parsed && parsed.map((element) => {
      if (element.children) {
        return (
          <li key={element.id}>
            <a>{element.name}</a>
            <ul>{this.renderLevels(element.children)}</ul>
          </li>
        );
      }
      return (
        <li key={element.id}>
          <a>{element.name}</a>
        </li>
      );
    })
  );

  render() {
    const { data } = this.props;
    let structuredData;
    let parsed;
    if (data && data.length > 0) {
      structuredData = this.dataTree(data);
      parsed = this.getNestedChildren(structuredData, structuredData[0].parentId);
    }
    return (
      <div className="preview-structure-tree">
        <div className="tree">
          <ul>{this.renderLevels(parsed)}</ul>
        </div>
      </div>
    );
  }
}

StructurePreviewTree.propTypes = {
  data: PropTypes.any.isRequired,
};

export default StructurePreviewTree;
