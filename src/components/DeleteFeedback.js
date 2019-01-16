import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MrmModal from './commons/Modal';
import '../assets/styles/deleteModal.scss';

class DeleteFeedback extends Component {
  state = {
    closeModal: false,
  };

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  }

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  }

  handleDeleteFeedback = (event) => {
    event.preventDefault();
    // submit logic goes here
    this.handleCloseModal();
  }

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
          <div className="modal-actions">
            <button id="cancel-btn" onClick={this.handleCloseModal}>
              Cancel
            </button>
            <button id="delete-btn" onClick={this.handleDeleteFeedback}>
              Delete
            </button>
          </div>
        </div>
      </MrmModal>
    );
  }
}

DeleteFeedback.propTypes = {
  question: PropTypes.string.isRequired,
};

export default DeleteFeedback;
