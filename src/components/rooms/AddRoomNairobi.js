import React, { Component } from 'react';
import Modal from '../commons/Modal';
import { ActionButtons } from '../commons';
import NairobiRoomInputs from './NairobiRoomInputs';
import '../../assets/styles/addRoomNairobi.scss';
import SelectImage from '../commons/SelectImage';

class AddRoomNairobi extends Component {
  state = {
    roomName: '',
    roomCapacity: 0,
    officeBlock: '',
    officeFloor: '',
    closeModal: false,
  };

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  handleAddRoom = (event) => {
    event.preventDefault();
    // add room logic here
    // close modal after add room
    this.handleCloseModal();
  };

  render() {
    const {
      roomName, roomCapacity, officeBlock, officeFloor, closeModal,
    } = this.state;

    return (
      <Modal
        title="ADD ROOM"
        buttonText="St. Catherines"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="nbo-add-room-modal button addRoomBtn"
      >
        <form className="modal-form" onSubmit={this.handleAddRoom}>
          <SelectImage onChange={this.handleInputChange} />
          <NairobiRoomInputs
            roomName={roomName}
            roomCapacity={roomCapacity}
            officeBlock={officeBlock}
            officeFloor={officeFloor}
            handleInputChange={this.handleInputChange}
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

export default AddRoomNairobi;
