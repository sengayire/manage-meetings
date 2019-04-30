/* eslint-disable react/forbid-prop-types */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import ImageLoader from '../commons/ImageLoader';
import { deleteIcon } from '../../utils/images/images';
import MrmModal from '../commons/MrmModal';
import '../../assets/styles/rooms.scss';
import { deleteRoom } from '../helpers/mutationHelpers/rooms';
import notification from '../../utils/notification';

class Room extends Component {
  state = {
    isLoading: false,
    error: '',
  };
  /**
   * It creates a reference to the modal element and Component
   * and toggle it to close when the close icon is clicked
   *
   */
  deleteRoomModal = createRef();

  toggleModal = () => {
    this.deleteRoomModal.current.toggleModal();
  };

  /**
   * It deletes the specified room from the list of rooms
   * and updates the UI to reflect the changes
   * @memberof Room
   */
  roomDelete = () => async () => {
    const { roomId, updatedRoom, roomName } = this.props;
    try {
      this.toggleLoading();
      const updatedRoomResponse = await deleteRoom(roomId);
      this.toggleLoading();
      this.toggleModal();
      notification(toastr, 'success', `${roomName} successfully deleted`)();
      updatedRoom(updatedRoomResponse);
    } catch (err) {
      this.toggleLoading();
      this.toggleModal();
      this.setState({
        error: 'Network error, kindly try again!',
      });
      notification(toastr, 'error', this.state.error)();
    }
  };

  /**
   * it change isLoading state to it's opposite value
   * i.e true to false or vise-versa
   *
   * @returns {void}
   */
  toggleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };

  renderDeleteIcon = () => {
    const { roomName } = this.props;
    const { isLoading } = this.state;
    return (
      <MrmModal
        ref={this.deleteRoomModal}
        type={1}
        title="delete room"
        buttonText={<img src={deleteIcon} alt="Delete Icon" className="deletes-modal" />}
        modalContent={
          <div>
            <span className="delete-confirmation-text">
              Are you sure you want to delete &quot;{roomName}&quot;? This cannot be undone.
            </span>
          </div>
        }
        actionButtonText="Delete"
        handleSubmit={this.roomDelete()}
        isLoading={isLoading}
      />
    );
  };

  render() {
    const {
      roomImage, roomName, numberOfSeats, numberOfResources, roomLabels,
    } = this.props;

    return (
      <div className="room-setup-card">
        <ImageLoader source={roomImage} className="room-image" altText={roomName} />
        <div className="room-details-container">
          <div className="room-name">{roomName}</div>
          <div className="delete-room">{this.renderDeleteIcon()}</div>
          <div className="number-of-Seats">
            <p>Seats upto {numberOfSeats} people</p>
          </div>
          <div className="number-of-resources">
            <p>{numberOfResources} Resources</p>
          </div>
          <div className="room-details">
            {roomLabels.map(label => (
              <div className="details">
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Room;

Room.propTypes = {
  roomImage: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  roomLabels: PropTypes.array.isRequired,
  numberOfSeats: PropTypes.number.isRequired,
  numberOfResources: PropTypes.number.isRequired,
  roomId: PropTypes.string.isRequired,
  updatedRoom: PropTypes.func.isRequired,
};
