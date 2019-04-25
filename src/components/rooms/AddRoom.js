import React, { Component, createRef } from 'react';
import { graphql } from 'react-apollo';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import MrmModal from '../commons/MrmModal';
import SelectImage from '../commons/SelectImage';
import { SelectInput, Input } from '../commons';
import { ADD_ROOM } from '../../graphql/mutations/Rooms';
import { getAllRemoteRooms, getRoomsStructure, getUserDetails, getAllLocations } from '../helpers/QueriesHelpers';
import orderByLevel from '../../utils/formatSetupData';
import notification from '../../utils/notification';
import stripTypeNames from '../helpers/StripTypeNames';
import getImageUrl from '../helpers/ImageUpload';
import '../../assets/styles/addNewRoom.scss';

export class AddNewRoom extends Component {
  state = {
    thumbnailName: 'Upload a thumbnail',
    imageUrl: '',
    rooms: [],
    roomCapacity: 0,
    roomName: '',
    remoteRoomName: '',
    levels: [],
    roomType: '',
    files: [],
    levelInput: [],
    locationId: '',
    isLoading: false,
  };

  componentDidMount() {
    this.fetchRemoteRooms();
    this.getLevels();
    this.setLocationId();
  }

  setLocationId = async () => {
    const user = await getUserDetails();
    const allLocations = await getAllLocations();
    const userLocation = allLocations.find(location => location.name === user.location);
    this.setState({
      locationId: userLocation.id,
    });
  }

  /**
   * get the levels set in the office structure
   *
   *  @returns {void}
   */
  getLevels = async () => {
    const data = await getRoomsStructure();
    const { allStructures } = data;
    const formattedLevels = orderByLevel(stripTypeNames(allStructures));
    this.setState({
      levels: formattedLevels,
    });
  }

  modal = createRef();

  /**
   * fetches all remote/Google calendar rooms
   *
   *  @returns {void}
   */
  fetchRemoteRooms = async () => {
    const allRemoteRooms = await getAllRemoteRooms();
    if (allRemoteRooms) {
      this.setState({ rooms: allRemoteRooms.rooms });
    }
  }

  handleInputChange = ({ target: { id, value, name } }, num) => {
    const { levelInput } = this.state;
    const inputField = (name === 'up' || name === 'down') ? 'roomCapacity' : name;
    const arr = levelInput.find(level => level.id === id)
      ? levelInput : [...levelInput, { id, value }];
    this.setState({
      [inputField]: name === 'levelInput' ? arr : value || num,
    });
  };

  /**
   * Capitalizes first letter of string
   * and returns the new string
   *
   * @param {string}
   *
   * @returns {string}
   */
  capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

