import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../commons/Modal';
import ActionButtons from '../commons/ActionButtons';

const DeleteBlockModal = props => (
  <Modal
    handleCloseRequest={props.handleModalStateChange}
    title="DELETE Block"
    buttonText="Delete"
    className="add-office-modal"
    closeModal={props.closeModal}
  >
    <div className="delete-modal-content">
      <p id="confirm-msg">
        Are you sure you want to delete {`"${props.block.name}"`}? <br />
        This cannot be undone
      </p>
      <ActionButtons
        withCancel
        onClickCancel={props.handleCloseModal}
        isLoading={props.isLoading}
        actionButtonText="DELETE BLOCK"
        onClickSubmit={props.handleDeleteBlock}
      />
    </div>
  </Modal>
);

DeleteBlockModal.propTypes = {
  handleModalStateChange: PropTypes.func.isRequired,
  closeModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleDeleteBlock: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  block: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

DeleteBlockModal.defaultProps = {
  isLoading: false,
};

export default DeleteBlockModal;
