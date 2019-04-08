import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { deleteIcon } from '../../utils/images/images';
import ButtonIcon from '../commons/Button';
import { SelectInput as Select } from '../commons';
import MrmModal from '../commons/MrmModal';
import '../../assets/styles/resourcesAllocatedToRoom.scss';
import ErrorIcon from '../../components/commons/ErrorIcon';

class roomsAllocatedToResources extends Component {
  state = {
    roomDetails: '',
  };
  // Creating a ref to the modal component
  toggleModalComponent = createRef();

  /**
   * It invokes the toggle modal method
   * @params {null}
   *
   * @returns {null}
   */
  toggleModal = () => {
    this.toggleModalComponent.current.toggleModal();
  };

  /**
   * It display's each row in the modal
   *
   * @params {array} arrayOfRoomsDetail
   *
   * @returns {jsx}
   */
  displayRoomsAllocated = (room) => {
    if (!room) {
      return null;
    }
    const rooms = (
      <div key={room.name} className="single-resource">
        <div className="room-name-resource">
          <p>{room.name}</p>
        </div>
        <ButtonIcon title={<img src={deleteIcon} alt="Delete" />} />
      </div>
    );
    return rooms;
  };

  /**
   * Handle the display of the modal content
   *
   * @params {object} resourcesData
   *
   * @returns {jxs}
   */
  displayModalContent = resourceDetails => (
    <Fragment>
      <p className="number-of-rooms">
        {resourceDetails.name} has been allocated to {1} Meeting Room
      </p>
      {this.displayRoomsAllocated(resourceDetails.room)}
      {this.renderRoomOptions()}
    </Fragment>
  );

  /**
   * updates the state with resource details
   *
   * @returns {null}
   */

  handleRoomDetails = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  /**
   * clears resource details from the state
   *
   * @returns {null}
   */
  handleCloseModal = () => {
    this.setState({
      roomDetails: '',
    });
  };

  renderRoomOptions = () => {
    const { remoteRooms } = this.props;
    const { roomDetails } = this.state;
    if (remoteRooms.length === 0) {
      return <ErrorIcon message="Error occurred, cannot fetch data" />;
    }
    return (
      <Select
        placeholder="Select Rooms"
        name="roomDetails"
        value={roomDetails}
        labelText="Room Name"
        id="room"
        onChange={this.handleRoomDetails}
        options={remoteRooms}
        wrapperClassName="modal--input"
      />
    );
  };

  render() {
    const { resourceDetails } = this.props;
    const modalContent = this.displayModalContent(resourceDetails);
    return (
      <div className="rooms-allocated-container">
        <MrmModal
          type={2}
          ref={this.toggleModalComponent}
          title={resourceDetails.name}
          modalContent={modalContent}
          isLoading={false}
          actionButtonText="ASSIGN TO ROOM"
          cancelButtonText="CANCEL"
          handleCloseModal={this.handleCloseModal}
        />
      </div>
    );
  }
}
roomsAllocatedToResources.propTypes = {
  resourceDetails: PropTypes.shape({
    room: PropTypes.object,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  remoteRooms: PropTypes.array,
};
roomsAllocatedToResources.defaultProps = {
  resourceDetails: {},
  remoteRooms: [],
};

export default roomsAllocatedToResources;
