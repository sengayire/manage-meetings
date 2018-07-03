import React, { Component } from 'react';
import Modal from '../commons/Modal';
import { Input, SelectInput as Select, ActionButtons } from '../commons';

import '../../assets/styles/addroom.scss';
import roomLocations from '../../fixtures/roomLocations';

class AddRoom extends Component {
  state = {
    roomName: '',
    roomLocation: '',
    closeModal: false,
  };

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  handleAddRoom = (e) => {
    e.preventDefault();
    // add room logic here
    // close modal after add room
    this.handleCloseModal();
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { closeModal, roomName, roomLocation } = this.state;

    return (
      <Modal
        title="ADD ROOM"
        buttonText="Add Room"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="modal"
      >
        <form onSubmit={this.handleAddRoom}>
          <Input
            id="roomName"
            type="text"
            name="roomName"
            placeholder="Enter room name"
            value={roomName}
            labelName="Room Name"
            onChange={this.handleInputChange}
            labelClass="input-wrapper"
            required
          />
          <Select
            labelText="Select Room Location"
            name="roomLocation"
            id="roomLocation"
            value={roomLocation}
            onChange={this.handleInputChange}
            wrapperClassName="input-wrapper"
            placeholder="Select room location"
            options={roomLocations}
          />
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            actionButtonText="ADD ROOM"
          />
        </form>
      </Modal>
    );
  }
}

export default AddRoom;
