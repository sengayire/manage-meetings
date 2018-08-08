import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../commons/Modal';
import EditRoomForm from './RoomForm';

class EditRoom extends Component {
  static propTypes = {
    roomName: PropTypes.string.isRequired,
    roomLocation: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    locations: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })).isRequired,
  };

  state = {
    closeModal: false,
  };

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  handleEditRoom = () => {
    // add room logic here
    // the console statement is here to supress the eslint error of no-unused-vars
    // console.log(roomDetails);
    // close modal after add room
    this.handleCloseModal();
  };

  render() {
    const { closeModal } = this.state;
    const { roomName, roomLocation, locations } = this.props;

    return (
      <Modal
        title="EDIT ROOM"
        buttonText="Edit"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="modal"
      >
        <EditRoomForm
          onSubmit={this.handleEditRoom}
          onCloseModalRequest={this.handleCloseModal}
          roomName={roomName}
          roomLocation={roomLocation}
          formRole="edit"
          locations={locations}
        />
      </Modal>
    );
  }
}

export default EditRoom;
