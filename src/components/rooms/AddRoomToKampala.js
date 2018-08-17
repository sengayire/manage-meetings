import React, { Component } from 'react';
import Modal from '../commons/Modal';
import { Input, SelectInput as Select, ActionButtons } from '../commons';
import SelectImage from '../commons/SelectImage';
import '../../assets/styles/addroom.scss';


class AddRoom extends Component {
  state = {
    roomName: '',
    roomFloor: '',
    roomCapacity: '',
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
      roomName, roomFloor, roomCapacity, closeModal,
    } = this.state;

    return (
      <Modal
        title="ADD ROOM"
        buttonText="The Crest"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-room-modal"
      >
        <form className="modal-form kla-form" onSubmit={this.handleAddRoom}>
          <SelectImage />
          <Input
            id="roomName"
            name="roomName"
            placeholder="Enter room name"
            value={roomName}
            labelName="Room Name"
            onChange={this.handleInputChange}
            required
          />
          <div className="select-input"><Select
            labelText="Select Floor"
            name="roomFloor"
            id="roomFloor"
            value={roomFloor}
            onChange={this.handleInputChange}
            wrapperClassName="floor-wrapper"
            placeholder="Select floor"
            selectInputClassName="floor-wrapper default-select"
          />
          </div>
          <div className="select-input"><Select
            labelText="Room Capacity"
            name="roomCapacity"
            id="roomCapacity"
            value={roomCapacity}
            onChange={this.handleInputChange}
            wrapperClassName="capacity-wrapper"
            placeholder="0"
            selectInputClassName="capacity-wrapper default-select"
          />
          </div>
          <div className="clearfix" />
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
