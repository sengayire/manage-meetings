/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import React, { Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import ImageLoader from '../commons/ImageLoader';
import { deleteIcon, editIcon } from '../../utils/images/images';
import MrmModal from '../commons/MrmModal';
import '../../assets/styles/rooms.scss';
import '../../assets/styles/utility.scss';
import { deleteRoom } from '../helpers/mutationHelpers/rooms';
import notification from '../../utils/notification';
import EntityCard from './EntityCard';

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
      this.props.clearFilter();
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

  detailsView = () => {
    const {
      state: { showDetails, details },
    } = this;
    if (showDetails) {
      return (
        <EntityCard
          entityName={showDetails}
          entity={details}
          toggleEntity={this.toggleEntity}
        />
      );
    }
    // more if statements could be added to display details of more entities
    return undefined;
  };

  toggleEntity = (entityName, entity) => this.setState({
    showDetails: entityName,
    details: entity,
  });


  formatResources = (resources) => {
    const resource = resources.map(resourcesObject => resourcesObject.resource);
    return resource;
  };

  renderDeleteIcon = () => {
    const { roomName } = this.props;
    const { isLoading } = this.state;
    return (
      <MrmModal
        ref={this.deleteRoomModal}
        type={1}
        title="delete room"
        buttonText={
          <img src={deleteIcon} alt="Delete Icon" className="deletes-modal" />
        }
        modalContent={
          <div>
            <span className="delete-confirmation-text">
              Are you sure you want to delete &quot;{roomName}&quot;? This
              cannot be undone.
            </span>
          </div>
        }
        actionButtonText="DELETE"
        handleSubmit={this.roomDelete()}
        isLoading={isLoading}
      />
    );
  };

  renderEditIcon = () => (
    <span className="edit-icon">
      {/* // eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <img
        className="img"
        src={editIcon}
        alt="edit-icon"
        onClick={() => this.props.handleClick(this.props)}
        onKeyPress={() => this.props.handleClick(this.props)}
      />
    </span>
  );

  renderRoomEntities = (entityName, entityCount, entity) => (
    <div className="number-of-resources">
      <button
        className="btn-plain negative-margin-Top-sm"
        onClick={() => this.toggleEntity(`${entityName}s`, entity)}
      >
        {`${entityCount || 'No'} ${entityName}${entityCount !== 1 ? 's' : ''}`}
      </button>
    </div>
  );

  renderRoomLabels = () => {
    const { roomLabels } = this.props;
    return (
      <div className="room-details">
        {roomLabels.map(label => (
          <div key={label} className="details">
            <p>{label}</p>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const {
      props: {
        roomImage, roomName, numberOfSeats, resources, devices,
      },

      state: { showDetails },
    } = this;
    const resourceCount = resources.length;
    const deviceCount = devices ? devices.length : null;

    return (
      <div className="room-setup-card">
        {showDetails ? (
          this.detailsView()
        ) : (
          <Fragment>
            <ImageLoader
              source={roomImage}
              className="room-image"
              altText={roomName}
            />
            <div className="room-details-container">
              <div className="room-name">{roomName}</div>
              <div className="delete-room">
                {this.renderEditIcon()}
                {this.renderDeleteIcon()}
              </div>
              <div className="number-of-Seats">
                <p>Seats upto {numberOfSeats} people</p>
              </div>
              {this.renderRoomEntities('Resource', resourceCount, this.formatResources(resources))}
              {this.renderRoomEntities('Device', deviceCount, devices)}
              {this.renderRoomLabels()}
            </div>
          </Fragment>
          )}
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
  resources: PropTypes.instanceOf(Array).isRequired,
  roomId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  updatedRoom: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  devices: PropTypes.instanceOf(Array),
  clearFilter: PropTypes.func.isRequired,
};

Room.defaultProps = {
  devices: [],
};
