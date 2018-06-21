import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MrmModal from '../components/commons/Modal';

class DeleteResource extends Component {
  state = {
    closeModal: false,
  };
  handleKeyUp = ({ keyCode }) => keyCode === 27 && this.handleCloseModal();

  handleCloseModal = () => {
    this.setState({ closeModal: true });
    this.props.handleCloseModal();
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  render() {
    const { closeModal } = this.state;
    const { toDelete, openModal } = this.props;
    return (
      <div onKeyUp={this.handleKeyUp} role="presentation" className="delete-modal-container">
        <MrmModal
          title="Delete Resource"
          closeModal={closeModal}
          openModal={openModal}
          className="delete-resource-modal"
          handleCloseRequest={this.handleModalStateChange}
        >
          <div className="modal-content">
            <div className="modal-text">
              <p>Are you sure you want to delete &quot; {toDelete.name} &quot;?</p>
              <p>This cannot be undone</p>
            </div>
            <div className="button-container">
              <button className="modal-cancel" onClick={this.handleCloseModal}>Cancel</button>
              <button className="modal-submit">Submit</button>
            </div>
          </div>
        </MrmModal>
      </div>
    );
  }
}

DeleteResource.propTypes = {
  openModal: PropTypes.bool.isRequired,
  toDelete: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

export default DeleteResource;
