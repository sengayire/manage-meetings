import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MrmModal from '../components/commons/Modal';

class DeleteResource extends Component {
  state = {
    closeModal: false,
  };

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  render() {
    const { closeModal } = this.state;
    const { toDelete } = this.props;
    return (
      <MrmModal
        title="Delete Amenity"
        closeModal={closeModal}
        buttonText="Delete"
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
            <button className="modal-submit delete-resource">Submit</button>
          </div>
        </div>
      </MrmModal>
    );
  }
}

DeleteResource.propTypes = {
  toDelete: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default DeleteResource;