  /**
   *It updates the state value of the
   * thumbnail, image and imageUrl
   *
   * @returns {void}
   */
  updateThumbnailState = (files, imageUrl, thumbnailName) => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ files, imageUrl, thumbnailName });
  }

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
   * Ensures that when a user hits CANCEL on the modal or when the
   * adding a new room is successful, then modal closes
   *
   * @returns {void}
   */
  handleCloseModal = () => {
    this.modal.current.toggleModal();
    this.setState({
      imageUrl: '',
      thumbnailName: 'Upload a thumbnail',
    });
  };

  isValidEntry = ({
    rooms, remoteRoomName, roomName, roomType, files, roomCapacity,
  }) => {
    if (roomName && roomCapacity && roomType && remoteRoomName
      && files.length && rooms.length) return true;
    return false;
  }

  createRoom = async () => {
    if (this.isValidEntry(this.state)) {
      this.toggleLoading();
      const {
        rooms, remoteRoomName, roomName, roomType, levelInput, locationId, files, roomCapacity,
      } = this.state;
      const roomId = rooms.filter(room => room.name === remoteRoomName);
      const calendarId = roomId.length ? roomId[0].calendarId : null;
      getImageUrl('upload/', files[0])
        .then((url) => {
          this.setState({ imageUrl: url, uploading: false }, () => {
            this.props.addRoom({
              variables: {
                imageUrl: url,
                name: roomName,
                capacity: roomCapacity,
                roomType,
                calendarId,
                roomLabels: levelInput.map(level => level.value),
                locationId: Number(locationId),
              },
            }).then((res) => {
              this.toggleLoading();
              this.handleCloseModal();
              notification(toastr, 'success', `${res.data.createRoom.room.name} Successfully added`)();
            }).catch((err) => {
              this.toggleLoading();
              this.handleCloseModal();
              notification(toastr, 'error', err.message)();
            });
          });
        });
    } else notification(toastr, 'error', 'All fields are required')();
  }


  /**
   * It renders the SelectImage component
   * for thumbnail upload
   *
   * @returns {JSX}
   */
  renderImageUpload = () => {
    const { imageUrl, thumbnailName } = this.state;
    return (
      <SelectImage
        updateThumbnailState={this.updateThumbnailState}
        imageUrl={imageUrl}
        thumbnailName={thumbnailName}
      />
    );
  }

  /**
   * It renders the SelectInput component
   * for selecting room from the Google calendar
   *
   * @returns {JSX}
   */
  renderRemoteRoomSelect = () => {
    const { rooms, remoteRoomName } = this.state;
    return (
      <SelectInput
        labelText="Select Google Calendar Room"
        name="remoteRoomName"
        id="remoteRoomName"
        value={remoteRoomName}
        options={rooms}
        onChange={this.handleInputChange}
        wrapperClassName="floor-wrapper"
        placeholder="Select Google Calendar Room"
        selectInputClassName="remote-room-select default-select"
      />
    );
  }

  /**
   * It renders the SelectInput component
   * for selecting room from the Google calendar
   *
   * @returns {JSX}
   */
  renderRemoteRoomSelect = () => {
    const { rooms, remoteRoomName } = this.state;
    return (
      <SelectInput
        labelText="Select Google Calendar Room"
        name="remoteRoomName"
        id="remoteRoomName"
        value={remoteRoomName}
        options={rooms}
        onChange={this.handleInputChange}
        wrapperClassName="floor-wrapper"
        placeholder="Select Google Calendar Room"
        selectInputClassName="remote-room-select default-select"
      />
    );
  }

  /**
   * It renders the SelectInput component
   * for roomType
   *
   * @returns {JSX}
   */
  renderRoomType = () => {
    const { roomType } = this.state;
    return (
      <SelectInput
        labelText="Select room type"
        name="roomType"
        id="roomType"
        value={roomType}
        options={[{ name: 'Meeting room' }, { name: 'Call room' }]}
        onChange={this.handleInputChange}
        wrapperClassName="floor-wrapper"
        placeholder="Select room type"
        selectInputClassName="dynamic-input-field default-select"
      />
    );
  }

  /**
   * It renders the SelectInput components
   * for the levels set in the office structure
   *
   * @returns {JSX}
   */
  // eslint-disable-next-line consistent-return
  renderLevelInputFields = () => {
    const { levels } = this.state;
    if (levels.length > 0) {
      return levels.filter((level) => {
        const { tag } = level;
        const childLength = level.children.length;
        const anyTag = tag.toLowerCase();
        if ((childLength > 1) && (anyTag !== 'rooms')) {
          return true;
        }
        return false;
      }).map((level, i) => {
        const { children, tag } = level;
        return (
          <SelectInput
            key={(i + 1).toString()}
            labelText={this.capitalizeFirstLetter(tag)}
            name="levelInput"
            id={(i + 1).toString()}
            value={tag}
            options={children}
            onChange={this.handleInputChange}
            wrapperClassName="floor-wrapper"
            placeholder={`Select ${tag}`}
            selectInputClassName="dynamic-input-field default-select"
          />
        );
      });
    }
  }

  /**
   * It renders the SelectInput component
   * for the room name and capacity
   *
   * @returns {JSX}
   */
  renderStaticInputFields = () => {
    const { roomCapacity, roomName } = this.state;
    return (
      <div className="static-input">
        <Input
          id="roomName"
          name="roomName"
          labelClass="static-input-field"
          inputClass="mrm-input"
          placeholder="Enter room name"
          value={roomName}
          labelName="Room Name"
          onChange={this.handleInputChange}
          required
        />
        <Input
          id="roomCapacity"
          name="roomCapacity"
          type="number"
          labelClass="static-input-field"
          inputClass="mrm-input"
          controlsClass="capacity-controls"
          placeholder="0"
          title="Please add numbers only"
          value={roomCapacity}
          labelName="Room Capacity"
          onChange={this.handleInputChange}
          required
        />
      </div>
    );
  }

  /**
   * It renders the content of the modal
   *
   * @returns {JSX}
   */
  renderModalContent = () => (
    <div className="modal-form">
      {this.renderImageUpload()}
      {this.renderRemoteRoomSelect()}
      {this.renderStaticInputFields()}
      <div className="dynamic-input">
        {this.renderRoomType()}
        {this.renderLevelInputFields()}
      </div>
    </div>
  )

  render() {
    return (
      <MrmModal
        ref={this.modal}
        buttonText="Add New Room"
        title="Add New Room"
        modalContent={this.renderModalContent()}
        handleSubmit={this.createRoom}
        isLoading={this.state.isLoading}
      />
    );
  }
}

AddNewRoom.propTypes = {
  addRoom: PropTypes.func.isRequired,
};

export default graphql(ADD_ROOM, { name: 'addRoom' })(AddNewRoom);