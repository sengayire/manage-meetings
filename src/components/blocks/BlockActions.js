import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import '../../assets/styles/addoffice.scss';
import ADD_BLOCK_MUTATION, { DELETE_BLOCK_MUTATION, EDIT_BLOCK_MUTATION } from '../../graphql/mutations/Blocks';
import notification from '../../utils/notification';
import BlockModal from './BlockModal';
import DeleteBlockModal from './DeleteBlockModal';

export class BlockActions extends Component {
  state = {
    blockName: this.props.block.name,
    closeModal: false,
    isLoading: false,
  };

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  handleFormInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  handleAddBlock = (event) => {
    event.preventDefault();
    const { blockName } = this.state;
    const { office, refetch } = this.props;
    if (!blockName) {
      notification(toastr, 'error', 'SingleBlock name is required')();
    } else {
      this.toggleLoading();
      this.props
        .addBlock({
          variables: {
            officeId: office.id,
            name: blockName,
          },
        })
        .then(() => {
          this.toggleLoading();
          this.handleCloseModal();
          refetch();
          notification(
            toastr,
            'success',
            `${blockName} block has been added successfully`,
          )();
        })
        .catch((err) => {
          this.toggleLoading();
          this.handleCloseModal();
          notification(toastr, 'error', err.graphQLErrors[0].message)();
        });
    }
  };

  handleDeleteBlock = (event) => {
    event.preventDefault();
    const { block, refetch } = this.props;
    if (!block || Object.keys(block).length === 0) {
      notification(toastr, 'error', 'SingleBlock not specified is required')();
    } else {
      this.toggleLoading();
      this.props
        .deleteBlock({
          variables: {
            blockId: block.id,
          },
        })
        .then(() => {
          this.toggleLoading();
          this.handleCloseModal();
          refetch();
          notification(
            toastr,
            'success',
            `block ${block.name} has been deleted successfully`,
          )();
        })
        .catch((err) => {
          this.toggleLoading();
          this.handleCloseModal();
          notification(toastr, 'error', err.graphQLErrors[0].message)();
        });
    }
  };

  handleEditBlock = (event) => {
    event.preventDefault();
    const { block } = this.props;
    const { blockName } = this.state;
    if (!blockName) {
      notification(toastr, 'error', 'SingleBlock name is required')();
    } else {
      this.toggleLoading();
      this.props
        .editBlock({
          variables: {
            blockId: block.id,
            name: blockName,
          },
        })
        .then(() => {
          this.toggleLoading();
          this.handleCloseModal();
          notification(
            toastr,
            'success',
            `block has been renamed successfully to ${blockName}`,
          )();
        })
        .catch((err) => {
          this.toggleLoading();
          this.handleCloseModal();
          notification(toastr, 'error', err.graphQLErrors[0].message)();
        });
    }
  };

  /**
   * 1. change isLoading state to it's opposite value
   * i.e true to false or vise verser
   *
   * @returns {void}
   */
  toggleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  }

  render() {
    const { blockName, closeModal, isLoading } = this.state;
    const {
      office, editing, deleting, block,
    } = this.props;
    if (deleting) {
      return (
        <DeleteBlockModal
          block={block}
          closeModal={closeModal}
          isLoading={isLoading}
          handleCloseModal={this.handleCloseModal}
          handleModalStateChange={this.handleModalStateChange}
          handleDeleteBlock={this.handleDeleteBlock}
        />);
    }
    return (
      <BlockModal
        blockName={blockName}
        closeModal={closeModal}
        isLoading={isLoading}
        office={editing ? {} : office}
        editing={editing}
        handleCloseModal={this.handleCloseModal}
        handleSubmit={editing ? this.handleEditBlock : this.handleAddBlock}
        handleFormInputChange={this.handleFormInputChange}
        handleModalStateChange={this.handleModalStateChange}
      />);
  }
}

BlockActions.propTypes = {
  office: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  editing: PropTypes.bool,
  deleting: PropTypes.bool,
  block: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  editBlock: PropTypes.func.isRequired,
  addBlock: PropTypes.func.isRequired,
  deleteBlock: PropTypes.func.isRequired,
  refetch: PropTypes.func,
};

BlockActions.defaultProps = {
  editing: false,
  deleting: false,
  block: {},
  refetch: () => {},
};

export default compose(
  graphql(ADD_BLOCK_MUTATION, { name: 'addBlock' }),
  graphql(DELETE_BLOCK_MUTATION, { name: 'deleteBlock' }),
  graphql(EDIT_BLOCK_MUTATION, { name: 'editBlock' }),
)(BlockActions);
