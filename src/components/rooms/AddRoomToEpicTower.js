import React, { Component } from 'react';
import Modal from '../commons/Modal';
import { ActionButtons } from '../commons';
import '../../assets/styles/addroom.scss';
import SelectImage from '../commons/SelectImage';
import EpicTowerInputs from '../commons/EpicTowerInputs';

class AddRoomToEpicTower extends Component {
  state = {
    roomName: '',
    roomFloor: '',
    roomCapacity: 1,
    roomWing: '',
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
      roomName, roomWing, roomFloor, roomCapacity, closeModal,
    } = this.state;

    return (
      <Modal
        title="ADD ROOM"
        buttonText="Epic Tower"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-room-modal"
      >
        <form className="modal-form epic-tower-form" onSubmit={this.handleAddRoom}>
          <SelectImage />
          <EpicTowerInputs
            roomName={roomName}
            roomWing={roomWing}
            roomFloor={roomFloor}
            roomCapacity={roomCapacity}
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

export default AddRoomToEpicTower;
