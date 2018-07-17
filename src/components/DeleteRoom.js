import React from 'react';
import PropTypes from 'prop-types';
import MrmModal from '../components/commons/Modal';

import '../assets/styles/deleteModal.scss';

class DeleteRoom extends React.Component {
  state = {
    closeModal: false,
  }

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  }

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  }

  handleDeleteRoom = () => {
    this.handleCloseModal();
  }

  render() {
    const {
      closeModal,
    } = this.state;

    return (
      <MrmModal
        className="delete-modal"
        title="DELETE ROOM"
        buttonText="Delete"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
      >
        <div className="delete-modal-content">
          <p id="confirm-msg">
            Are you sure you want to delete {`"${this.props.roomName}"`}? <br />
            This cannot be undone
          </p>
          <div className="modal-actions" >
            <button id="cancel-btn" onClick={this.handleCloseModal}>CANCEL</button>
            <button id="delete-btn" onClick={this.handleDeleteRoom}>DELETE</button>
          </div>
        </div>
      </MrmModal>
    );
  }
}

DeleteRoom.propTypes = {
  roomName: PropTypes.string.isRequired,
};

export default DeleteRoom;
