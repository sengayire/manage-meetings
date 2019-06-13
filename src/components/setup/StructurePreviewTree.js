/* eslint-disable jsx-a11y/no-static-element-interactions
jsx-a11y/click-events-have-key-events,jsx-a11y/anchor-is-valid */
/* eslint-disable react/forbid-prop-types */
import React, { Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import '../../assets/styles/previewModal.scss';
import { editIcon, deleteIcon } from '../../utils/images/images';
import MrmModal from '../commons/MrmModal';
import { deleteOfficeStructure } from '../helpers/mutationHelpers/Preview';
import notification from '../../utils/notification';

class StructurePreviewTree extends Component {
  state = {
    isLoading: false,
    error: '',
    success: '',
    confirmDelete: '',
  };
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

  getStuctureIds = (structures) => {
    const structureIds = [];
    structures.map(structure =>
      structureIds.push(structure.id),
    );
    return structureIds;
  }

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

  deleteStructureModal = createRef();

  toggleModal = () => {
    this.deleteStructureModal.current.toggleModal();
  };

  /**
   * it change isLoading state to it's opposite value
   * i.e true to false or vise-versa
   *
   * @returns {void}
   */
  toggleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };

  /**
   * It deletes the specified room from the list of rooms
   * and updates the UI to reflect the changes
   * @memberof Room
   */
  structureDelete = structures => async () => {
    const structureIds = this.getStuctureIds(structures);
    const { updateStructure } = this.props;
    const { confirmDelete } = this.state;
    try {
      this.toggleLoading();
      if (confirmDelete !== 'DELETE') {
        this.setState({
          error: 'type DELETE in capital letter in the box to delete the entire office structure',
          isLoading: false,
        });
        return;
      }
      const data = await deleteOfficeStructure(structureIds);
      this.toggleLoading();
      this.toggleModal();
      this.setState({
        success: 'success',
      });
      notification(toastr, this.state.success, 'The entire office structure has been successfully deleted')();
      updateStructure(data);
    } catch (err) {
      this.toggleLoading();
      this.toggleModal();
      this.setState({
        error: 'Network error, kindly try again!',
      });
      notification(toastr, 'error', this.state.error)();
    }
  };

  goBackToSetup = handleClick => (
    <div className="no-structure">
      <span>
        There are no structures in this location click the button below
        to setup a structure
      </span>
      <div><button onClick={handleClick('SetupInfoPage')}>SETUP</button></div>
    </div>
  )

  handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({
      confirmDelete: value,
    });
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

  renderEditButton = handleClick => (
    <div className="tree__edit-button">
      <button onClick={handleClick('SetupInfoPage')}>
        <img id="edit-structure-icon"src={editIcon} alt="edit" />
      </button>
    </div>
  )

  renderDeleteIcon = structures => (
    <MrmModal
      ref={this.deleteStructureModal}
      title="Delete Structure"
      btnImage={<img id="delete-structure-icon" src={deleteIcon} alt="delete structure" />}
      modalContent={
        <Fragment>
          <div className="delete-confirmation-text">
            Are you sure you want to delete the entire office structure? kindly type
            DELETE in the box below then click the delete button
          </div>
          <input
            type="text"
            name="confirm-delete"
            className="confirm-delete"
            value={this.state.confirmDelete}
            onChange={this.handleChange}
            readOnly={false}
          />
          <div className="confirm-error">{this.state.error}</div>
        </Fragment>
        }
      isLoading={this.state.isLoading}
      actionButtonText="DELETE"
      handleSubmit={this.structureDelete(structures)}
    />
  )

  render() {
    const { data, handleClick } = this.props;
    let structuredData;
    let parsed;
    if (data && data.length > 0) {
      structuredData = this.dataTree(data);
      parsed = this.getNestedChildren(structuredData, structuredData[0].parentId);
      return (
        <div className="preview-structure-tree">
          <div className="tree">
            {handleClick && this.renderDeleteIcon(structuredData)}
            {handleClick && this.renderEditButton(handleClick) }
            <ul>{this.renderLevels(parsed)}</ul>
          </div>
        </div>
      );
    }
    return (
      this.goBackToSetup(handleClick)
    );
  }
}

StructurePreviewTree.propTypes = {
  data: PropTypes.any.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default StructurePreviewTree;
