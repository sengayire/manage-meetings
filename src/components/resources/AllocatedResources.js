import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { deleteIcon } from '../../utils/images/images';
import ButtonIcon from '../commons/Button';
import Modal from '../commons/MrmModal';
import '../../assets/styles/resourcesAllocatedToRoom.scss';

class roomsAllocatedToResources extends Component {
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
  displayRoomsAllocated = (arrayOfRoomsDetail) => {
    const rooms =
      arrayOfRoomsDetail &&
      arrayOfRoomsDetail.map(roomName => (
        <div key={roomName} className="single-resource">
          <div className="room-name-resource">
            <p>{roomName}</p>
          </div>
          <ButtonIcon title={<img src={deleteIcon} alt="Delete" />} />
        </div>
      ));
    return rooms;
  };

  /**
   * Handle the display of the modal content
   *
   * @params {object} resourcesData
   *
   * @returns {jxs}
   */
  displayModalContent = resourcesData => (
    <Fragment>
      <p className="number-of-rooms">
        {resourcesData.resourceName} has been allocated to {resourcesData.numberOfRoom} Meeting
        Rooms
      </p>
      {this.displayRoomsAllocated(resourcesData.roomNames)}
    </Fragment>
  );
  render() {
    const { resourcesData } = this.props;
    const modalContent = this.displayModalContent(resourcesData);
    return (
      <div className="rooms-allocated-container">
        <Modal
          type={2}
          ref={this.toggleModalComponent}
          title={resourcesData.resourceName}
          modalContent={modalContent}
          isLoading={false}
          actionButtonText="ASSIGN TO ROOM"
          cancelButtonText="CANCEL"
        />
      </div>
    );
  }
}
roomsAllocatedToResources.propTypes = {
  resourcesData: PropTypes.shape({
    resourceName: PropTypes.string,
    numberOfRoom: PropTypes.number,
    roomNames: PropTypes.arrayOf(PropTypes.string),
  }),
};
roomsAllocatedToResources.defaultProps = {
  resourcesData: {},
};
export default roomsAllocatedToResources;
