import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MrmModal from '../commons/Modal';
import ActionButtons from '../commons/ActionButtons';
import '../../assets/styles/deleteModal.scss';

/**
 * Delete Feedback Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
class DeleteFeedback extends Component {
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
   * Handles the state changes for the deleting feedback modal
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   * Handles deleting feedback
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleDeleteFeedback = (event) => {
    event.preventDefault();
    // submit logic goes here
    this.handleCloseModal();
  };

  render() {
    const { closeModal } = this.state;
    return (
      <MrmModal
        className="delete-modal"
        title="Delete Question"
        buttonText="Delete"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
      >
        <div className="delete-modal-content">
          <p id="confirm-msg">
            Are you sure you want to delete {`"${this.props.question}"`}?
            <br />
            This cannot be undone
          </p>
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            isLoading={false}
            actionButtonText="DELETE FLOOR"
            onClickSubmit={this.handleDeleteFeedback}
          />
        </div>
      </MrmModal>
    );
  }
}

DeleteFeedback.propTypes = {
  question: PropTypes.string.isRequired,
};

export default DeleteFeedback;