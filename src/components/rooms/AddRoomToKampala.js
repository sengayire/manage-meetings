import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import Modal from '../commons/Modal';
import { ActionButtons } from '../commons';
import TheCrestInputs from '../commons/TheCrestInputs';
import { GET_CREST_DETAILS } from '../../graphql/queries/Offices';
import { ADD_ROOM_TO_CREST } from '../../graphql/mutations/rooms/AddRoomToCrest';
import { GET_ALL_REMOTE_ROOMS } from '../../graphql/queries/Rooms';
import SelectImage from '../commons/SelectImage';
import '../../assets/styles/addroomCrest.scss';
import notification from '../../utils/notification';
import getImageUrl from '../helpers/ImageUpload';
import hasInvalidInputs from '../helpers/InputValidators';

export class AddRoomToTheCrest extends Component {
  state = {
    roomType: 'meeting',
    roomCalendar: '',
    officeId: 0,
    imageUrl: '',
    roomName: '',
    remoteRoomName: '',
    roomFloor: 0,
    uploading: false,
    floorOptions: [],
    allRemoteRooms: [],
    roomCapacity: 0,
    closeModal: false,
    thumbnailName: 'Upload a thumbnail',
    isLoading: false,
    files: [],
  };

  componentWillReceiveProps = (props) => {
    const { officeDetails } = props;
    const { remoteRooms } = props;
    /* istanbul ignore next */
    if (officeDetails.getOfficeByName) {
      const {
        getOfficeByName: [
          {
            id,
            blocks: [{ floors }],
          },
        ],
      } = officeDetails;
      const floorOptions = floors;
      const officeId = id;
      this.setState({
        floorOptions,
        officeId,
      });
    }
    /* istanbul ignore next */
    if (remoteRooms.allRemoteRooms) {
      const { rooms: [{ calendarId, name }] } = remoteRooms.allRemoteRooms;
      const { rooms } = remoteRooms.allRemoteRooms;
      this.setState({
        allRemoteRooms: rooms,
        remoteRoomName: name,
        roomCalendar: calendarId,
      });
    }
  };

  /**
   * It handles close modal
   *
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState({
      imageUrl: '',
      roomName: '',
      roomFloor: 0,
      closeModal: true,
      roomCapacity: 0,
      thumbnailName: 'Upload a thumbnail',
    });
  };

  /**
   *  Ensures that the state is updated basing
   * on the changes in the input fields
   *
   * @param {Object} target
   * @returns {function}
   */
  handleInputChange = ({ target: { name, value } }, num) => {
    let intValue;
    switch (name) {
      case 'roomName':
        this.setState({ [name]: value.trim() });
        break;
      case 'remoteRoomName':
        this.setState({ [name]: value.trim() });
        break;
      case 'roomFloor':
        intValue = parseInt(value, 10);
        this.setState({ [name]: intValue });
        break;
      case 'roomCapacity':
        intValue = value === '' ? 0 : value;
        intValue = parseInt(intValue, 10);
        this.setState({ [name]: intValue });
        break;
      default:
        intValue = parseInt(num, 10);
        if (num !== undefined) {
          intValue = num;
          this.setState({ roomCapacity: intValue });
        }
    }
  };

  /**
   *   * It updates the state value of closeModal
   * to false whenever the modal closes
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   * 1. change isLoading state to it's opposite value
   * i.e true to false or vise verser
   *
   * @returns {void}
   */
  toggleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  }
  /**
   *It updates the state value of the
   * thumbnail, image and imageUrl
   *
   * @returns {void}
   */
  updateThumbnailState = (files, imageUrl, thumbnailName) => {
    this.setState({ files, imageUrl, thumbnailName });
  }
  /**
   * Adds a room
   *
   * @param {object} event
   *
   * @param  {object} event
   * @returns {function}
   */
  handleAddRoom = (event) => {
    event.preventDefault();
    const {
      roomType,
      roomName,
      roomFloor,
      roomCapacity,
      roomCalendar,
      officeId,
      files,
    } = this.state;
    const { crestMutation } = this.props;
    if (!hasInvalidInputs(this.state)) {
      this.toggleLoading();
      this.setState({ uploading: true });
      getImageUrl('upload/', files[0])
        .then((url) => {
          this.setState({
            imageUrl: url,
            uploading: false,
          }, () => {
            crestMutation({
              variables: {
                roomType,
                roomName,
                roomFloorId: roomFloor,
                roomCapacity,
                roomCalendar,
                roomImageUrl: this.state.imageUrl,
                office_id: officeId,
              },
            })
              .then((res) => {
                /** Notify user of sucess of adding of room */
                this.toggleLoading();
                this.handleCloseModal();
                notification(
                  toastr,
                  'success',
                  `${res.data.createRoom.room.name} Sucessfully added`,
                )();
                /** Clear the state and restore default values */
              })
              .catch((err) => {
                /** Notify user on failure to add room */
                this.toggleLoading();
                this.handleCloseModal();
                notification(toastr, 'error', err.message)();
              });
          });
        });
    }
  };
  render() {
    const {
      roomName,
      roomFloor,
      roomCapacity,
      closeModal,
      imageUrl,
      thumbnailName,
      floorOptions,
      isLoading,
      allRemoteRooms,
      remoteRoomName,
    } = this.state;
    let floorOptionsList = floorOptions;
    const { officeDetails } = this.props;

    if (officeDetails.loading) {
      floorOptionsList = [{ id: 0, name: 'Loading FLoors' }];
    }

    return (
      <Modal
        title="ADD ROOM"
        buttonText="The Crest"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-room-modal"
      >
        <form className="modal-form kla-form">
          <SelectImage
            updateThumbnailState={this.updateThumbnailState}
            imageUrl={imageUrl}
            thumbnailName={thumbnailName}
          />
          <TheCrestInputs
            roomName={roomName}
            remoteRoomName={remoteRoomName}
            roomFloor={roomFloor}
            floorOptionsList={floorOptionsList}
            roomCapacity={roomCapacity}
            handleInputChange={this.handleInputChange}
            allRemoteRooms={allRemoteRooms}
          />
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            actionButtonText="ADD ROOM"
            isLoading={isLoading}
            onClickSubmit={this.handleAddRoom}
          />
        </form>
      </Modal>
    );
  }
}
AddRoomToTheCrest.propTypes = {
  officeDetails: PropTypes.shape({
    getOfficeByName: PropTypes.array,
  }).isRequired,
  crestMutation: PropTypes.func.isRequired,
  // eslint-disable-next-line
  remoteRooms: PropTypes.shape({
    allRemoteRooms: PropTypes.shape({
      rooms: PropTypes.array,
    }),
  }),
};

AddRoomToTheCrest.defaultProps = {
  remoteRooms: {
    allRemoteRooms: {
      rooms: [],
    },
  },
};
export default compose(
  graphql(GET_CREST_DETAILS, { name: 'officeDetails' }),
  graphql(GET_ALL_REMOTE_ROOMS, { name: 'remoteRooms' }),
  graphql(ADD_ROOM_TO_CREST, { name: 'crestMutation' }),
)(AddRoomToTheCrest);
