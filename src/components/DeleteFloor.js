import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';

import MrmModal from '../components/commons/Modal';
import { DELETE_FLOOR_MUTATION } from '../graphql/mutations/Floors';
import notification from '../utils/notification';
import '../assets/styles/deleteModal.scss';

/**
 * Delete Floor Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class DeleteFloor extends Component {
  state = {
    closeModal: false,
  };

  /**
   * It closes a modal
   *
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  /**
   * Handles the state changes for the deleting floor modal
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   * Handles deleting floor
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleDeleteFloor = (event) => {
    event.preventDefault();

    this.props
      .deleteFloor({
        variables: {
          floorId: this.props.floorId,
        },
      })
      .then(() => {
        notification(
          toastr,
          'success',
          `'${this.props.floorName}' has been deleted successfully`,
        )();
      })
      .catch((err) => {
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
    this.handleCloseModal();
  };

  render() {
    const { closeModal } = this.state;

    return (
      <MrmModal
        className="delete-modal"
        title="DELETE FLOOR"
        buttonText="Delete"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
      >
        <div className="delete-modal-content">
          <p id="confirm-msg">
            Are you sure you want to delete {`"${this.props.floorName}"`}?{' '}
            <br />
            This cannot be undone
          </p>
          <div className="modal-actions">
            <button id="cancel-btn" onClick={this.handleCloseModal}>
              CANCEL
            </button>
            <button id="delete-btn" onClick={this.handleDeleteFloor}>
              DELETE
            </button>
          </div>
        </div>
      </MrmModal>
    );
  }
}

DeleteFloor.propTypes = {
  floorName: PropTypes.string.isRequired,
  floorId: PropTypes.string.isRequired,
  deleteFloor: PropTypes.func.isRequired,
};

export default compose(
  graphql(DELETE_FLOOR_MUTATION, {
    name: 'deleteFloor',
  }),
)(DeleteFloor);
