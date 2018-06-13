import React from 'react';
import PropTypes from 'prop-types';
import MrmModal from '../components/commons/Modal';

import '../assets/styles/deleteOffice.scss';

class DeleteOffice extends React.Component {
  state = {
    closeModal: false,
  }

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  }

  handleModalStateChange = () => {
    if (this.state.closeModal) this.setState({ closeModal: false });
  }

  handleDeleteOffice = () => {
    this.handleCloseModal();
  }

  render() {
    const {
      closeModal,
    } = this.state;

    return (
      <MrmModal
        className="delete-modal"
        title="DELETE OFFICE"
        buttonText="Delete"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
      >
        <div className="delete-modal-content">
          <p id="confirm-msg">
            Are you sure you want to delete the {`'${this.props.officeName}'`} office?
            This cannot be undone & all data will be lost
          </p>
          <div className="modal-actions" >
            <button id="cancel-btn" onClick={this.handleCloseModal}>CANCEL</button>
            <button id="delete-btn" onClick={this.handleDeleteOffice}>DELETE</button>
          </div>
        </div>
      </MrmModal>
    );
  }
}

DeleteOffice.propTypes = {
  officeName: PropTypes.string.isRequired,
};

export default DeleteOffice;
