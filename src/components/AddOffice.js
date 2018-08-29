import React, { Component } from 'react';
import toastr from 'toastr';
import MrmModal from '../components/commons/Modal';
import { Input, SelectInput as Select } from './commons';

import '../assets/styles/addoffice.scss';
import roomLocations from '../fixtures/roomLocations';
import ActionButtons from './commons/ActionButtons';
import notification from '../utils/notification';

class AddOffice extends Component {
  state = {
    officeName: '',
    officeLocation: '',
    closeModal: false,
  };

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  handleAddOffice = (event) => {
    event.preventDefault();
    // submit logic here
    // after succesful submission close the modal
    const notify = notification(toastr, 'success', '‘Apple TV’ resource has been deleted');
    notify();
    this.handleCloseModal();
  };

  render() {
    const { officeName, officeLocation, closeModal } = this.state;

    return (
      <MrmModal
        title="ADD OFFICE"
        buttonText="Add Office"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-office-modal"
        modalButton="add-button"
      >
        <form className="modal-form" onSubmit={this.handleAddOffice}>
          <Input
            labelName="Office Name"
            name="officeName"
            value={officeName}
            placeholder="Enter office name"
            id="officeName"
            onChange={this.handleInputChange}
          />
          <Select
            labelText="Select Office Location"
            name="officeLocation"
            id="officeLocation"
            value={officeLocation}
            onChange={this.handleInputChange}
            wrapperClassName="input-wrapper"
            placeholder="Select office location"
            options={roomLocations}
          />
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            actionButtonText="ADD OFFICE"
          />
        </form>
      </MrmModal>
    );
  }
}

export default AddOffice;
