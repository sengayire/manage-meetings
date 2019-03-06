import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../commons/Modal';
import { Input } from '../commons/index';
import ActionButtons from '../commons/ActionButtons';

const BlockModal = props => (
  <Modal
    title={!props.editing ? props.office.name : 'EDIT Block'}
    buttonText={!props.editing ? props.office.name : 'Edit'}
    closeModal={props.closeModal}
    handleCloseRequest={props.handleModalStateChange}
    className="add-office-modal"
    // modalButton="add-button"
  >
    <div className="modal-form">
      <Input
        labelName="Block Name"
        name="blockName"
        value={props.blockName}
        placeholder="Enter block name"
        id="blockName"
        onChange={props.handleFormInputChange}
      />
      <ActionButtons
        withCancel
        isLoading={props.isLoading}
        onClickCancel={props.handleCloseModal}
        onClickSubmit={props.handleSubmit}
        actionButtonText={props.editing ? 'SAVE CHANGES' : 'ADD BLOCK'}
      />
    </div>
  </Modal>
);

BlockModal.propTypes = {
  handleModalStateChange: PropTypes.func.isRequired,
  closeModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFormInputChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  office: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  blockName: PropTypes.string,
  editing: PropTypes.bool.isRequired,
};

BlockModal.defaultProps = {
  blockName: '',
  isLoading: false,
};

export default BlockModal;
