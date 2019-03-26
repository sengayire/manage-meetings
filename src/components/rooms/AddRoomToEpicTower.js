import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import Modal from '../commons/Modal';
import { ActionButtons } from '../commons';
import '../../assets/styles/addroom.scss';
import SelectImage from '../commons/SelectImage';
import EpicTowerInputs from '../commons/EpicTowerInputs';
import { ADD_ROOM_TO_EPIC_TOWER } from '../../graphql/mutations/rooms/AddRoomToEpicTower';
import GET_EPIC_TOWER_DETAILS_QUERY from '../../graphql/queries/Offices';
import { GET_ALL_REMOTE_ROOMS } from '../../graphql/queries/Rooms';
import mapOfficeDetails from '../../graphql/mappers/Offices';
import notification from '../../utils/notification';
import getImageUrl from '../helpers/ImageUpload';
import hasInvalidInputs from '../helpers/InputValidators';

export class AddRoomToEpicTower extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomType: 'meeting',
      roomCalendar: '',
      officeId: 1,
      imageUrl: '',
      roomName: '',
      remoteRoomName: '',
      roomFloor: 0,
      uploading: false,
      floorOptions: [],
      roomCapacity: 0,
      roomWing: 0,
      wingsObject: {},
      wingOptions: [],
      allRemoteRooms: [],
      closeModal: false,
      thumbnailName: 'Upload a thumbnail',
      isLoading: false,
      files: [],
    };
  }

  componentWillReceiveProps = (props) => {
    const { officeDetails } = props;
    const { remoteRooms } = props;

    /* istanbul ignore next */
    if (officeDetails.getOfficeByName) {
      const { floorOptions, wingsObject, officeId } = mapOfficeDetails(
        officeDetails,
      );
      this.setState({
        floorOptions,
        wingsObject,
        officeId,
      });
    }
    /* istanbul ignore next */
    if (remoteRooms.allRemoteRooms && remoteRooms.allRemoteRooms.rooms[0]) {
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
      remoteRoomName: '',
      roomFloor: 0,
      roomWing: 0,
      closeModal: true,
      roomCapacity: 0,
      thumbnailName: 'Upload a thumbnail',
    });
  };

  /**
   * Ensures that the state is updated basing
   * on the changes in the input fields
   *
   * @param {object} event
   * @param {number} number
   *
   * @returns {void}
   */
  handleInputChange = (event, number) => {
    const {
      target: { name, value },
    } = event;
    let intValue;
    const { wingsObject } = this.state;

    switch (name) {
      case 'roomName':
        this.setState({ [name]: value.trim() });
        break;
      case 'remoteRoomName':
        this.setState({ [name]: value.trim() });
        break;
      case 'roomFloor':
        intValue = parseInt(value, 10);
        this.setState(
          { [name]: intValue, roomWing: 0, wingOptions: [] },
          () => {
            this.setState({
              wingOptions: wingsObject[intValue],
            });
          },
        );
        break;

      case 'roomCapacity':
        intValue = value === '' ? 0 : value;
        intValue = parseInt(intValue, 10);
        this.setState({ [name]: intValue });
        break;
      case 'roomWing':
        intValue = value === '' ? 0 : value;
        intValue = parseInt(intValue, 10);
        this.setState({ [name]: intValue });
        break;
      default:
        intValue = value === '' ? 0 : value;
        intValue = parseInt(intValue, 10);
        if (number !== undefined) {
          intValue = number;
          this.setState({ roomCapacity: intValue });
        }
    }
  };

  /**
   *It updates the state value of closeModal
   * to false whenever the modal closes
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   *  It adds a room
   *
   * @param  {object} event
   * @requires {function}
   */
  handleAddRoom = (event) => {
    event.preventDefault();
    const {
      roomType,
      roomWing,
      roomName,
      roomFloor,
      roomCapacity,
      roomCalendar,
      officeId,
      files,
    } = this.state;
    const { epicTowerMutation } = this.props;
    if (!hasInvalidInputs(this.state)) {
      this.toggleLoading();
      this.setState({ uploading: true });
      getImageUrl('upload/', files[0])
        .then((url) => {
          this.setState({
            imageUrl: url,
            uploading: false,
          }, () => {
            epicTowerMutation({
              variables: {
                roomType,
                roomWingId: roomWing,
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
  render() {
    const {
      roomName,
      roomWing,
      wingOptions,
      roomFloor,
      floorOptions,
      roomCapacity,
      closeModal,
      thumbnailName,
      imageUrl,
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
        buttonText="Epic Tower"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-room-modal"
      >
        <form
          className="modal-form epic-tower-form"
        >
          <SelectImage
            updateThumbnailState={this.updateThumbnailState}
            thumbnailName={thumbnailName}
            imageUrl={imageUrl}
          />
          <EpicTowerInputs
            roomName={roomName}
            remoteRoomName={remoteRoomName}
            roomWing={roomWing}
            wingOptions={wingOptions}
            roomFloor={roomFloor}
            floorOptions={floorOptionsList}
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
AddRoomToEpicTower.propTypes = {
  officeDetails: PropTypes.shape({
    getOfficeByName: PropTypes.array,
  }).isRequired,
  epicTowerMutation: PropTypes.func.isRequired,
  // eslint-disable-next-line
  remoteRooms: PropTypes.shape({
    allRemoteRooms: PropTypes.shape({
      rooms: PropTypes.array,
    }),
  }),
};

AddRoomToEpicTower.defaultProps = {
  remoteRooms: {
    allRemoteRooms: {
      rooms: [],
    },
  },
};

export default compose(
  graphql(GET_EPIC_TOWER_DETAILS_QUERY, { name: 'officeDetails' }),
  graphql(GET_ALL_REMOTE_ROOMS, { name: 'remoteRooms' }),
  graphql(ADD_ROOM_TO_EPIC_TOWER, { name: 'epicTowerMutation' }),
)(AddRoomToEpicTower);
